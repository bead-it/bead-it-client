import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useSetRecoilState, useRecoilValue, useRecoilState } from 'recoil';
import { useRouter } from 'next/router';

import Navbar from '../../components/navbar';
import BeadworkTable from '../../components/beadworktable';
import WebViewModal from '../../components/modals/webviewmodal';
import DetailModal from '../../components/modals/detailmodal';
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
import apiErrorHandler from '../../service/apierrorhandler';
import { getAllBeadsData } from '../../service/beadapi';
import { getAllThreadsData } from '../../service/threadapi';
import { getBeadworkData } from '../../service/beadworkapi';
import BeadActionModal from '../../components/modals/beadactionmodal';
import ThreadModifyModal from '../../components/modals/threadmodifymodal';

export default function Beadwork() {
  const setProfileModal = useSetRecoilState(profileModalAtom);
  const setWebViewModal = useSetRecoilState(webViewModalAtom);
  const setBeadsReceived = useSetRecoilState(beadsReceivedAtom);
  const setThreadsReceived = useSetRecoilState(threadsReceivedAtom);
  const setCurrentBeadId = useSetRecoilState(currentBeadIdAtom);
  const setCurrentBeadworkInfo = useSetRecoilState(currentBeadworkInfoAtom);
  const setSelectStartPoint = useSetRecoilState(selectStartPointAtom);

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
          errorResult => {
            if (process.env.NODE_ENV === 'development') {
              window.alert(errorResult.message);
            }
            return null;
          },
          { setToken },
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
            if (process.env.NODE_ENV === 'development') {
              window.alert(errorResult.message);
            }
            return null;
          },
          { setToken },
        );
        const threadsData = await apiErrorHandler(
          async () => {
            const response = await getAllThreadsData(userId, beadworkId, token);
            return response;
          },
          errorResult => {
            if (process.env.NODE_ENV === 'development') {
              window.alert(errorResult.message);
            }
            return null;
          },
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
