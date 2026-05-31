import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import { CartProvider } from './components/CartContext.tsx';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <CartProvider>
    <App />
    </CartProvider>
  </BrowserRouter>,
)
