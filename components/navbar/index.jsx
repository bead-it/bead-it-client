import React, { useRef, forwardRef } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Image from 'next/image';
import ProfileIcon from '../shared/profileicon';
import ProfileModal from '../modals/profilemodal';

const ProfileIconForwarededRef = forwardRef(ProfileIcon);

export default function Navbar({ title }) {
  const profileIconRef = useRef(null);

  return (
    <Wrapper>
      <LeftBuffer>
        <Image
          src="/images/bead-it-logo.png"
          className="homeIcon"
          alt="bead-it-logo"
          width="90"
          height="60"
        />
      </LeftBuffer>
      <Title>{title}</Title>
      <RightBuffer>
        {true ? (
          <Login
            src="/images/btn_google_signin_light_pressed_web@2x.png"
            alt="Google login"
          />
        ) : (
          <ProfileIconForwarededRef
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
`;

const LeftBuffer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;

  width: 10%;
  height: 100%;
`;

const Title = styled.div`
  width: 30%;

  font-size: 2rem;
  text-align: center;
`;

const RightBuffer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;

  width: 10%;
  height: 100%;
`;

const Login = styled.img`
  width: 200px;
`;
