import React from 'react';
import { CircleDollarSign, Wallet } from 'lucide-react';
import './CollectRewardBar.css';

interface CollectRewardBarProps {
  readyAmount?: number;
  onCollect?: () => void;
}

export const CollectRewardBar: React.FC<CollectRewardBarProps> = ({
  readyAmount = 670,
  onCollect
}) => {
  const isZero = readyAmount === 0;

  return (
    <div className="collect-bar-container">
      {/* Zona de Información (Izquierda) */}
      <div className="collect-bar-info-zone">
        <div className={`collect-badge-icon ${isZero ? 'disabled' : ''}`}>
          <CircleDollarSign size={24} />
        </div>
        <div className="collect-text-group">
          <span className="collect-label">Dinero listo para recolectar</span>
          <span className="collect-amount">${readyAmount.toLocaleString()}</span>
        </div>
      </div>

      {/* Botón de Acción (Derecha) */}
      <button 
        className="collect-action-btn" 
        onClick={onCollect}
        disabled={isZero}
      >
        <Wallet size={18} />
        <span>Recolectar</span>
      </button>
    </div>
  );
};