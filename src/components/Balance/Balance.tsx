import { Minus, PlusIcon } from "lucide-react";
import "./Balance.css";

type Props = {
  amount: number;
  isAdmin?: boolean;
  view?: boolean;
  btnText1?: string;
  action?: () => void;
  action2?: () => void;
  value?: number;
  onChange?: (value: number) => void;
};

function Balance({
  amount,
  value,
  isAdmin,
  view,
  btnText1,
  action,
  action2,
  onChange = () => console.log("sd"),
}: Props) {
  return (
    <div className="balance-container">
      <p>Saldo disponible:</p>
      <div className="balance-info">
        
        <h4>{`$${Number(amount).toLocaleString()}`}</h4>
        <button
          onClick={action2}
          style={{ display: isAdmin ? "flex" : "none" }}
        >
          <PlusIcon style={{ display: btnText1 === "+" ? "flex" : "none" }} />
          <Minus style={{ display: btnText1 === "-" ? "flex" : "none" }} />
        </button>
      </div>

      <div className="balance-action">
        <input
          onChange={(e) => {
            onChange(Number(e.target.value));
          }}
          value={value}
          style={{ display: view ? "flex" : "none" }}
          type="number"
        ></input>
        <button onClick={action} style={{ display: view ? "flex" : "none" }}>
          Aceptar
        </button>
      </div>
    </div>
  );
}

export default Balance;
