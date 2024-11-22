import React, {useState} from "react";

const NewOrderAlert = () => {

  return <div className="alert-modal-overlay">
    <div className="alert-modal">
      <button className="close-button" onClick={onClose}>X</button>
      <h1> New Order Coming </h1>
      <button className="ok-button">OK</button>
    </div>
  </div>
}

export default NewOrderAlert;
