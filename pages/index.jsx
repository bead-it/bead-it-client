import React from 'react';
import styled from 'styled-components';
import { useSetRecoilState, useRecoilValue } from 'recoil';
// import fetch from 'cross-fetch';

import Navbar from '../components/navbar';

import { profileModalAtom } from '../recoilstore/atoms';
import { userInfoSel } from '../recoilstore/seletors';

export default function Home() {
  const setProfileModal = useSetRecoilState(profileModalAtom);
  const user = useRecoilValue(userInfoSel);

  const closeModals = async e => {
    e.stopPropagation();
    setProfileModal(false);
    console.log(user);
  };

  return (
    <Wrapper onClick={closeModals}>
      <Navbar />
      <Welcome>Welcome to Beadit!</Welcome>
      <iframe
        src="http://localhost:8080/https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/String/search"
        title="title"
      />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  width: 98vw;
  height: 98vh;

  padding-left: 1vw;
  padding-top: 1vh;
`;

const Welcome = styled.div`
  width: 100vw;
  height: 50vh;

  font-size: xx-large;
  text-align: center;
`;
