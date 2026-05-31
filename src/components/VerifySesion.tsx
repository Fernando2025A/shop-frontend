import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom';

function VerifySesion() {
  const [auth, setAuth] = useState(null);
    const [username, setUsername] = useState("");
  
    useEffect(() => {
      fetch('http://localhost:3000/auth/me', {
          credentials: 'include'
        })
        .then(res => {
          if (!res.ok) throw new Error('No autorizado')
          return res.json();
        })
        .then((data) => {setAuth(true); setUsername(data.username)})
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
      return <Navigate to='/login'></Navigate> ;
    }
}

export default VerifySesion