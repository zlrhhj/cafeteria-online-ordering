const {addMenuItem, deleleMenuItem, getAllMenuItemsByCategory,getMenuItemByName, updateMenuItem} = require ('../repository/menuitems.js');

module.exports.addMenuItem = (req, res) => {
  const menuitem = req.body;

  addMenuItem(menuitem)
  .then((results) => {
    res.status(201).send("Added");
  })
  .catch( (err) => {
    res.status(400).send(err);
  })
}

module.exports.deleleMenuItem = (req, res) => {

  deleleMenuItem(req.params.name)
    .then((result) => {
      res.status(201).send("Item is removed succefully!");
    })
    .catch((err) => {
      res.status(400).send(err);
    })

}

module.exports.getAllMenuItemsByCategory = (req, res) => {

  getAllMenuItemsByCategory(req.params.category)
  .then( (results) => {

    res.status(201).send(results);

  })
  .catch( (err) => {
    res.status(400).send(err);
  })
}

module.exports.getMenuItemByName = (req, res) => {

}

module.exports.updateMenuItem = (req, es) => {

  updateMenuItem(req.body);
}