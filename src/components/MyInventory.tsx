import React from 'react'

type Props = {
  products: Product[];
  
}


type Product = {
    userId: number;
    productId: number;
    quantity: number;
    obtainedAt: string;
};
function MyInventory({ products }: Props) {
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
          <th>Reclamado</th>
          <th>Items</th>
          <th>ID de producto</th>
          <th></th>
        </tr>
      </thead>
       <tbody>
        {products.map((o) => (
          <tr key={o.userId}>
            <td>{new Date(o.obtainedAt).toLocaleDateString("es-AR")}</td>
            <td>{o.quantity}</td>
            <td>{o.productId}</td>
            <td>
              <button style={{ padding: '10px 20px'}}>Ver</button>
            </td>
          </tr>
        ))}
      </tbody>
            
    </table>
  )
}
const styles: { table: React.CSSProperties } = {
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
};
export default MyInventory