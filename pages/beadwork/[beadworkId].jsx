import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useSetRecoilState, useRecoilValue, useRecoilState } from 'recoil';
import { useRouter } from 'next/router';

import Navbar from '../../components/navbar';
import BeadworkTable from '../../components/beadworktable';
import RealViewModal from '../../components/modals/realviewmodal';
import {
  beadsReceived,
  currentBead,
  profileModal,
  realViewModal,
  threadsReceived,
  tokenInfo,
} from '../../recoilstore/atoms';
import apiErrorHandler from '../../service/apierrorhandler';
import { getAllBeadsData } from '../../service/beadapi';
import { getAllThreadsData } from '../../service/threadapi';
import { userInfo } from '../../recoilstore/seletors';

export default function Beadwork() {
  const setProfileModal = useSetRecoilState(profileModal);
  const setRealViewModal = useSetRecoilState(realViewModal);
  const setBeadsReceived = useSetRecoilState(beadsReceived);
  const setThreadsReceived = useSetRecoilState(threadsReceived);
  const setCurrentBead = useSetRecoilState(currentBead);

  const [token, setToken] = useRecoilState(tokenInfo);
  const user = useRecoilValue(userInfo);
  const beadsReceivedData = useRecoilValue(beadsReceived);
  const threadsReceivedData = useRecoilValue(threadsReceived);
  const userId = user.id;

  const router = useRouter();
  const { beadworkId } = router.query;

  useEffect(() => {
    if (userId && beadworkId && token) {
      const dataFetching = async () => {
        const beadsData = await apiErrorHandler(
          async () => {
            const response = await getAllBeadsData(userId, beadworkId, token);
            return response;
          },
          null,
          { setToken },
        );
        const threadsData = await apiErrorHandler(
          async () => {
            const response = await getAllThreadsData(userId, beadworkId, token);
            return response;
          },
          null,
          { setToken },
        );

        if (beadsData) {
          setBeadsReceived(beadsData);
        }
        if (threadsData) {
          setThreadsReceived(threadsData);
        }
      };

      dataFetching();
    }
  }, [userId, beadworkId, token]);

  useEffect(() => {
    console.log(beadsReceivedData);
    console.log(threadsReceivedData);
  }, [beadsReceivedData, threadsReceivedData]);

  const closeModals = e => {
    e.stopPropagation();
    setProfileModal(false);
    setRealViewModal(false);
    setCurrentBead(null);
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
