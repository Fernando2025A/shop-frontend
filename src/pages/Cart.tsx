import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { Navigate } from "react-router-dom";

function Cart() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [auth, setAuth] = useState(null);
  const [username, setUsername] = useState("");
  const [cart, setCart] = useState([]);
  const [btnText, setBtnText] = useState("Eliminar");
  const [checkoutText, setCheckoutText] = useState("Realizar compra");
  const [checkoutState, setCheckoutState] = useState(false);
  const [alertText, setAlertText] = useState("Pa");
  const [alertState, setAlertState] = useState("success");
  const [opacity, setOpacity] = useState("1");
  const [display, setDisplay] = useState("none");

  useEffect(() => {
    fetch(`${apiUrl}/cart`, {
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Ha ocurrido un error");
        return res.json();
      })
      .then((data) => {
        setCart(data.items);
      });
  }, []);
  useEffect(() => {
    fetch(`${apiUrl}/auth/me`, {
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("No autorizado");
        return res.json();
      })
      .then((data) => {
        setAuth(true);
        setUsername(data.username);
      })
      .catch(() => setAuth(false));
  }, []);

  if (auth === null) {
    return (
      <div
        className="app-container"
        style={{ backgroundColor: "black", color: "blue" }}
      >
        Cargando...
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden"></span>
        </div>
      </div>
    );
  }
  if (auth === false) {
    return <Navigate to="/login"></Navigate>;
  }

  const checkout = async () => {
    setCheckoutText("Cargando...");
    setCheckoutState(true);
    setOpacity("0.5");
    const res = await fetch(`${apiUrl}/cart/checkout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    if (!res.ok) {
      const resObject = await res.json();
      setAlertText(`Error: ${resObject.message}`);
      setCheckoutState(false);
      setCheckoutText("Realizar pago");
      setOpacity("1");
      setAlertState("danger");
      setDisplay("flex");
      setTimeout(() => {
        setDisplay("none");
      }, 1500);
      return;
    }
    setOpacity("1");
    setCheckoutState(false);
    setCheckoutText("Realizar pago");
    setAlertText("Pago procesado con éxito");
    setDisplay("flex");
    setTimeout(() => {
      setDisplay("none");
    }, 1500);
    setCart([]);
  };
  const deleteItem = async (productId: number) => {
    const res = await fetch(`${apiUrl}/cart`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId,
      }),
      credentials: "include",
    });
    if (!res.ok) {
      setAlertText("No se ha podido eliminar");
      setAlertState("danger");
      setDisplay("flex");
      setTimeout(() => {
        setDisplay("none");
      }, 1500);
      return;
    }
    setCart((prev) =>
     prev.filter((item) => item.productId !== productId)
     );
    setAlertText("Producto eliminado de carrito");
    setDisplay("flex");
    setAlertState('success');
    setTimeout(() => {
      setDisplay("none");
    }, 1500);
    return;
  };
  return (
    <div className="app-container">
      <NavBar selected="carrito" />
      <div>
        <div
          style={{ position: "absolute", display: display, marginLeft: "35%" }}
          className={`alert alert-${alertState}`}
          role="alert"
        >
          {alertText}
        </div>
        {cart.map((item) => (
          <div
            key={item.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px",
              border: "1px solid #ccc",
              padding: "10px",
            }}
          >
            {/* Información */}
            <div>
              <h3 style={{ color: "blueviolet" }}>{item.product.name}</h3>

              <p>Precio: ${Number(item.product.price).toLocaleString()}</p>
              <p>Cantidad: {item.quantity}</p>
              <p>
                Total: $
                {Number(item.quantity * item.product.price).toLocaleString()}
              </p>
              <button
                onClick={() => deleteItem(item.productId)}
                style={{ backgroundColor: "red" }}
              >
                {btnText}
              </button>
              <button>Detalles</button>
            </div>

            {/* Imagen */}
            <img
              style={{
                width: "250px",
                height: "250px",
                objectFit: "cover",
              }}
              src={`/images/${item.product.image}`}
              alt={item.product.name}
            />
          </div>
        ))}
      </div>
      <p>
        Total del pedido: $
        {Number(
          cart.reduce(
            (total, item) => total + item.quantity * item.product.price,
            0,
          ),
        ).toLocaleString()
        }
      </p>

      <button
        disabled={cart.length < 1 ? true : false}
        style={{
          backgroundColor: "blue",
          marginLeft: "40%",
          color: "white",
          border: "none",
          padding: "10px 20px",
          cursor: "pointer",
          opacity: opacity,
        }}
        onClick={checkout}
      >
        {checkoutText}
      </button>
    </div>
  );
}

export default Cart;
