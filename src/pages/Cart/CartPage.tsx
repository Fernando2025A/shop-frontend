import React, { useContext, useEffect, useState } from 'react';
import { 
  ShoppingCart, Trash2, Plus, Minus, PlusCircle, 
  ClipboardCheck, ShieldCheck, Zap, CheckCircle, 
  Headphones, RotateCcw, ArrowRight, Lock 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import './CartPage.css';
import NavBar from '../../components/NavBar';

export const CartPage: React.FC = () => {
  const apiUrl  = import.meta.env.VITE_API_URL;
  const context = useContext(CartContext);
  const [state, setState] = useState(false);
  const [checkText, setCheckText] = useState("Realizar compra");

  if (!context) return null;
  const { cart, updateQuantity, removeFromCart, clearCart, refetchCart, setCart } = context;

  // Re-cargar el carrito cuando el usuario entra a esta página
  useEffect(() => {
    refetchCart();
  }, [refetchCart]);

  const checkout = async() => {
    setState(true);
    setCheckText("Procesando...");
    const res = await fetch(`${apiUrl}/cart/checkout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const resObj = await res.json();
    if (!res.ok) {
      setState(false);
      setCheckText("Realizar compra");
      alert(resObj);
    } else {
      alert(res);
      refetchCart();
    }

  }
  // Multiplicamos cantidades por el price normal (para mostrar lo que se ahorró)
  const totalProductsCount = cart.reduce((acc: number, item: any) => acc + item.quantity, 0);
  
  // Precio normal sin descuento
  const subtotalCost = cart.reduce((acc: number, item: any) => {
    const price = Number(item.product?.price) || 0;
    return acc + (price * item.quantity);
  }, 0);

  // Calcula el descuento total (ahorro) basado en la diferencia entre price y finalPrice
  const discount = cart.reduce((acc: number, item: any) => {
    const normalPrice = Number(item.product?.price) || 0;
    const finalPrice = item.product?.finalPrice || Number(item.product?.price) || 0;
    const itemDiscount = (normalPrice - finalPrice) * item.quantity;
    return acc + itemDiscount;
  }, 0);

  // Precio final que realmente paga
  const totalCost = subtotalCost - discount;

  return (
    <div className="cart-page-wrapper">
      <NavBar selected="carrito" />
      <div className="cart-header-zone">
        <div className="cart-title-row">
          <ShoppingCart size={28} className="cart-icon-purple" />
          <h1>Tu carrito</h1>
        </div>
        <p className="cart-subtitle">Revisa tus productos antes de finalizar la compra.</p>
      </div>

      <div className="cart-layout-grid">
        {/* COLUMNA IZQUIERDA: PRODUCTOS */}
        <div className="cart-left-column">
          {cart.length === 0 ? (
            <div className="cart-empty-message">
              <p>Tu carrito está vacío.</p>
              <Link to="/home/store" className="btn-add-more flex-center">
                <PlusCircle size={18} />
                <span>Ir a la tienda</span>
              </Link>
            </div>
          ) : (
            <>
              <div className="cart-items-list">
                {cart.map((item: any) => {
                  // Desestructuramos el producto interno que mandó tu API de NestJS
                  const product = item.product;
                  if (!product) return null;

                  const currentPrice = Number(product.price) || 0;

                  return (
                    <div key={item.id} className="cart-item-card">
                      {/* Miniatura */}
                      <div className="item-thumbnail-container">
                        {/* Puedes concatenar tu carpeta pública de assets si es necesario */}
                        <img src={`/images/${product.image}`} alt={product.name} />
                      </div>

                      {/* Detalles */}
                      <div className="item-details-container">
                        <div className="item-card-header">
                          <h3>{product.name}</h3>
                          <button 
                            className="btn-delete-item" 
                            onClick={() => {removeFromCart(item.productId); setCart(cart.filter((i: any) => i.id !== item.id))}} // id del item del carrito (ej: 139)
                            title="Eliminar producto"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                        <p className="item-card-desc">{product.description}</p>

                        {/* Precios y Cantidades */}
                        <div className="item-metrics-row">
                          <div className="metric-box">
                            <span className="metric-label">Precio unitario</span>
                            <span className="metric-value text-green">${currentPrice}</span>
                          </div>

                          <div className="metric-box">
                            <span className="metric-label">Cantidad</span>
                            <div className="quantity-selector">
                              <button 
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                disabled={item.quantity <= 1}
                              >
                                <Minus size={14} />
                              </button>
                              <span className="quantity-display">{item.quantity}</span>
                              <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                                <Plus size={14} />
                              </button>
                            </div>
                          </div>

                          <div className="metric-box">
                            <span className="metric-label">Subtotal</span>
                            <span className="metric-value text-green">${currentPrice * item.quantity}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <Link to="/home/store" className="btn-add-more">
                <PlusCircle size={18} />
                <span>Agregar más productos</span>
              </Link>
            </>
          )}
        </div>

        {/* COLUMNA DERECHA: RESUMEN */}
        <div className="cart-right-column">
          <div className="summary-card">
            <div className="summary-card-title">
              <ClipboardCheck size={20} className="icon-purple" />
              <h2>Resumen del pedido</h2>
            </div>

            <div className="summary-row">
              <span>Productos ({totalProductsCount})</span>
              <span>${subtotalCost}</span>
            </div>
            
            <div className="summary-row">
              <span>Descuento</span>
              <span className="text-green">-${discount}</span>
            </div>

            <div className="summary-divider" />

            <div className="summary-row total-row">
              <span>Total</span>
              <span className="total-price-purple">${totalCost}</span>
            </div>

            <div className="secure-badge">
              <ShieldCheck size={18} className="icon-purple" />
              <div>
                <h4>Compra 100% segura</h4>
                <p>Siempre recibirás lo que compres (a menos que canceles)</p>
              </div>
            </div>
          </div>

          {/* Garantías */}
          <div className="features-list-card">
            <div className="feature-item">
              <div className="feature-icon-wrapper"><Zap size={18} /></div>
              <div>
                <h4>Tiempo de entrega</h4>
                <p>Tiempo de entrega aplicado a todos tus pedidos</p>
              </div>
            </div>

            <div className="feature-item">
              <div className="feature-icon-wrapper"><CheckCircle size={18} /></div>
              <div>
                <h4>Productos verificados</h4>
                <p>Todos nuestros productos son verificados y seguros</p>
              </div>
            </div>

            <div className="feature-item">
              <div className="feature-icon-wrapper"><Headphones size={18} /></div>
              <div>
                <h4>Disponible 24/7</h4>
                <p>Realiza tus compras cuando quieras</p>
              </div>
            </div>

            <div className="feature-item">
              <div className="feature-icon-wrapper"><RotateCcw size={18} /></div>
              <div>
                <h4>Cancelación fácil</h4>
                <p>Si te arrepientes, puedes cancelar tu pedido fácilmente</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ACCIONES INFERIORES */}
      {cart.length > 0 && (
        <div className="cart-footer-actions">
          <button className="btn-clear-cart" onClick={clearCart}>
            <Trash2 size={16} />
            <span>Vaciar carrito</span>
          </button>

          <div className="checkout-btn-group">
            <button disabled={state} className="btn-trigger-checkout" onClick={checkout}>
              <span>{checkText}</span>
              <ArrowRight size={18} />
            </button>
            <p className="checkout-terms-notice">
              <Lock size={12} />
              <span>Al continuar, aceptas nuestros <a href="/terms">Términos y Condiciones</a></span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};