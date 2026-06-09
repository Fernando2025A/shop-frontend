import React from 'react';
import { TrendingUp } from 'lucide-react';
import './GeneratorStatus.css';

interface GeneratorStatusProps {
  currentStorage?: number;
  maxStorage?: number;
  productionPerHour?: number;
  bonusPercentage?: number; // Ejemplo: 5 para "+5%"
  timeLeftToMax?: string;   // Ejemplo: "02:15:30"
}

export const GeneratorStatus: React.FC<GeneratorStatusProps> = ({
  currentStorage = 1000,
  maxStorage = 1000,
  productionPerHour = 5.00,
  bonusPercentage = 5,
  timeLeftToMax = "06:15:30",
}) => {
  // Lógica para calcular el porcentaje real del almacenamiento
  const percentage = Math.min(100, Math.floor((currentStorage / maxStorage) * 100));
  
  // Parámetros matemáticos del círculo SVG
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="generator-status-card">
      {/* Título Principal */}
      <div className="generator-status-title">
        <TrendingUp size={20} className="title-icon" />
        <h2>Estado del generador</h2>
      </div>

      {/* Contenedor del Gráfico y Datos */}
      <div className="generator-status-content">
        
        {/* Gráfico Circular SVG */}
        <div className="radial-progress-container">
          <svg className="radial-progress-svg" viewBox="0 0 120 120">
            {/* Círculo de fondo (Gris opaco) */}
            <circle 
              className="circle-bg" 
              cx="60" 
              cy="60" 
              r={radius} 
            />
            {/* Círculo de progreso (Morado/Azul neón degradado) */}
            <circle 
              className="circle-progress" 
              cx="60" 
              cy="60" 
              r={radius}
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              transform="rotate(-90 60 60)" /* Rota para que empiece arriba */
            />
          </svg>
          {/* Textos dentro del círculo */}
          <div className="radial-progress-text">
            <span className="percentage-number">{percentage}%</span>
            <span className="percentage-label">Lleno</span>
          </div>
        </div>

        {/* Datos del Generador (Derecha) */}
        <div className="generator-data-metrics">
          <div className="metric-group">
            <span className="metric-label">Capacidad</span>
            <span className="metric-value">{currentStorage.toLocaleString()} / {maxStorage.toLocaleString()}</span>
          </div>
          
          <div className="metric-group border-top">
            <span className="metric-label">Producción</span>
            <span className="metric-value">
              ${productionPerHour.toFixed(2)} / hora
              {bonusPercentage > 0 && (
                <span className="bonus-badge">+{bonusPercentage}%</span>
              )}
            </span>
          </div>
        </div>
      </div>

      {/* Barra de Progreso Lineal Inferior */}
      <div className="generator-footer-timeline">
        <div className="timeline-labels">
          <span>Próxima recolección máxima:</span>
          <span className="time-countdown">{timeLeftToMax}</span>
        </div>
        <div className="progress-linear-bg">
          <div 
            className="progress-linear-fill" 
            style={{ width: `${currentStorage / maxStorage * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};