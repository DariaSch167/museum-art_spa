import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCards } from "../store/cardsSlice.js";
import usePrevious from "../hooks/usePrevious.js";
import Card from "./Card.jsx";
import "../style.scss";
import testData from "../test_data.json";

function CardsList() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.cards);

  useEffect(() => {
    dispatch(fetchCards(), []);
  });

  console.log(data);

  const initialData = testData.map(function (item) {
    return (item = { ...item, like: false });
  });
  const [cardData, setCardData] = useState(initialData);

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
      <ul className="cards__wrapper">
        {cardData.map((item) => {
          return (
            <Card
              key={item.id}
              like={item.like}
              cardImgSrc={item.url}
              cardTitle={item.title}
              handleLikeChange={() => handleLikeChange(item.id)}
            />
          );
        })}
      </ul>
    </React.Fragment>
  );
}
export default CardsList;
