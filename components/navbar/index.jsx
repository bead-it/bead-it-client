import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useRecoilState } from 'recoil';
import { useMediaQuery } from 'react-responsive';

import ProfileIcon from '../shared/profileicon';
import ProfileModal from '../modals/profilemodal';
import { deviceSize } from '../../store/states';

export default function Navbar({ title }) {
  const profileIconRef = useRef(null);

  const [deviceWindowSize, setDeviceWindowSize] = useRecoilState(deviceSize);
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

  return (
    <Wrapper>
      <LeftBuffer>
        <Logo src="/images/bead-it-logo.png" alt="bead-it-logo" />
      </LeftBuffer>
      <Title>{title}</Title>
      <RightBuffer>
        {true ? (
          <Login src={loginUrl} alt="Google login" />
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
  width: 90%;
`;
