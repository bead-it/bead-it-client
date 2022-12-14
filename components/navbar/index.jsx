import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { useMediaQuery } from 'react-responsive';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { AiFillEdit as EditIcon } from 'react-icons/ai';

import AddBeadworkButton from '../atoms/addbeadworkbutton';
import ProfileIcon from '../atoms/profileicon';
import AddBeadButton from '../molecules/addbeadbutton';
import ProfileModal from '../modals/profilemodal';
import HomeButton from './homebutton';

import { login } from '../../service/authapi';
import refreshUser from '../../utils/authutil/refreshuser';

import {
  beadworkModifyModalAtom,
  deviceSizeAtom,
  tokenInfoAtom,
} from '../../recoilstore/atoms';
import { userInfoSel } from '../../recoilstore/seletors';

export default function Navbar({ title }) {
  const router = useRouter();

  const profileIconRef = useRef(null);

  const [deviceWindowSize, setDeviceWindowSize] =
    useRecoilState(deviceSizeAtom);

  const setToken = useSetRecoilState(tokenInfoAtom);
  const setBeadworkModifyModal = useSetRecoilState(beadworkModifyModalAtom);

  const user = useRecoilValue(userInfoSel);

  const [loginUrl, setLoginUrl] = useState(
    `/images/google-signin-${deviceWindowSize}.png`,
  );

  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1199 });
  const isDesktop = useMediaQuery({ minWidth: 1200 });

  useEffect(() => {
    if (isMobile) {
      setDeviceWindowSize('small');
    } else if (isTablet) {
      setDeviceWindowSize('medium');
    } else if (isDesktop) {
      setDeviceWindowSize('large');
    }
  }, [isMobile, isTablet, isDesktop]);

  useEffect(() => {
    setLoginUrl(`/images/google-signin-${deviceWindowSize}.png`);
  }, [deviceWindowSize]);

  const loginHandler = async () => {
    const loginResult = await login(router);

    refreshUser(setToken);

    if (!loginResult) {
      window.alert('Login failed!!');
    }
  };

  return (
    <Wrapper>
      <LeftBuffer>
        <HomeButton />
        <EditIconWrapper
          active={router.query?.beadworkId}
          onClick={() => setBeadworkModifyModal(true)}
        >
          <EditIcon size={24} />
        </EditIconWrapper>
      </LeftBuffer>
      <Title>{title}</Title>
      <RightBuffer>
        {user.id && <AddBeadworkButton />}
        {router.pathname === '/beadwork/[beadworkId]' && <AddBeadButton />}
        {!user.id ? (
          <Login src={loginUrl} alt="Google login" onClick={loginHandler} />
        ) : (
          <ProfileIcon
            ref={profileIconRef}
            src={user.profile}
            alt="profile image"
            size="medium"
            option={{ clickable: true }}
          />
        )}
        <ProfileModal profileIconRef={profileIconRef} />
      </RightBuffer>
    </Wrapper>
  );
}

Navbar.propTypes = {
  title: PropTypes.string,
};

Navbar.defaultProps = {
  title: 'BEAD IT',
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  height: 80px;

  background-color: #e1b8aa;

  z-index: 1;
`;

const LeftBuffer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;

  width: 25%;
  height: 100%;
`;

const EditIconWrapper = styled.div`
  display: ${props => (props.active ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;

  height: 30px;

  padding-left: 5px;
  padding-right: 5px;

  border: 1px solid black;
  border-radius: 5px;
  background-color: #dec000;

  &:hover {
    cursor: pointer;
    transform: scale(1.1);
    transition: transform 0.3s ease-in-out;
  }
`;

const Title = styled.div`
  font-size: 2rem;
  text-align: center;
`;

const RightBuffer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;

  width: 25%;
  height: 100%;
`;

const Login = styled.img`
  max-width: 90%;
  max-height: 90%;

  &:hover {
    cursor: pointer;
    transform: scale(1.05);
    transition: transform 0.3s ease-in-out;
  }
`;
