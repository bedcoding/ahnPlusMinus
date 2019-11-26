import React from "react";
import { useState } from 'react';  // 텍스트 input을 위해 삽입 https://velog.io/@velopert/react-hooks
import { useRef } from 'react';    // 마우스 자동 포커스 기능을 위해 삽입
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
  const [inputCount, setInputCount] = useState('');   // 입력창은 공백으로 초기화

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



  // 3. 추가한 기능: 리셋을 누를 경우 useRef()를 통해 마우스 포커스를 맞춘다.
  // 화요일에 벨로퍼트의 인터넷 강의를 보다가 알게 되어 추가
  const inputFocus = useRef();
  const resetClick = () => {
    resetCount(0);     // 화면에 표시된 카운터 초기화
    setInputCount('');  // 내가 입력한 숫자 초기화
    inputFocus.current.focus();   // 자동으로 마우스 포커스 맞추기
  }

  // onClick 함수에 여러개의 이벤트를 넣어야 해서 '리액트 onclick 함수 두개'로 구글링해서 수정했다
  // https://code-examples.net/ko/q/18dc8f6
  const focus = () => {
    inputFocus.current.focus();
  }


  return (
    <Root>
      <NumberBoard>
        <NumberSpan> {presentCount} </NumberSpan>
      </NumberBoard>
      
      <InputBoard>
        <Input type="number" value={inputCount} onChange={onChangeInputCount} ref={inputFocus} />
      </InputBoard>

      <ButtonBoard>
        {/* 희안하게도 더하기(+)를 할 때 자꾸 문자열로 더해지는 문제가 있어서 구글링해보니 Number(inputCount) 이렇게 바꾸라길래 그렇게 수정했다 */}
        {/* https://gomakethings.com/converting-strings-to-numbers-with-vanilla-javascript/ */}
        <CircleButton onClick={ function() { undoCount(); focus(); }} disabled={!canUndo}> Undo </CircleButton>
        <CircleButton key="increment" onClick={() => setCount(presentCount + Number(inputCount))}> + </CircleButton>
        <CircleButton key="decrement" onClick={() => setCount(presentCount - inputCount)}> - </CircleButton>
        <CircleButton onClick={ function() { redoCount(); focus(); } } disabled={!canRedo}> Redo </CircleButton>
        {/* <CircleButton onClick={() => resetCount(0)}> reset </CircleButton> */}
        <CircleButton onClick={resetClick}> reset </CircleButton>
      </ButtonBoard>
    </Root>
  );
};

export default App;
