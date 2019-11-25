import React from "react";
import { useState } from 'react';  // https://velog.io/@velopert/react-hooks
import "reset-css";
import styled from "styled-components";
import useUndo from 'use-undo';  // 실행취소&다시실행 : https://reactjsexample.com/undo-redo-functionality-with-react-hooks/

const Root = styled.div`
  height: 100vh;
  background-color: #dbdbdb;
  display: flex;
  flex-direction: column;
`;

const NumberBoard = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: flex-end;
`;

const NumberSpan = styled.span`
  display: flex;
  flex: 1;
  font-size: 100px;
  font-weight: 600;
  color: olive;
  align-items: center;
  justify-content: center;
`;

const InputBoard = styled.div`
  display: flex;
  flex: 0.5;
  align-items: center;
  justify-content: space-around;
`;

const Input = styled.input`
  flex: 0.5;
  font-size: 30px;
  text-align: right;
`;

const ButtonBoard = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

const CircleButton = styled.button`
  color: white;
  background-color: ${props => (props.disabled ? "darkgray" : "gray")};
  height: 100px;
  width: 100px;
  border-radius: 50%;
  cursor: ${props => (props.disabled ? "not-allowed" : "pointer")};
  border: 0px;
  outline: none;
  margin-left: 10px;
  font-size: 25px;

  &:hover {
    opacity: ${props => (props.disabled ? 1 : 0.5)};
  }

  &:first-child {
    margin: 0;
  }
`;



const App = () => {

  // 1. 클래스형이 아닌 함수형에서 input 하기
  // 출처: https://velog.io/@velopert/react-hooks
  const [inputCount, setInputCount] = useState(0);  // 위 예제에서는 초기값에 ''을 넣었던데, 실행해보니 문자열로 인식하길래 useState number로 구글링해보니 초기값에 0을 넣길래 나도 따라 넣어줌

  const onChangeInputCount = e => {
    setInputCount(e.target.value);
  };


  // 2. 실행 취소 & 다시 실행 기능
  // 출처: https://reactjsexample.com/undo-redo-functionality-with-react-hooks/
  const [
    ButtonPackage,
    {
      set: setCount,
      reset: resetCount,
      undo: undoCount,
      redo: redoCount,
      canUndo,
      canRedo,
    },
  ] = useUndo(0);

  const { present: presentCount } = ButtonPackage;
  // --------------- 실행 취소 & 다시 실행 기능 끝 ---------------


  return (
    <Root>
      <NumberBoard>
        <NumberSpan> {presentCount} </NumberSpan>
      </NumberBoard>
      
      <InputBoard>
        <Input type="number" value={inputCount} onChange={onChangeInputCount} />
      </InputBoard>

      <ButtonBoard>
        {/* 희안하게도 더하기(+)를 할 때 자꾸 문자열로 더해지는 문제가 있어서 구글링해보니 Number(inputCount) 이렇게 바꾸라길래 그렇게 수정했다 */}
        {/* https://gomakethings.com/converting-strings-to-numbers-with-vanilla-javascript/ */}
        <CircleButton onClick={undoCount} disabled={!canUndo}> Undo </CircleButton>
        <CircleButton key="increment" onClick={() => setCount(presentCount + Number(inputCount))}> + </CircleButton>
        <CircleButton key="decrement" onClick={() => setCount(presentCount - inputCount)}> - </CircleButton>
        <CircleButton onClick={redoCount} disabled={!canRedo}> Redo </CircleButton>
        <CircleButton onClick={() => resetCount(0)}> reset </CircleButton>
      </ButtonBoard>
    </Root>
  );
};

export default App;
