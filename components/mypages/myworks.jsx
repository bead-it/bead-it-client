import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';

export default function MyWorks({ myData }) {
  const router = useRouter();

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

MyWorks.propTypes = {
  myData: PropTypes.object.isRequired,
};

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
