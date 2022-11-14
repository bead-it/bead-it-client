import React from 'react';
import styled from 'styled-components';
import { useSetRecoilState } from 'recoil';

import Navbar from '../../components/navbar';
import { profileModal } from '../../store/states';

export default function Mypage() {
  const setProfileModal = useSetRecoilState(profileModal);

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
`;

const Beadworks = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  height: 60%;

  background-color: orange;
`;

const MyWorks = styled.div`
  width: 45%;
  height: 100%;

  background-color: yellow;
`;

const SharedWorks = styled.div`
  width: 45%;
  height: 100%;

  background-color: red;
`;
