import { useNavigate } from "react-router-dom";
import "./Card.css";
type Props = {
  title: string;
  link: string;
  text: string;
  btnText: string;
  img: string;
};

function Card({ title, link, text, btnText, img }: Props) {
  const navigate = useNavigate();
  const goTo = () => {
    navigate(link);
  };
  return (
    <div className="card-container">
      <img className="image" src={img} alt="img"></img>
      <div className="card-body">
        <h5>{title}</h5>
        <p className="card-text">{text}</p>
        <button onClick={goTo} className="btn-link">
          {btnText}
        </button>
      </div>
    </div>
  );
}

export default Card;
