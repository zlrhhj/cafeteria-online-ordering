import React, {useState, useEffect,setShowStatus} from "react";

const OrderStatus = ({trackOrder, onClose}) => {
  const [id, setId] = useState("");
  const [order, setOrder] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [currentStatus, SetCurrentStatus] = useState("");
  const statuses = ['received', 'preparing', 'ready', 'delivery', 'completed'];

  return <div className="order-status-modal">
    <div className="status-modal">
      <button class="top-right-button" onClick={onClose}>X</button>
      <h1> Track Your Order Status</h1>

      <div className="status-track">
        <div className="order-id-input">
          <label>Please input your order ID :</label>
          <input type="text" onChange={(e)=>setId(e.target.value)}/>
          <button type="button" className="close-status-btn"onClick={()=>{
          setOrder(null);
          trackOrder(id, setOrder, setShowResult)

          }}>Track</button>

        </div>
        <div className="progress-container">
        {
          showResult ?
          order ?

          <div className="progress-bar">
            {statuses.map((status, index) => (
              <div key={index} className="progress-step">
                <div className={`status-circle ${index <= statuses.indexOf(order.status) ? 'active' : ''}`}>
                  {index + 1}
                </div>
                <div className="status-label">{status}</div>
                {index < statuses.length - 1 && (
                <div className={`progress-line ${index < statuses.indexOf(order.status) ? 'active' : ''}`}> </div>
                )}
              </div>
            ))}
          </div>
          :
          <div className="message-box">
          <p > your order is not existed, please input the right Order ID!</p>
          </div>
          : <></>
        }
        </div>
      </div>
    </div>

  </div>
}

export default OrderStatus;