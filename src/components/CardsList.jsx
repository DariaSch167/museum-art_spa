import React, { useState } from "react";
import Card from "./Card.jsx";
import "../style.scss";
import testData from "../test_data.json";

function CardsList() {
  const newTestData = testData.map(function (item) {
    return (item = { ...item, like: false });
  });
  const [cardData, setCardData] = useState(newTestData);

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

  return (
    <React.Fragment>
      <div className="cards__filter">
        <button className="cards__filter-btn">Show All</button>
        <button className="cards__filter-btn">Show Fav</button>
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
