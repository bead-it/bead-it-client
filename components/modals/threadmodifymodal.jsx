import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import CustomInputModal from '../molecules/customInputModal';

import apiErrorHandler from '../../service/apierrorhandler';
import { patchThreadData } from '../../service/threadapi';

import {
  currentBeadworkInfoAtom,
  currentThreadIdAtom,
  inputModalAtom,
  threadModifyModalAtom,
  threadsReceivedAtom,
  tokenInfoAtom,
} from '../../recoilstore/atoms';
import { threadsMapSel, userInfoSel } from '../../recoilstore/seletors';

export default function ThreadModifyModal() {
  const router = useRouter();

  const [threadModifyModal, setThreadModifyModal] = useRecoilState(
    threadModifyModalAtom,
  );
  const [token, setToken] = useRecoilState(tokenInfoAtom);

  const setInputModal = useSetRecoilState(inputModalAtom);
  const setThreadsReceived = useSetRecoilState(threadsReceivedAtom);

  const currentThreadId = useRecoilValue(currentThreadIdAtom);
  const user = useRecoilValue(userInfoSel);
  const currentBeadworkData = useRecoilValue(currentBeadworkInfoAtom);
  const threadsMapData = useRecoilValue(threadsMapSel);

  useEffect(() => {
    if (threadModifyModal) {
      setInputModal(true);
    }
  }, [threadModifyModal]);

  const modifyThread = async content => {
    const { _id: beadworkId } = currentBeadworkData;

    const newThreadData = await apiErrorHandler(
      async () => {
        const response = await patchThreadData(
          user.id,
          beadworkId,
          currentThreadId,
          token,
          { content },
        );
        return response;
      },
      errorResult => {
        window.alert(errorResult.message);
        return null;
      },
      { setToken, router },
    );

    if (!newThreadData) {
      return;
    }

    setThreadsReceived(prev => {
      const tempPrev = [...prev];

      let index;
      tempPrev.forEach((thread, i) => {
        const { _id: threadId } = thread;
        if (threadId === currentThreadId) {
          index = i;
        }
      });

      tempPrev[index] = { ...tempPrev[index], content };

      return tempPrev;
    });

    setThreadModifyModal(false);
    setInputModal(false);
  };

  return (
    threadModifyModal && (
      <CustomInputModal
        message="Input contents below to modify."
        name1="Contents"
        defaultValue1={threadsMapData[currentThreadId]?.content}
        submitHandler={modifyThread}
        cancleHandler={() => {
          setThreadModifyModal(false);
        }}
      />
    )
  );
}
