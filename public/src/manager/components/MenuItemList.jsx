import React, {useEffect, useState} from "react";
import DisplayItem from "./DisplayItem.jsx";


const  MenuItemList = ({menu, remove, updateItem}) => {

  return <>
  <div className="menu-item-list">
    {
      menu.map((item, index) => {
        return (
          <DisplayItem item={item} remove={remove} updateItem={updateItem}/> )
      })
    }
  </div>
  </>
}

export default MenuItemList;