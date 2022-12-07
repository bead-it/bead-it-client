import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';

import {
  detailModalAtom,
  mouseoverElementPositionAtom,
} from '../../recoilstore/atoms';
import { detailModalContentsSel } from '../../recoilstore/seletors';

export default function DetailModal() {
  const modalOpen = useRecoilValue(detailModalAtom);
  const detailModalContents = useRecoilValue(detailModalContentsSel);
  const mouseoverElementPosition = useRecoilValue(mouseoverElementPositionAtom);

  const [modalPosition, setModalPosition] = useState({});

  useEffect(() => {
    if (
      mouseoverElementPosition.y + mouseoverElementPosition.height / 2 <=
      window.innerHeight / 2
    ) {
      setModalPosition({
        x:
          mouseoverElementPosition.x +
          mouseoverElementPosition.width / 2 -
          window.innerWidth * 0.1,
        y:
          mouseoverElementPosition.y + mouseoverElementPosition.height / 2 + 50,
      });
    } else {
      setModalPosition({
        x:
          mouseoverElementPosition.x +
          mouseoverElementPosition.width / 2 -
          window.innerWidth * 0.1,
        y:
          mouseoverElementPosition.y +
          mouseoverElementPosition.height / 2 -
          window.innerHeight * 0.3 -
          50,
      });
    }
  }, [mouseoverElementPosition]);

  return (
    <Wrapper modalOpen={modalOpen} position={modalPosition}>
      {detailModalContents.title && <Title>{detailModalContents.title}</Title>}
      {detailModalContents.domain && (
        <Domain>{detailModalContents.domain}</Domain>
      )}
      {detailModalContents.url && <Url>{detailModalContents.url}</Url>}
      {detailModalContents.content && (
        <Content>{detailModalContents.content}</Content>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: ${props => (props.modalOpen ? 'flex' : 'none')};
  flex-direction: column;
  justify-content: space-around;
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

  font-weight: 500;
  word-break: break-all;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Domain = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 90%;

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

  word-break: break-all;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 90%;

  word-break: break-all;
  overflow: hidden;
  text-overflow: ellipsis;
`;
