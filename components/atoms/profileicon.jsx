import React, { forwardRef } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useSetRecoilState } from 'recoil';

import PROFILE_SIZE from '../../constants/profileicon';
import { profileModalAtom } from '../../recoilstore/atoms';

const ProfileIcon = forwardRef(({ src, alt, size, option }, ref) => {
  const setModalOpen = useSetRecoilState(profileModalAtom);

  const profileModalControl = e => {
    e.stopPropagation();
    if (option.clickable) {
      setModalOpen(prev => !prev);
    }
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
  src: PropTypes.string,
  alt: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
  option: PropTypes.object.isRequired,
};

ProfileIcon.defaultProps = {
  src: '',
};

export default ProfileIcon;

const Icon = styled.img`
  width: ${props => PROFILE_SIZE[props.size]}px;
  height: ${props => PROFILE_SIZE[props.size]}px;
  border-radius: ${props => PROFILE_SIZE[props.size] / 2}px;

  &:hover {
    cursor: pointer;
    transform: scale(1.1);
    transition: transform 0.3s ease-in-out;
  }
`;
