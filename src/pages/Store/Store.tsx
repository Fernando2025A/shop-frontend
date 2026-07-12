import { useEffect, useState, useContext } from "react";
import NavBar from "../../components/NavBar";
import { useAuth } from "../../context/AuthContext";
import { CartContext } from "../../context/CartContext";
import "./Store.css";
import { StoreCard } from "../../components/StoreCard/StoreCard";
import { CreateProduct } from "../../components/CreateProduct/CreateProduct";
import Balance from "../../components/Balance/Balance";
import { Search } from "lucide-react";

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
  const [createProductDisplay, setCreateProductDisplay] = useState("none");
  const [showForm, setShowForm] = useState("none");
  const [alertText, setAlertText] = useState("");
  const [alertState, setAlertState] = useState("");
  const [productName, setProductName] = useState("");
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
    }, 2500);
  };
  const search = async (productName: string) => {
    const res = await fetch(`${apiUrl}/products?name=${productName}`, {
      credentials: "include",
    });
    if (!res.ok) {
      alert("Ha ocurrido un error");
      return;
    }

    const data: Product[] = await res.json();
    setProduct(data);
  };
  const turnProductForm = () => {
    if (createProductDisplay == "none") {
      setCreateProductDisplay("flex");
    } else {
      setCreateProductDisplay("none")
    }
  }
  return (
    <div className="app-container">
      <NavBar selected="TIENDA" />
      <div className="info-alert" style={{ display: display }}>
        <p>{alertText}</p>
      </div>
      <div className="top-container">
       
        <Balance amount={user?.amount || 0} />
        <button style={{ display: admin ? "flex" : "none"}} onClick={() => turnProductForm()}>Crear producto</button>
        <CreateProduct action={turnProductForm} display={createProductDisplay} />
        <div className="intro-container">
          <h4>Tienda</h4>
          <p>Mira todos los productos disponibles para ti</p>
        </div>
        <div className="search-container">
          <Search color="white" />
          <input
            onChange={(e) => {
              search(e.target.value);
              setProductName(e.target.value)
            }}
            value={productName}
            type="text"
            placeholder="Busca productos de tu interés"
          />
        </div>
        <div className="filter-container">
          <select>
            <option value="" disabled selected>
              Selecciona una categoría
            </option>
            <option>Fondo de app</option>
            <option>Avatar</option>
            <option>Mejoras</option>
          </select>
        </div>
        <div className="btn-search-container">
          <button onClick={() => search(productName)}>Buscar</button>
        </div>
      </div>

      <div className="cards-container">
        {product.map((prod) => (
          <StoreCard
            onAddToCartClick={() => addToCart(prod.id, 1)}
            key={prod.id}
            price={prod.price}
            finalPrice={prod.finalPrice}
            description={prod.description}
            availableStock={prod.stock}
            requiredLevel={prod.requiredLevel}
            title={prod.name}
            imageSrc={`/images/${prod.image}`}
          />
        ))}
      </div>
    </div>
  );
}

export default Store;
