import React from 'react';
import { Button } from 'grommet';
import { Add, Subtract } from 'grommet-icons';
import styled from 'styled-components';

type ButtonType = {
  type: 'plus' | 'minus';
  onPress?: Function;
  isDisabled?: boolean
}
const ButtonRound = ({ type, onPress, isDisabled }: ButtonType) => {
  let buttonIcon = undefined;
  if (type === 'plus') {
    buttonIcon = <Add color="white" />;
  }
  if (type === 'minus') {
    buttonIcon = <Subtract color="white" />;
  }

  return (<Button
    className={`button-round button-round-${type}`}
    onClick={() => onPress && onPress()}
    icon={buttonIcon}
    disabled={isDisabled}
  />);
}

export default ButtonRound;

const StyledButton = styled.button`
  all: unset;
  width: 50px;
  height: 50px;
  background: #171f5c;
  color: #fff;
  border-radius: 50%;
  cursor: pointer;
`;
