import React from 'react';
import styled from 'styled-components';
import { useSetRecoilState } from 'recoil';

import Navbar from '../../components/navbar';
import BeadworkTable from '../../components/beadworktable';
import RealViewModal from '../../components/modals/realviewmodal';
import { profileModal, realViewModal } from '../../store/states';

export default function Beadwork() {
  const setProfileModal = useSetRecoilState(profileModal);
  const setRealViewModal = useSetRecoilState(realViewModal);

  const closeModals = e => {
    e.stopPropagation();
    setProfileModal(false);
    setRealViewModal(false);
  };

  return (
    <Wrapper onClick={closeModals}>
      <Navbar />
      <BeadworkTable />
      <RealViewModal />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  width: 98vw;

  padding-left: 1vw;
  padding-top: 1vh;
`;
