import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useRecoilValue } from 'recoil';

import { inputModalAtom } from '../../recoilstore/atoms';

export default function InputModal({ children }) {
  const inputModal = useRecoilValue(inputModalAtom);

  return (
    <>
      <Outer onClick={e => e.stopPropagation()} modalOpen={inputModal} />
      <Inner onClick={e => e.stopPropagation()} modalOpen={inputModal}>
        {children}
      </Inner>
    </>
  );
}

InputModal.propTypes = {
  children: PropTypes.node.isRequired,
};

const Outer = styled.div`
  display: ${props => (props.modalOpen ? 'block' : 'none')};

  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;

  background-color: gray;
  opacity: 70%;

  z-index: 10;
`;

const Inner = styled.div`
  display: ${props => (props.modalOpen ? `flex` : 'none')};
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  position: absolute;
  top: 35vh;
  left: 30vw;
  width: 40vw;
  height: 30vh;

  background-color: white;
  border: 1px solid black;
  border-radius: 5px;

  z-index: 20;
`;
