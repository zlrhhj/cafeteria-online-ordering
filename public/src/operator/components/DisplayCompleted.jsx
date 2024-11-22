import React, {useState} from "react";


const DisplayCompleted = ({orders}) => {


  return <>
    <div className="orders-container">
      {
        orders.length > 0 ?
        orders.map((order, index) => {
          return (
            <div className="order" key={index}>
              <div className = "order-info">
                <div className="order-id">Order ID: {order.id}</div>
                <div className="order-status"><span className={
                  "completed"
                  }>{order.status}</span></div>
              </div>

            </div>
          )
        })
        :
        <h1>No order Yet</h1>
      }
    </div>
  </>
}
export default DisplayOrders;