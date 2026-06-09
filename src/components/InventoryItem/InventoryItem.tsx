import "./InventoryItem.css";
type Props = {
  avatar: string;
  background: string;
  products: Product[];
  action: (productId: number) => void;
};
type Product = {
  userId: number;
  productId: number;
  quantity: number;
  obtainedAt: string;
  product: ProductDetails;
};
type ProductDetails = {
  name: string;
  price: string; //se convierte a number
  stock: number;
  requiredLevel: number;
  categoryId: number;
  description: string;
  image: string;
  productType: string;
};
function InventoryItem({ products, action, avatar, background }: Props) {
  return products.map((o) => (
    // Eliminamos el div interno. Ahora la <img> y el .card-content son hijos directos de .product-card
    <div className="product-card" key={o.productId}>
      <img src={`/images/${o.product.image}`} alt="img" />

      <div className="card-content">
        <h3>{o.product.name}</h3>
        <p className="date">
          Lo obtuviste el {new Date(o.obtainedAt).toLocaleDateString()}
        </p>
        <p>
          Descripción: <span>{o.product.description}</span>
        </p>
        <p>
          Tipo de producto: <span>{o.product.productType.toLowerCase()}</span>
        </p>
        <button
          className="btn-use"
          disabled={
            o.product.productType === "EFFECT" || o.product.image === avatar || o.product.image === background
          }
          onClick={() => action(o.productId)}
        >
          {o.product.productType === "EFFECT"
            ? "Activo"
            : o.product.image === avatar || o.product.image === background
              ? "Equipado"
              : o.product.productType === "COSMETIC" ? "Equipar" : "Usar" }
        </button>
        <button
          style={{
            background: "linear-gradient(120deg,rgb(126, 0, 0), rgb(63, 0, 0))",
            color: "rgb(255, 146, 146)",
          }}
        >
          Vender (+${(Number(o.product.price) * 0.5).toFixed(2)})
        </button>
      </div>
    </div>
  ));
}

export default InventoryItem;
