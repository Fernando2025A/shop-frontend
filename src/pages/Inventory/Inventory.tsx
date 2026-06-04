import { useEffect, useState } from 'react';
import NavBar from '../../components/NavBar'
import { Navigate } from 'react-router-dom';
import MyInventory from '../../components/MyInventory';
import CardMyProduct from '../../components/CardMyProduct/CardMyProduct';
type Product = {
    userId: number;
    productId: number;
    quantity: number;
    obtainedAt: string;
};

function Inventory() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [auth, setAuth] = useState(null);
  const [username, setUsername] = useState("");
  const [product, setProduct] = useState<Product[]>([]);

    useEffect(() => {
      const fetchInventory = async () => {
        const res = await fetch(`${apiUrl}/inventory`, {
          credentials: "include",
        });
        const data: Product[] = await res.json();
        setProduct(data);
      };
  
      fetchInventory();
    }, []);
  
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
  return (
  
    <div className='-container'>
      <NavBar selected='INVENTARIO'/>
      {/* <MyInventory products={product}></MyInventory> */}
      <CardMyProduct productName='Fondo galaxia'></CardMyProduct>
      <CardMyProduct productName='Fondo galaxia'></CardMyProduct>
      <CardMyProduct productName='Fondo galaxia'></CardMyProduct>
    </div>
  )
}

export default Inventory