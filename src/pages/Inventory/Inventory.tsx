import { useEffect, useState } from "react";
import NavBar from "../../components/NavBar";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../components/ThemeProvider";
import InventoryItem from "../../components/InventoryItem/InventoryItem";
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
  const { user } = useAuth();
  const { currentBackground, changeBackground } = useTheme();
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
  }, [apiUrl]);

  useEffect(() => {
    if (!user) return;
    if (user.background) {
      changeBackground(user.background);
    }
  }, [user, changeBackground]);

  const useProduct = async (productId: number) => {
    try {
      const res = await fetch(`${apiUrl}/products/${productId}/use`, {
        credentials: "include",
      });
      if (!res.ok) {
        return;
      }

      const resObject = await res.json();
      if (resObject.background) {
        changeBackground(resObject.background);
      }
      if (resObject.avatar) {
        setAvatar(resObject.avatar);
      }
    } catch (error) {
      console.error("Error al usar producto:", error);
    }
  };

  return (
    <div className="app-container">
      <NavBar selected="INVENTARIO" />
      <InventoryItem background={currentBackground} avatar={avatar} action={useProduct} products={product} />
    </div>
  );
}

export default Inventory;
