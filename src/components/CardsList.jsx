import React from "react";
import Card from "./Card.jsx";
import "./style.scss";
import testData from "../test_data.json";

function CardsList() {
  return (
    <React.Fragment>
      <ul className="cards__wrapper">
        {testData.map((item, index) => {
          return (
            <Card
              key={item.id}
              index={index}
              cardImgSrc={item.url}
              cardTitle={item.title}
            />
          );
        })}
      </ul>
    </React.Fragment>
  );
}
export default CardsList;
