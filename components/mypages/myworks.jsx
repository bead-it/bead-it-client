import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { tokenInfoAtom } from '../../recoilstore/atoms';
import { userInfoSel } from '../../recoilstore/seletors';
import apiErrorHandler from '../../service/apierrorhandler';
import { getUserData } from '../../service/userapi';

export default function MyWorks() {
  const currentUserData = useRecoilValue(userInfoSel);
  const [token, setToken] = useRecoilState(tokenInfoAtom);
  const [myData, setMyData] = useState({});

  const router = useRouter();

  useEffect(() => {
    const getUserInfoFetching = async () => {
      const userData = await apiErrorHandler(
        async () => {
          const response = await getUserData(currentUserData.id, token);
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

      if (userData) {
        setMyData(userData);
      }
    };

    if (currentUserData && token) {
      getUserInfoFetching();
    }
  }, [currentUserData, token]);

  const toBeadworkPage = (e, beadworkId) => {
    e.stopPropagation();
    router.push(`/beadwork/${beadworkId}`);
  };

  return (
    <Wrapper>
      <h2>My beadworks list</h2>
      <List>
        {myData &&
          myData.myBeadworks?.map(beadwork => {
            const { _id: beadworkId } = beadwork;
            const time = beadwork.createdAt.split(/[T.]/g);

            return (
              <Li key={beadworkId} onClick={e => toBeadworkPage(e, beadworkId)}>
                <ListWrapper>
                  <div className="contentsTitle">{beadwork.title}</div>
                  <div className="contentsDescription">
                    {beadwork.description}
                  </div>
                  <div className="contentsBy">
                    {`by ${beadwork.author.username} created at ${time[0]}, ${time[1]}`}
                  </div>
                </ListWrapper>
              </Li>
            );
          })}
      </List>
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

const List = styled.ol`
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
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;

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
