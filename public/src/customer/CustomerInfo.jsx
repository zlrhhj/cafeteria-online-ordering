import React, {useState} from "react";

const CustomerInfo = ( ) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  return <>
    <label> Custmer Name:</label>
    <input type="text" id="name" value={name} onChange={ (e)=>{ setName(e.target.value)}} required/>
    <label> Phone Number:</label>
    <input type="text" id="phone" value={phone} onchange={(e) => {setPhone(e.target.value)} required} />
    <label>Address:</label>
    <input type="text" id="address" value={address} onChange={(e)=>{setAddress(e.target.value)}} required/>
    <button onClick={()=>{}}>Place Order</button>
  </>
}

export default CustomerInfo;