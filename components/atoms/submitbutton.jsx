import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

export default function SubmitButton({ clickHandler }) {
  return <Wrapper onClick={clickHandler}>Submit</Wrapper>;
}

const Wrapper = styled.div`
  text-align: center;

  font-size: 1.2rem;
  border: 1px solid black;
  border-radius: 3px;
  color: blue;
  background-color: green;

  padding-left: 10px;
  padding-right: 10px;
`;

SubmitButton.propTypes = {
  clickHandler: PropTypes.func.isRequired,
};
