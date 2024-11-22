import React, {useState} from "react";
import OrderDetail from "./OrderDetail.jsx";

const DisplayOrders = ({orders, updateOrderStatus}) => {

  const statusClassMap = {
     received: "received",
     preparing:"preparing",
     ready:"ready",
     delivery:"delivery",
     completed:"completed"
  }
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
                  statusClassMap[order.status]
                  }>{order.status}</span></div>
                {order.status === "received" && <button onClick={()=>updateOrderStatus(order.id,"preparing")}className="operation-btn">Start to Prepare</button>}
                {order.status === "preparing" && <button onClick={()=>updateOrderStatus(order.id,"ready")} className="operation-btn">All Ready To Deliver</button>}
                {order.status === "ready" && <button onClick={()=>updateOrderStatus(order.id,"delivery")}className="operation-btn">Delivery</button>}
                {order.status === "delivery" && <button onClick={()=>updateOrderStatus(order.id,"completed")}className="operation-btn">Complete</button>}
              </div>
              <div className="order-items-info">
                <OrderDetail order_id={order.id} />
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