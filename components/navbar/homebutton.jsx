import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { AiFillHome as HomeIcon } from 'react-icons/ai';

export default function HomeButton() {
  const router = useRouter();

  const toHomePage = e => {
    e.stopPropagation();

    router.push('/');
  };

  return (
    <Wrapper onClick={toHomePage}>
      <HomeIcon size={40} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  height: 50px;

  padding-left: 5px;
  padding-right: 5px;

  &:hover {
    cursor: pointer;
    background-color: #dec000;
    border: 1px solid gray;
    border-radius: 5px;
    transform: scale(1.05);
    transition: background-color 0.3s ease-in-out;
  }
`;
