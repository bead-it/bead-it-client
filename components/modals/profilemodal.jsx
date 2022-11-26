import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { logout } from '../../service/authapi';
import refreshUser from '../../utils/authutil/refreshuser';

import { profileModalAtom, tokenInfoAtom } from '../../recoilstore/atoms';

export default function ProfileModal({ profileIconRef }) {
  const router = useRouter();

  const setToken = useSetRecoilState(tokenInfoAtom);

  const modalOpen = useRecoilValue(profileModalAtom);

  const [position, setPosition] = useState({});

  useEffect(() => {
    if (profileIconRef && profileIconRef.current) {
      const { offsetLeft, offsetTop, offsetWidth, offsetHeight } =
        profileIconRef.current;

      const newPosition = {};
      newPosition.left = offsetLeft + offsetWidth - 100;
      newPosition.top = offsetTop + offsetHeight + 10;

      setPosition(newPosition);
    }
  }, [profileIconRef]);

  const logoutHandler = async () => {
    await logout();

    refreshUser(setToken);

    router.push('/');
  };

  const toMyPage = e => {
    e.stopPropagation();
    router.push('/mypage');
  };

  return (
    <Wrapper position={position} modalOpen={modalOpen}>
      <ToMyPage type="button" onClick={toMyPage}>
        My page
      </ToMyPage>
      <hr />
      <Logout type="button" onClick={logoutHandler}>
        Sign out
      </Logout>
    </Wrapper>
  );
}

ProfileModal.propTypes = {
  profileIconRef: PropTypes.object.isRequired,
};

const Wrapper = styled.div`
  display: ${props => (props.modalOpen ? 'flex' : 'none')};
  flex-direction: column;
  justify-content: center;
  align-items: center;

  position: absolute;
  left: ${props => props.position.left}px;
  top: ${props => props.position.top}px;
  width: 100px;
  height: 70px;

  border: solid 1px black;
  background-color: #c5c3c3;

  hr {
    width: 80%;
    border: none;
    border-top: 2px dashed black;
  }
`;

const Logout = styled.div`
  &:hover {
    cursor: pointer;
    background-color: #eeeeee;
    transform: scale(1.02);
  }
`;

const ToMyPage = styled.div`
  &:hover {
    cursor: pointer;
    background-color: #eeeeee;
    transform: scale(1.02);
  }
`;
