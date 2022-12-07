import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

export default function Message({ text }) {
  return (
    <Wrapper>
      <div className="outer">!!</div>
      <div className="inner">{text}</div>
      <div className="outer">!!</div>
    </Wrapper>
  );
}

Message.propTypes = {
  text: PropTypes.string.isRequired,
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  width: 90%;

  font-size: 1.5rem;
  font-weight: 500;

  .outer {
    color: #ff5143;
  }

  .inner {
    text-align: center;
    color: #0e2269;
  }
`;
