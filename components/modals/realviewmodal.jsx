import React from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';

import { realViewModal } from '../../store/states';

export default function RealViewModal() {
  const modalOpen = useRecoilValue(realViewModal);

  return (
    <Wrapper modalOpen={modalOpen}>
      <div>making....</div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 40vw;
  height: 80vh;
  position: absolute;

  right: 1vw;
  top: 15vh;

  display: ${props => (props.modalOpen ? 'flex' : 'none')};
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  background-color: gray;

  @media (max-width: 767px) {
    width: 98vw;
    height: 90vh;

    top: 105vh;
  }
`;
