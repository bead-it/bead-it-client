import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useSetRecoilState, useRecoilValue, useRecoilState } from 'recoil';
import { useRouter } from 'next/router';

import Navbar from '../../components/navbar';
import BeadworkTable from '../../components/beadworktable';
import WebViewModal from '../../components/modals/webviewmodal';
import DetailModal from '../../components/modals/detailmodal';
import BeadActionModal from '../../components/modals/beadactionmodal';
import ThreadModifyModal from '../../components/modals/threadmodifymodal';
import BeadworkModifyModal from '../../components/modals/beadworkmodifymodal';

import apiErrorHandler from '../../service/apierrorhandler';
import { getAllBeadsData } from '../../service/beadapi';
import { getAllThreadsData } from '../../service/threadapi';
import { getBeadworkData } from '../../service/beadworkapi';

import {
  beadsReceivedAtom,
  currentBeadIdAtom,
  currentBeadworkInfoAtom,
  profileModalAtom,
  webViewModalAtom,
  selectStartPointAtom,
  threadsReceivedAtom,
  tokenInfoAtom,
} from '../../recoilstore/atoms';
import { userInfoSel } from '../../recoilstore/seletors';

export default function Beadwork() {
  const router = useRouter();

  const [token, setToken] = useRecoilState(tokenInfoAtom);

  const setProfileModal = useSetRecoilState(profileModalAtom);
  const setWebViewModal = useSetRecoilState(webViewModalAtom);
  const setBeadsReceived = useSetRecoilState(beadsReceivedAtom);
  const setThreadsReceived = useSetRecoilState(threadsReceivedAtom);
  const setCurrentBeadId = useSetRecoilState(currentBeadIdAtom);
  const setCurrentBeadworkInfo = useSetRecoilState(currentBeadworkInfoAtom);
  const setSelectStartPoint = useSetRecoilState(selectStartPointAtom);

  const user = useRecoilValue(userInfoSel);
  const userId = user.id;

  const { beadworkId } = router.query;

  useEffect(() => {
    if (userId && beadworkId) {
      const getBeadworkInfoFetching = async () => {
        const beadworkData = await apiErrorHandler(
          async () => {
            const response = await getBeadworkData(userId, beadworkId, token);
            return response;
          },
          errorResult => {
            window.alert(errorResult.message);
            return null;
          },
          { setToken, router },
        );

        if (beadworkData) {
          setCurrentBeadworkInfo(beadworkData);
        }
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
          errorResult => {
            window.alert(errorResult.message);
            return null;
          },
          { setToken, router },
        );
        const threadsData = await apiErrorHandler(
          async () => {
            const response = await getAllThreadsData(userId, beadworkId, token);
            return response;
          },
          errorResult => {
            window.alert(errorResult.message);
            return null;
          },
          { setToken, router },
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
    setWebViewModal(false);
    setCurrentBeadId('');
    setSelectStartPoint(false);
  };

  return (
    <Wrapper onClick={closeModals}>
      <BeadworkTable />
      <Navbar />
      <WebViewModal />
      <DetailModal />
      <BeadActionModal />
      <ThreadModifyModal />
      <BeadworkModifyModal />
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
