import React, { useState, useEffect, useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Navbar, Container, NavDropdown, Nav, Button } from 'react-bootstrap';
import styled from 'styled-components';
import './Detail.scss';
import {stockContext} from './App';
import { connect } from 'react-redux';

import { CSSTransition } from "react-transition-group";

let 박스 = styled.div`
  padding : 20px;
`;

let 제목 = styled.h4`
  font-size : 25px;
  color : ${ props => props.색상 }
`;

  /* //예전 훅 코드 */
  class Detail2 extends React.Component {
    componentDidMount(){
      /* Detail2 컴포넌트가 Mount 되었을 때 실행할 코드 ~ */
    }

    componentWillUnmount(){
      /* Detail2 컴포넌트가 Unmount 되기 직전에 실행할 코드 ~ */ 
    }
  }


function Detail(props) {

  /* //요즘 훅 코드 */
  useEffect( () => {
    /* ㄴ컴포넌트가 mount 되었을 때,
    컴포넌트가 update 될 때,
    특정 코드를 실행 할 수 있음. */

    /* 훅2 : 컴포넌트가 사라질 때 코드를 실행시킬 수도 있다. 방법 :
    return function NAME (){ 실행할 코드 } */

    setTimeout( () => {
      alertSet(false);
    },2000);
  }, []);
  /* ㄴ alert라는 state가 변경이 될 때만 실행시킴.
  공백 일 경우, 아무것도 없는 '' state가 변경이 될 때만 실행시킴. = (처음 페이지가 로드되고 나서만 실행.) */
  
  let [alert, alertSet] = useState(true);
  let [inputData, inputDataSet] = useState('');
  let [clickedTab, clickedTabSet] = useState(0);
  let [aniSwitch, aniSwitchSet] = useState(false);

  let stock = useContext(stockContext);

  let { id } = useParams();
  let history = useHistory();
  let findedShoes = props.shoes.find(function(a){
    return a.id == id
  })

  return (
    <div className="container">
      <박스>
        <제목 className="red" >Detail</제목>
      </박스>
      <input onChange={ (e) => { inputDataSet(e.target.value) } } />
      <p>{ inputData }</p>
      {
        alert === true
        ? (
          <div className="my-alert2" id="alertBox">
            <p>재고가 얼마 남지 않았습니다.</p>
          </div>
        )
        : null
      }
      <div className="row">
        <div className="col-md-6">
          <img src="https://codingapple1.github.io/shop/shoes1.jpg" width="100%" />
        </div>
        <div className="col-md-6 mt-4">
          <h4 className="pt-5">{findedShoes.title}</h4>
          <p>{findedShoes.content}</p>
          <p>{findedShoes.price}원</p>

          <Info stock={ props.stock }></Info>

          <button className="btn btn-danger" onClick={()=>{
            props.dispatch({ type : '항목추가', payload :  { id : 4, name : '초록신발', quan : 1 } });
            history.push('/cart');
          }}>주문하기</button>
          &nbsp;
          <button className="btn btn-danger" onClick={ () => {
            history.push('/');
            /* ㄴ특정 경로로 이동하려면 history.push('/경로'); */
          }}>뒤로가기</button>
        </div>
      </div>

      <Nav className="mt-5" variant="tabs" defaultActiveKey="link-0">
        <Nav.Item>
          <Nav.Link eventKey="link-0" onClick={()=>{
            aniSwitchSet(false);
            clickedTabSet(0)
          }}>상품설명</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-1" onClick={()=>{
            aniSwitchSet(false);
            clickedTabSet(1)
          }}>배송정보</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-2" onClick={()=>{
            aniSwitchSet(false);
            clickedTabSet(2)
          }}>사이즈</Nav.Link>
        </Nav.Item>
      </Nav>

      {/* ===== 탭 내용 ===== */}
      <CSSTransition in={ aniSwitch } classNames="appear" timeout={ 500 }>
        <TabContent clickedTab={ clickedTab } aniSwitchSet={aniSwitchSet} />
      </CSSTransition>
      {/* ===== /탭 내용 ===== */}
    </div>
  )
}

function TabContent(props){

  useEffect(()=>{
    props.aniSwitchSet(true);
  });

  if (props.clickedTab === 0) {
    return <div>0번째 내용입니다.</div>
  }else if (props.clickedTab === 1) {
    return <div>1번째 내용입니다.</div>
  }else if (props.clickedTab === 2) {
    return <div>2번째 내용입니다.</div>
  }
}

function Info(props){
  return (
    <p>재고 : { props.stock[0]}개</p>
  )
}

function toProps(state) {
  return {
    state: state.reducer,
    alert: state.reducer2
  }
}

export default connect(toProps)(Detail)
// export default Detail;