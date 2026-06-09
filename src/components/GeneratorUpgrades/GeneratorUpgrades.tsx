import React from 'react';
import { ArrowUp, Award, Database, Zap, Gauge } from 'lucide-react';
import './GeneratorUpgrades.css';

interface UpgradeItem {
  id: string;
  type: 'production' | 'capacity' | 'efficiency' | 'velocity';
  title: string;
  description: string;
  level: number;
  cost: number;
}

interface GeneratorUpgradesProps {
  upgrades?: UpgradeItem[];
  userBalance?: number; // Para evaluar si le alcanza para comprar
  onUpgradeBuy?: (id: string) => void;
}

// Iconos dinámicos mapeados según el tipo de mejora
const iconMap = {
  production: <Award size={20} />,
  capacity: <Database size={20} />,
  efficiency: <Zap size={20} />,
  velocity: <Gauge size={20} />,
};

export const GeneratorUpgrades: React.FC<GeneratorUpgradesProps> = ({
  upgrades = [
    { id: '1', type: 'production', title: 'Producción', description: 'Aumenta la cantidad de dinero generado por hora.', level: 5, cost: 750 },
    { id: '2', type: 'capacity', title: 'Capacidad', description: 'Aumenta la capacidad máxima de almacenamiento.', level: 3, cost: 500 },
    { id: '3', type: 'efficiency', title: 'Eficiencia', description: 'Mejora la eficiencia del generador para producir más.', level: 2, cost: 350 },
    { id: '4', type: 'velocity', title: 'Velocidad', description: 'Reduce el tiempo de espera para la próxima producción.', level: 1, cost: 250 },
  ],
  userBalance = 1000,
  onUpgradeBuy
}) => {
  return (
    <div className="upgrades-section-container">
      {/* Título de la sección */}
      <div className="upgrades-section-title">
        <ArrowUp size={20} className="upgrades-title-icon" />
        <h2>Mejoras del generador</h2>
      </div>

      {/* Grid de tarjetas */}
      <div className="upgrades-cards-grid">
        {upgrades.map((upgrade) => {
          const canAfford = userBalance >= upgrade.cost;

          return (
            <div key={upgrade.id} className="upgrade-item-card">
              <div className="upgrade-card-header">
                <div className={`upgrade-icon-box ${upgrade.type}`}>
                  {iconMap[upgrade.type]}
                </div>
                <h3>{upgrade.title}</h3>
              </div>

              <p className="upgrade-card-description">{upgrade.description}</p>
              
              <div className="upgrade-card-level">
                Nivel {upgrade.level}
              </div>

              {/* Botón de compra empujado al fondo */}
              <button 
                className="upgrade-buy-button"
                disabled={!canAfford}
                onClick={() => onUpgradeBuy?.(upgrade.id)}
              >
                <span className="btn-action-text">Mejorar</span>
                <span className={`btn-cost-text ${canAfford ? 'affordable' : 'expensive'}`}>
                  ${upgrade.cost}
                </span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};