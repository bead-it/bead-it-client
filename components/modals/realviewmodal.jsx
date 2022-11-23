import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import {
  AiOutlineExpandAlt as ExpandIcon,
  AiOutlineShrink as ShrinkIcon,
} from 'react-icons/ai';

import { currentBeadIdAtom, realViewModalAtom } from '../../recoilstore/atoms';
import { beadsMapSel } from '../../recoilstore/seletors';

export default function RealViewModal() {
  const iframeRef1 = useRef();

  const modalOpen = useRecoilValue(realViewModalAtom);
  const beadId = useRecoilValue(currentBeadIdAtom);
  const beadsMap = useRecoilValue(beadsMapSel);
  const [src, setSrc] = useState('');
  const [name, setName] = useState('');
  const [largeModal, setLargeModal] = useState(false);

  let selectedBeadData;

  useEffect(() => {
    if (beadId) {
      selectedBeadData = beadsMap[beadId];
      setSrc(selectedBeadData.page.url);
      setName(selectedBeadData.page.title);
    }
  }, [beadId]);

  const expandModal = e => {
    e.stopPropagation();
    setLargeModal(true);
  };
  const shrinkModal = e => {
    e.stopPropagation();
    setLargeModal(false);
  };

  return (
    <Wrapper
      modalOpen={modalOpen}
      largeModal={largeModal}
      onClick={e => {
        e.stopPropagation();
        console.log(iframeRef1.current.contentWindow);
        console.log(window.location);
      }}
    >
      <TopRow>
        {largeModal ? (
          <ShrinkIcon size={24} className="icon" onClick={shrinkModal} />
        ) : (
          <ExpandIcon size={24} className="icon" onClick={expandModal} />
        )}
        <Address>
          <a href={src} target="_blank" rel="noopener noreferrer">
            {src}
          </a>
        </Address>
      </TopRow>
      <Search />
      <WebView
        key={src}
        ref={iframeRef1}
        title={name}
        src={src}
        name={name}
        sandbox="allow-same-origin allow-scripts allow-popups"
        allowFullScreen
      >
        안 열림...
      </WebView>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: ${props => (props.largeModal ? '98vw' : '60vw')};
  position: absolute;

  right: 1vw;
  top: 100px;
  bottom: 20px;

  display: ${props => (props.modalOpen ? 'flex' : 'none')};
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  background-color: gray;

  @media (max-width: 767px) {
    width: 98vw;
    height: 90vh;

    top: 105vh;
  }
`;

const TopRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

  width: 100%;

  .icon {
    width: 5%;
  }
`;

const Address = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  width: 90%;

  text-align: center;
  border: 1px solid black;
`;

const Search = styled.input`
  width: 60%;
  height: 5%;
`;

const WebView = styled.iframe`
  width: 95%;
  height: 90%;
`;
