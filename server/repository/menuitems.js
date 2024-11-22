const {client, pool}  = require ('../../database/db.js');

module.exports.addMenuItem = async function(menuitem) {
  let name = menuitem.name;
  let description = menuitem.description;
  let price = menuitem.price;
  let category = menuitem.category;
  const result = await pool.query(`INSERT INTO menuitems (name, description, price, category) VALUES ('${name}', '${description}', '${price}', '${category}')`);
  return result;
}

module.exports.deleleMenuItem = async function(name) {
  const result = await pool.query(`DELETE FROM menuitems WHERE name = '${name}'`);
  return result;
}

module.exports.getAllMenuItemsByCategory = async function(category) {

    const results = await pool.query(`SELECT * FROM menuitems WHERE category = '${category}' ORDER BY id`)
    return results.rows;
}

module.exports.getMenuItemByName = async function(name) {
  const result = await pool.query(`SELECT * FROM menuitems WHERE name = '${name}'`);
  return result;
}

module.exports.updateMenuItem = async function(menuitem) {

  const result = await pool.query (`UPDATE menuitems SET description = '${menuitem.description}' ,price = '${menuitem.price}' WHERE name = '${menuitem.name}'`);
  return result;
}