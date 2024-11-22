import React, {useEffect, useState} from "react";
import axios from "axios";
import DisplayOrders from "./DisplayOrders.jsx";
import NewOrderAlert from "./NewOrderAlert.jsx";
const App = () => {
  const [orders, SetOrders] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [newOrders, setNewOrders] = useState([]);
  const [showNew, setShowNew] = useState(false);


  const getAllActiveOrders = () => {
    axios.get("http://localhost:5000/orders")
      .then((response)=> {
        SetOrders(response.data);
        console.log("getAllActiveOrders ",response.data)
      })
      .catch((err) => {
        console.log(err);
      })
  }

  useEffect(()=>{
    getAllActiveOrders();
    const ws = new WebSocket('ws://localhost:8080');

    ws.onmessage = (event) => {
      const newOrderId = JSON.parse(event.data);
      console.log(newOrderId);
    }
    return () => ws.close();
  },[]);

  const updateOrderStatus = (order_id, status) => {
    if(status === "completed") {
      setCompleted([...completed, {id:order_id, status:status}]);
    }
    axios.put(`http://localhost:5000/orders/${order_id}`,{status: status})
    .then((response) => {
      getAllActiveOrders()
    })
    .catch((err) => {
      console.log(err);
    })
  }
  return <>
  <div className="app">
    <div className="title-container">
      <h1>Sundevil Cafeteria Online Ordering System Order Operating </h1>
      {
        showNew && <button>New Order Coming </button>
      }

    </div>
    <div className="divider"></div>

    <div>
      {
        <DisplayOrders orders={orders} updateOrderStatus={updateOrderStatus}/>
      }
    </div>
    <div className="completed-orders-container">
    <h1>Completed Orders</h1>
    </div>


    <div>
      {completed.length > 0 ?
          completed.map((order) => {
            return (
              <div>{order.id}</div>
            )
          })
        :
        <></>
      }

    </div>
  </div>
  </>
}
export default App;