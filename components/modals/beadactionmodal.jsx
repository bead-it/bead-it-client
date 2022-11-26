import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  AiOutlinePlusCircle as AddSelectIcon,
  AiOutlineMinusCircle as DeleteSelectIcon,
} from 'react-icons/ai';

import {
  beadActionModalAtom,
  mouseoverElementIdAtom,
  mouseoverElementPositionAtom,
  selectedBeadsAtom,
} from '../../recoilstore/atoms';

export default function BeadActionModal() {
  const [modalOpen, setModalOpen] = useRecoilState(beadActionModalAtom);
  const [selectedBeads, setSelectedBeads] = useRecoilState(selectedBeadsAtom);

  const mouseoverElementPosition = useRecoilValue(mouseoverElementPositionAtom);
  const mouseoverElementId = useRecoilValue(mouseoverElementIdAtom);

  const [modalPosition, setModalPosition] = useState({});

  useEffect(() => {
    if (
      mouseoverElementPosition.y + mouseoverElementPosition.height / 2 >
      window.innerHeight / 2
    ) {
      setModalPosition({
        x: mouseoverElementPosition.x + mouseoverElementPosition.width / 2,
        y: mouseoverElementPosition.y + mouseoverElementPosition.height,
        height: 35,
      });
    } else {
      setModalPosition({
        x: mouseoverElementPosition.x + mouseoverElementPosition.width / 2,
        y: mouseoverElementPosition.y - 35,
        height: 35,
      });
    }
  }, [mouseoverElementPosition]);

  const maintainModalOpen = e => {
    e.stopPropagation();
    setModalOpen(true);
  };

  const modalClose = e => {
    e.stopPropagation();
    setModalOpen(false);
  };

  const selectHandler = e => {
    e.stopPropagation();
    setSelectedBeads(prev => [...prev, mouseoverElementId]);
  };

  const deSelectHandler = e => {
    e.stopPropagation();
    setSelectedBeads(prev => {
      const tempPrev = [...prev];
      const index = tempPrev.indexOf(mouseoverElementId);
      tempPrev.splice(index, 1);
      return tempPrev;
    });
  };

  return (
    <Wrapper
      modalOpen={modalOpen}
      position={modalPosition}
      onMouseOver={maintainModalOpen}
      onMouseOut={modalClose}
    >
      {selectedBeads.includes(mouseoverElementId) ? (
        <ButtonWrapper onClick={deSelectHandler}>
          <DeleteSelectIcon size={24} className="icon" />
        </ButtonWrapper>
      ) : (
        <ButtonWrapper onClick={selectHandler}>
          <AddSelectIcon size={24} className="icon" />
        </ButtonWrapper>
      )}
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

  border: 1px solid black;
  border-radius: 5px;
  background-color: #dec000;
  opacity: 70%;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 100%;
  padding-left: 5px;
  padding-right: 5px;

  &:hover {
    cursor: pointer;
    transform: scale(1.1);
    transition: transform 0.3s ease-in-out;
  }
`;
