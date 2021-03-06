import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
/* ㄴ라우팅을 리액트가 아니라 서버에 직접 요청 할 수도 있어서 위험. */
/* import { HashRouter } from 'react-router-dom'; 이것도 가능(주소창에 #이 뜸), 라우팅을 조금 더 안전하게 해줌. #뒤에 적는 것은 서버로 전달되지 않는다. */

import { Provider } from 'react-redux';
import { combineReducers, createStore } from 'redux';

let alertBasic = true;

function reducer2( state = alertBasic, action ) {

  if (action.type === 'alertClose') {
    
    state = false;
    return state;

  }else {

    return state

  }
}

let basicState = [
  { id : 0, name : '멋진신발', quan : 2 },
  { id : 1, name : '회색신발', quan : 8 },
  { id : 2, name : '검정신발', quan : 17 },
  { id : 3, name : '빨강신발', quan : 11 }
];

function reducer(state = basicState, action){
  if ( action.type === '항목추가' ){

    let copy = [...state];
    copy.push( action.payload );
    console.log(copy);
    return copy;

  }else if ( action.type === '수량증가' ) {
    /* ㄴ데이터 수정 조건 */

    let copy = [...state];
    copy[0].quan++;
    return copy

  } else if ( action.type === "수량감소" ) {

    let copy = [...state];
    copy[0].quan--;
    return copy

  } else {

    return state

  }
}

let store = createStore(combineReducers({reducer, reducer2}));
/* ㄴ redux 저장소 */



ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={ store }>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
