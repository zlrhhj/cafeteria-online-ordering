const express = require('express');
const path = require('path');
const menuItemController = require('./management/menuitems.js');
const orderController = require('./management/orders.js');

const app = express();
app.use(express.json());

app.use('/customer', express.static(path.join(__dirname, '../public/dist/customer')));
app.use('/operator', express.static(path.join(__dirname, '../public/dist/operator')));
app.use('/manager', express.static(path.join(__dirname, '../public/dist/manager')));

app.get('/menuitems/:category',menuItemController.getAllMenuItemsByCategory);
app.get('/menuitems/:name', menuItemController.getMenuItemByName);
app.post('/menuitems/', menuItemController.addMenuItem);
app.delete('/menuitems/:name', menuItemController.deleleMenuItem);
app.put('/menuitems', menuItemController.updateMenuItem);

app.get('/orders/', orderController.getActiveOrders);
app.get('/orders/:id',orderController.getOrderByID);
app.post('/orders/', orderController.addOrder);
app.put('/orders/:id', orderController.updateOrderStatus);
app.get('/orders/last/', orderController.getLastOrder);

const port = 5000;
app.listen(port,() => {
  console.log('App is listening on port ', port);
});