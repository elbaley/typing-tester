import { useSelector } from "react-redux";
import styled from "styled-components";

const Result = () => {
  const result = useSelector((state) => state.typing.result);

  return (
    <Wrapper>
      <div className='result'>
        <h3 className='title'>Result</h3>
        <div className='wpm'>{result.wpm}WPM</div>
        <ul>
          <li>
            Accuracy: <span>{result.accuracy}%</span>
          </li>
          <li>
            Correct words: <span className='correct'>{result.correct}</span>
          </li>
          <li>
            Incorrect words:{" "}
            <span className='incorrect'>{result.incorrect}</span>
          </li>
        </ul>
      </div>
    </Wrapper>
  );
};

export default Result;

const Wrapper = styled.section`
  margin-top: 1rem;
  font-family: Inter, Avenir, Helvetica, Arial, sans-serif;
  .title {
    margin: 0;
    font-size: 1.25rem;
    background: #f3f3f3;
    padding: 0.1rem 0.25rem;
  }
  .wpm {
    text-align: center;
    font-weight: bold;
    font-size: 2rem;
    padding: 2rem 0;
  }
  .result {
    background: #fff;

    /* border-radius: 1rem; */
    margin: 0 auto;
    width: 300px;
    font-size: 1.25rem;
    border: 1px solid #ccc;
  }
  .result ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  .result ul li {
    padding: 0.4rem 0.25rem;
  }
  .result ul li span {
    float: right;
    font-weight: bold;
  }
  .result ul li:nth-child(odd) {
    background: #f3f3f3;
  }
  .correct {
    color: green;
  }
  .incorrect {
    color: red;
  }
`;
