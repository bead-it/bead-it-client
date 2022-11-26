import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import Navbar from '../../components/navbar';
import UserInfo from '../../components/mypages/userinfo';
import MyWorks from '../../components/mypages/myworks';
import SharedWorks from '../../components/mypages/sharedworks';

import { profileModalAtom, tokenInfoAtom } from '../../recoilstore/atoms';
import apiErrorHandler from '../../service/apierrorhandler';
import { getUserData } from '../../service/userapi';
import { userInfoSel } from '../../recoilstore/seletors';

export default function Mypage() {
  const router = useRouter();

  const [token, setToken] = useRecoilState(tokenInfoAtom);

  const setProfileModal = useSetRecoilState(profileModalAtom);

  const currentUserData = useRecoilValue(userInfoSel);

  const [myData, setMyData] = useState({});

  useEffect(() => {
    const getUserInfoFetching = async () => {
      const userData = await apiErrorHandler(
        async () => {
          const response = await getUserData(currentUserData.id, token);
          return response;
        },
        errorResult => {
          window.alert(errorResult.message);
          return null;
        },
        { setToken, router },
      );

      if (userData) {
        setMyData(userData);
      }
    };

    if (currentUserData && token) {
      getUserInfoFetching();
    }
  }, [currentUserData, token]);

  const closeModals = e => {
    e.stopPropagation();
    setProfileModal(false);
  };

  return (
    <Wrapper onClick={closeModals}>
      <Navbar />
      <UserInfoWrapper>
        <UserInfo myData={myData} />
      </UserInfoWrapper>
      <Beadworks>
        <MyWorksWrapper>
          <MyWorks myData={myData} />
        </MyWorksWrapper>
        <SharedWorksWrapper>
          <SharedWorks myData={myData} />
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
