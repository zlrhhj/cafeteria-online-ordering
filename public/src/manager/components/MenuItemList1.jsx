import React, {useEffect, useState} from "react";

const  MenuItemList = ({menu, remove, update}) => {
  return <>
  <div className="menu-item-list">
    {
      menu.map((item, index) => {
        return (
          <div className="item-container" key={index}>
                <div className="item-name" >{item.name}</div>
                <div className="item-description"> {item.description} </div>
                <div className="item-price">${item.price}</div>
                <button onClick={()=>update(item)}>Update</button>
                <button onClick={()=>remove(item.name)}>Remove</button>
          </div> )
      })
    }
  </div>
  </>
}

export default MenuItemList;