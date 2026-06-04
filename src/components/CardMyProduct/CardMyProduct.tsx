import "./CardMyProduct.css";
type Props = {
  productName: string;
};

function CardMyProduct({ productName }: Props) {
  return (
    <div className="product-card">
      <img src="/public/images/neonWolf.png" alt="Mascota Lobo Neón" />
      <div className="card-content">
        <h3>{productName}</h3>
        <p>Obtensd</p>
      </div>
    </div>
  );
}

export default CardMyProduct;
