import React, { useEffect, useRef, useState } from "react";
import Countdown from "react-countdown";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  checkWord,
  fetchWords,
  finishGame,
  resetGame,
} from "../features/typing/typingSlice";

const TextInput = () => {
  const [word, setWord] = useState("");
  const [date, setDate] = useState(Date.now());
  //Selectors
  const currentWordId = useSelector((state) => state.typing.currentWordId);
  const wordListLength = useSelector((state) => state.typing.words.length);
  const correctCount = useSelector((state) => state.typing.correctCount);
  const incorrectCount = useSelector((state) => state.typing.incorrectCount);

  const dispatch = useDispatch();
  //state
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTimer, setShowTimer] = useState(true);

  //Custom renderer for timer
  const renderer = ({ minutes, seconds }) => {
    // Render a countdown
    return (
      <span className={showTimer ? "" : "hide-timer"}>
        {minutes > 9 ? minutes : `0${minutes}`}:
        {seconds > 9 ? seconds : `0${seconds}`}
      </span>
    );
  };
  const countdownRef = useRef();
  const textInputRef = useRef();

  function handleInputChange(e) {
    const keyCode = e.keyCode;
    //don't allow space at the start
    if (word.length === 0 && keyCode === 32) {
      e.preventDefault();
    }
    // if there is text and pressed space check the word
    if (word.length > 0 && keyCode === 32) {
      //prevent adding empty space to input
      e.preventDefault();
      //check the word
      dispatch(checkWord({ id: currentWordId, text: e.target.value }));
      setWord("");

      if (wordListLength - 1 === currentWordId) {
        dispatch(fetchWords());
      }
    }
  }
  return (
    <Wrapper>
      <input
        value={word}
        ref={textInputRef}
        className='text-input'
        onKeyDown={handleInputChange}
        onChange={(e) => {
          if (!isPlaying) {
            countdownRef.current.api.start();
            setIsPlaying(true);
          }
          setWord(e.target.value);
        }}
        type='text'
      />
      <button
        onClick={() => {
          setShowTimer(!showTimer);
        }}
      >
        <Countdown
          className='hide-timer'
          onComplete={() => {
            dispatch(finishGame());
          }}
          ref={countdownRef}
          renderer={renderer}
          autoStart={false}
          date={date + 60000}
        />
      </button>
      <button
        onClick={() => {
          // reset state
          dispatch(resetGame());
          // get new words
          dispatch(fetchWords());
          // reset local component and stop timer
          setIsPlaying(false);
          setWord("");
          countdownRef.current.api.stop();
          // focus input
          textInputRef.current.focus();
        }}
      >
        Reset
      </button>
    </Wrapper>
  );
};

export default TextInput;

const Wrapper = styled.section`
  background: #d3d3d3;
  margin-top: 1rem;
  padding: 0.4rem 0;
  display: flex;
  justify-content: center;
  .text-input {
    width: 30%;
    font-size: 1.5rem;
  }
  .hide-timer {
    opacity: 0;
  }
  button {
    margin: 0 0.25rem;
  }
`;
