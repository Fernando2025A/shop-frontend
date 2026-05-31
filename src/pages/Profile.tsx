import { useEffect, useState } from 'react';
import NavBar from '../components/NavBar'
import { Navigate } from 'react-router-dom';

function Profile() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [auth, setAuth] = useState(null);
  const [username, setUsername] = useState("");
  const [id, setId] = useState();
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [plan, setPlan] = useState("");
  const [name, setName] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [notify, setNotify] = useState(false);
  const [notify2, setNotify2] = useState(false);

    useEffect(() => {
      const getPlan = async () => {
        try {
          const response = await fetch(`${apiUrl}/users/plan`, {
            credentials: 'include',
          });

          const data = await response.json();

          setPlan(data.plan)
        } catch(error) {
          console.log(error);
        }
      };
      getPlan();
    }, []);

    useEffect(() => {
      fetch(`${apiUrl}/auth/me`, {
          credentials: 'include'
        })
        .then(res => {
          if (!res.ok) throw new Error('No autorizado')
          return res.json();
        })
        .then((data) => {
          setEmail(data.data.email);
          setAuth(true);
          setUsername(data.data.username);
          setId(data.data.id);
          setAvatar(data.data.avatar);
          setPlan(data.data.planId);
        })
        .catch(() => setAuth(false))
    }, []);
  
    if (auth === null) {
      return <div className='app-container' style={{ backgroundColor: 'black', color: "blue" }}>
          Cargando...
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden"></span>
          </div>
        </div>
    }
    if (auth === false) {
      return <Navigate to='/login'></Navigate>;
    }

    const logout = async () => {
      await fetch(`${apiUrl}/auth/logout`, {
          credentials: 'include'
        });
      window.location.reload();
    }

    const turnVi = () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      visible ? setVisible(false) : setVisible(true);
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      visible2 ? setVisible2(false) : setVisible2(true);
    }

    const handleSubmit = async () => {
      try {
        setDisabled(true);
        if (name === username) {
          throw new Error()
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
        throw new Error()
      }
      setUsername(name);
      setName("");
      setDisabled(false);
      setNotify(true);
      setTimeout(() => {
        setNotify(false)
      }, 2000);
    }catch(error) {
      setNotify2(true)
      setTimeout(() => {
        setNotify2(false)
      }, 800);
      setDisabled(false)
    }
    }
  return (
    <form>
      <div className='app-container'>
        <NavBar selected='perfil' />
        <div style={{ display: notify ? 'flex' : 'none', textAlign: 'center', height: '10%', position: 'absolute', width: '20%', left: '40%', backgroundColor: 'darkgreen', color: 'lightgreen', fontStyle: 'bold'}} className="alert alert-success" role="alert">
          Nombre cambiado con éxito✔️
        </div>
        <div style={{ display: notify2 ? 'flex' : 'none', textAlign: 'center', position: 'absolute', height: '10%', width: '25%', left: '40%', backgroundColor: 'rgb(80, 0, 0)', color: 'rgb(255, 80, 80)', fontStyle: 'bold'}} className="alert alert-danger" role="alert">
          No se ha podido cambiar el nombre:(
        </div>
        <h1 id='nom' style={{ whiteSpace: 'pre' }} >
          Nombre de usuario:              {username}
        </h1>
        <img alt="avatar" src={`/images/${avatar}`} style={{ width: '200px', display: 'flex',  borderRadius: '50%', position: 'absolute', height: '200px', top: '35%', left: '15%'}}></img>
        <button style={{  display: visible ? 'none' : 'flex' }} onClick={() => setVisible(true)} id='turn' type="button" className="btn btn-primary">Cambiar</button>
        <input value={name} style={{ display: visible ? 'flex' : 'none'}} id='inp' placeholder='Nombre nuevo' onChange={(e) => {setName(e.target.value)}}></input>
        <button style={{  display: visible ? 'flex' : 'none' }} onClick={turnVi} id='turn' type="button" className="btn btn-primary">Cancelar</button>
        <button disabled={disabled} onClick={handleSubmit} style={{  display: visible ? 'flex' : 'none', marginTop: '15%' }} id='turn' type="button" className="btn btn-primary" >{disabled ? 'Cargando' : 'Aceptar'}</button>
        <h1 id='idMsg' style={{ whiteSpace: 'pre' }} >
         ID:                                         {id}
        </h1>
        <h1 id='email-profile' style={{ whiteSpace: 'pre'}}>
          Email:                                    {email}
        </h1>
        <h1 style={{ marginTop: '25%', whiteSpace: 'pre', fontSize: '22px', color: 'bisque', marginLeft: '30%' }} >
         Plan:                                             {plan}
        </h1>
        <button onClick={logout} id='logout' type="button" className="btn btn-danger">Cerrar sesión</button>
        
        
      </div>
    </form>
    
    
  )
}

export default Profile