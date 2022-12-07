import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

export default function CancleButton({ clickHandler }) {
  return <Wrapper onClick={clickHandler}>Cancle</Wrapper>;
}

const Wrapper = styled.div`
  text-align: center;

  font-size: 1.2rem;
  border: 1px solid black;
  border-radius: 3px;
  color: red;
  background-color: orange;

  padding-left: 10px;
  padding-right: 10px;

  &:hover {
    cursor: pointer;
    transform: scale(1.1);
    transition: transform 0.3s ease-in-out;
  }
`;

CancleButton.propTypes = {
  clickHandler: PropTypes.func.isRequired,
};
