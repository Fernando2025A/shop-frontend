import { useEffect, useState } from "react";
import NavBar from "../../components/NavBar";
import { Navigate } from "react-router-dom";
import CardMyProduct from "../../components/CardMyProduct/CardMyProduct";
type Product = {
  userId: number;
  productId: number;
  quantity: number;
  obtainedAt: string;
  product: ProductDetails;
};
type ProductDetails = {
  name: string;
  price: string; //se convierte a number
  stock: number;
  requiredLevel: number;
  categoryId: number;
  description: string;
  image: string;
  productType: string;
};

function Inventory() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [auth, setAuth] = useState(null);
  const [username, setUsername] = useState("");
  const [product, setProduct] = useState<Product[]>([]);
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    const fetchInventory = async () => {
      const res = await fetch(`${apiUrl}/inventory`, {
        credentials: "include",
      });
      const data: Product[] = await res.json();
      setProduct(data);
    };

    fetchInventory();
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
        setAvatar(data.data.avatar)
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

  const useProduct = async (productId: number) => {
    const res = await fetch(`${apiUrl}/products/${productId}/use`, {
      credentials: "include",
    });
    if (!res.ok) {
      return;
    }
    else {
      const resObject = await res.json();
      setAvatar(resObject.avatar);
      return;
    }
  };
  return (
    <div className="app-container">
      <NavBar selected="INVENTARIO" />
      <CardMyProduct avatar={avatar} action={useProduct} products={product}></CardMyProduct>
    </div>
  );
}

export default Inventory;
