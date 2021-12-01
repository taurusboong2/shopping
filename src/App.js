/* eslint-disable */

import React, { createContext, useState, useContext } from 'react';
import { Navbar, Container, NavDropdown, Nav, Button } from 'react-bootstrap';
import './App.css';
import Data from './data';
import Detail from './Detail';
import Cart from './Cart';
import axios from 'axios';

import { Link, Route, Switch } from 'react-router-dom';
/* ㄴSwitch => 중복을 허용하지 않겠다. */

export let stockContext = React.createContext();

function App() {

  let [shoes, setShoes] = useState(Data);
  let [loadingBox, setloadingBox] = useState(true);
  let [stock, setStock] = useState([10,6,23]);

  return (
    <div className="App">
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">Shoe Shop</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link to="/" as={ Link }> Home </Nav.Link>
              <Nav.Link to="/detail" as={ Link }> Detail </Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* ***** Route ***** */}
      <Switch>
        <Route exact path="/">
          <div className="main_banner">
            <h1>20% Season Off</h1>
            <p className="banner_text">
              대박할인 찬스! 얼마 남지 않았습니다. 지금 당장 구매하세요. 물량이 얼마 남지 않았습니다. 어서 빨리 장바구니에 담고 주문을 하세요 당장! RIGHT NOW!
            </p>
            <p>
              <Button variant="primary">More</Button>
            </p>
          </div>
          <div className="container">
            {/* ===== 재고값 공유 ===== */}
            <stockContext.Provider value={ stock }>
            <div className="row">
              {
                shoes.map((a, i) => {
                  return <Card shoes={a} i={i} key={i} />
                })
              }
            </div>
            </stockContext.Provider>
            {/* ===== //재고값 공유 ===== //*/}
            <button className="btn btn-primary" onClick={ () => {
              {
                loadingBox === true
                ? (
                  <div className="loading_box">
                    <button className="btn btn-secondary" >로딩중</button>
                  </div>
                )
                :null
              }

              /* fetch(); 이것도 Ajax 요청 방법. 하지만 json을 객체로 바꿔주지 않는다. */
              axios.get('https://codingapple1.github.io/shop/data2.json')
              .then((result)=>{ 
                setloadingBox(false);
                console.log(result.data);
                setShoes([ ...shoes, ...result.data ])
              })
              .catch(() =>{
                console.log('정보 요청 실패!');
              });
            }}>더보기</button>
          </div>
        </Route>

        <Route path="/detail/:id">
          <stockContext.Provider value={ stock }>
            <Detail shoes={ shoes } stock={ stock } setStock={ setStock } />
          </stockContext.Provider>
        </Route>

        <Route path="/cart">
          <Cart></Cart>
        </Route>
        
      </Switch>
      {/* ***** /Route ***** */}

    </div>
  );
}

function Card(props) {

  let stock = useContext(stockContext);
  
  return (
    <div className="col-md-4">
      <img src={'https://codingapple1.github.io/shop/shoes' + (props.i + 1) + '.jpg'} width="100%" />
      <h4>{props.shoes.title}</h4>
      <p>{props.shoes.content} / {props.shoes.price}원</p>
      <p>재고 : { stock[props.i] }개</p>
    </div>
  )
}

export default App;

