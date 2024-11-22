const {pool} = require ('../../database/db.js');
const  WebSocket = require('ws');

const ws = new WebSocket.Server({port: 8080});

module.exports.getOrderByID = async function(id) {

  const query = `SELECT
    orders.id,
    orders.customer_name,
    orders.phone_number,
    orders.address,
    orders.email,
    orders.status,
    COALESCE(
    (
      SELECT JSON_AGG(
        JSON_BUILD_OBJECT('item_name', order_items.item_name, 'quantity', order_items.quantity)
      )
      FROM order_items
      WHERE order_items.order_id = orders.id
    ), '[]'
    ) AS items
    FROM orders
    WHERE orders.id = ${id}`;;
    const result = await pool.query(query)

    return result.rows.length > 0 ? result.rows[0] : null;

}

module.exports.addOrder = async function(order, orderItems ) {


  const client = await pool.connect();
  let id;

  try {
    await client.query("BEGIN");
    const query1 = `INSERT INTO orders (customer_name, email, address, phone_number, status) VALUES ($1, $2, $3, $4, $5) returning id`;

    const orderParams = [order.customerName, order.email, order.address, order.phoneNumber, "received"];

    const result = await client.query(query1,orderParams);
    id = result.rows[0].id;

    orderItems.map( (item) => {
      const query2 = `INSERT INTO order_items (order_id, item_name, price, quantity) VALUES ($1, $2, $3, $4)`;;
      const itemParams = [id, item.itemName, item.price, item.quantity];


      client.query(query2, itemParams)

      .then((result) => {
        console.log("result insert order item is :", result);
      })
      .catch((err) => {
        console.log("Error inserting order item ", err.stack);
      })
    })
    await client.query('COMMIT');
    ws.on('connection', ws => {
      console.log('Client connected');
      ws.send(JSON.stringify(id));
      ws.on('close', () => {
        console.log('Client disconnection');
      })
    })
    return id;
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
}

module.exports.getActiveOrders = async function() {
  const status = "completed";
  const query = `SELECT * FROM orders WHERE status <> '${status}' ORDER BY id`;
  const result = await pool.query(query);
  return result.rows.length > 0 ? result.rows : null;
}



module.exports.updateOrderStatus = async function(order_id, status) {

  const query = `UPDATE  orders SET status='${status}' WHERE id = '${order_id}'`;

  const result = await pool.query(query);

  return result.rowCount > 0 ? result.rowCount : null;
}
const generateUniqueOrderId = async () => {
  /*let characters = 'ABDCEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz';
  let orderId = 'ORDER-';
  for ( let i = 0; i < 20; i++ ){
    orderId += characters.charAt(Math.floor(Math.random() * characters.length));
  } */
  const query = "SELECT * FROM orders ORDER BY id DESC LIMIT 1";
  const result = await pool.query(query);

  let orderId = 1;
  if(result.rows.length > 0 ) {


    const date1 = (result.rows[0].order_date).toISOString();

    const date2 = (new Date()).toISOString();


    if(date1.substring(0,10) === date2.substring(0,10)) {

      orderId = result.rows[0].order_id + 1;
    }
  }
  return orderId;
}

const isOrderIdUsed = (order_id) => {

    const query = `SELECT COUNT(*) FROM orders WHERE order_id = '${order_id}'`;
    pool.query(query)
    .then((result) => {
      const count = parseInt(result.rows[0].count, 10);
      return count > 0;
    })
    .catch((err) => {
      console.log(err.stack);
    })
}
module.exports.getLastOrder = async () => {
  const query = "SELECT * FROM orders ORDER BY id DESC LIMIT 1";
  const result = await pool.query(query);
  console.log("last order is ",result.rows);
  return result.rows[0];

}