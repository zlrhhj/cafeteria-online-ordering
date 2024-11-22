import React, {useState, useEffect} from "react";

const PlaceOrder = ({cart, onClose, placeOrder,setName, setAddress, setEmail, setPhoneNumber}) => {

  const [paymentInfo, setPaymentInfo] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Order Placed with details : ', {name, phoneNumber, address, paymentInfo});
    onClose();
  }
  return (
    <div className="modal-overlay">
      <div className="place-order-modal">
        <button className="close-button" onClick={onClose}>X</button>
        <h1> Check Out</h1>
        <div className="order-info">
          <ol>
            <li className="order-item-info">
              <div className="item-name">Name</div>
              <span className="order-item-quantity"> Quantity</span>
              <div className="item-price">Price($)</div>
            </li>

          {cart.map((item, index) => {
            return <li key={index} className="order-item-info">
              <div className="item-name">{item.name}</div>

              <span className="order-item-quantity"> x{item.quantity}</span>
              <div className="item-price">${item.price * item.quantity}</div>

            </li>
          })}
          </ol>
          <p>Total: ${cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}</p>
          <div className="customer-info" >
            <div className="info customer-name">
              <label>Name: </label>
              <div className="input-text"><input onChange={(e)=>setName(e.target.value)} required></input></div>
            </div>

            <div className="info phone-number">
              <label>Phone Number:</label>
              <div className="input-text"><input onChange={(e)=>setPhoneNumber(e.target.value)} required></input></div>
            </div>
            <div className="info">
              <label>Email:</label>
              <div className="input-text"><input onChange={(e)=>setEmail(e.target.value)} required></input></div>
            </div>
            <div className="info">
              <label>Address:</label>
              <div className="input-text"><input onChange={(e) => setAddress(e.target.value)} required></input></div>
            </div>

            <div className="btn-container">
              <div className="cancel-btn-container"><button className="cancel-btn" type="button" onClick={onClose}>Bact to Cart</button></div>
              <div className="place-btn-container"><button className="place-btn" type="button" onClick={placeOrder} >Place Order</button></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlaceOrder;