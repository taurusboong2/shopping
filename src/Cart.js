import React, { useState } from 'react';
import { Table } from 'react-bootstrap';
import { connect } from 'react-redux';

function Cart(props) {

  let [cartData, cartDataSet] = useState(props.state);

  return (
    <div>
      <Table responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>상품명</th>
            <th>수량</th>
            <th>변경</th>
          </tr>
        </thead>
        <tbody>
          {
            cartData.map((a, i)=>{
              return <CartList cartData={ a } i={ i } key={ i } />
            })
          }
        </tbody>
      </Table>
    </div>
  )
}

function CartList(props) {

  return (
    <tr>
      <td>{ props.cartData.id }</td>
      <td>{props.cartData.name}</td>
      <td>{props.cartData.quan}</td>
      <td><button className="btn btn-primary">주문하기</button></td>
    </tr>
  )
}

function toProps(state) {
  return {
    state: state
  }
}

export default connect(toProps)(Cart)
//export default Cart;
