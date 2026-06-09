import "./CardPlan.css"
type Props = {
  // left: number;
  // top: number;
  action: () => void;
  text: string[];
  btnText: string;
  titleColor: string;
  img: string;
  title: string;
  btnColor: string;
  textSize: number;
  textColor: string;
  btnState: boolean;
  opacity: string;
  isAdmin: boolean;
  vence: string;
};

function CardPlan({
  vence,
  btnState,
  textSize,
  opacity,
  title,
  action,
  isAdmin,
  text,
  btnText,
  textColor,
  titleColor,
  img,
  btnColor,
}: Props) {
  return (
    <div
      className="card"
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "stretch",
        flexWrap: "wrap",
        overflowY: "auto",
        opacity: `${opacity}%`,
        marginTop: "2%",
        marginLeft: "10%",
        height: "auto",
        borderColor: "black",
        backgroundColor: "black",
        width: "80%",
      }}
    >
      <img
        src={img}
        className="card-img-top"
        alt="img"
        style={{ width: "25%" }}
      ></img>
      <div style={{ backgroundColor: "black" }} className="card-body">
        <h5 style={{ color: titleColor }} className="card-title">
          {title}
        </h5>
        <ul
          style={{ fontSize: `${textSize}px`, color: textColor }}
          className="card-text"
        >
          {text.map((benefit, index) => (
            <li
              key={index}
              style={{
                marginBottom: "15px" /* 🌟 Espacio entre cada beneficio */,
                lineHeight:
                  "3" /* 🌟 Separa las líneas si el texto llega a ocupar dos renglones */,
              }}
            >
              {benefit}
            </li>
          ))}
        </ul>
        <button
          disabled={btnState}
          style={{
            backgroundColor: btnColor,
            background: "linear-gradient(140deg, #5871ff, #070068)",
            color: "bisque",
            border: "linear-gradient(140deg, #ff5858, #070068)",
            borderRadius: "6%",
          }}
          onClick={action}
          className="btn btn-primary"
        >
          {btnText}
        </button>
        <button
          style={{
            display: isAdmin ? "flex" : "none",
            borderRadius: "100%",
            backgroundColor: "red",
            color: "lightblue",
          }}
        >
          🖋️
        </button>
        <p style={{marginBottom: "0px", right: "100px", fontSize: "12px",color: "lightblue"}}>{vence}</p>
      </div>
    </div>
  );
}

export default CardPlan;
