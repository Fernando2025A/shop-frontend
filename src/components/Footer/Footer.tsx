import "./Footer.css";
import { Mail, Store } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__content">

        <div className="footer__brand">
          <div className="footer__logo">
            <Store color="rgb(194, 129, 255)" size={24} />
            <h3>Simulador de e-commerce</h3>
          </div>
          <p>
           Sienta la experiencia de comprar
           artículos como en una tienda 
           online, ¡Pero más divertido!
          </p>
          <h4>La app usa:</h4>
          <p>✔️JWT y cookies de sesión con expiración</p>
          <p>✔️Roles (user, admin y owner), con validación backend</p>
          <p>✔️Diseño responsive</p>
          <p>✔️Backend modular</p>
          <p>✔️Relaciones complejas y transacciones con Prisma ORM</p>
        </div>

        <div className="footer__section">
          <h4>Navegación</h4>

          <Link to="/home/store">Tienda</Link>
          <Link to="/home/services">Servicios</Link>
          <Link to="/home/inventory">Inventario</Link>
          <Link to="/home/cart">Carrito</Link>
          <Link to="/home/profile">Perfil</Link>
        </div>

        <div className="footer__section">
          <h4>Tecnologías</h4>

          <a href="https://nestjs.com">
            <img src="https://imgs.search.brave.com/0VcVr3E9BRKUGzJQk3GL0rwMRhhMI7xXgOtCg_pXjzw/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9raW5z/dGEuY29tL3dwLWNv/bnRlbnQvdXBsb2Fk/cy8yMDIyLzA2L25l/c3QtanMtbG9nby5w/bmc" />
          </a>
          <a href="https://postgresql.org">
            <img src="https://imgs.search.brave.com/psFkOHJ9vFCR-YIXCQTsY_fiLwlVNEeaV8PTtIUTtS4/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9jZG4u/aWNvbnNjb3V0LmNv/bS9pY29uL2ZyZWUv/cG5nLTI1Ni9mcmVl/LXBvc3RncmVzcWwt/aWNvbi1zdmctZG93/bmxvYWQtcG5nLTE0/NjAzNjgyLnBuZz9m/PXdlYnAmdz0xMjg" />
          </a>
          <a href="https://react.dev">
            <img src="https://imgs.search.brave.com/i7HllRHjHoXHqynTLlTKVL3qcbQJKoLNvAjmvbBOs78/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9hc3Nl/dHMuc3RpY2twbmcu/Y29tL3RodW1icy82/MmE3NGRmZTIyMzM0/M2ZiYzIyMDdkMDIu/cG5n" />
          </a>
          <a href="https://prisma.io">
            <img style={{ objectFit: "contain", borderRadius: "8px"}} src="prisma.png" />
          </a>

          
        </div>
        <div className="footer__section">
          <h4>Contacto</h4>

          <a href="@gmail.com">
            <Mail size={16} />
            ferdevx@gmail.com
          </a>

          <h4>Repositorio</h4>
          <a href="https://github.com/Fernando2025A/shop-frontend/tree/main">
            <img style={{ width: "20px", height: "20px" }} src="https://imgs.search.brave.com/iXgCDHiml5dV9q0rqXGyLqZWSr9sThQrWPs9f-_hvtU/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy8y/LzI0L0dpdGh1Yl9s/b2dvX3N2Zy5zdmc"></img>
            GitHub
          </a>
        </div>

      </div>

      <div className="footer__bottom">
        © 2026 FerdevX 
        <img src="../../../tienda.png" />
         | Todos los derechos reservados.
      </div>
    </footer>
  );
}