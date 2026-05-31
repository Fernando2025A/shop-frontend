import { Navigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import { useEffect, useState } from "react";
import gold from "../assets/gold.png";
import silver from "../assets/silver.png";
import bronze from "../assets/bronze.png";
import CardPlan from "../components/CardPlan";
import CardInfo from "../components/CardInfo";

type Benefits = {
  discount: number;
  shippingSpeed: number;
};
function Services() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [auth, setAuth] = useState(null);
  const [username, setUsername] = useState("");
  const [img, setImg] = useState("");
  const [active, setActive] = useState(false);
  const [display, setDisplay] = useState("none");
  const [bronzePrice, setBronzePrice] = useState(0);
  const [silverPrice, setSilverPrice] = useState(0);
  const [goldPrice, setGoldPrice] = useState(0);
  const [price, setPrice] = useState(0);
  const [opacity, setOpacity] = useState("100");
  const [plan, setPlan] = useState("");
  const [planId, setPlanId] = useState(0);
  const [id, setId] = useState(1);
  const [admin, setAdmin] = useState(false);
  const [benefits, setBenefits] = useState<Benefits[]>([]);

  useEffect(() => {
    fetch(`${apiUrl}/auth/me`, {
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("No autorizado");
        return res.json();
      })
      .then((data) => {
        setPlanId(data.data.planId);
        setAuth(true);
        setUsername(data.username);
        if (data.data.roleId === 1) {
          setAdmin(false);
        } else {
          setAdmin(true);
        }
      })
      .catch(() => setAuth(false));
  }, [apiUrl]);

  useEffect(() => {
    if (!planId) return;
    fetch(`${apiUrl}/plan`, {
      credentials: "include",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setBronzePrice(data[1].price);
        setSilverPrice(data[2].price);
        setGoldPrice(data[3].price);
        setBenefits([
          {
            discount: data[1].benefits[0].value,
            shippingSpeed: data[1].benefits[1].value,
          },
          {
            discount: data[2].benefits[0].value,
            shippingSpeed: data[2].benefits[1].value,
          },
          {
            discount: data[3].benefits[0].value,
            shippingSpeed: data[3].benefits[1].value,
          },
        ]);
        const planName = data.find((p) => {
          return p.id == planId;
        });
        setPlan(planName.name);
      });
  }, [apiUrl, planId]);

  if (auth === null) {
    return (
      <div
        className="app-container"
        style={{ backgroundColor: "black", color: "blue" }}
      >
        Cargando...
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden"></span>
        </div>
      </div>
    );
  }
  if (auth === false) {
    return <Navigate to="/login"></Navigate>;
  }

  function setCard(img: string) {
    setImg(img);
    if (!active) {
      setDisplay("flex");
      setActive(true);
    } else {
      setDisplay("none");
      setActive(false);
    }
  }

  async function getPlan(id: number) {
    const response = await fetch(`${apiUrl}/plan/get/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const data = await response.json();

    if (data.sucess === true) {
      window.location.reload();
    } else {
      alert("Error al cambiar de plan");
    }
  }
  return (
    <div className="planes-container">
      <NavBar selected="SERVICIOS" />
      <CardInfo
        textColor="blueviolet"
        priceText={`Precio: $${Number(price).toString()}/mes`}
        text="Obtener este plan"
        left="39.5"
        top="5"
        display={display}
        img={img}
      />
      <button
        style={{
          display: display,
          zIndex: "3",
        }}
        disabled={!active}
        onClick={() => getPlan(id)}
        type="button"
        className="btn btn-success"
      >
        Confirmar
      </button>
      <button
        style={{
          position: "fixed",
          display: display,
          top: "85%",
          marginLeft: "50%",
          zIndex: "3",
        }}
        disabled={!active}
        onClick={() =>
          active
            ? (setActive(false), setDisplay("none"), setOpacity("100"))
            : (setActive(true), setDisplay("flex"))
        }
        type="button"
        className="btn btn-danger"
      >
        Cancelar
      </button>

      <CardPlan
        isAdmin={admin}
        opacity={opacity}
        btnState={plan.toLowerCase() === "gold" ? true : false}
        action={() => {
          setCard(gold);
          setPrice(goldPrice);
          setOpacity("40");
          setId(4);
        }}
        btnText={`${plan.toLowerCase() === "gold" ? "Activo" : "$" + Number(goldPrice).toLocaleString() + "/mes"}`}
        btnColor="rgb(168, 143, 29)"
        textSize={15}
        textColor="rgb(168, 150, 48)"
        text={[
          `✔️${benefits[2]?.discount * 100}% de descuento en todos los productos`,
          `✔️Entrega de productos ${benefits[2]?.shippingSpeed * 100}% más rápida`,
          "✔️Acceso a características avanzadas",
        ]}
        titleColor="yellow"
        title={`Gold ${plan.toLocaleLowerCase() === "gold" ? "(actual)" : ""}`}
        top={20}
        left={10}
        img={gold}
      />

      <CardPlan
        isAdmin={admin}
        btnState={plan.toLowerCase() === "silver" ? true : false}
        opacity={opacity}
        action={() => {
          setCard(silver);
          setPrice(silverPrice);
          setOpacity("40");
          setId(3);
        }}
        btnText={`${plan.toLowerCase() === "silver" ? "Activo" : "$" + Number(silverPrice).toLocaleString() + "/mes"}`}
        btnColor="rgb(189, 188, 188)"
        textSize={15}
        textColor="rgb(107, 107, 107)"
        text={[
          `✔️${benefits[1]?.discount * 100}% de descuento en todos los productos`,
          `✔️Entrega de productos ${benefits[1]?.shippingSpeed * 100}% más rápida`,
          "✔️Acceso a características avanzadas",
        ]}
        titleColor="rgb(168, 168, 168)"
        title={`Silver ${plan.toLocaleLowerCase() === "silver" ? "(actual)" : ""}`}
        top={20}
        left={40}
        img={silver}
      />

      <CardPlan
        isAdmin={admin}
        btnState={plan.toLowerCase() === "bronze" ? true : false}
        action={() => {
          setCard(bronze);
          setPrice(bronzePrice);
          setOpacity("40");
          setId(2);
        }}
        btnText={`${plan.toLowerCase() === "bronze" ? "Activo" : "$" + Number(bronzePrice).toLocaleString() + "/mes"}`}
        btnColor="rgb(177, 85, 0)"
        textSize={15}
        opacity={opacity}
        textColor="rgb(116, 70, 32)"
        text={[
          `✔️${benefits[0]?.discount * 100}% de descuento en todos los productos`,
          `✔️Entrega de productos ${benefits[0]?.shippingSpeed * 100}% más rápida`,
        ]}
        titleColor="rgb(182, 123, 68)"
        title={`Bronze ${plan.toLocaleLowerCase() === "bronze" ? "(Plan actual)" : ""}`}
        top={20}
        left={70}
        img={bronze}
      />
    </div>
  );
}

export default Services;
