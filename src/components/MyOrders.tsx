import { TimerCell } from "./TimerCell"; // Ajusta la ruta de importación
type Props = {
  orders: Order[];
  action: (orderId: number) => void | Promise<void>;
  action2: (orderId: number) => void | Promise<void>;
};
type Order = {
  id: number;
  createdAt: string;
  total: string;
  totalItems: number;
  userId: number;
  status: string;
  deliveryAt: string;
};


export default function MyOrders({ orders, action, action2 }: Props) {
  return (
    <div style={{ width: "100%" }}>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          color: "#fff",
          fontSize: "17px",
          fontFamily: "Arial, sans-serif",
          backgroundColor: "#111111d2",
        }}
        border={1}
      >
        <thead>
          <tr style={{ color: "blueviolet", textAlign: "center" }}>
            <th style={{ padding: "10px" }}>ID</th>
            <th>Fecha</th>
            <th>Items</th>
            <th>Total</th>
            <th>Status</th>
            <th>Tiempo Restante</th> {/* ⏳ Título cambiado */}
            <th>Reclamar</th>
            <th>Cancelar</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((o) => (
            <tr key={o.id} style={{ textAlign: "center", borderBottom: "1px solid #333" }}>
              <td style={{ padding: "12px" }}>{o.id}</td>
              <td>{new Date(o.createdAt).toLocaleDateString()}</td>
              <td>{o.totalItems}</td>
              <td>${o.total}</td>
              <td style={{ color: o.status === 'COMPLETED' ? '#01ffbf' : '#ff5858' }}>{o.status}</td>
              
              {/* 🚀 AQUÍ INTEGRAMOS EL CRONÓMETRO EN TIEMPO REAL */}
              <td>
                <TimerCell deliveryAt={o.deliveryAt} status={o.status} />
              </td>

              <td>
                <button 
                  onClick={() => action(o.id)} 
                  style={{ opacity: o.status !== 'COMPLETED' ? '0.5' : '1', cursor: o.status !== 'COMPLETED' ? 'not-allowed' : 'pointer' }} 
                  disabled={o.status !== 'COMPLETED'}
                >
                  Reclamar
                </button>
              </td>
              <td>
                <button 
                  onClick={() => action2(o.id)} 
                  disabled={o.status !== 'PROCESSING'} 
                  style={{ backgroundColor: 'red', opacity: o.status !== 'PROCESSING' ? '0.5' : '1', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: o.status !== 'PROCESSING' ? 'not-allowed' : 'pointer' }}
                >
                  Cancelar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 🛠️ Moví el botón fuera de la tabla para que no rompa el diseño del HTML */}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <button style={{ padding: '10px 20px', backgroundColor: 'blueviolet', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
          Reclamar todos
        </button>
      </div>
    </div>
  );
}