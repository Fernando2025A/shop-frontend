import { useEffect, useState } from "react";
import { CartContext } from "../context/CartContext"; // Importamos el contexto que separamos

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<any[]>([]);
  const apiUrl = import.meta.env.VITE_API_URL;

  // Carga inicial adaptada a tu objeto relacional de NestJS
  useEffect(() => {
    fetch(`${apiUrl}/cart`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data && data.items && Array.isArray(data.items)) {
          setCart(data.items);
        } else {
          setCart([]);
        }
      })
      .catch((err) => console.error("Error cargando el carrito:", err));
  }, [apiUrl]);

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;

    const previousCart = [...cart];
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );

    fetch(`${apiUrl}/cart/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quantity: newQuantity }),
      credentials: "include",
    }).catch((err) => {
      console.error("Error al actualizar cantidad:", err);
      setCart(previousCart); 
    });
  };

  const removeFromCart = (id: number) => {
    const previousCart = [...cart];
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));

    fetch(`${apiUrl}/cart`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId: id,
      }),
      credentials: "include",
    }).catch((err) => {
      console.error("Error al eliminar producto:", err);
      setCart(previousCart);
    });
  };

  const clearCart = () => {
    const previousCart = [...cart];
    setCart([]);

    fetch(`${apiUrl}/cart`, {
      method: "DELETE",
      credentials: "include",
    }).catch((err) => {
      console.error("Error al vaciar el carrito:", err);
      setCart(previousCart);
    });
  };

  const refetchCart = async () => {
    try {
      const res = await fetch(`${apiUrl}/cart`, {
        credentials: "include",
      });
      const data = await res.json();
      if (data && data.items && Array.isArray(data.items)) {
        setCart(data.items);
      } else {
        setCart([]);
      }
    } catch (err) {
      console.error("Error re-cargando el carrito:", err);
    }
  };

  const addToCart = async (productId: number, quantity: number) => {
    try {
      const res = await fetch(`${apiUrl}/cart/items`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, quantity }),
        credentials: "include",
      });

      if (!res.ok) {
        console.error("Error al agregar al carrito");
        return false;
      }

      // Re-fetch para obtener el carrito actualizado
      await refetchCart();
      return true;
    } catch (err) {
      console.error("Error al agregar producto:", err);
      return false;
    }
  };

  return (
    <CartContext.Provider 
      value={{ 
        cart, 
        setCart, 
        updateQuantity, 
        removeFromCart, 
        clearCart,
        addToCart,
        refetchCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
}