import React, {useState, useEffect} from "react";

const Cart = ({cart, updateQuantity, removeFromCart, handleComponentChange, placeOrder, onClose, checkout}) => {

  return <div className="cart-modal-overlay">
    <div className="cart-modal">
      <button className="close-button" onClick={onClose}>X</button>
      <h1> Your Cart </h1>
    { cart.length === 0 ? (<div>
      <p>Your cart is empty</p>
      <button className="start-order" onClick={onClose}>Start Your Order</button>
      </div>)
      :
      (<>
      <ul>
        {cart.map((item, index) => {
          return <li className="list-item" key={index}>
            <div className="item-name">{item.name}</div>
            <div className="item-price"> ${item.price}</div>
            <div className="quantity-increment">
              <button className="increment-button" onClick={()=>updateQuantity(item.id, -1)}>-</button>
              <span className="item-quantity">{item.quantity}</span>
              <button className="increment-button" onClick={()=>updateQuantity(item.id, 1)}>+</button>
            </div>
            <button className="item-remove-btn" onClick={()=>removeFromCart(item.id)}>Remove</button>
          </li>
        })}
      </ul>
      <p>Total: ${cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}</p>

      <button className="check-out" onClick={() => checkout()}>Checkout</button>
      </>)

    }
    </div>

  </div>
}

export default Cart;