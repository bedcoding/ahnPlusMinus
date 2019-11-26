import React from "react";
import { useState } from 'react';  // 텍스트 input을 위해 삽입 https://velog.io/@velopert/react-hooks
import { useRef } from 'react';    // 마우스 자동 포커스 기능을 위해 삽입
import "reset-css";
import styled from "styled-components";
import useUndo from 'use-undo';  // 실행취소&다시실행 : https://reactjsexample.com/undo-redo-functionality-with-react-hooks/

// 애니메이션 추가 ( https://reactjsexample.com/react-component-for-interactive-backgrounds/ )
import Sky from './components/sky/sky';
import './App.css';

// 두번째 추가
import InputBox from "./InputBox";


const Root = styled.div`
  height: 100vh;
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
  color: #00AAF0;
  align-items: center;
  justify-content: center;
`;

const InputBoard = styled.div`
  display: flex;
  flex: 0.5;
  align-items: center;
  justify-content: space-around;
`;

// 숨겨진 input 창!! 
// 1. 애니메이션이 적용된 input 창에 마우스 포커스가 되지 않아서 화면 밖에 몰래 input 창을 만들었다.
// 2. 애니메이션이 적용된 input 창에 텍스트를 입력하면, 화면 밖에 몰래 심어둔 input 창에도 같이 입력이 된다. (사용자의 눈에만 안보일뿐)
// 3. 이후 버튼을 누를 때마다 숨겨진 input 창에 자동으로 포커스가 맞춰지고, 
// 사용자가 숫자를 입력하면 숨겨진 input 창에 텍스트가 입력되는 동시에 애니메이션이 적용된 input 창에도 해당 텍스트가 덩달아 같이 입력된다.
const Input = styled.input`
  flex: 0;
  font-size: 0px;
  position: relative;
  bottom: 999999999999999px;
`;

const ButtonBoard = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

/* 
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
*/


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


  // 3. 추가한 기능: 버튼을 누를 경우 useRef()를 통해 마우스 포커스를 맞춘다.
  // 화요일에 벨로퍼트의 인터넷 강의를 보다가 알게 되어 추가
  // [삭제] input 창에 애니메이션을 넣었는데 문제는 해당 애니메이션도 포커스를 사용해야 되서 둘이 충돌이 발생 -> 결국 이걸 포기
  const inputFocus = useRef();
  const resetClick = () => {
    resetCount(0);     // 화면에 표시된 카운터 초기화
    setInputCount('');  // 내가 입력한 숫자 초기화
    focus();   // 자동으로 마우스 포커스 맞추기
  }

  // onClick 함수에 여러개의 이벤트를 넣어야 해서 '리액트 onclick 함수 두개'로 구글링해서 수정했다
  // https://code-examples.net/ko/q/18dc8f6
  const focus = () => {
    inputFocus.current.focus();
  }


  // 4. 애니메이션 추가 (https://reactjsexample.com/react-component-for-interactive-backgrounds/)
  // 원본은 함수형이 아니라 class형으로 되어 있어서 constructor와 state를 어떻게 함수형으로 바꿔야 할지 구글링을 했다.

  // - react function constructor로 구글링: https://stackoverflow.com/questions/44263915/how-to-specify-a-constructor-with-a-functional-component-fat-arrow-syntax
  // - 이후 useState 여러번으로 구글링해보니 state 값이 여러개면 useState도 여러번 선언해줘야 한다는 벨로포트 글을 보고 수정해주었다.
  let [mode, setMode] = useState('main');
  let [background, setBackground] = useState('FEFDFD');
  let [how, setHow] = useState(100);



  // 더하기(+) 버튼을 누른 경우
  let plusHandleClick = (e) => {

    // 1. 배경 애니메이션을 변경해준다.
    setMode(e.target.value);
    setHow(e.target.attributes.how.value);
    setBackground(e.target.attributes.background.value);

    // 2. 더한 값을 넣어준 뒤, 마우스 포커스를 맞춰준다.
    // 더하기(+)를 할 때 자꾸 문자열로 더해지는 문제가 있어서 구글링 후 Number(inputCount)로 변경 */}
    // https://gomakethings.com/converting-strings-to-numbers-with-vanilla-javascript/
    setCount(presentCount + Number(inputCount));  
    focus();
  }


  // 마이너스(-) 버튼을 누른 경우
  let minusHandleClick = (e) => {

    // 1. 배경 애니메이션을 변경해준다.
    setMode(e.target.value);
    setHow(e.target.attributes.how.value);
    setBackground(e.target.attributes.background.value);

    // 2. 뺀 값을 넣어준 뒤, 마우스 포커스를 맞춰준다.
    setCount(presentCount - Number(inputCount));  
    focus();
  }


  // Redo 버튼을 누른 경우
  let undoHandleClick = (e) => {

    // 1. 배경 애니메이션을 변경해준다.
    setMode(e.target.value);
    setHow(e.target.attributes.how.value);
    setBackground(e.target.attributes.background.value);

    // 2. Undo를 해준 뒤, 마우스 포커스를 맞춰준다.
    undoCount(); 
    focus();
  }
  

  // Redo 버튼을 누른 경우
  let redoHandleClick = (e) => {

    // 1. 배경 애니메이션을 변경해준다.
    setMode(e.target.value);
    setHow(e.target.attributes.how.value);
    setBackground(e.target.attributes.background.value);

    // 2. Redo를 해준 뒤, 마우스 포커스를 맞춰준다.
    redoCount(); 
    focus();
  }


  // reset 버튼을 누른 경우
  let resetHandleClick = (e) => {

    // 1. 배경 애니메이션을 변경해준다.
    setMode(e.target.value);
    setHow(e.target.attributes.how.value);
    setBackground(e.target.attributes.background.value);

    // 2. reset을 해준 뒤, 마우스 포커스를 맞춰준다.
    resetClick();
    focus();
  }


  const modes = {
    main: {
      0: 'http://www.joseilbo.com/gisa_img_origin/15540824801554082480_rozzhj_origin.jpg',
      1: 'http://img.etnews.com/photonews/1601/766864_20160125133935_199_0001.jpg' ,
    },  
    plus: {
      0: 'https://image.flaticon.com/icons/svg/1828/1828817.svg',
      1: 'https://image.flaticon.com/icons/svg/660/660540.svg',
    },
    minus: {
      0: 'https://image.flaticon.com/icons/svg/992/992514.svg',
      1: 'https://image.flaticon.com/icons/svg/660/660538.svg'
    },
    redo: {
      0: 'https://image.flaticon.com/icons/svg/889/889578.svg',
      1: 'https://image.flaticon.com/icons/svg/1276/1276482.svg'
    },
    undo: {
      0: 'https://image.flaticon.com/icons/svg/889/889590.svg',
      1: 'https://image.flaticon.com/icons/svg/1276/1276491.svg'
    },
    reset: {
      0: 'https://image.flaticon.com/icons/svg/390/390029.svg',
      1: 'https://image.flaticon.com/icons/svg/953/953898.svg'
    }
  }


  return (
    <Root>

      {/* 화면 밖으로 숨긴 유령 input 창: 이곳에 마우스 포커스가 맞춰지면서 사용자가 클릭을 하지 않아도 숫자 입력이 계속 가능하도록 꼼수를 부림 */}
      <Input type="number" value={inputCount} onChange={onChangeInputCount} ref={inputFocus} />
      {/* 애니메이션 적용된 ↓ 아래의 진짜 input 창에는 마우스 포커스가 안 맞춰지는 문제가 있어서 이렇게 우회했다; */}


      <NumberBoard>
        <NumberSpan> {presentCount} </NumberSpan>
      </NumberBoard>
      
      <InputBoard>
        <InputBox inputCount={inputCount} onChangeInputCount={onChangeInputCount}></InputBox>
      </InputBoard>
      
      <ButtonBoard>
        <div className="title">
          <button onClick={undoHandleClick} how={50} background={'#2F3939'} value={'undo'} disabled={!canUndo}> Undo  </button>
          <button onClick={plusHandleClick}  key="increment" how={50} background={'#2F3939'} value={'plus'}> + </button>
          <button onClick={minusHandleClick} key="decrement" how={50} background={'#2F3939'} value={'minus'}> - </button>
          <button onClick={redoHandleClick} how={50} background={'#2F3939'} value={'redo'} disabled={!canRedo}> Redo </button>
          <button onClick={resetHandleClick} how={50} background={'#2F3939'} value={'reset'}> reset </button>
        </div>

        <Sky
          images={modes[mode]}
          how={how}
          size="100px"
          time={30}
          background={background}
        />
      </ButtonBoard>
    </Root>
  );
};

export default App;
