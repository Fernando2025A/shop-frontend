import { useContext, useState } from "react";
import "../App.css";
import "./NavBar.css";
import logo from "../../tienda.png";
import { Link } from "react-router-dom";
import { CartContext } from "./CartContext";

type props = {
  selected: string;
};
function NavBar({ selected }: props) {
  const [active, setActive] = useState(selected);

  const { cart } = useContext(CartContext);

  const totalProducts = cart.reduce(
    (acc: number, item: any) => acc + item.quantity,
    0,
  );

  const menuItems = [
    { name: "SOCIAL", path: "/home/social" },
    { name: "INICIO", path: "/home" },
    { name: "TIENDA", path: "/home/store" },
    { name: "SERVICIOS", path: "/home/services" },
    { name: "INVENTARIO", path: "/home/inventory" },
  ];
  const menuItems2 = [
    { id: "perfil", name: "PERFIL", path: "/home/profile" },
    { id: "pedidos", name: "MIS PEDIDOS", path: "/home/orders" },
    { id: "carrito", name: `CARRITO(${totalProducts})`, path: "/home/cart" },
    { id: "tareas", name: "TAREAS", path: "/home/tasks" },
  ];
  return (
    <nav className="navbar">
      <div className="nav-spacer">
        <img src={logo}></img>
        FerdevX
      </div>

      <div className="nav-group nav-center">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            id={`${active === item.name ? "select" : ""}`}
            onClick={() => setActive(item.name)}
            to={item.path}
          >
            {item.name}
          </Link>
        ))}
      </div>

      <div className="nav-group nav-right">
        {menuItems2.map((item) => (
          <Link
            key={item.id}
            id={`${active === item.id ? "select" : ""}`}
            onClick={() => setActive(item.id)}
            to={item.path}
          >
            {item.name}
          </Link>
        ))}
      </div>
    </nav>
  );
}

export default NavBar;
