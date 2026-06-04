import './Tasks.css'
import NavBar from '../../components/NavBar'


function Tasks() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const getReward = async () => {
    const res = await fetch(`${apiUrl}/tasks/dailyreward`, {
      credentials: 'include',
    });
    return res;
  }
  return (
    <div className='app-container'>
      <NavBar selected='tareas'></NavBar>
      <div className='tasks-container'>
        <p>Inicio de sesión diario</p>
        <button onClick={getReward}>Reclamar</button>
      </div>
    </div>
  )
}

export default Tasks