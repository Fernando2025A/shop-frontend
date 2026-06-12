import "./Generator.css";
import NavBar from "../../components/NavBar";
import { useEffect, useState } from "react";
import { DailyRewardCard } from "../../components/DailyRewardCard/DailyRewardCard";
import { GeneratorStatus } from "../../components/GeneratorStatus/GeneratorStatus";
import { MoneyGenerator } from "../../components/MoneyGenerator/MoneyGenerator";
import { CollectRewardBar } from "../../components/CollectRewardBar/CollectRewardBar";
import { GeneratorUpgrades } from "../../components/GeneratorUpgrades/GeneratorUpgrades";

interface Generator {
  id: number;
  name: string;
  userId: number;
  level: number;
  upgradeCost?: number;
  lastClaimedAt: string;
  currentAccumulated: number;
  maxCapacity: number;
  passiveIncome: number;
}
interface Generators {
  level: number;
  upgradeCost: number;
  maxStorage: number;
  passiveIncome: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

function Tasks() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [claimed, setClaimed] = useState(true);
  const [generatorName, setGeneratorName] = useState("");
  const [generators, setGenerators] = useState<Generators[]>([]);
  const [generator, setGenerator] = useState<Generator>({
    id: 0,
    userId: 0,
    name: "",
    level: 0,
    lastClaimedAt: "",
    currentAccumulated: 0,
    maxCapacity: 0,
    passiveIncome: 0,
  });
  const [reward, setReward] = useState(0);

  useEffect(() => {
    fetch(`${apiUrl}/tasks/dailystatus`, {
      credentials: "include",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setClaimed(data.claimed);
        setReward(data.reward);
      });
  }, [apiUrl]);
 useEffect(() => {
  const fetchGenerators = async() => {
     const res = await fetch(`${apiUrl}/generator`, {
      credentials: "include",
    });
    const data: Generators[] = await res.json();
    setGenerators(data);
  }
   fetchGenerators();
  }, [apiUrl]);
  useEffect(() => {
    fetch(`${apiUrl}/generator/info`, {
      credentials: "include",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setGenerator(data);
        const generatorName = data.name[0].toUpperCase() + data.name.slice(1);
        setGeneratorName(generatorName);
      });
  }, [apiUrl, setGenerator]);
  const getReward = async () => {
    const res = await fetch(`${apiUrl}/tasks/dailyreward`, {
      credentials: "include",
    });
    setClaimed(true);
    return res;
  };

  const claim = async () => {
    await fetch(`${apiUrl}/generator/claim`, {
      credentials: "include",
    });
    setGenerator((prev) => ({
      ...prev,
      currentAccumulated: 0, // Reinicia la cantidad acumulada al reclamar
    }));
  };

  const upgrade = async () => {
    await fetch(`${apiUrl}/generator/upgrade`, {
      credentials: "include",
    });
    window.location.reload(); // Recarga la página para reflejar los cambios después de la mejora
  }

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    const parts = [];

    if (hours > 0) {
      parts.push(`${hours}h`);
    }
    if (minutes > 0 || hours > 0) {
      parts.push(`${minutes}m`);
    }
    parts.push(`${remainingSeconds}s`);

    return parts.join(" ");
  };

  const getTimeLeftToMax = () => {
    if (generator.passiveIncome <= 0) {
      return "N/A";
    }

    const remaining = generator.maxCapacity - generator.currentAccumulated;
    if (remaining <= 0) {
      return "¡Lleno!";
    }

    const secondsToMax = Math.ceil(remaining / generator.passiveIncome);
    return formatTime(secondsToMax);
  };


  return (
    <div className="app-container">
      <NavBar selected="recompensas"></NavBar>
      {/* 🔥 Este contenedor nuevo agrupará la sección del juego */}
      <div className="game-layout">
        {/* COLUMNA IZQUIERDA (Daily + Status) */}
        <div className="layout-left-column">
          <DailyRewardCard
            amount={reward}
            claimed={claimed}
            onClaim={getReward}
          />
          <GeneratorStatus
           bonusPercentage={1}
            currentStorage={generator.currentAccumulated}
            maxStorage={generator.maxCapacity}
            productionPerHour={generator.passiveIncome * 3600}//multiplicado por segundos de una hora
            timeLeftToMax={getTimeLeftToMax()}
          />
        </div>

        {/* COLUMNA DERECHA (MoneyGenerator) */}
        <div className="layout-right-column">
          <MoneyGenerator name={generatorName} upgradeCost={generators[generator.level]?.upgradeCost || 0} onUpgradeClick={upgrade} imageSrc={`/images/generators/0${generator.level}.png`} level={generator.level} maxCapacity={generator.maxCapacity} productionPerSecond={generator.passiveIncome} storedMoney={generator.currentAccumulated}/>
          <div style={{ marginTop: "20px" }}>
            {" "}
            {/* Un pequeño margen de separación */}
            <CollectRewardBar readyAmount={generator.currentAccumulated} onCollect={claim}/>
            <GeneratorUpgrades />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tasks;
