import React, { useState } from 'react';
import { Table } from 'react-bootstrap';
import { connect, useDispatch, useSelector } from 'react-redux';

function Cart(props) {

  let state = useSelector((state) => state);
  let dispatch = useDispatch();

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
            state.reducer.map((a, i) => {
              return (
                <tr key={i}>
                  <td>{a.id}</td>
                  <td>{a.name}</td>
                  <td>{a.quan}</td>
                  <td>
                    <button onClick={() => {
                      dispatch({ type: '수량증가', payload : { name : 'kim' } })
                    }}>+</button>
                    &nbsp;
                    <button onClick={() => {
                      dispatch({ type: '수량감소' })
                    }}>-</button>
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </Table>

      { props.alert === true
        ?(
          <div className="my-alert2">
            <p>지금 구매하시면 신규할인 20%</p>
            <button onClick={()=>{
              props.dispatch({ type: 'alertClose' })
            }}>닫기</button>
          </div>
        )
        : null
      }

    </div>
  )
}

/* function toProps(state) {
  return {
    state: state.reducer,
    alert: state.reducer2
  }
}

export default connect(toProps)(Cart) */

export default Cart;
