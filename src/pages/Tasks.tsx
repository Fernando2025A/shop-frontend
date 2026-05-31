import React from 'react'
import NavBar from '../components/NavBar'


function Tasks() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const getReward = async () => {
    const res = await fetch(`${apiUrl}/tasks/dailyreward`, {
      credentials: 'include',
    });
    return res;
  }
  return (
    <div style={{ display: "grid"}} className='app-container'>
      <NavBar selected='tareas'></NavBar>
      <h1 style={{ marginLeft: "40%", color: "bisque", marginTop: "0%"}}>Gana saldo con tareas</h1>
      <label style={{ color: "white", fontSize: "18px", gridRow: "2", gridColumn: "1"}}>Agrega un amigo</label>
      <div>
        <p>Inicio de sesión diario</p>
        <button onClick={getReward}>Reclamar</button>
      </div>
    </div>
  )
}

export default Tasks