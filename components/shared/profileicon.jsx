import React, { forwardRef } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useSetRecoilState } from 'recoil';

import PROFILE_SIZE from '../../constants/profileicon';
import { profileModalAtom } from '../../recoilstore/atoms';

const ProfileIcon = forwardRef(({ src, alt, size }, ref) => {
  const setModalOpen = useSetRecoilState(profileModalAtom);

  const profileModalControl = e => {
    e.stopPropagation();
    setModalOpen(prev => !prev);
  };

  return (
    <Icon
      ref={ref}
      src={src}
      alt={alt}
      width={PROFILE_SIZE[size]}
      height={PROFILE_SIZE[size]}
      size={size}
      onClick={profileModalControl}
    />
  );
});

ProfileIcon.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
};

export default ProfileIcon;

const Icon = styled.img`
  width: ${props => PROFILE_SIZE[props.size]}px;
  height: ${props => PROFILE_SIZE[props.size]}px;
  border-radius: ${props => PROFILE_SIZE[props.size] / 2}px;
`;
