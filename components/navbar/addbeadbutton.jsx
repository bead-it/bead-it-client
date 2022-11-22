import React, { useState } from 'react';
import styled from 'styled-components';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { AiOutlinePlusCircle as CreateIcon } from 'react-icons/ai';

import {
  beadsReceivedAtom,
  currentBeadIdAtom,
  currentBeadworkInfoAtom,
  inputModalAtom,
  threadsReceivedAtom,
  tokenInfoAtom,
} from '../../recoilstore/atoms';
import { userInfoSel } from '../../recoilstore/seletors';
import apiErrorHandler from '../../service/apierrorhandler';
import { postBeadData } from '../../service/beadapi';
import { postThreadData } from '../../service/threadapi';
import InputModal from '../modals/inputmodal';
import Message from '../atoms/message';
import Input from '../atoms/input';
import SubmitButton from '../atoms/submitbutton';
import CancleButton from '../atoms/canclebutton';

export default function AddBeadButton() {
  const setInputModal = useSetRecoilState(inputModalAtom);
  const [url, setUrl] = useState('');
  const user = useRecoilValue(userInfoSel);
  const beadwork = useRecoilValue(currentBeadworkInfoAtom);
  const [token, setToken] = useRecoilState(tokenInfoAtom);
  const [currentBeadId, setCurrentBeadId] = useRecoilState(currentBeadIdAtom);
  const setBeadsData = useSetRecoilState(beadsReceivedAtom);
  const setThreadsData = useSetRecoilState(threadsReceivedAtom);

  const createBeadModalOpen = e => {
    e.stopPropagation();
    if (currentBeadId) {
      setInputModal(true);
    }
  };

  const doCreateBead = async e => {
    e.stopPropagation();

    const { _id: beadworkId } = beadwork;

    const newBeadData = await apiErrorHandler(
      async () => {
        const response = await postBeadData(user.id, beadworkId, token, url);
        return response;
      },
      null,
      { setToken },
    );
    const { _id: newBeadId } = newBeadData;

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
      null,
      { setToken },
    );

    setBeadsData(prev => [...prev, newBeadData]);

    setThreadsData(prev => [...prev, newThreadData]);

    setInputModal(false);
    setCurrentBeadId(newBeadId);
  };

  const cancleCreateBead = e => {
    e.stopPropagation();
    setInputModal(false);
  };

  return (
    <>
      <Wrapper active={currentBeadId} onClick={createBeadModalOpen}>
        <CreateIcon size={24} />
      </Wrapper>
      <InputModal>
        <Message text="Input url below." />
        <Input name="URL" input={url} setInput={setUrl} />
        <Buttons>
          <SubmitButton clickHandler={doCreateBead} />
          <CancleButton clickHandler={cancleCreateBead} />
        </Buttons>
      </InputModal>
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
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;

  width: 95%;
`;
