import React from 'react';
import { Coins, Star, Layers, Info, ShoppingCart } from 'lucide-react';
import './StoreCard.css';

interface StoreCardProps {
  title?: string;
  description?: string;
  price?: number;
  finalPrice?: number;
  requiredLevel?: number;
  availableStock?: number;
  imageSrc?: string;
  onDetailsClick?: () => void;
  onAddToCartClick?: () => void;
}

export const StoreCard: React.FC<StoreCardProps> = ({
  title = "+15 por día",
  description = "Aumenta tus ingresos diarios en $15 por cada día activo.",
  price = 200,
  finalPrice = 100,
  requiredLevel = 1,
  availableStock = 192,
  imageSrc = "/path-to-your-beach-cube.png", // Reemplaza por tu asset real
  onDetailsClick,
  onAddToCartClick
}) => {
  return (
    <div style={{ opacity: availableStock < 1 ? "0.5" : "1"}} className="store-card-container">
      {/* Miniatura superior */}
      <div className="store-card-banner">
        <img src={imageSrc} alt={title} className="banner-media" />
      </div>

      {/* Información del Producto */}
      <div className="store-card-content">
        <h3 className="product-title">{title}</h3>
        <p className="product-description">{description}</p>
        
        <div className="product-divider" />

        {/* Fila de Especificaciones */}
        <div className="product-specs-table">
          <div className="spec-item">
            <span className="spec-label">Precio</span>
            <span className="spec-value price-green">
              <Coins size={14} />
              ${price}
            </span>
          </div>
          <div style={{ display: finalPrice == price ? "none" : "flex" }} className="spec-item">
            <span className="spec-label">Tu precio</span>
            <span className="spec-value price-green">
              <Coins size={14} />
              ${finalPrice}
            </span>
          </div>

          <div className="spec-item">
            <span className="spec-label">Nivel requerido</span>
            <span className="spec-value required-purple">
              <Star size={14} />
              {requiredLevel}
            </span>
          </div>

          <div className="spec-item">
            <span className="spec-label">Stock disponible</span>
            <span className="spec-value stock-blue">
              <Layers size={14} />
              {availableStock}
            </span>
          </div>
        </div>

        <div className="product-divider" />

        {/* Botones de Acción de la parte inferior */}
        <div className="product-actions-row">
          <button className="btn-secondary-action" onClick={onDetailsClick}>
            <Info size={16} />
            <span>Detalles</span>
          </button>
          
          <button disabled={availableStock < 1 ? true : false} className="btn-primary-action" onClick={onAddToCartClick}>
            <ShoppingCart size={16} />
            <span>{availableStock < 1 ? "Agotado" : "Agregar a carrito"}</span>
          </button>
        </div>
      </div>
    </div>
  );
};