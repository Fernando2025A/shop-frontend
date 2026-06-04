import { useEffect, useState } from "react";
import NavBar from "../../components/NavBar";
import { Navigate } from "react-router-dom";
import ProfileDashboard from "../../components/ProfileDashboard/ProfileDashboard";

function Profile() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [auth, setAuth] = useState(null);
  const [username, setUsername] = useState("");
  const [id, setId] = useState();
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [plan, setPlan] = useState(0);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const [notify, setNotify] = useState(false);
  const [notify2, setNotify2] = useState(false);

  useEffect(() => {
    const getPlan = async () => {
      try {
        const response = await fetch(`${apiUrl}/users/plan`, {
          credentials: "include",
        });

        const data = await response.json();

        setPlan(data.plan);
      } catch (error) {
        console.log(error);
      }
    };
    getPlan();
  }, []);

  useEffect(() => {
    fetch(`${apiUrl}/auth/me`, {
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("No autorizado");
        return res.json();
      })
      .then((data) => {
        setEmail(data.data.email);
        setAuth(true);
        setUsername(data.data.username);
        setAmount(data.data.amount);
        setId(data.data.id);
        setAvatar(data.data.avatar);
        setPlan(data.data.planId);
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

  const logout = async () => {
    await fetch(`${apiUrl}/auth/logout`, {
      credentials: "include",
    });
    window.location.reload();
  };

  const turnVi = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    visible ? setVisible(false) : setVisible(true);
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    visible2 ? setVisible2(false) : setVisible2(true);
  };

  const handleSubmit = async () => {
    try {
      setDisabled(true);
      if (name === username) {
        throw new Error();
      }
      const response = await fetch(`${apiUrl}/users/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: name,
        }),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error();
      }
      setUsername(name);
      setName("");
      setDisabled(false);
      setNotify(true);
      setTimeout(() => {
        setNotify(false);
      }, 2000);
    } catch (error) {
      setNotify2(true);
      setTimeout(() => {
        setNotify2(false);
      }, 800);
      setDisabled(false);
    }
  };
  return (
    <form>
      <div className="app-container">
        <NavBar selected="perfil" />
        <div
          style={{
            display: notify ? "flex" : "none",
            textAlign: "center",
            height: "10%",
            width: "20%",
            left: "40%",
            backgroundColor: "darkgreen",
            color: "lightgreen",
            fontStyle: "bold",
          }}
          className="alert alert-success"
          role="alert"
        >
          Nombre cambiado con éxito✔️
        </div>
        <div
          style={{
            display: notify2 ? "flex" : "none",
            textAlign: "center",
            height: "10%",
            width: "25%",
            left: "40%",
            backgroundColor: "rgb(80, 0, 0)",
            color: "rgb(255, 80, 80)",
            fontStyle: "bold",
          }}
          className="alert alert-danger"
          role="alert"
        >
          No se ha podido cambiar el nombre:(
        </div>
        <h1 style={{ color: "rgb(74, 0, 248)" }}>Mi perfil</h1>
        <p style={{ fontSize: "small" }}>
          Gestiona y revisa tu información personal
        </p>
        <ProfileDashboard
          btnAction={logout}
          avatar={avatar}
          username={username}
          email={email}
          balance={amount}
          memberShip={plan}
        ></ProfileDashboard>
      </div>
    </form>
  );
}

export default Profile;
