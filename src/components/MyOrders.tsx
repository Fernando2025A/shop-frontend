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
    <table
      style={{
        ...styles.table,
        width: "100%",
        borderCollapse: "collapse",
        color: "#fff",
        fontSize: "17px",
        padding: "5%",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#111",
      }}
      border={1}
    >
      <thead>
        <tr style={{ color: "blueviolet" }}>
          <th style={{ padding: "10px" }}>ID</th>
          <th>Fecha</th>
          <th>Items</th>
          <th>Total</th>
          <th>Status</th>
          <th>Entrega</th>
          <th>Reclamar</th>
          <th>Cancelar</th>
        </tr>
      </thead>

      <tbody>
        {orders.map((o) => (
          <tr key={o.id}>
            <td>{o.id}</td>
            <td>{new Date(o.createdAt).toLocaleDateString()}</td>
            <td>{o.totalItems}</td>
            <td>${o.total}</td>
            <td>{o.status}</td>
            <td>{(new Date(o.deliveryAt).toLocaleDateString(), new Date(o.deliveryAt).toLocaleTimeString())}</td>
            <td>
              <button onClick={() => action(o.id)} style={{ opacity: o.status !== 'COMPLETED' ? '0.5' : '1'}} disabled={o.status !== 'COMPLETED'}>Reclamar</button>
            </td>
            <td>
              <button onClick={() => action2(o.id)} disabled={o.status !== 'PROCESSING'} style={{ backgroundColor: 'red', opacity: o.status !== 'PROCESSING' ? '0.5' : '1' }}>Cancelar</button>
            </td>
          </tr>
        ))}
      </tbody>
      <button  style={{ alignItems: 'center' }}>Reclamar todos</button>
    </table>
  );
}

const styles: { table: React.CSSProperties } = {
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
};
