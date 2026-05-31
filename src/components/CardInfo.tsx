
type Props = {
  img: string;
  display: string;
  top: string;
  left: string;
  text: string;
  textColor: string;
  priceText: string;
}

const CardInfo = ({ left, top, img, display, text, textColor, priceText }: Props) => {
  return (
    <div>
      <div className="card" style={{ backgroundColor: 'rgb(0, 0, 0)', marginTop: `${top}%`, zIndex: '2', marginLeft: `${left}%`, display: display, width: '18rem'}}>
        <img src={img} className="card-img-top" alt="..."></img>
        <div className="card-body">
        <p style={{ color: textColor }} className="card-text">{text}</p>
        <p style={{ color: textColor, fontSize: '14px' }} className="card-text">Info de compra</p>
        <p style={{ color: textColor, fontSize: '14px' }} className="card-text">{priceText}</p>
        <p style={{ color: textColor, fontSize: '14px' }} className="card-text">Cancela cuando quieras</p>
        
        </div>
      </div>
    </div>
  )
}

export default CardInfo