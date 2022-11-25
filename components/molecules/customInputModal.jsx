import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useSetRecoilState } from 'recoil';

import { inputModalAtom } from '../../recoilstore/atoms';
import CancleButton from '../atoms/canclebutton';
import Input from '../atoms/input';
import Message from '../atoms/message';
import SubmitButton from '../atoms/submitbutton';
import InputModal from '../modals/inputmodal';

export default function CustomInputModal({
  message,
  name1,
  name2,
  defaultValue1,
  defaultValue2,
  submitHandler,
  cancleHandler,
}) {
  const [input1, setInput1] = useState(defaultValue1);
  const [input2, setInput2] = useState(defaultValue2);
  const setInputModal = useSetRecoilState(inputModalAtom);

  return (
    <InputModal>
      <Message text={message} />
      <Input name={name1} input={input1} setInput={setInput1} />
      {name2 && <Input name={name2} input={input2} setInput={setInput2} />}
      <Buttons>
        <SubmitButton
          clickHandler={e => {
            e.stopPropagation();
            if (name2) {
              submitHandler(input1, input2);
            } else {
              submitHandler(input1);
            }
          }}
        />
        <CancleButton
          clickHandler={e => {
            e.stopPropagation();
            cancleHandler();
            setInputModal(false);
          }}
        />
      </Buttons>
    </InputModal>
  );
}

CustomInputModal.propTypes = {
  message: PropTypes.string.isRequired,
  name1: PropTypes.string.isRequired,
  name2: PropTypes.string,
  defaultValue1: PropTypes.string.isRequired,
  defaultValue2: PropTypes.string,
  submitHandler: PropTypes.func.isRequired,
  cancleHandler: PropTypes.func.isRequired,
};

CustomInputModal.defaultProps = {
  name2: '',
  defaultValue2: '',
};

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;

  width: 95%;
`;
