import { useEffect, useState } from "react";
import sliderData from "../../data/sliderData";
import Card from "../Card/Index";
import { ReactComponent as Left } from "../../assets/left-arrow.svg";
import { ReactComponent as Right } from "../../assets/right-arrow.svg";
import { ReactComponent as Pause } from "../../assets/pause.svg";
import { ReactComponent as Play } from "../../assets/play.svg";
import style from "./slider.module.css";

// Define type for states

type StandByType = boolean;

function Slider() {
  // index of selected picture
  const [index, setIndex] = useState<number>(0);

  // bouton pause
  const [standBy, setStandBy] = useState<StandByType>(false);

  function handleClick(action: 1 | -1): void {
    // pour avoir tout de suite valeur a jour de l'index on passe une fonction callback
    setIndex((state): number => {
      if (state + action < 0) {
        return sliderData.length - 1;
      } else if (state + action >= sliderData.length) {
        return 0;
      } else {
        return state + action;
      }
    });
  }

  //pour le défilement automatique
  useEffect(() => {
    if (!standBy) {
      // appel d'une fonction à intervalle régulier
      const intervalId = setInterval(() => handleClick(1), 3500);
      return () => clearInterval(intervalId); // évite les fuites de mémoire
    }
  }, [standBy]);

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
            onClick={() => handleClick(-1)}
          >
            <Left width="100%" height="100%" />
          </button>
          <button
            className={`${style.btn} ${style.rightBtn}`}
            onClick={() => handleClick(1)}
          >
            <Right width="100%" height="100%" />
          </button>
          <button
            className={`${style.btn} ${style.standBy} ${
              standBy && style.paused
            }`}
            onClick={() =>
              setStandBy(() => {
                return !standBy;
              })
            }
          >
            {standBy ? (
              <Play width="100%" height="100%" />
            ) : (
              <Pause width="100%" height="100%" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Slider;
