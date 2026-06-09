import NavBar from "../../components/NavBar";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import gold from "../../assets/gold.png";
import silver from "../../assets/silver.png";
import bronze from "../../assets/bronze.png";
import CardPlan from "../../components/CardPlan/CardPlan";
import CardInfo from "../../components/CardInfo/CardInfo";

type Benefits = {
  discount: number;
  shippingSpeed: number;
};
function Services() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const { user } = useAuth();
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
  const [expiration, setExpiration] = useState("");
  const [benefits, setBenefits] = useState<Benefits[]>([]);

  useEffect(() => {
    if (!user) return;
    setPlanId(user.subscription?.plan.id ?? user.planId ?? 0);
    setAdmin(user.roleId !== 1);
  }, [user]);

  useEffect(() => {
      fetch(`${apiUrl}/plan/me`, {
      credentials: "include",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        const dateExp = new Date(data.currentPeriodEnd);
        setExpiration(dateExp.toLocaleString());
      })
  }, [apiUrl])
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
    if (id < planId) {
      
      return (
        <div className="card">
          <p>¡Espera! ¡Tu plan actual es mejor que este!</p>
        </div>
      );
    }

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
    <div className="app-container">
      <NavBar selected="SERVICIOS" />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <CardInfo
        textColor="blueviolet"
        priceText={`Precio: $${Number(price).toString()}/mes`}
        text="Obtener este plan"
        display={display}
        img={img}
      />
      <button
        style={{
          display: display,
          position: "fixed",
          top: "85%",
          marginLeft: "40%",
          zIndex: "3",
          background: "linear-gradient(135deg, #78f72f, #1d4e00)"
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
          display: display,
          top: "85%",
          marginLeft: "54%",
          position: "fixed",
          zIndex: "2",
          backgroundColor: "red",
          background: "linear-gradient(135deg, #f72f8c, #630000)"
        }}
        disabled={!active}
        onClick={() =>
          active
            ? (setActive(false), setDisplay("none"), setOpacity("100"))
            : (setActive(true), setDisplay("flex"))
        }
        className="btn btn-danger"
      >
        Cancelar
      </button>
      </div>

    
      

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
          "✔️+5% de producción por hora",
          "✔️Acceso a mercado exclusivo",
          "✔️+$50 diarios",
          `✔️Acceso a todos los productos`

        ]}
        titleColor="yellow"
        title={`Gold ${plan.toLocaleLowerCase() === "gold" ? "(actual)" : ""}`}
        img={gold}
        vence={`${plan.toLocaleLowerCase() === "gold" ? `Vence: ${expiration}` : ""}`}
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
          "✔️+3% de producción por hora",
          "✔️+$35 diarios",
          "✔️Acceso a productos de hasta nivel 3",
        ]}
        titleColor="rgb(168, 168, 168)"
        title={`Silver ${plan.toLocaleLowerCase() === "silver" ? "(actual)" : ""}`}
        img={silver}
        vence={`${plan.toLocaleLowerCase() === "silver" ? `Vence: ${expiration}` : ""}`}
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
          "✔️+1% de producción por hora",
          "✔️+$20 diarios",
          "✔️Acceso a productos de hasta nivel 2"
        ]}
        titleColor="rgb(182, 123, 68)"
        title={`Bronze ${plan.toLocaleLowerCase() === "bronze" ? "(actual)" : ""}`}
        img={bronze}
        vence={`${plan.toLocaleLowerCase() === "bronze" ? `Vence: ${expiration}` : ""}`}
      />
    </div>
  );

}

export default Services;
