import React, {useEffect, useState} from "react";
import MenuItemList from "./MenuItemList.jsx";
import axios from "axios";
import AddItem from "./AddItem.jsx";
//import Update from "./Update.jsx";
const App = () => {
  const [activeMenu, setActiveMenu] = useState("breakfast");
  const [breakfast, setBreakfast] = useState([]);
  const [lunch, setLunch] = useState([]);
  const [dinner, setDinner] = useState([]);
  const [beverage, setBeverage] = useState([]);
  const [addItem, setAddItem] = useState(false);

  useEffect( () => {
    getMenuItems();
  }, []);

  const getMenuItems = () => {
    axios.get(`http://localhost:5000/menuitems/breakfast`)
    .then((breakfastRes) => {
      console.log(breakfastRes.data);
      setBreakfast([...breakfastRes.data]);
    })
    .then(() => {
      console.log("breakfast is:", breakfast)
    })
    .catch((err) => {
      console.log('Error fetching the breakfast menu items:', err);
    });
    axios.get(`http://localhost:5000/menuitems/lunch`)
    .then((lunchRes) => {
      console.log("lunch is:", lunchRes.data);
      setLunch([...lunchRes.data]);
    })
    .catch((err) => {
      console.log('Error fetching the lunch menu items:', err);
    });
    axios.get(`http://localhost:5000/menuitems/dinner`)
    .then((dinnerRes) => {
      console.log("Dinner is:", dinnerRes.data);
      setDinner([...dinnerRes.data]);
    })
    .catch((err) => {
      console.log('Error fetching the dinner menu items:', err);
    });
    axios.get(`http://localhost:5000/menuitems/beverage`)
    .then((beverageRes) => {
      console.log("Beverage is :",beverageRes.data);
      setBeverage([...beverageRes.data]);
    })
    .catch((err) => {
      console.log('Error fetching the beverage menu items:', err);
    });
  }

  const onClose = () => {
    setAddItem(false);
  }

  const addNewItem = ( item ) => {
    axios.post("http://localhost:5000/menuitems", {...item})
      .then((response) => {
        console.log(response.data);
        getMenuItems();
      })
      .catch((err) => {
        console.log(err);
      })
  }

  const deleteItem = ( name ) => {
    axios.delete(`http://localhost:5000/menuitems/${name}`)
      .then((response) => {
        console.log(response.data);
        getMenuItems();
      })
      .catch((err) => {
        console.log(err);
      })
  }

  const updateItem = (item) => {
    console.log(item);
    axios.put(`http://localhost:5000/menuitems/`,{...item})
      .then((response) => {
        getMenuItems();
      })
      .catch((err) => {
        console.log(err);
      })

  }
  return <>
  <div className="app">
    <div className="title-container">
      <div className="title">Sundevil Cafeteria Online Ordering System Menu Management</div>
    </div>
    <div className="divider"></div>
    <div className="menu-category">
      <div className={`menu  ${activeMenu==="breakfast" ? "active" :""}`} onClick={()=>setActiveMenu("breakfast")}><button>BREAKFAST</button></div>
      <div className={`menu  ${activeMenu==="lunch" ? "active" : ""}`} onClick={()=>setActiveMenu("lunch")}><button>LUNCH</button></div>
      <div className={`menu  ${activeMenu==="dinner" ? "active" : ""}`} onClick={()=>setActiveMenu("dinner")}><button>DINNER</button></div>
      <div className={`menu  ${activeMenu==="beverage" ? "active" :""}`} onClick={()=>setActiveMenu("beverage")}><button>BEVERAGE</button></div>
    </div>
    <div className="menu-list">
      { activeMenu === "breakfast" && <MenuItemList menu = { breakfast } remove={deleteItem} updateItem={updateItem}/> }
      { activeMenu === "lunch" && <MenuItemList menu = { lunch } remove={deleteItem} remove={deleteItem} updateItem={updateItem}/>}
      { activeMenu === "dinner" && <MenuItemList menu = { dinner } remove={deleteItem} remove={deleteItem} updateItem={updateItem}/>}
      { activeMenu === "beverage" && <MenuItemList menu = { beverage } remove={deleteItem} remove={deleteItem} updateItem={updateItem}/>}
    </div>
    <div className="add-btn-container">
      <button onClick={()=>setAddItem(true)}>+  NEW ITEM</button>

    </div>
    {
      addItem && <AddItem  addNewItem={addNewItem} onClose={onClose}  />
    }

  </div>
  </>
}
export default App;