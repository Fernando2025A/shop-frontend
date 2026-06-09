import { useContext, useState } from "react";
import "../App.css";
import "./NavBar.css";
import logo from "../../tienda.png";
import { Link } from "react-router-dom";
// 1. Importamos los íconos que necesitamos
import { 
  Users, 
  Home, 
  ShoppingBag, 
  Cpu, 
  Package, 
  User, 
  ClipboardList, 
  ShoppingCart, 
  Gift 
} from "lucide-react";
import { CartContext } from "../context/CartContext";

type props = {
  selected: string;
};

function NavBar({ selected }: props) {
  const [active, setActive] = useState(selected);
  const context = useContext(CartContext);
    if (!context) return null;
  const { cart } = context;

  const totalProducts = cart.reduce(
    (acc: number, item: any) => acc + item.quantity,
    0,
  );


  // 2. Agregamos la propiedad 'icon' a cada elemento
  const menuItems = [
    { id: "social", name: "SOCIAL", path: "/home/social", icon: <Users size={16} /> },
    { id: "inicio", name: "INICIO", path: "/home", icon: <Home size={16} /> },
    { id: "tienda", name: "TIENDA", path: "/home/store", icon: <ShoppingBag size={16} /> },
    { id: "servicios", name: "SERVICIOS", path: "/home/services", icon: <Cpu size={16} /> },
    { id: "inventario", name: "INVENTARIO", path: "/home/inventory", icon: <Package size={16} /> },
  ];

  const menuItems2 = [
    { id: "pedidos", name: "MIS PEDIDOS", path: "/home/orders", icon: <ClipboardList size={16} /> },
    { id: "carrito", name: `CARRITO(${totalProducts})`, path: "/home/cart", icon: <ShoppingCart size={16} /> },
    { id: "recompensas", name: "RECOMPENSAS", path: "/home/rewards", icon: <Gift size={16} /> },
    { id: "perfil", name: "PERFIL", path: "/home/profile", icon: <User size={16} /> },
  ];

  return (
    <nav className="navbar">
      <div className="nav-spacer">
        <img src={logo} alt="Logo FerdevX" />
        FerdevX
      </div>

      <div className="nav-group nav-center">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            // Cambiamos 'id' por manejo dinámico de clases (más limpio y profesional)
            className={`nav-link ${active === item.id || active === item.name ? "select" : ""}`}
            onClick={() => setActive(item.id)}
            to={item.path}
          >
            {item.icon} {/* 3. Renderizamos el ícono al lado del texto */}
            <span>{item.name}</span>
          </Link>
        ))}
      </div>

      <div className="nav-group nav-right">
        {menuItems2.map((item) => (
          <Link
            key={item.id}
            className={`nav-link ${active === item.id ? "select" : ""}`}
            onClick={() => setActive(item.id)}
            to={item.path}
          >
            {item.icon} {/* 3. Renderizamos el ícono al lado del texto */}
            <span>{item.name}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}

export default NavBar;