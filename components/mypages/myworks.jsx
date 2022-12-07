import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { AiFillEdit as EditIcon } from 'react-icons/ai';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
  beadworkModifyModalAtom,
  currentBeadworkInfoAtom,
  myBeadworkInfoAtom,
} from '../../recoilstore/atoms';

export default function MyWorks() {
  const router = useRouter();

  const setCurrentBeadworkData = useSetRecoilState(currentBeadworkInfoAtom);
  const setBeadworkModifyModal = useSetRecoilState(beadworkModifyModalAtom);

  const myBeadworkData = useRecoilValue(myBeadworkInfoAtom);

  const toBeadworkPage = (e, beadworkId) => {
    e.stopPropagation();
    router.push(`/beadwork/${beadworkId}`);
  };

  const editHandler = (e, beadworkId, beadwork) => {
    e.stopPropagation();
    setCurrentBeadworkData(beadwork);
    setBeadworkModifyModal(true);
  };

  return (
    <Wrapper>
      <h2>My beadworks list</h2>
      <Ol>
        {myBeadworkData &&
          myBeadworkData?.map(beadwork => {
            const { _id: beadworkId } = beadwork;
            const time = beadwork.createdAt.split(/[T.]/g);

            return (
              <Li key={beadworkId} onClick={e => toBeadworkPage(e, beadworkId)}>
                <ListWrapper>
                  <Info>
                    <div className="contentsTitle">{beadwork.title}</div>
                    <div className="contentsDescription">
                      {beadwork.description}
                    </div>
                    <div className="contentsBy">
                      {`by ${beadwork.author.username} created at ${time[0]}, ${time[1]}`}
                    </div>
                  </Info>
                  <Edit onClick={e => editHandler(e, beadworkId, beadwork)}>
                    <EditIcon size={24} />
                  </Edit>
                </ListWrapper>
              </Li>
            );
          })}
      </Ol>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  height: 100%;
  overflow-y: scroll;

  padding-left: 5px;
  padding-right: 5px;
`;

const Ol = styled.ol`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  width: 100%;
  height: 100%;
  overflow-y: scroll;
`;

const Li = styled.li`
  width: 90%;
  border: 3px solid black;
  border-radius: 5px;
  margin: 3px;

  @media (max-width: 1199px) {
    width: 70%;
  }

  &:hover {
    cursor: pointer;
    transform: scale(1.05);
    transition: transform 0.3s ease-in-out;
  }
`;

const ListWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;

  width: 80%;

  .contentsTitle {
    font-size: 1.2rem;
    font-weight: 700;
  }

  .contentsDescription {
    font-size: 1rem;
    font-weight: 500;
  }

  .contentsBy {
    font-size: 0.8rem;
    font-weight: 300;
  }
`;

const Edit = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  margin: 10px;

  &:hover {
    cursor: pointer;
    background-color: white;
    border: 1px solid gray;
    border-radius: 10px;
    transform: scale(1.1);
    transition: transform 0.3s ease-in-out;
  }
`;
