import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { tokenInfoAtom } from '../../recoilstore/atoms';
import { userInfoSel } from '../../recoilstore/seletors';
import apiErrorHandler from '../../service/apierrorhandler';
import { getUserData } from '../../service/userapi';
import ProfileIcon from '../atoms/profileicon';

export default function UserInfo() {
  const router = useRouter();

  const currentUserData = useRecoilValue(userInfoSel);
  const [token, setToken] = useRecoilState(tokenInfoAtom);
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

  return (
    <Wrapper>
      <FlexDiv>
        <ProfileIcon
          src={currentUserData.profile}
          alt="profile image"
          size="medium"
          option={{ clickable: false }}
        />
        <Username>{currentUserData.username}</Username>
      </FlexDiv>
      <Email>{currentUserData.email}</Email>
      <JoinDate>{`Created at : ${myData.createdAt?.split('T')[0]}`}</JoinDate>
      <BeadworksCount>
        {`Number of myBeadworks : ${myData.myBeadworks?.length || 0}`}
      </BeadworksCount>
      <BeadworksCount>
        {`Number of sharedBeadworks : ${myData.sharedBeadworks?.length || 0}`}
      </BeadworksCount>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;

  height: 100%;
  overflow-y: scroll;

  padding-left: 5px;
  padding-right: 5px;
`;

const FlexDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

const Username = styled.div`
  font-size: 1.5rem;
  font-weight: 1000;
`;

const Email = styled.div`
  font-size: 1.2rem;
  font-weight: 700;
`;

const JoinDate = styled.div`
  font-size: 1.2rem;
  font-weight: 500;
`;

const BeadworksCount = styled.div`
  font-size: 1rem;
  font-weight: 500;
`;
