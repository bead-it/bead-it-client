import React from 'react';
import styled from 'styled-components';
import { useSetRecoilState } from 'recoil';

import Header from '../components/navbar';

import { profileModal } from '../store/states';

export default function Home() {
  const setProfileModal = useSetRecoilState(profileModal);

  const closeModals = e => {
    e.stopPropagation();
    setProfileModal(false);
  };

  return (
    <Wrapper onClick={closeModals}>
      <Header />
      <Welcome>Welcome to Beadit!</Welcome>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100vw;
  min-height: 100vh;
`;

const Welcome = styled.div`
  width: 100vw;
  height: 50vh;

  font-size: xx-large;
  text-align: center;
`;
