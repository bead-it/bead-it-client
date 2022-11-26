import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { AiFillPlusCircle as CreateIcon } from 'react-icons/ai';

import CustomInputModal from './customInputModal';

import apiErrorHandler from '../../service/apierrorhandler';
import { postBeadData } from '../../service/beadapi';
import { postThreadData } from '../../service/threadapi';

import {
  beadCreationModalAtom,
  beadsReceivedAtom,
  currentBeadIdAtom,
  currentBeadworkInfoAtom,
  currentSrcAtom,
  inputModalAtom,
  selectStartPointAtom,
  threadsReceivedAtom,
  tokenInfoAtom,
} from '../../recoilstore/atoms';
import { userInfoSel } from '../../recoilstore/seletors';

export default function AddBeadButton() {
  const router = useRouter();

  const [beadCreationModal, setBeadCreationModal] = useRecoilState(
    beadCreationModalAtom,
  );
  const [token, setToken] = useRecoilState(tokenInfoAtom);
  const [currentBeadId, setCurrentBeadId] = useRecoilState(currentBeadIdAtom);

  const setInputModal = useSetRecoilState(inputModalAtom);
  const setBeadsData = useSetRecoilState(beadsReceivedAtom);
  const setThreadsData = useSetRecoilState(threadsReceivedAtom);

  const user = useRecoilValue(userInfoSel);
  const beadwork = useRecoilValue(currentBeadworkInfoAtom);
  const src = useRecoilValue(currentSrcAtom);
  const selectStartPoint = useRecoilValue(selectStartPointAtom);

  useEffect(() => {
    if (beadCreationModal) {
      setInputModal(true);
    }
  }, [beadCreationModal]);

  const createBeadModalOpen = e => {
    e.stopPropagation();
    if (currentBeadId || selectStartPoint) {
      setBeadCreationModal(true);
    }
  };

  const doCreateBead = async url => {
    const { _id: beadworkId } = beadwork;

    const newBeadData = await apiErrorHandler(
      async () => {
        const response = await postBeadData(user.id, beadworkId, token, url);
        return response;
      },
      errorResult => {
        window.alert(errorResult.message);
        return null;
      },
      { setToken, router },
    );

    if (!newBeadData) {
      return;
    }

    const { _id: newBeadId } = newBeadData;

    if (!selectStartPoint) {
      const newThreadData = await apiErrorHandler(
        async () => {
          const response = await postThreadData(
            user.id,
            beadworkId,
            token,
            currentBeadId,
            newBeadId,
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

      setThreadsData(prev => [...prev, newThreadData]);
    }

    setBeadsData(prev => [...prev, newBeadData]);

    setBeadCreationModal(false);
    setInputModal(false);
    setCurrentBeadId(newBeadId);
  };

  return (
    <>
      <Wrapper
        active={currentBeadId || selectStartPoint}
        onClick={createBeadModalOpen}
      >
        <CreateIcon size={24} />
      </Wrapper>
      {beadCreationModal && (
        <CustomInputModal
          message="Input url below."
          name1="URL"
          defaultValue1={src}
          submitHandler={doCreateBead}
          cancleHandler={() => {
            setBeadCreationModal(false);
          }}
        />
      )}
    </>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  height: 30px;

  padding-left: 5px;
  padding-right: 5px;

  border: 1px solid black;
  border-radius: 5px;
  background-color: ${props => (props.active ? '#dec000' : 'gray')};

  &:hover {
    cursor: ${props => (props.active ? 'pointer' : 'arrow')};
    transform: scale(${props => (props.active ? 1.1 : 1)});
    transition: transform 0.3s ease-in-out;
  }
`;
