import { useEffect, useState } from "react";
import NavBar from "../../components/NavBar";

type CartItem = {
  id: number;
  productId: number;
  quantity: number;
  product: {
    name: string;
    price: number;
    image: string;
  };
};

function Cart() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [cart, setCart] = useState<CartItem[]>([]);
  const btnText = "Eliminar";
  const [checkoutText, setCheckoutText] = useState("Realizar compra");
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
  }, [apiUrl]);

  const checkout = async () => {
    setCheckoutText("Cargando...");
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
          style={{ position: "fixed", display: display, justifyContent: "center", backgroundColor: "brown", color: "pink", border: "none" }}
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
              backgroundColor: "rgba(0, 0, 0, 0.69)",
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
              <p style={{ color: "bisque"}}>
                Total: $
                {Number(item.quantity * item.product.price).toLocaleString()}
              </p>
              <button
                onClick={() => deleteItem(item.productId)}
                style={{ background: "linear-gradient(135deg, #f72f2f, #4d0000)", width: "150px", borderRadius: "8px", marginRight: "20px" }}
              >
                {btnText}
              </button>
              <button style={{ borderRadius: "8px", background: "linear-gradient(135deg, #4700ec, #070707)", width: "150px", }}>Detalles</button>
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
      <p
      style={{ background: "linear-gradient(90deg, #000000, #5a3dff)", textAlign: "center", borderColor: "blue", color: "bisque"}}
      >
        Total del pedido: $
        {Number(
          cart.reduce(
            (total, item) => total + item.quantity * item.product.price,
            0,
          ),
        ).toLocaleString()
        }
      </p>
<div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
      <button
        disabled={cart.length < 1 ? true : false}
        style={{
          background: "linear-gradient(135deg, #2f9df7, #07002c)",
          color: "white",
          border: "none",
          borderRadius: "8px",
          padding: "10px 20px",
          cursor: "pointer",
          opacity: opacity,
        }}
        onClick={checkout}
      >
        {checkoutText}
      </button>
      </div>
    </div>
  );
}

export default Cart;
