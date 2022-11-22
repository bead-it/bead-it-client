import React, { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import {
  detailModalAtom,
  detailModalContentsAtom,
  mouseoverBeadPositionAtom,
} from '../../recoilstore/atoms';

export default function DetailModal() {
  const modalOpen = useRecoilValue(detailModalAtom);
  const detailModalContents = useRecoilValue(detailModalContentsAtom);
  const mouseoverBeadPosition = useRecoilValue(mouseoverBeadPositionAtom);
  const [modalPosition, setModalPosition] = useState({});

  useEffect(() => {
    if (
      mouseoverBeadPosition.y + mouseoverBeadPosition.height / 2 <=
      window.innerHeight / 2
    ) {
      setModalPosition({
        x:
          mouseoverBeadPosition.x +
          mouseoverBeadPosition.width / 2 -
          window.innerWidth * 0.1,
        y: mouseoverBeadPosition.y + mouseoverBeadPosition.height / 2 + 50,
      });
    } else {
      setModalPosition({
        x:
          mouseoverBeadPosition.x +
          mouseoverBeadPosition.width / 2 -
          window.innerWidth * 0.1,
        y:
          mouseoverBeadPosition.y +
          mouseoverBeadPosition.height / 2 -
          window.innerHeight * 0.3 -
          50,
      });
    }
  }, [mouseoverBeadPosition]);

  return (
    <Wrapper modalOpen={modalOpen} position={modalPosition}>
      <Title>{detailModalContents.title}</Title>
      <Url>{detailModalContents.url}</Url>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: ${props => (props.modalOpen ? 'flex' : 'none')};
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 20vw;
  height: 30vh;
  position: absolute;
  top: ${props => `${props.position.y}px`};
  left: ${props => `${props.position.x}px`};

  border: 1px solid black;
  border-radius: 5px;

  background-color: yellow;
  opacity: 70%;
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 90%;
  height: 50%;

  font-weight: 500;
  word-break: break-all;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Url = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 90%;
  height: 50%;

  word-break: break-all;
  overflow: hidden;
  text-overflow: ellipsis;
`;
