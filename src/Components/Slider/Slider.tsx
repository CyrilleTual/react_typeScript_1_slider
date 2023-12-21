import React, { useEffect, useState } from 'react'
import sliderData from '../../data/sliderData'
import Card from '../Card/Index'
import { ReactComponent as Left } from "../../assets/left-arrow.svg";
import { ReactComponent as Right } from "../../assets/right-arrow.svg";
import style from './slider.module.css'

function Slider() {

  // index de ma photo semectionnée
  const [index , setIndex ] = useState (0)

  // pour le défilement automatique 

  useEffect (()=>{
    // appel d'une fonction à intervalle régulier
    const intervalId: NodeJS.Timer = setInterval (handleClick, 5500, index, "next")
    return ()=>{
      clearInterval(intervalId)
    }
  },[index])


  function handleClick ( index: number, action: string) : void {
    if (action === "previous"){
      index > 0 ? setIndex(index - 1) : setIndex(sliderData.length - 1); 
    } else {
      index < sliderData.length - 1 ? setIndex(index + 1) : setIndex(0); 
    }
  }

  return (
    <div className={style.wrapper}>
      <Card index={index} />
      <p>{sliderData[index].description}</p>
      <button
        className={style.leftBtn}
        onClick={() => handleClick(index, "previous")}
      >
        {" "}
        <Left width="24px" height="24px" />
      </button>
      <button
        className={style.leftBtn}
        onClick={() => handleClick(index, "next")}
      >
        <Right width="24px" height="24px" />
      </button>
    </div>
  );
}

 export default Slider