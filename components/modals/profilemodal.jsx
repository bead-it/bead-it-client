import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useRecoilValue } from 'recoil';

import { profileModal } from '../../store/states';

export default function ProfileModal({ profileIconRef }) {
  const modalOpen = useRecoilValue(profileModal);
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

  return (
    <Wrapper position={position} modalOpen={modalOpen}>
      <div>My page</div>
      <hr />
      <div>Sign out</div>
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
