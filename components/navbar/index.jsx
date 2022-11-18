import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { useMediaQuery } from 'react-responsive';
import { useRouter } from 'next/router';

import ProfileIcon from '../shared/profileicon';
import ProfileModal from '../modals/profilemodal';
import { deviceSize, token } from '../../recoilstore/atoms';
import { userInfo } from '../../recoilstore/seletors';
import { login } from '../../service/auth';
import refreshUser from '../../utils/refreshuser';

export default function Navbar({ title }) {
  const router = useRouter();
  const profileIconRef = useRef(null);

  const [deviceWindowSize, setDeviceWindowSize] = useRecoilState(deviceSize);
  const setToken = useSetRecoilState(token);
  const user = useRecoilValue(userInfo);
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
    const loginResult = await login();

    refreshUser(setToken);

    if (!loginResult) {
      window.alert('Login failed!!');
    }
  };

  const routingHome = e => {
    e.stopPropagation();
    router.push('/');
  };

  return (
    <Wrapper>
      <LeftBuffer poin>
        <Logo
          onClick={routingHome}
          src="/images/bead-it-logo.png"
          alt="bead-it-logo"
        />
      </LeftBuffer>
      <Title>{title}</Title>
      <RightBuffer>
        {!user.id ? (
          <Login src={loginUrl} alt="Google login" onClick={loginHandler} />
        ) : (
          <ProfileIcon
            ref={profileIconRef}
            src="/images/bead-it-logo.png"
            alt="profile image"
            size="medium"
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

  width: 15%;
  height: 100%;
`;

const Logo = styled.img`
  max-width: 90%;
  max-height: 90%;
  aspect-ratio: 3 / 2;
`;

const Title = styled.div`
  font-size: 2rem;
  text-align: center;
`;

const RightBuffer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;

  width: 15%;
  height: 100%;
`;

const Login = styled.img`
  max-width: 90%;
  max-height: 90%;
`;
