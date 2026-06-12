import React from 'react';
import { Zap, ArrowUp, BarChart2, Clock, Database, Wallet } from 'lucide-react';
import './MoneyGenerator.css';

interface MoneyGeneratorProps {
  level?: number;
  name?: string;
  productionPerSecond?: number;
  upgradeCost?: number | null | undefined;
  maxCapacity?: number;
  storedMoney?: number;
  imageSrc?: string; // Ruta de la imagen del cubo 3D
  onUpgradeClick?: () => void;
}

export const MoneyGenerator: React.FC<MoneyGeneratorProps> = ({
  level = 5,
  name = "generador de dinero",
  productionPerSecond = 5.00,
  upgradeCost = 4000,
  maxCapacity = 1000,
  storedMoney = 670,
  imageSrc = "/path-to-your-cube-image.png", // Reemplaza por tu asset real
  onUpgradeClick
}) => {
  return (
    <div className="money-generator-container">
      {/* Encabezado del componente */}
      <div className="money-generator-header">
        <div className="header-title-zone">
          <Zap size={22} className="header-zap-icon" />
          <h2>{name}</h2>
        </div>
        <button className="generator-upgrade-btn" onClick={onUpgradeClick} disabled={upgradeCost == 0 ? true : false}>
          <ArrowUp size={16} />
          <span>{upgradeCost == 0 ? "Máximo alcanzado" : "Mejorar"}</span>
          <span style={{ display: upgradeCost == 0 ? "none" : "flex" }}>${upgradeCost}</span>
        </button>
      </div>

      <div className="money-generator-divider" />

      {/* Cuerpo principal */}
      <div className="money-generator-body">
        {/* Lado Izquierdo: Render del Objeto */}
        <div className="generator-visual-box">
          <img 
            src={imageSrc} 
            alt="Generador 3D" 
            className="generator-cube-image" 
          />
        </div>

        {/* Lado Derecho: Lista de estadísticas */}
        <div className="generator-stats-list">
          
          <div className="stat-row">
            <div className="stat-label-side">
              <BarChart2 size={18} className="stat-icon" />
              <span>Nivel actual</span>
            </div>
            <span className="stat-value text-purple">{level}</span>
          </div>

          <div className="stat-row">
            <div className="stat-label-side">
              <Clock size={18} className="stat-icon" />
              <span>Producción por segundo</span>
            </div>
            <span className="stat-value text-green">${productionPerSecond.toFixed(3)}</span>
          </div>

          <div className="stat-row">
            <div className="stat-label-side">
              <Database size={18} className="stat-icon" />
              <span>Capacidad máxima</span>
            </div>
            <span className="stat-value">${maxCapacity.toLocaleString()}</span>
          </div>

          <div className="stat-row">
            <div className="stat-label-side">
              <Wallet size={18} className="stat-icon" />
              <span>Dinero almacenado</span>
            </div>
            <span className="stat-value text-green">${storedMoney.toLocaleString()}</span>
          </div>

        </div>
      </div>
    </div>
  );
};