import { Calendar, Clock, Gift } from 'lucide-react';
import './DailyRewardCard.css';
import React from 'react';
// import { Calendar, Gift, Clock } from '';

interface DailyRewardProps {
  amount?: number;
  claimed?: boolean;
  timeLeft?: string; // Ejemplo: "23:59:48"
  onClaim?: () => void;
}

export const DailyRewardCard: React.FC<DailyRewardProps> = ({
  amount = 100,
  claimed = false,
  timeLeft = "23:59:48",
  onClaim
}) => {
  return (
    <div className="daily-reward-card">
      <div className="daily-reward-header">
        <div className="daily-reward-icon-wrapper">
          <Calendar className="daily-reward-icon" size={32} />
        </div>
        <div className="daily-reward-info">
          <h3>Inicio de sesión diario</h3>
          <p>Reclama tu recompensa diaria por iniciar sesión.</p>
        </div>
      </div>

      <div className="daily-reward-amount">
        Monto: <span className="amount-highlight">${amount}</span>
      </div>

      <button 
        className={`daily-reward-btn ${claimed ? 'claimed' : ''}`}
        onClick={onClaim}
        disabled={claimed}
      >
        <Gift size={18} />
        <span>{claimed ? 'Reclamado' : 'Reclamar'}</span>
      </button>

      <div className="daily-reward-timer">
        <Clock size={14} />
        <span>Disponible en: {timeLeft}</span>
      </div>
    </div>
  );
};