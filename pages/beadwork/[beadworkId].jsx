import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useSetRecoilState, useRecoilValue, useRecoilState } from 'recoil';
import { useRouter } from 'next/router';

import Navbar from '../../components/navbar';
import BeadworkTable from '../../components/beadworktable';
import RealViewModal from '../../components/modals/realviewmodal';
import DetailModal from '../../components/modals/detailmodal';
import {
  beadsReceivedAtom,
  currentBeadIdAtom,
  currentBeadworkInfoAtom,
  profileModalAtom,
  realViewModalAtom,
  threadsReceivedAtom,
  tokenInfoAtom,
} from '../../recoilstore/atoms';
import { userInfoSel } from '../../recoilstore/seletors';
import apiErrorHandler from '../../service/apierrorhandler';
import { getAllBeadsData } from '../../service/beadapi';
import { getAllThreadsData } from '../../service/threadapi';
import { getBeadworkData } from '../../service/beadworkapi';
import BeadActionModal from '../../components/modals/beadactionmodal';

export default function Beadwork() {
  const setProfileModal = useSetRecoilState(profileModalAtom);
  const setRealViewModal = useSetRecoilState(realViewModalAtom);
  const setBeadsReceived = useSetRecoilState(beadsReceivedAtom);
  const setThreadsReceived = useSetRecoilState(threadsReceivedAtom);
  const setCurrentBeadId = useSetRecoilState(currentBeadIdAtom);
  const setCurrentBeadworkInfo = useSetRecoilState(currentBeadworkInfoAtom);

  const [token, setToken] = useRecoilState(tokenInfoAtom);
  const user = useRecoilValue(userInfoSel);
  const userId = user.id;

  const router = useRouter();
  const { beadworkId } = router.query;

  useEffect(() => {
    if (userId && beadworkId) {
      const getBeadworkInfoFetching = async () => {
        const beadworkData = await apiErrorHandler(
          async () => {
            const response = await getBeadworkData(userId, beadworkId, token);
            return response;
          },
          null,
          { setToken },
        );

        setCurrentBeadworkInfo(beadworkData);
      };

      getBeadworkInfoFetching();
    }
  }, [userId, beadworkId]);

  useEffect(() => {
    if (userId && beadworkId) {
      const beadingDataFetching = async () => {
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

      beadingDataFetching();
    }
  }, [userId, beadworkId]);

  const closeModals = e => {
    e.stopPropagation();
    setProfileModal(false);
    setRealViewModal(false);
    setCurrentBeadId(null);
  };

  return (
    <Wrapper onClick={closeModals}>
      <BeadworkTable />
      <Navbar />
      <RealViewModal />
      <DetailModal />
      <BeadActionModal />
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
