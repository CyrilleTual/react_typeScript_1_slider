import React from "react";
import sliderData from "../../data/sliderData";

type CardProps = {
  index: number;
};

function Card({ index }: CardProps) {
  return (
    <img
      src={`/img/img-${sliderData[index].id}.jpg`}
      alt={sliderData[index].description}
    />
  );
}

export default Card;
