import React from "react";
import styled from "styled-components";

const Header = () => {
  return (
    <Wrapper>
      <div className='logo'>
        <img src='keyboard.svg' alt='' />
        <h2 className='logo-text'>Typing Tester</h2>
      </div>
    </Wrapper>
  );
};

export default Header;
const Wrapper = styled.header`
  text-align: center;
  margin: 2rem 0;
  .logo {
    width: 100%;
  }
  .logo img {
    height: 120px;
  }
  .logo-text {
    margin-top: -0.75rem;
    text-transform: uppercase;
    font-size: 2rem;
  }
`;
