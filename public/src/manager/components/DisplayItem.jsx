import React, {useState, useEffect} from "react";

const DisplayItem = ({item, remove, updateItem}) => {
  const [isUpdate, setIsUpdate] = useState(false);
  const [description, setDescription] = useState(item.description);
  const [price, setPrice] = useState(item.price);
  const [newItem, setNewItem] = useState({...item})

  let updatedItem = {...item};
  useEffect(()=>{
    console.log("new description is :", description);
    console.log(price);
    updatedItem = {...updatedItem, description: description, price: price};
  },[description,price]);
  return <>
    {
      !isUpdate ?

      <div className="item-container">
                <div className="item-name" >{item.name}</div>
                <div className="item-description"> {description} </div>
                <div className="item-price">${price}</div>
                <button onClick={()=>setIsUpdate(true)}>Update</button>
                <button onClick={()=>remove(item.name)}>Remove</button>
      </div>
      :
      <div className="item-container">
                <div className="item-name" >{item.name}</div>
                <textarea tyope = "text" className="item-description item-description-update" value={description} onChange={(e)=>setDescription(e.target.value)}/>
                <input type="number" className="item-price item-price-update" value={price} onChange={(e)=>setPrice(e.target.value)}/>
                <button className="update-buttons" type="button" onClick={()=>setIsUpdate(false)}>Cancel</button>
                <button className="update-buttons" type="button" onClick={()=>{updateItem(newItem); setIsUpdate(false)}} >Submit</button>
          </div>



    }
  </>
}

export default DisplayItem;