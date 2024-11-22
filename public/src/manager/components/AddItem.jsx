import React, {useEffect, useState} from "react";

const  AddItem = ({addNewItem, onClose}) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [isChecked, setIsChecked] = useState("lunch")

  const onSubmit = () => {
    console.log("isChecked is ", isChecked)
   const item = {
      name: name,
      description: description,
      price: price,
      category: isChecked
    };
    onClose();
    addNewItem(item);

  }
  return<>
    <div className="add-item-modal">
      <button className="close-button" onClick={onClose}>X</button>
      <h1>Add A New Menu Item</h1>
      <div className="add-item-container" >
        <div className="add-item add-name">
          <label>Name:</label>
          <input type="text" onChange={(e)=>setName(e.target.value)}/>
        </div>
        <div className="add-item add-description">
          <label>Description:</label>
          <textarea type="text" onChange={(e)=>setDescription(e.target.value)}/>
        </div>
        <div className="add-item add-price">
          <label>Price:</label>
          <input type="number" min="0" onChange={(e)=>setPrice(Math.abs(parseFloat(e.target.value)))}/>
        </div>
        <div className="add-item add-category">
          <fieldset>
            <legend>Please select the category</legend>
            <div>
              <div className="radios">
                <div>
                  <input type="radio" id="breakfast" name="menu" value="breakfast"checked={isChecked === "breakfast" } onClick={()=>setIsChecked("breakfast")}/>
                  <label for="breakfast">Breakfast</label>
                </div>
                <div>
                  <input type="radio" id="lunch" name="menu" value="lunch"  checked={isChecked === "lunch" } onClick={()=>setIsChecked("lunch")} />
                  <label for="lunch">Lunch</label>
                </div>
                <div>
                  <input type="radio" id="dinner" name="menu" value="dinner" checked={isChecked === "dinner" } onClick={()=>setIsChecked("dinner")}/>
                  <label for="dinner">Dinner</label>
                </div>
                <div>
                  <input type="radio" id="beverage" name="menu" value="beverage" checked={isChecked === "beverage" } onClick={()=>setIsChecked("beverage")}/>
                  <label for="beverage">Beverage</label>
                </div>
              </div>
            </div>
          </fieldset>
        </div>
        <div className="add-item">

          <button id="cancel-btn" onClick={onClose}>Cancel</button>
          <button id="submit-btn" onClick={onSubmit}> Submit</button>
        </div>
      </div>
  </div>
  </>

}

export default AddItem;