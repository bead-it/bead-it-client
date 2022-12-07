import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { AiFillFileAdd as CreateIcon } from 'react-icons/ai';

import apiErrorHandler from '../../service/apierrorhandler';
import {
  postBeadworkData,
  postBeadworkDataFromBeads,
} from '../../service/beadworkapi';

import {
  currentBeadworkInfoAtom,
  myBeadworkInfoAtom,
  selectedBeadsAtom,
  tokenInfoAtom,
} from '../../recoilstore/atoms';
import { userInfoSel } from '../../recoilstore/seletors';

export default function AddBeadworkButton() {
  const router = useRouter();

  const [selectedBeads, setSelectedBeads] = useRecoilState(selectedBeadsAtom);
  const [token, setToken] = useRecoilState(tokenInfoAtom);
  const [currentBeadworkData, setCurrentBeadworkData] = useRecoilState(
    currentBeadworkInfoAtom,
  );

  const setMyBeadworkData = useSetRecoilState(myBeadworkInfoAtom);

  const user = useRecoilValue(userInfoSel);

  const createBeadwork = async e => {
    e.stopPropagation();
    const confirmed = window.confirm('You really want to make a new beadwork?');

    if (!confirmed) {
      return;
    }

    let apiRequestFunc;

    if (selectedBeads.length > 0) {
      const { _id: beadworkId } = currentBeadworkData;

      apiRequestFunc = async () => {
        const response = await postBeadworkDataFromBeads(
          user.id,
          beadworkId,
          token,
          selectedBeads,
        );
        return response;
      };
    } else {
      apiRequestFunc = async () => {
        const response = await postBeadworkData(user.id, token);
        return response;
      };
    }

    const newBeadworkData = await apiErrorHandler(
      apiRequestFunc,
      errorResult => {
        window.alert(errorResult.message);
        return null;
      },
      { setToken, router },
    );

    if (newBeadworkData) {
      const { _id: newBeadworkId } = newBeadworkData;

      setSelectedBeads([]);
      setCurrentBeadworkData(newBeadworkData);
      setMyBeadworkData(prev => [...prev, newBeadworkData]);

      router.push(`/beadwork/${newBeadworkId}`);
    }
  };
  return (
    <Wrapper onClick={createBeadwork}>
      <CreateIcon size={24} />
    </Wrapper>
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
  background-color: #dec000;

  &:hover {
    cursor: pointer;
    transform: scale(1.1);
    transition: transform 0.3s ease-in-out;
  }
`;
