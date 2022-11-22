import React from 'react';
import styled from 'styled-components';
import { useSetRecoilState } from 'recoil';

import Navbar from '../../components/navbar';
import { profileModalAtom } from '../../recoilstore/atoms';
import UserInfo from '../../components/mypages/userinfo';
import MyWorks from '../../components/mypages/myworks';
import SharedWorks from '../../components/mypages/sharedworks';

export default function Mypage() {
  const setProfileModal = useSetRecoilState(profileModalAtom);

  const closeModals = e => {
    e.stopPropagation();
    setProfileModal(false);
  };

  return (
    <Wrapper onClick={closeModals}>
      <Navbar />
      <UserInfoWrapper>
        <UserInfo />
      </UserInfoWrapper>
      <Beadworks>
        <MyWorksWrapper>
          <MyWorks />
        </MyWorksWrapper>
        <SharedWorksWrapper>
          <SharedWorks />
        </SharedWorksWrapper>
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

const UserInfoWrapper = styled.div`
  width: 100%;
  height: 25%;

  background-color: lightgreen;
  border: 5px solid black;
  border-radius: 10px;

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

  @media (max-width: 767px) {
    flex-direction: column;
    height: 75%;
  }
`;

const MyWorksWrapper = styled.div`
  width: 48%;
  height: 100%;

  background-color: yellow;
  border: 5px solid black;
  border-radius: 10px;

  @media (max-width: 767px) {
    width: 100%;
    height: 50%;
  }
`;

const SharedWorksWrapper = styled.div`
  width: 48%;
  height: 100%;

  background-color: lightpink;
  border: 5px solid black;
  border-radius: 10px;

  @media (max-width: 767px) {
    width: 100%;
    height: 50%;
  }
`;
