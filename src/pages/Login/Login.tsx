import { Link } from "react-router-dom";
import "../../App.css";
import "./Login.css"
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [text, setText] = useState("");
  const [color, setColor] = useState("red");
  const [btn, setBtn] = useState("primary");
  const [disabled, setDisabled] = useState(false);
  const navigate = useNavigate();

  const notActive = () => {
    setDisabled(true);
    setBtn("secondary");
  };
  const active = () => {
    setDisabled(false);
    setBtn("primary");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setText("Cargando...");
    setColor("lightblue");
    notActive();

    try {
      if (!username) {
        active();
        setText("Ingrese usuario");
        throw new Error("Usuario vacío");
      }
      if (!password) {
        active();
        setText("Ingrese contraseña");
        throw new Error("Campo vacío.");
      }
      const response = await fetch(`${apiUrl}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
        credentials: "include",
      });

      if (response.status == 500) {
        active();
        throw new Error("Falló al iniciar sesión");
      }
      setColor("green");
      setText("Login exitoso.");
      setTimeout(() => {
        navigate("/home");
      }, 500);
    } catch (error) {
      setColor("red");
      if (error.message.toString() === "Failed to fetch") {
        active();
        setText("Ha ocurrido un error");
      } else {
        active();
        setText(error.message);
      }
    }
  };

  return (
    <div className="auth-login-bg">
      <form onSubmit={handleSubmit} className="auth-login-card">
        <h1 className="auth-login-title">Iniciar sesión</h1>

        <input
          type="text"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
            setText("");
          }}
          placeholder="Alias"
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setText("");
          }}
        />

        <button disabled={disabled} className={`btn btn-${btn}`} type="submit">
          Iniciar sesión
        </button>

        <p className="auth-login-footer">¿No tienes cuenta?</p>
        <Link
          style={{
            color: "rgb(112, 3, 255)",
            textDecoration: "underline",
            fontSize: "16px",
          }}
          to="/register"
        >
          crea una aquí
        </Link>

        {text && (
          <p id="ver" style={{ color: color }} className="auth-login-error">
            {text}
          </p>
        )}
      </form>
    </div>
  );
}

export default Login;
