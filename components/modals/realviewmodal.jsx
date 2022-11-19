import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';

import { currentBeadAtom, realViewModalAtom } from '../../recoilstore/atoms';
import { beadsMapSel } from '../../recoilstore/seletors';

export default function RealViewModal() {
  const iframeRef1 = useRef();

  const modalOpen = useRecoilValue(realViewModalAtom);
  const bead = useRecoilValue(currentBeadAtom);
  const beadsMap = useRecoilValue(beadsMapSel);
  const [src, setSrc] = useState('');
  const [name, setName] = useState('');

  let beadId;
  let selectedBeadData;

  useEffect(() => {
    console.log(iframeRef1.current.src);
  }, [bead]);

  useEffect(() => {
    if (bead) {
      beadId = bead.getAttribute('id').slice(2);
      selectedBeadData = beadsMap[beadId];
      setSrc(selectedBeadData.page.url);
      setName(selectedBeadData.page.title);

      console.log(src);
    }
  }, [bead]);

  return (
    <Wrapper
      modalOpen={modalOpen}
      onClick={e => {
        e.stopPropagation();
        console.log(iframeRef1.current.contentWindow);
        console.log(window.location);
      }}
    >
      <Address>
        <a href={src} target="_blank" rel="noopener noreferrer">
          {src}
        </a>
      </Address>
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
  width: 60vw;
  height: 80vh;
  position: absolute;

  right: 1vw;
  top: 100px;

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

const Address = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  width: 80%;
  height: 5%;

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
