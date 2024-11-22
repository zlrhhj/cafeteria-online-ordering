import React, {useState, useEffect} from "react";

const OrderDetail = ({orderID, address, cartItems, onClose}) => {
  return (
    <div className="modal-overlay">
      <div className="order-summary">
        <button className="close-button" onClick={onClose}>X</button>
        <h1>Order Summary</h1>
        <p>Your order is received</p>
        <div> Order ID is {orderID}</div>
        <ol>
          {cartItems.map((item, index) => {
            return <li key={index}>
              {item.name}
              <span style={{margin: '0 10px'}}> x{item.quantity}</span>
              ${item.price * item.quantity}

            </li>
          })}
        </ol>
        <p>Total: ${cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}</p>
        <div className="summary-btn-container"><button onClick={onClose}>Close</button></div>
      </div>

    </div>
  )
}

export default OrderDetail;