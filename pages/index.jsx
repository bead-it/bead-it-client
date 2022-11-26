import React from 'react';
import styled from 'styled-components';
import { useSetRecoilState } from 'recoil';

import Navbar from '../components/navbar';

import { profileModalAtom } from '../recoilstore/atoms';

export default function Home() {
  const setProfileModal = useSetRecoilState(profileModalAtom);

  const closeModals = async e => {
    e.stopPropagation();
    setProfileModal(false);
  };

  return (
    <Wrapper onClick={closeModals}>
      <Navbar />
      <Welcome>
        <h2 className="contents">Welcome to Beadit!</h2>
        <div className="contents">
          You can easily generate nested urls through beading.
        </div>
        <div className="contents">
          Join us and enjoy traveling web around you!
        </div>
      </Welcome>
      <Spacer />
      <BackImg src="/images/bead-it-logo.png" alt="bead-it-logo" />
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

  overflow: hidden;
`;

const Welcome = styled.div`
  font-size: 3rem;
  text-align: center;

  border-radius: 10px;

  z-index: 1;

  .contents {
    text-align: center;
  }

  @media (max-width: 1199px) and (min-width: 768px) {
    font-size: 2rem;
  }

  @media (max-width: 767px) {
    font-size: 1.5rem;
  }
`;

const Spacer = styled.div`
  height: 10px;
`;

const BackImg = styled.img`
  position: absolute;
  left: 0;
  top: 0;

  @media (min-aspect-ratio: 3/2) {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media (max-aspect-ratio: 3/2) {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
