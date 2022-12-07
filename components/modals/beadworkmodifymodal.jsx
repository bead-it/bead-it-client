import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import CustomInputModal from '../molecules/customInputModal';

import apiErrorHandler from '../../service/apierrorhandler';

import { patchBeadworkData } from '../../service/beadworkapi';
import {
  beadworkModifyModalAtom,
  currentBeadworkInfoAtom,
  inputModalAtom,
  myBeadworkInfoAtom,
  tokenInfoAtom,
} from '../../recoilstore/atoms';
import { userInfoSel } from '../../recoilstore/seletors';

export default function BeadworkModifyModal() {
  const router = useRouter();

  const [beadworkModifyModal, setBeadworkModifyModal] = useRecoilState(
    beadworkModifyModalAtom,
  );
  const [token, setToken] = useRecoilState(tokenInfoAtom);
  const [currentBeadworkData, setCurrentBeadworkData] = useRecoilState(
    currentBeadworkInfoAtom,
  );

  const setInputModal = useSetRecoilState(inputModalAtom);
  const setMyBeadworkData = useSetRecoilState(myBeadworkInfoAtom);

  const user = useRecoilValue(userInfoSel);

  useEffect(() => {
    if (beadworkModifyModal) {
      setInputModal(true);
    }
  }, [beadworkModifyModal]);

  const modifyBeadwork = async (title, description) => {
    const { _id: currentBeadworkId } = currentBeadworkData;

    const patchedConfirm = await apiErrorHandler(
      async () => {
        const response = await patchBeadworkData(
          user.id,
          currentBeadworkId,
          token,
          { title, description },
        );
        return response;
      },
      errorResult => {
        window.alert(errorResult.message);
        return null;
      },
      { setToken, router },
    );

    if (!patchedConfirm) {
      return;
    }

    setCurrentBeadworkData(prev => {
      return { ...prev, title, description };
    });

    setMyBeadworkData(prev => {
      if (!prev) {
        return null;
      }

      let index;
      let newBeadwork;

      console.log(prev);

      prev.forEach((beadwork, i) => {
        const { _id: beadworkId } = beadwork;
        if (beadworkId === currentBeadworkId) {
          index = i;
          newBeadwork = { ...beadwork, title, description };
        }
      });

      if (!index) {
        console.error('No matched beadworkId in current beadworks data.');
        return prev;
      }

      return [...prev.slice(0, index), newBeadwork, ...prev.slice(index + 1)];
    });

    setBeadworkModifyModal(false);
    setInputModal(false);
  };

  return (
    beadworkModifyModal && (
      <CustomInputModal
        message="Input title and description below to modify."
        name1="Title"
        name2="Description"
        defaultValue1={currentBeadworkData.title}
        defaultValue2={currentBeadworkData.description}
        submitHandler={modifyBeadwork}
        cancleHandler={() => {
          setBeadworkModifyModal(false);
        }}
      />
    )
  );
}
