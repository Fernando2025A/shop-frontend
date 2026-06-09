import { useEffect, useState, useContext } from "react";
import NavBar from "../../components/NavBar";
import { useAuth } from "../../context/AuthContext";
import { CartContext } from "../../context/CartContext";

import { StoreCard } from "../../components/StoreCard/StoreCard";

type Product = {
  id: number;
  price: number;
  finalPrice: number;
  stock: number;
  categoryId: number;
  productType: string;
  name: string;
  image: string;
  description: string;
  requiredLevel: number;
};
function Store() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const { user } = useAuth();
  const cartContext = useContext(CartContext);
  const [product, setProduct] = useState<Product[]>([]);
  const [display, setDisplay] = useState("none");
  const [alertText, setAlertText] = useState("");
  const [alertState, setAlertState] = useState("");
  const admin = user?.roleId !== 1;

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch(`${apiUrl}/products`, {
        credentials: "include",
      });
      const data: Product[] = await res.json();
      setProduct(data);
    };

    fetchProducts();
  }, [apiUrl]);

  const addToCart = async (productId: number, quantity: number) => {
    if (!cartContext) {
      setDisplay("flex");
      setAlertText("Error: Carrito no disponible");
      setAlertState("danger");
      setTimeout(() => {
        setDisplay("none");
      }, 1500);
      return;
    }

    const success = await cartContext.addToCart(productId, quantity);
    
    if (!success) {
      setDisplay("flex");
      setAlertText("Ha ocurrido un error");
      setAlertState("danger");
      setTimeout(() => {
        setDisplay("none");
      }, 1500);
      return;
    }

    setDisplay("flex");
    setAlertState("success");
    setAlertText("Agregado a carrito");
    setTimeout(() => {
      setDisplay("none");
    }, 1500);
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
          <StoreCard
            // isAdmin={admin}
            onAddToCartClick={() => addToCart(prod.id, 1)}
            // action2={() => buy(prod.id, 1)}
            key={prod.id}
            // btnColor="linear-gradient(135deg, #3c008b, #001279)"
            // btnColor2="linear-gradient(135deg, #2f43f7, #8400ff)"
            price={prod.price}
            finalPrice={prod.finalPrice}
            description={prod.description}
            availableStock={prod.stock}
            requiredLevel={prod.requiredLevel}
            // titleColor="white"
            // btnText2={prod.stock > 1 ? "Agregar a carrito" : "Agotado"}
            title={prod.name}
            // background="rgb(37, 37, 37)"
            // opacity={prod.stock > 0 ? "1" : "0.3"}
            imageSrc={`/images/${prod.image}`}
            // btnText="Detalles"
            // textSize={22}
            // textColor="rgb(255, 255, 255)"
            // btnState={prod.stock > 0 ? false : true}
          />
        ))}
      </div>
    </div>
  );
}

export default Store;
