import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { Navigate } from "react-router-dom";

import CardItem from "../components/CardItem";

type Product = {
  id: number;
  price: number;
  stock: number;
  categoryId: number;
  productType: string;
  name: string;
  image: string;
  requiredLevel: number;
};
function Store() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [auth, setAuth] = useState(null);
  const [username, setUsername] = useState("");
  const [product, setProduct] = useState<Product[]>([]);
  const [admin, setAdmin] = useState(false);
  const [display, setDisplay] = useState("none");
  const [alertText, setAlertText] = useState("");
  const [alertState, setAlertState] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch(`${apiUrl}/products`, {
        credentials: "include",
      });
      const data: Product[] = await res.json();
      setProduct(data);
    };

    fetchProducts();
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
        if (data.data.roleId === 1) {
          setAdmin(false);
        } else {
          setAdmin(true);
        }
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

  const addToCart = async (productId: number, quantity: number) => {
    const res = await fetch(`${apiUrl}/cart/items`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        productId,
        quantity,
      }),
    });
    if (!res.ok) {
      setDisplay("flex");
      setAlertText("Ha ocurrido un error");
      setAlertState("danger");
      setTimeout(() => {
        setDisplay("none");
      }, 1500);
      return;
    }
    setTimeout(() => {
      setDisplay("none");
    }, 1500);
    setDisplay("flex");
    setAlertState("success");
    setAlertText("Agregado a carrito");
  };
  const buy = async (productId: number, quantity: number) => {
    const res = await fetch(`${apiUrl}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        items: [{ productId, quantity }],
      }),
    });
    if (!res.ok) {
      alert("Error al realizar compra");
      return;
    }
    alert("Compra realizada con éxito");
    window.location.reload();
  };
  return (
    <div className="app-container">
      <NavBar selected="TIENDA" />
      <div
        style={{ position: "fixed", zIndex: "3", display: display, marginLeft: "42%" }}
        className={`alert alert-${alertState}`}
        role="alert"
      >
        {alertText}
      </div>
      <div className="cards-container">
        {product.map((prod) => (
          <CardItem
            isAdmin={admin}
            action={() => addToCart(prod.id, 1)}
            action2={() => buy(prod.id, 1)}
            key={prod.id}
            btnColor="rgb(44, 44, 44)"
            price={prod.price}
            stock={prod.stock}
            level={prod.requiredLevel}
            titleColor="violet"
            btnText2={prod.stock > 1 ? "Agregar a carrito" : "Agotado"}
            title={prod.name}
            background="rgb(37, 37, 37)"
            opacity={prod.stock > 0 ? "1" : "0.3"}
            img={`/images/${prod.image}`}
            btnText="Comprar"
            textSize={22}
            textColor="rgb(23, 170, 255)"
            btnState={prod.stock > 0 ? false : true}
          />
        ))}
      </div>
    </div>
  );
}

export default Store;
