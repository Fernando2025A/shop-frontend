import { Link } from 'react-router-dom';

type Props = {
  title: string;
  link: string;
  text: string;
  btnText: string;
  titleColor: string;
  img: string;
  btnColor: string;
  textSize: number;

}

function Card({ textSize, title, link, text, btnText, titleColor, img, btnColor }: Props) {
  return (
    <div className="card" style={{ overflowY: 'auto', maxWidth: "20vw", justifyContent: "center"}}>
      <img style={{ height: "20vw", width: "20vw"}} src={img} className="card-img-top" alt="img"></img>
      <div style={{ backgroundColor: 'black'}} className="card-body">
        <h5 style={{ color: titleColor }} className="card-title">{title}</h5>
        <p style={{ fontSize: `${textSize}px` }} className="card-text">{text}</p>
        <Link style={{ backgroundColor: btnColor, color: 'bisque', borderColor: 'black'}} to={`${link}`} className="btn btn-primary">{btnText}</Link>
      </div>
</div>
  )
}

export default Card