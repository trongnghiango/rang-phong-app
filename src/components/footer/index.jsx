import React, { useEffect, useRef } from 'react';
//import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";
import { actionTypes } from '../../reducer';
import { useStateValue } from '../../StateProvider';
//
import playIcon from '../../../assets/static/play.svg'
import pauseIcon from '../../../assets/static/pause.svg'
import resetIcon from '../../../assets/static/reset.svg'
import { defaultTimer } from '../../contants';

const Footer = () => {
  //global state
  const [state, dispatch] = useStateValue();
  const { step, steps, isPlaying, datas } = state;

  const refTimerId = useRef(); //when using: .current

  // dispatch action incre step
  const setStepInc = (val) => {
    dispatch({
      type: actionTypes.INC_STEP,
      step: val
    })
  }

  //
  const resetStep = () => {
    handlePause();
    dispatch({ type: actionTypes.RESET_STEP })
  }

  //Play
  const start = (timer = 500) => {
    refTimerId.current = setInterval(() => {
      if (datas.length - 1 > step) {
        setStepInc(1)
      } 
    }, timer)
  }

  const handleToggleButton = () => {
    if (refTimerId.current) { //clear Interval
      clearInterval(refTimerId.current)
    }

    if (!isPlaying) {
      start(defaultTimer)
    }

    // if (getSize(steps) > step) {
      dispatch({ type: actionTypes.TOGGLE_PLAY })
    // }
  }

  const handlePause = () => {
    clearInterval(refTimerId.current)
  }

  const handleResetButton = () => {
    resetStep()
  }

  const handleLoaderFinished = () => {
    handleStop();
  }

  //effect
  useEffect(() => {
    console.log({ step }, refTimerId.current)
    if (datas.length - 1 <= step && isPlaying) {
      handleToggleButton();
    }
  }, [step]);

  useEffect(() => {
    return () => {
      resetStep();
      console.log('unmount!!!')
    }
  }, [])

  return (
    <footer className="h-[60px] bg-[#333] flex justify-center border-none border-black rounded-md mb-2 mx-2 text-black">
      <div className='h-full px-2 flex justify-center items-center'>
        <button onClick={handleToggleButton} className="w-[45px] h-[45px] flex justify-center items-center py-1 bg-slate-300 rounded-full mr-2">
          {
            isPlaying ?
              <img src={pauseIcon} height={'25px'} width={'25px'} />
              :
              <img src={playIcon} height={'25px'} width={'25px'} />
          }
        </button>

        <button onClick={handleResetButton} className="p-[6px] w-[30px] h-[30px] bg-slate-300 rounded-full mr-2">
          <img src={resetIcon} height={'25px'} width={'25px'} />
        </button>
      </div>

      {/* <HorizontalScroll> */}
      <ProgressBar
        percent={step * 100 / (datas.length - 1)}
      >
        {datas.length && [...Array(datas.length)].map((val, index) =>
          <Step key={index}>
            {({ accomplished, index }) => (
              <button
                onClick={() => dispatch({ type: actionTypes.SET_STEP, step: index })}
                className={`indexedStep ${accomplished ? "accomplished" : null}`}
              >
                {index}
              </button>
            )}
          </Step>)}

      </ProgressBar>
      {/* </HorizontalScroll> */}

    </footer>
  );
}
export default Footer;