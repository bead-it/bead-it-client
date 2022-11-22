import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

export default function Input({ name, input, setInput }) {
  return (
    <Wrapper>
      <NameBox>{name}</NameBox>
      <InputBox value={input} onChange={e => setInput(e.target.value)} />
    </Wrapper>
  );
}

Input.propTypes = {
  name: PropTypes.string.isRequired,
  input: PropTypes.string.isRequired,
  setInput: PropTypes.func.isRequired,
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  width: 95%;
`;

const NameBox = styled.div`
  font-size: 1.2rem;
  color: #0e2269;
  text-align: center;
`;

const InputBox = styled.input`
  width: 90%;
`;
