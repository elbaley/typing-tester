import { useSelector } from "react-redux";
import styled from "styled-components";
import { selectTyping } from "../features/typing/typingSlice";

const TextData = () => {
  const typing = useSelector(selectTyping);
  return (
    <Wrapper>
      {typing.words.map((word) => {
        return (
          <span
            className={`${word.active ? "active" : word.status}`}
            key={word.id}
          >
            {word.text}
          </span>
        );
      })}
    </Wrapper>
  );
};

export default TextData;
const Wrapper = styled.div`
  background-color: #fff;
  border-radius: 1rem;
  font-size: 1.75rem;
  border: 1px solid #ccc;
  padding: 1rem;
  display: flex;
  flex-wrap: wrap;
  span {
    margin: 0 0.25rem;
    padding: 0.25rem 0.5rem;
  }
  .active {
    background: #ccc;
    color: black;
  }
  .correct {
    color: green;
  }
  .incorrect {
    color: red;
  }
`;
