// TimerCell.tsx
import { useState, useEffect } from "react";

type TimerProps = {
  deliveryAt: string;
  status: string;
};

export function TimerCell({ deliveryAt, status }: TimerProps) {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    // Si la orden ya está completada o cancelada, no hace falta el contador
    if (status === "COMPLETED") {
      setTimeLeft("Completado");
      return;
    }
    if (status === "CLAIMED") {
      setTimeLeft("Reclamado");
      return;
    }
    if (status === "CANCELLED") {
      setTimeLeft("-");
      return;
    }

    const calculateTimeLeft = () => {
      const difference = +new Date(deliveryAt) - +new Date();
      
      if (difference <= 0) {
        setTimeLeft("¡Listo!");
        return;
      }

      // Cálculos matemáticos para pasar de milisegundos a horas, minutos y segundos
      const hours = Math.floor(difference / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      // Formateamos para que siempre muestre dos dígitos (ej: 05:09:01)
      const format = (num: number) => String(num).padStart(2, "0");

      setTimeLeft(`${format(hours)}:${format(minutes)}:${format(seconds)}`);
    };

    // Ejecutar inmediatamente al montar
    calculateTimeLeft();

    // Crear el intervalo para que se actualice cada 1 segundo (1000ms)
    const interval = setInterval(calculateTimeLeft, 1000);

    // Limpieza al desmontar el componente para evitar fugas de memoria
    return () => clearInterval(interval);
  }, [deliveryAt, status]);

  return <span style={{ fontFamily: "monospace", color: timeLeft === "¡Listo!" ? "#01ffbf" : "#ffc107" }}>{timeLeft}</span>;
}