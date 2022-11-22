import React, { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { AiOutlinePlusCircle as AddSelectIcon } from 'react-icons/ai';

import {
  beadActionModalAtom,
  mouseoverBeadPositionAtom,
} from '../../recoilstore/atoms';

export default function BeadActionModal() {
  const [modalOpen, setModalOpen] = useRecoilState(beadActionModalAtom);
  const mouseoverBeadPosition = useRecoilValue(mouseoverBeadPositionAtom);
  const [modalPosition, setModalPosition] = useState({});

  useEffect(() => {
    if (
      mouseoverBeadPosition.y + mouseoverBeadPosition.height / 2 >
      window.innerHeight / 2
    ) {
      setModalPosition({
        x: mouseoverBeadPosition.x + mouseoverBeadPosition.width / 2,
        y: mouseoverBeadPosition.y + mouseoverBeadPosition.height,
        height: 35,
      });
    } else {
      setModalPosition({
        x: mouseoverBeadPosition.x + mouseoverBeadPosition.width / 2,
        y: mouseoverBeadPosition.y - 35,
        height: 35,
      });
    }
  }, [mouseoverBeadPosition]);

  const maintainModalOpen = e => {
    e.stopPropagation();
    setModalOpen(true);
  };

  const modalClose = e => {
    e.stopPropagation();
    setModalOpen(false);
  };

  const selectHandler = () => {};

  return (
    <Wrapper
      modalOpen={modalOpen}
      position={modalPosition}
      onMouseOver={maintainModalOpen}
      onMouseOut={modalClose}
    >
      <AddSelectIcon onClick={selectHandler} size={24} className="icon" />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: ${props => (props.modalOpen ? 'flex' : 'none')};
  flex-direction: row;
  justify-content: center;
  align-items: center;

  width: auto;
  height: ${props => `${props.position.height}px`};
  position: absolute;
  top: ${props => `${props.position.y}px`};
  left: ${props => `${props.position.x}px`};

  padding-left: 5px;
  padding-right: 5px;

  border: 1px solid black;
  border-radius: 5px;
  background-color: #dec000;
  opacity: 70%;
`;
