import { useEffect, useState } from "react";
import "../../App.css";
import { Navigate } from "react-router-dom";
import NavBar from "../../components/NavBar";
import Head from "../../components/Head";
import Card from "../../components/Card/Card";
import profile from "../../assets/profile.png";
import store from "../../assets/store.png";
import order from "../../assets/order.png";
import Balance from "../../components/Balance/Balance";

//type Props = {}

function Home() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [auth, setAuth] = useState(null);
  const [username, setUsername] = useState("");
  const [amount, setAmount] = useState(0);
  const [admin, setAdmin] = useState(false);
  const [options, setOptions] = useState(false);
  const [btnText, setBtnText] = useState("+");
  const [newAmount, setNewAmount] = useState(0);

  useEffect(() => {
    fetch(`${apiUrl}/auth/me`, {
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("No autorizado");
        return res.json();
      })
      .then((data) => {
        setAuth(true);
        setAmount(data.data.amount);
        setUsername(data.data.username);
        if (data.data.roleId === 1) {
          setAdmin(false);
        } else {
          setAdmin(true);
        }
      })
      .catch(() => setAuth(false));
  }, []);

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

  const saldo: number = amount;

    const setAmountMe = async () => {
      try {
        await fetch(`${apiUrl}/admin/amount`, {
          method: "PATCH",
          headers: {
          "Content-Type": "application/json",
        },
          body: JSON.stringify({
            amount: newAmount,
          }),
          credentials: "include",
        });
        setAmount(newAmount);
      } catch (error) {
        console.log(error);
      }
    };
  return (
    <div className="app-container">
      <NavBar selected="INICIO" />
      <Balance value={newAmount} onChange={(value) => {setNewAmount(value)}} action={setAmountMe} btnText1={btnText} action2={() => {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        options ? setOptions(false) : setOptions(true);
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        btnText == "+" ? setBtnText("-") : setBtnText("+");
      }} view={options} isAdmin={admin} amount={Number(saldo)} />
      <Head title={`¡Qué alegría verte, ${username}!`} />
      <p
        style={{ display: "flex", justifyContent: "center", fontSize: "18px" }}
      >
        Explora todas las opciones que tenemos para tí😎
      </p>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', marginRight: "25px" }}>
        <Card
        textSize={16}
        btnColor="rgb(69, 24, 128)"
        img={profile}
        titleColor="blueviolet"
        btnText="Ver perfil"
        text="Vea las opciones disponibles en su perfil"
        link="profile"
        title={"Perfil"}
  
      ></Card>
      <Card
        textSize={16}
        btnColor="rgb(69, 24, 128)"
        img={store}
        titleColor="blueviolet"
        btnText="Ver tienda"
        text="Vea lo que tenemos disponible en la tienda"
        link="store"
        title={"Tienda"}
      ></Card>
      <Card
        textSize={16}
        btnColor="rgb(69, 24, 128)"
        img={order}
        titleColor="blueviolet"
        btnText="Ver pedidos"
        text="Vea información sobre sus pedidos"
        link="orders"
        title={"Pedidos"}
    
      ></Card>
      </div>
      
      <footer className='footer-container'>
        
      </footer>
    </div>
  );
}
export default Home;
