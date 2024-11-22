const {addOrder, getActiveOrders, getOrderByID, updateOrderStatus, getLastOrder} = require ('../repository/orders.js');

let newOrderID;
module.exports.addOrder = (req, res) => {

   const order = {customerName: req.body.customerName, email:req.body.email, address:req.body.address, phoneNumber:req.body.phoneNumber};
   const orderItems = req.body.items;
   addOrder(order, orderItems)
    .then((result) => {

      newOrderID = result;
      res.status(201).send(`${result}`);
    })
    .catch((err) => {
      res.status(400).send(err);
    })

}

module.exports.getActiveOrders = (req, res) => {

  getActiveOrders()
    .then((result) => {
      res.status(201).send(result);
    })
    .catch((err) => {
      res.status(400).send(err);
    })
}

module.exports.getOrderByID = (req, res) => {
  getOrderByID(req.params.id)
  .then((result) => {
    res.status(201).send(result);
  })
  .catch((err) => {
    res.status(400).send(err);
  })
}

module.exports.updateOrderStatus = (req, res) => {
  updateOrderStatus(req.params.id, req.body.status)
    .then((result) => {
      res.status(201).send("status is updated successfully");
    })
    .catch((err) => {
      res.status(400).send(err);
    })

}
module.exports.getLastOrder = (req, res) => {

  getLastOrder()
    .then((result) => {
      res.status(201).send(result);
    })
    .catch((err) => {
      res.status(400).send(err);
    })
}

module.exports.sendOrder = (req, res) => {
  console.log("newOrderID is", newOrderID);
  const interval = setInterval(() => {

  })
};
