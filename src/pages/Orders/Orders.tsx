import { useEffect, useState } from 'react';
import NavBar from '../../components/NavBar'
import { Navigate } from 'react-router-dom';
import MyOrders from '../../components/MyOrders';

type Pedido = {
  id: number;
  createdAt: string;
  total: string;
  totalItems: number;
  userId: number;
  status: string;
  deliveryAt: string;
};

function Orders() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [auth, setAuth] = useState(null);
  const [username, setUsername] = useState("");
  const [pedidos, setPedidos] = useState<Pedido[]>([]);

useEffect(() => {
  const fetchPedidos = async () => {
    const res = await fetch(`${apiUrl}/orders`, {
      credentials: 'include'
    });
    const data: Pedido[] = await res.json();
    setPedidos(data);
  };

  fetchPedidos();
}, [apiUrl]);
    useEffect(() => {
      fetch(`${apiUrl}/auth/me`, {
          credentials: 'include'
        })
        .then(res => {
          if (!res.ok) throw new Error('No autorizado')
          return res.json();
        })
        .then((data) => {setAuth(true); setUsername(data.username)})
        .catch(() => setAuth(false))
    }, [apiUrl]);
  
    if (auth === null) {
      return <div className='app-container' style={{ color: "blue", fontSize: "28px" }}>
          Cargando...
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden"></span>
          </div>
        </div>
    }
    if (auth === false) {
      return <Navigate to='/login'></Navigate> ;
    }

    const claim = async (orderId: number) => {
      const res = await fetch(`${apiUrl}/inventory/claim/${orderId}`, {
        method: 'POST',
        credentials: 'include'
      })
      if (!res.ok) {
        alert('Ha ocurrido un error');
      } else {
        alert('Pedido reclamado');
      }
    }
      const cancel = async (orderId: number) => {
      const res = await fetch(`${apiUrl}/orders/${orderId}`, {
        method: 'DELETE',
        credentials: 'include'
      })
      if (!res.ok) {
        alert('Ha ocurrido un error');
      } else {
        alert('Pedido cancelado');
      }
    }
  return (
    <div className='app-container'>
      <NavBar selected='pedidos'/>
      <MyOrders action2={cancel} action={claim} orders={pedidos}/>
    </div>
    
  )
}

export default Orders