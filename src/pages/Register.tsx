import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Register() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [email, setEmail] = useState("");
  const [text, setText] = useState("");
  const [color, setColor] = useState("red");
  const [btn, setBtn] = useState("primary");
  const [isDisabled, setDisabled] = useState(false);
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    setText("Cargando...");
    setBtn('secondary')
    setDisabled(true);
    setColor("lightblue");

    try {
      if (!username || !email || !password || !password2) {
        setBtn('primary');
        setDisabled(false);
        throw new Error('Complete todos los campos');
      }
      if (password !== password2) {
        setBtn('primary');
        setDisabled(false);
        throw new Error('Las contraseñas no coinciden');
      }
      const response = await fetch(`${apiUrl}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
          email,
        }),
        credentials: "include",
      });

      if (response.status == 400) {
        setBtn('primary');
        setDisabled(false);
        throw new Error('Datos inválidos')
      }
      if (response.status == 409) {
        setBtn('primary');
        setDisabled(false);
        throw new Error('Usuario ya registrado')
      }
      if (response.ok) {
        setColor("green");
        setText("Registro exitoso");
      }

      const loginRes = await fetch(`${apiUrl}/auth/login`, {
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

      if (loginRes.ok) {
        navigate('/home');
      } 
      if (!response.ok) {
        throw new Error(`Error del servidor: ${response.status}`);
      }
      
    }catch(error) {
      setColor("red");
      if (error.message.toString() === 'Failed to fetch') {
        setBtn('primary');
        setDisabled(false);
        setText('Ha ocurrido un error');
      } else {
        setBtn('primary');
        setDisabled(false);
        setText(error.message);
      }
      
    }
  }


  return (
  <div className='login-container'>
   <form className="form-container" onSubmit={handleSubmit}>
      
        <h1 className='title'>Regístrate</h1>
        <input value={username} placeholder='Alias' onChange={(e) => {setUsername(e.target.value)}}></input>
        <input value={email} placeholder='Email' onChange={(e) => {setEmail(e.target.value)}}></input>
        <input value={password} type='password' placeholder='Contraseña' onChange={(e) => {setPassword(e.target.value)}}></input>
        <input value={password2} type='password' placeholder='Confirmar contraseña' onChange={(e) => {setPassword2(e.target.value)}}></input>
        <button disabled={isDisabled} type='submit' className={`btn btn-${btn}`}>Crear cuenta</button>
        <p>¿Ya tienes cuenta?</p>
        <Link style={{ color: "rgb(112, 3, 255)", textDecoration: "underline", fontSize: "16px"}} to='/login'>inicia sesión aquí</Link>
        <p style={{ color: color }} >{text}</p>
    </form>
  </div>
  )
}

export default Register;