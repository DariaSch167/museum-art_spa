import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCards } from "../store/cardsSlice.js";
import usePrevious from "../hooks/usePrevious.js";
import Card from "./Card.jsx";
import "../style.scss";

function CardsList() {
  const dispatch = useDispatch();
  const cards = useSelector((state) => state.cards.items);
  const cardStatus = useSelector((state) => state.cards.status);
  const error = useSelector((state) => state.cards.error);

  const [cardData, setCardData] = useState([]);

  useEffect(() => {
    if (cardStatus === "idle") {
      dispatch(fetchCards());
    }
    const initialData = cards.map(function (item) {
      return (item = { ...item, like: false });
    });
    setCardData(initialData);
  }, [cardStatus, cards, dispatch]);

  const handleLikeChange = (id) => {
    const card = cardData.find(function (item) {
      return item.id === id;
    });
    const updCardData = cardData.map((item) => {
      item = item.id === id ? { ...item, like: !card.like } : item;
      return item;
    });
    setCardData(updCardData);
  };

  const [filterBtnDis, setFilterBtnDis] = useState({
    all: true,
    fav: false,
  });
  const prevCardsData = usePrevious(cardData);

  const handleShowAll = () => {
    setFilterBtnDis({ all: true, fav: false });
    setCardData(prevCardsData);
  };

  const handleShowFav = () => {
    setFilterBtnDis({ all: false, fav: true });
    const cardsLiked = cardData.filter(function (item) {
      return item.like === true;
    });
    setCardData(cardsLiked);
  };

  let cardsContent;

  if (cardStatus === "loading") {
    cardsContent = <div>Loading...</div>;
  } else if (cardStatus === "succeeded") {
    cardsContent = (
      <ul className="cards__wrapper">
        {cardData.map((item) => {
          return (
            <Card
              key={item.id}
              like={item.like}
              cardImgSrc={item.imgURL}
              cardTitle={item.title}
              handleLikeChange={() => handleLikeChange(item.id)}
            />
          );
        })}
      </ul>
    );
  } else if (cardStatus === "failed") {
    cardsContent = <div>{error}</div>;
  }

  return (
    <React.Fragment>
      <div className="cards__filter">
        <button
          className="cards__filter-btn"
          onClick={handleShowAll}
          disabled={filterBtnDis.all}>
          Show All
        </button>
        <button
          className="cards__filter-btn"
          onClick={handleShowFav}
          disabled={filterBtnDis.fav}>
          Show Fav
        </button>
      </div>
      {cardsContent}
    </React.Fragment>
  );
}
export default CardsList;
