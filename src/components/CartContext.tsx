// CartContext.jsx
import { createContext, useEffect, useState } from 'react';

export const CartContext = createContext<any | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState([]);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchPedidos = async () => {
      const res = await fetch(`${apiUrl}/cart`, {
        credentials: 'include'
      });

      const data = await res.json();
      setCart(data.items);
    };

    fetchPedidos();
  }, []);

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
}