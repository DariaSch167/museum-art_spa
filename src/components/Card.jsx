import React from "react";
import like from "../../src/images/like_icon.svg";
import "../style.scss";

function Card(props) {
  return (
    <React.Fragment>
      <li className="card">
        <img className="card__img" src={props.cardImgSrc} alt="art" />
        <div className="card__info">
          <h2 className="card__info-title">{props.cardTitle}</h2>
          <div
            className={
              props.like ? "card__info-like__active" : "card__info-like"
            }
            onClick={props.handleLikeChange}>
            <img className="like-img" src={like} alt="like" />
          </div>
        </div>
      </li>
    </React.Fragment>
  );
}
export default Card;
