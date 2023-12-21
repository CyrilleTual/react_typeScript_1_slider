import React, { useEffect, useState } from "react";
import sliderData from "../../data/sliderData";
import Card from "../Card/Index";
import { ReactComponent as Left } from "../../assets/left-arrow.svg";
import { ReactComponent as Right } from "../../assets/right-arrow.svg";
import style from "./slider.module.css";

function Slider() {
  // index of selected picture
  const [index, setIndex] = useState(0);

  // pour le défilement automatique

  useEffect(() => {
    // appel d'une fonction à intervalle régulier
    const intervalId: NodeJS.Timer = setInterval(
      handleClick,
      5500,
      index,
      "next"
    );
    return () => {
      clearInterval(intervalId);
    };
  }, [index]);

  function handleClick(index: number, action: "previous" | "next"): void {
    if (action === "previous") {
      index > 0 ? setIndex(index - 1) : setIndex(sliderData.length - 1);
    } else {
      index < sliderData.length - 1 ? setIndex(index + 1) : setIndex(0);
    }
  }

  return (
    <div className={style.wrapper}>
      <p className={style.index_info}>{`${index + 1} / ${
        sliderData.length
      }`}</p>

      <div className={style.slider}>
        <div className={style.card}>
          <p className={style.image_info}>{sliderData[index].description}</p>
          <Card index={index} />
          <button
            className={`${style.btn} ${style.leftBtn}`}
            onClick={() => handleClick(index, "previous")}
          >
            <Left width="100%" height="100%" />
          </button>
          <button
            className={`${style.btn} ${style.rightBtn}`}
            onClick={() => handleClick(index, "next")}
          >
            <Right width="100%" height="100%" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Slider;
