import { createSlice } from "@reduxjs/toolkit";
import wordlist from "../../wordlist.json";

function getRandomWords(arr) {
  const shuffledArr = arr.sort(() => Math.random() - 0.5).slice(0, 25);
  return shuffledArr.map((item, i) => {
    if (i === 0) {
      return {
        id: i,
        text: item,
        active: true,
        status: "",
      };
    }
    return {
      id: i,
      text: item,
      active: false,
      status: "",
    };
  });
}

const initialState = {
  words: getRandomWords(wordlist),
  currentWordId: 0,
  correctCount: 0,
  incorrectCount: 0,
  gameFinished: false,
  result: null,
};

const typingSlice = createSlice({
  name: "typingSlice",
  initialState,
  reducers: {
    checkWord: (state, action) => {
      //if game is finished don't check the word
      if (state.gameFinished) {
        return;
      }
      const attempt = action.payload.text;
      const attemptId = action.payload.id;
      const currentWord = state.words.find((word) => word.id === attemptId);
      const nextWord = state.words.find((word) => word.id === attemptId + 1);
      // set next word
      if (nextWord) {
        nextWord.active = true;
      }
      currentWord.active = false;
      state.currentWordId++;

      if (currentWord.text === attempt) {
        state.correctCount++;
        currentWord.status = "correct";
      } else {
        state.incorrectCount++;
        currentWord.status = "incorrect";
      }
    },
    fetchWords: (state, action) => {
      const newList = getRandomWords(wordlist);
      state.words = newList;
      state.currentWordId = 0;
    },
    finishGame: (state, action) => {
      state.gameFinished = true;
      const totalCount = state.correctCount + state.incorrectCount;

      state.result = {
        wpm: state.correctCount,
        accuracy: Math.round((state.correctCount / totalCount) * 100),
        correct: state.correctCount,
        incorrect: state.incorrectCount,
      };
    },
    resetGame: () => {
      return initialState;
    },
  },
});

// Action creators are generated for each case reducer function
export const { checkWord, fetchWords, finishGame, resetGame } =
  typingSlice.actions;

export const selectTyping = (state) => state.typing;

export default typingSlice.reducer;
