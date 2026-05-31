
type Props = {
  left: number;
  top: number;
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
}

function CardPlan({ left, btnState, top, textSize, opacity, title, action, isAdmin, text, btnText, textColor, titleColor, img, btnColor }: Props) {
  return (
    <div className="card" style={{ overflowY: 'auto', opacity: `${opacity}%`, left: `${left}%`, 
    top: `${top}%`, borderColor: 'black', width: "20%" }}>
      <img src={img} className="card-img-top" alt="img"></img>
      <div style={{ backgroundColor: 'black' }} className="card-body">
        <h5 style={{ color: titleColor }} className="card-title">{title}</h5>
        <ul style={{ fontSize: `${textSize}px`, color: textColor }} className="card-text">{text.map((benefit, index) => (
          <li key={index}>{benefit}</li>
        ))}</ul>
        <button disabled={btnState} style={{ backgroundColor: btnColor, color: 'bisque', borderColor: 'black', borderRadius: '6%' }} onClick={action} className="btn btn-primary">{btnText}</button>
        <button style={{ display: isAdmin ? 'flex' : 'none', borderRadius: '100%', backgroundColor: 'red', color: 'lightblue'}}>🖋️</button>
      </div>
</div>
  )
}

export default CardPlan