import { createContext } from "react";

// Definimos la estructura del tipado para TypeScript
export interface CartContextType {
  cart: any[];
  setCart: React.Dispatch<React.SetStateAction<any[]>>;
  updateQuantity: (id: number, newQuantity: number) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  addToCart: (productId: number, quantity: number) => Promise<boolean>;
  refetchCart: () => Promise<void>;
}

// Únicamente creamos y exportamos el objeto Context
export const CartContext = createContext<CartContextType | null>(null);