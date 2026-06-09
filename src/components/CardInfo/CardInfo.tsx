import "./CardInfo.css";

type Props = {
  img: string;
  display: string;
  text: string;
  textColor: string;
  priceText: string;
};

const CardInfo = ({ img, display, text, textColor, priceText }: Props) => {
  return (
    <div>
      <div
        className="card"
        style={{
          backgroundColor: "rgb(0, 0, 0)",
          justifyContent: "center",
          zIndex: "2",
          gap: "5px",
          display: display,
          width: "18rem",
          position: "fixed",
        }}
      >
        <img src={img} className="card-img-top" alt="..."></img>
        <div className="card-body">
          <p style={{ color: textColor }} className="card-text">
            {text}
          </p>
          <p
            style={{ color: textColor, fontSize: "14px" }}
            className="card-text"
          >
            Info de compra
          </p>
          <p
            style={{ color: textColor, fontSize: "14px" }}
            className="card-text"
          >
            {priceText}
          </p>
          <p
            style={{ color: textColor, fontSize: "14px" }}
            className="card-text"
          >
            Cancela cuando quieras
          </p>
          <button className="btn-cancell">Cancelar</button>
          <button className="btn-confirm">Confirmar</button>
        </div>
         
      </div>
    </div>
  );
};

export default CardInfo;
