import React from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { inputModalAtom } from '../../recoilstore/atoms';

export default function InputModal({ children }) {
  const [inputModal, setInputModal] = useRecoilState(inputModalAtom);

  const modalHandler = e => {
    e.stopPropagation();
    setInputModal(prev => !prev);
  };

  return (
    <>
      <Outer onClick={modalHandler} modalOpen={inputModal} />
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
`;
