import { useSelector } from "react-redux";
import styled from "styled-components";
import Header from "./components/Header";
import Result from "./components/Result";
import TextData from "./components/TextData";
import TextInput from "./components/TextInput";

function App() {
  const gameFinished = useSelector((state) => state.typing.gameFinished);
  return (
    <Wrapper>
      <Header />
      <TextData />
      <TextInput />
      {gameFinished && <Result />}
    </Wrapper>
  );
}

export default App;

const Wrapper = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;
