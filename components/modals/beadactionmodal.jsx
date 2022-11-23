import React, { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import {
  AiOutlinePlusCircle as AddSelectIcon,
  AiOutlineMinusCircle as DeleteSelectIcon,
} from 'react-icons/ai';

import {
  beadActionModalAtom,
  mouseoverBeadIdAtom,
  mouseoverBeadPositionAtom,
  selectedBeadsAtom,
} from '../../recoilstore/atoms';

export default function BeadActionModal() {
  const [modalOpen, setModalOpen] = useRecoilState(beadActionModalAtom);
  const mouseoverBeadPosition = useRecoilValue(mouseoverBeadPositionAtom);
  const mouseoverBeadId = useRecoilValue(mouseoverBeadIdAtom);
  const [selectedBeads, setSelectedBeads] = useRecoilState(selectedBeadsAtom);
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

  const selectHandler = e => {
    e.stopPropagation();
    setSelectedBeads(prev => [...prev, mouseoverBeadId]);
  };

  const deSelectHandler = e => {
    e.stopPropagation();
    setSelectedBeads(prev => {
      const tempPrev = [...prev];
      const index = tempPrev.indexOf(mouseoverBeadId);
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
      {selectedBeads.includes(mouseoverBeadId) ? (
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
`;
