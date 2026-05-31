type Props = {
  btnText: string;
  titleColor: string;
  img: string;
  title: string;
  btnColor: string;
  btnText2: string;
  textSize: number;
  textColor: string;
  background: string;
  price: number;
  stock: number;
  level: number;
  action: () => void;
  action2: () => void;
  btnState?: boolean;
  opacity: string;
  isAdmin: boolean;
};

function CardItem({
  title,
  img,
  action,
  action2,
  btnText,
  stock,
  price,
  btnText2,
  titleColor,
  background,
  btnColor,
  textColor,
  level,
  btnState,
  opacity,
  isAdmin,
}: Props) {
  return (
    <div
      className="card"
      style={{
        width: "20rem",
        borderColor: "rgb(0, 0, 0)",
        backgroundColor: background,
        opacity: opacity,
      }}
    >
      <img src={img} className="card-img-top custom-card-img" alt={title}></img>
      <div className="card-body">
        <h5 style={{ color: titleColor }} className="card-title">
          {title}
        </h5>
      </div>
      <ul
        style={{ borderColor: "black" }}
        className="list-group list-group-flush"
      >
        <p
          style={{ backgroundColor: background, color: "lightblue" }}
          className="list-group-item"
        >
          Precio: ${Number(price).toLocaleString()}
        </p>

        <p
          style={{ backgroundColor: background, color: "lightblue" }}
          className="list-group-item"
        >
          Nivel requerido: {level}
        </p>
      </ul>
      <div className="card-body">
        <button
          style={{
            backgroundColor: btnColor,
            marginBottom: "5%",
            textDecoration: "none",
            color: textColor,
            borderRadius: '7%'
          }}
          className="card-link"
          disabled={btnState}
          onClick={action2}
        >
          {btnText}
        </button>

        <button
          style={{
            backgroundColor: btnColor,
            marginBottom: "5%",
            textDecoration: "none",
            color: textColor,
            borderRadius: '7%'
          }}
          className="card-link"
          onClick={action}
          disabled={btnState}
        >
          {btnText2}
        </button>
        <p
          style={{
            backgroundColor: background,
            color: "gray",
            left: "30%",
            textAlign: "left",
            maxWidth: "150px",
            padding: "0%",

          }}
          className="list-group-item"
        >
          Stock: {stock}
        </p>
        <button style={{ borderRadius: '50%', borderRight: "10%" }}>!</button>
        <button style={{ display: isAdmin ? 'flex' : 'none', borderRadius: '100%', backgroundColor: 'red', color: 'lightblue'}}>+</button>
        <button style={{ display: isAdmin ? 'flex' : 'none', borderRadius: '100%', backgroundColor: 'red', color: 'lightblue'}}>🖋️</button>
      </div>
    </div>
  );
}

export default CardItem;
