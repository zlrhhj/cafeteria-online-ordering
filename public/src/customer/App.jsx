import React, {useState, useEffect} from "react";
import axios from "axios";
import MenuItemList from "./MenuItemList.jsx";
import Cart from "./Cart.jsx";
import OrderStatus from "./OrderStatus.jsx";
import PlaceOrder from "./PlaceOrder.jsx";
import OrderDetail from "./OrderDetail.jsx";

const App = () => {
  const [breakfast, setBreakfast] = useState([]);
  const [lunch, setLunch] = useState([]);
  const [dinner, setDinner] = useState([]);
  const [beverage, setBeverage] = useState([]);
  const [cart, setCart] = useState([]);
  const [activeComponent, setActiveComponent] = useState("menu");
  const [showCart, setShowCart] = useState(false);
  const [showStatus, setShowStatus] = useState(false);
  const [showPlaceOrder, setShowPlaceOrder] = useState(false);
  const [showOrderDetail, setShowOrderDetail] = useState(false);
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [orderID, setOrderID] = useState("");
  const [menuCategory, setMenuCategory] = useState("breakfast");
  const [activeButton, setActiveButton] = useState("1");

  const handleComponentChange = (component) => {
    setActiveComponent(component);
  }
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

  const addToCart = (item) => {
    setCart((cart) => {
      const itemExists = cart.find(cartItem => cartItem.id === item.id);
      if(itemExists) {
        return cart.map(cartItem => cartItem.id === item.id
          ? {... cartItem, quantity: cartItem.quantity + 1}
          : cartItem
        );
      } else {
        return [...cart, { ...item, quantity: 1}]
      }
    })
    console.log("cart is", cart);
  }
  const updateQuantity = (itemId, increment) => {
    setCart((cart)=>{
      return cart.map(cartItem=>{
        if(cartItem.id === itemId) {
          const newQuantity = cartItem.quantity + increment;
          return { ...cartItem, quantity: newQuantity > 0 ? newQuantity : 1};
        }
        return cartItem;
      });
    });
  }
  const removeFromCart = (itemId) => {
    console.log("item id is ",itemId);
    setCart((cart) => {


      return cart.filter(cartItem => cartItem.id !== itemId); }
    )
  }
  const checkout = () => {
    setShowPlaceOrder(!showPlaceOrder);
    setShowCart(!showCart);
  }

  const cancelPlaceOrder = () => {
    setShowPlaceOrder(!showPlaceOrder);
    setShowCart(!showCart);
  }
  const placeOrder = () => {

    let orderdata = () => {
      return cart.map((item)=>{return {itemName:item.name, price:item.price, quantity:item.quantity}});
    }

    const orderinfo = {items:orderdata(), customerName: name, email:email, address:address, phoneNumber:phoneNumber};
    console.log("cart info: ", orderinfo);

    axios.post(`http://localhost:5000/orders`, {...orderinfo})
    .then((response) => {
      console.log("order_id is ",response.data);
      setOrderID(response.data);
    })
    .catch((err) => {
      console.log("Error placing an order ", err);
    })

    setShowCart(false);
    setShowPlaceOrder(false);
    setShowOrderDetail(true);
  }

  const closeOrderDetail = ()=>{
    setShowOrderDetail(false);
    setOrderID("");
    setCart([]);
    setAddress("");
    setEmail("");
    setAddress("");
    setName("");
    setPhoneNumber("");
  }

  const trackOrder = (orderId, setOrder,setShowResult) => {

    axios.get(`http://localhost:5000/orders/${orderId}`)
    .then((response) => {
      setShowResult(true);
      response.data ? setOrder(response.data) : "";
    })
    .catch((err) => {
      console.log("Error tracking an order ",err);
    })
  };

  const closeOrderStatus = () => {
    console.log("hello")
    setShowStatus(false);
  }
  return (
    <div className="app" >

      <div className="header">
        <div className="title-container"><div className="title"><p>Sundevil Cafeteria Online Ordering System!</p></div></div>
        <div className="cart-button-container"><button className="cart-button" onClick={()=>setShowCart(!showCart)}><span>{cart.reduce((total, item) => total + item.quantity, 0)}</span></button></div>
        <div className="track-btn-container"> <button className="track-btn" onClick={()=>setShowStatus(!showStatus)}> Track Order</button></div>
      </div>
      <div className="divider"></div>
      <div className="main-content" >
        <div className="menu-category">
          <div key="1" className= {`menu breakfast ${activeButton === "1" ? 'active' : ''}`} onClick={()=>{setActiveButton("1"); setMenuCategory("breakfast")}}  >
            <button>BREAKFAST</button>
          </div>
          <div key="2" className={`menu lunch ${activeButton === "2" ? 'active' : ''}`} onClick={()=>{setActiveButton("2"); setMenuCategory("lunch")}}>
            <button>LUNCH</button>
          </div>
          <div key="3" className={`menu dinner ${activeButton === "3" ? 'active' : ''}`} onClick={()=>{setActiveButton("3");setMenuCategory("dinner")}}>
            <button>DINNER</button>
          </div>
          <div key="4" className={`menu beverage ${activeButton === "4" ? 'active' : ''}`} onClick={()=>{setActiveButton("4");setMenuCategory("beverage")}}>
            <button>BEVERAGE</button>
          </div>
        </div>

        <div className="item-list">
        { menuCategory==="breakfast" && <MenuItemList menuitems={breakfast} addToCart={addToCart} cart={cart}/>}
        { menuCategory==="lunch" && <MenuItemList menuitems={lunch} addToCart={addToCart} cart={cart}/>}
        { menuCategory==="dinner" && <MenuItemList menuitems={dinner} addToCart={addToCart} cart={cart}/>}
        { menuCategory==="beverage" && <MenuItemList menuitems={beverage} addToCart={addToCart} cart={cart}/>}
       </div>
      </div>
      { showCart && (
        <Cart cart={cart} updateQuantity={updateQuantity} removeFromCart={removeFromCart} handleComponentChange={handleComponentChange} onClose={()=>setShowCart(false)} checkout={checkout}/>
      )}

      {showPlaceOrder && <PlaceOrder cart={cart} onClose={cancelPlaceOrder} placeOrder={placeOrder} setName={setName} setAddress={setAddress} setEmail={setEmail} setPhoneNumber={setPhoneNumber}/>}
      {showOrderDetail && <OrderDetail orderID={orderID} address={address} cartItems={cart} onClose={closeOrderDetail}/>}
      {showStatus && <OrderStatus trackOrder={trackOrder} onClose={closeOrderStatus}/>}

    </div>
  )
}

export default App;