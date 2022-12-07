import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import ProfileIcon from '../atoms/profileicon';

export default function UserInfo({ myData }) {
  return (
    <Wrapper>
      <FlexDiv>
        <ProfileIcon
          src={myData.profile}
          alt="profile image"
          size="medium"
          option={{ clickable: false }}
        />
        <Username>{myData.username}</Username>
      </FlexDiv>
      <Email>{myData.email}</Email>
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

UserInfo.propTypes = {
  myData: PropTypes.object.isRequired,
};

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
