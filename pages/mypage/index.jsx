import React from 'react';
import styled from 'styled-components';
import { useSetRecoilState } from 'recoil';

import Navbar from '../../components/navbar';
import { profileModalAtom } from '../../recoilstore/atoms';

export default function Mypage() {
  const setProfileModal = useSetRecoilState(profileModalAtom);

  const closeModals = e => {
    e.stopPropagation();
    setProfileModal(false);
  };

  return (
    <Wrapper onClick={closeModals}>
      <Navbar />
      <UserInfo />
      <Beadworks>
        <MyWorks />
        <SharedWorks />
      </Beadworks>
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

const UserInfo = styled.div`
  width: 100%;
  height: 25%;

  background-color: green;

  @media (max-width: 767px) {
    height: 15%;
  }
`;

const Beadworks = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  height: 60%;

  background-color: orange;

  @media (max-width: 767px) {
    flex-direction: column;
    height: 75%;
  }
`;

const MyWorks = styled.div`
  width: 48%;
  height: 100%;

  background-color: yellow;

  @media (max-width: 767px) {
    width: 100%;
    height: 50%;
  }
`;

const SharedWorks = styled.div`
  width: 48%;
  height: 100%;

  background-color: red;

  @media (max-width: 767px) {
    width: 100%;
    height: 50%;
  }
`;
