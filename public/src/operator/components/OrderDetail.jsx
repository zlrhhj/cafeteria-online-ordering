import React, {useEffect, useState} from "react";
import axios from "axios";

const OrderDetail = ({order_id}) => {
  const [order, setOrder] = useState({});
  const getOrderDetailById = (id) => {
    axios.get(`http://localhost:5000/orders/${order_id}`)
      .then((response) => {
        console.log(order_id);
        console.log(response)
        setOrder(response.data);
      })
  }
  useEffect(() => {
    getOrderDetailById(order_id)
  }, []);

  return <>

      { order.items && order.items.map ( (item) => {
          return (
            <div className="item-container">
            <div className="item-name"> {item.item_name }</div> <div className="item-quantity">x {item.quantity}</div>
            </div>
          )
      })}

  </>

}

export default OrderDetail;