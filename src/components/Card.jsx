import React, { useState, useRef } from "react";
import ControlButtons from "./ControlButtons";

const Card = () => {
  const inputRef = useRef(1234);
  const inputRef2 = useRef(10);
  const [isActive, setIsActive] = useState(false);
  const [isDecrement, setDecrement] = useState(false);
  const [isInput, setInput] = useState(false);
  const [isInit, setInit] = useState(false);
  const [isAlert, setAlert] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const [time, setTime] = useState(0);
  React.useEffect(() => {
    let interval = null;
    if (isDecrement && isPaused === false) {
      interval = setInterval(() => {
        setTime((time) => {
          return limitTime(time, interval, 1);
        });
      }, 1000);
    } else if (isActive && isPaused === false) {
      interval = setInterval(() => {
        setTime((time) => {
          return limitTime(time, interval, 0);
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [
    isActive,
    isPaused,
    isDecrement,
    setDecrement,
    isInit,
    setInit,
    isInput,
    setInput,
  ]);

  const handleStart = () => {
    setIsActive(true);
    setIsPaused(false);
    setInput(false);
  };

  const limitTime = (time, interval, type) => {
    let timeLimit = parseInt(inputRef2.current.value);
    if (time < 0) {
      clearInterval(interval);
      time = 0;
      return time;
    }
    if (time === timeLimit) {
        setAlert(true);
      //alert("Time limit");
      clearInterval(interval);
      return 0;
    } else if (time >= 0 && time !== timeLimit && type === 0) {
      return (time += 1);
    }
    return (time -= 1);
  };

  const handlePauseResume = () => {
    setIsPaused(!isPaused);
    setAlert(false);
  };

  const handleReset = () => {
    setIsActive(false);
    setDecrement(false);
    setTime(0);
    setAlert(false)

  };
  const handleDecrement = () => {
    let decrement = inputRef.current.value;
    if (!decrement){
        decrement = time;
    }
    setDecrement(true);
    setTime(parseInt(decrement));
     setAlert(false)
  };
  const handleInit = () => {
    setInput(true);
  };

  let secont = time;
  let unit = time;
  let ten = 0;
  let hundred = 0;
  let thousand = 0;
  let tenThousand = 0;
  let hunThousand = 0;
  if (secont > 9) {
    ten = Math.trunc(secont / 10);
    unit = secont % 10;
    if (ten > 9) {
      hundred = Math.trunc(ten / 10);
      ten = ten % 10;
      if (hundred > 9) {
        thousand = Math.trunc(hundred / 10);
        hundred = hundred % 10;
        if (thousand > 9) {
          tenThousand = Math.trunc(thousand / 10);
          thousand = thousand % 10;
          if (tenThousand > 9) {
            hunThousand = Math.trunc(tenThousand / 10);
            tenThousand = tenThousand % 10;
          }
        }
      }
    }
  }

  return (
    <>
      <div className="app d-flex justify-content-center stop" id="stop">
        <div className="icon box">
          <i className="far fa-clock"></i>
        </div>
        <div className="counter box">{hunThousand}</div>
        <div className="counter box">{tenThousand}</div>
        <div className="counter box">{thousand}</div>
        <div className="counter box">{hundred}</div>
        <div className="counter box">{ten}</div>
        <div className="counter box">{unit}</div>
      </div>
      <ControlButtons
        active={isActive}
        isPaused={isPaused}
        handleStart={handleStart}
        handlePauseResume={handlePauseResume}
        handleReset={handleReset}
        handleDecrement={handleDecrement}
        handleInit={handleInit}
        inputRef={inputRef}
        inputRef2={inputRef2}
        isAlert={isAlert}
      />
    </>
  );
};

export default Card;