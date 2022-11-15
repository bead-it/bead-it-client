import React from 'react';
import styled from 'styled-components';
import { useSetRecoilState } from 'recoil';

import Navbar from '../components/navbar';

import { profileModal } from '../recoilstore/atoms';

export default function Home() {
  const setProfileModal = useSetRecoilState(profileModal);

  const closeModals = e => {
    e.stopPropagation();
    setProfileModal(false);
  };

  return (
    <Wrapper onClick={closeModals}>
      <Navbar />
      <Welcome>Welcome to Beadit!</Welcome>
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
