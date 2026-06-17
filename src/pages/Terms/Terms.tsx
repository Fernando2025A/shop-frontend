import { useNavigate } from 'react-router-dom'
import './Terms.css'
export function Terms() {
  const navigate = useNavigate();
  const accept = () => {
    navigate("/home/cart");
  }
  const reject = () => {
    navigate("/login");
  }
  return (
    <div className='terms-container'>
      <div className='terms-body'>
        <h3>Términos y condiciones de compras</h3>
        <h4>1.0: Productos</h4>
        <h5>1.1: Compras</h5>
        <p>
          La aplicación ofrece productos virtuales,
          que sirven únicamente para esta aplicación.
        </p>
        <p>
          Al comprar productos en la app, se aplicará
          un tiempo que deberás esperar para obtener
          el producto.
        </p>
        <h5>1.2: Comportamientos</h5>
        <p>
          Cada producto puede tener su propio comportamiento,
          como modificar el fondo de la aplicación,
        </p>
        <p>
          reducir tiempos de entrega, dar acceso a características
          extra, entre otros.
        </p>
        <h5>1.3: Límites</h5>
        <p>
          Algunos productos tienen límites de compra, por lo que
          no podrás comprar más que ese límite.
        </p>
        <p>
          El límite se calcula en base a los productos de 
          tu inventario y pedidos activos.
        </p>
        <h5>1.4.0: Nivel requerido</h5>
        <p>
          Algunos productos pueden requerir que tengas cierta
          suscripción para comprarlo.
        </p>
        <p>
          Puedes ver el nivel requerido para cada producto 
          antes de agregarlo al carrito.
        </p>
        <h5>1.4.1: Niveles</h5>
        <p style={{ color: "gray"}}>
          Los niveles se establecen de forma jerárgica:
        </p>
        <p>
          Nivel 1: Sin suscripción
        </p>
        <p style={{ color: "rgb(192, 77, 0)"}}>
          Nivel 2: Suscripción "Bronze"
        </p>
        <p style={{ color: "rgb(151, 151, 151)"}}>
          Nivel 3: Suscripción "Silver"
        </p>
        <p style={{ color: "gold"}}>
          Nivel 4: Suscripción "Gold"
        </p>
        <h5>1.4.2: Casos</h5>
        <p>
          Si tu nivel es inferior al requerido, no podrás iniciar
          el pedido.
        </p>
        <p>
          Si tu nivel es superior, podrás comprar el producto sin problemas.
        </p>
        <p>
          Cuando inicies el pedido, se puede aplicar un descuento basado en tu
          suscripción.
        </p>
        <p>
          Al poder agregar productos con niveles requeridos variados,
          
        </p>
        <p>
          es importante que cumplas con el nivel de cada uno.
        </p>
        <h5>1.5: Pedido</h5>
        <p>
          Cuando completes la compra con éxito, los productos pasarán a la
          sección "Mis pedidos".
        </p>
        <p>
          Allí verás información de cada pedido, como fecha de inicio, 
          tiempo restante, estado, 
        </p>
        <p>
          y opciones como "Reclamar" para enviar los 
          productos a tu 
        </p>
        <p>
          inventario si el pedido se completó, o cancelar y
          recibir el reembolso si no se completó aún.
        </p>
        <p>
          Una vez que el pedido se haya completado,
          ya no podrás cancelar.
        </p>
        <div className='end-container'>
            <button onClick={accept}>Aceptar</button>
            <button onClick={reject} style={{ background: "rgb(139, 139, 139)"}}>Rechazar</button>
            <p style={{ color: "red" }}>
              Si no está de acuerdo, por favor, NO
              use la app.
            </p>
        </div>
        
      </div>
    </div>
  )
}

 
