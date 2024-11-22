import React, {useState, useEffect} from "react";

const MenuItemList = ({menuitems, addToCart, cart}) => {
  /*
  const addToCart = (item) => {
    console.log("item :", item)
    setCart([...cart, item]);
    setTimeout(()=>{console.log("cart is:", cart)},50000);
  }*/
  return (
    <div>
      {
        MenuItemList ?
        <div className="menu-item-list">
          {
            menuitems.map((item) => {
              return <div className="item-container">
                <div className="item-name" >{item.name}</div>
                <div className="item-description"> {item.description} </div>
                <div className="item-price">${item.price}</div>

                <button onClick={()=>addToCart(item)}>Add to Cart</button>
                {cart.filter((cartitem)=>item.name === cartitem.name).length>0 ?
                  <div className="cart-quantity">{cart.filter((cartitem)=>item.name === cartitem.name)[0].quantity} in the Cart</div>
                  :
                  <div className="cart-quantity"></div>}
              </div>
          })}
        </div>
        :
        <div> Empty </div>
      }






    </div>
  )
}

export default MenuItemList;