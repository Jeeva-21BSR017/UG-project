import React from 'react'
import {useSelector , useDispatch} from 'react-redux'
import {addToCart} from '../actions/cartActions'
import { deleteFromCart } from '../actions/cartActions'
import Checkout from '../components/Checkout'
import { useState } from 'react';
export default function Cartscreen() {
  const cartstate = useSelector(state=>state.cartReducer)
  const cartItems = cartstate.cartItems;
  const [couponCode, setCouponCode] = useState('');
  const [discountedSubtotal, setDiscountedSubtotal] = useState(0);
  var subtotal = cartItems.reduce((x , item)=> x+item.price , 0);
  const dispatch = useDispatch();
  
  const applyCoupon = () => {
    const couponCodes = {
      SAVE10: 0.1,
      SAVE20: 0.2, 
      SAVE30: 0.3, 
    };
    if (couponCodes.hasOwnProperty(couponCode)) {
      let discountPercentage = couponCodes[couponCode];
      if (subtotal > 600 && couponCode === 'SAVE30') {
        discountPercentage = 0.3;
      } else if (subtotal > 500 && couponCode === 'SAVE20') {
        discountPercentage = 0.2;
      } else if (subtotal > 250 && couponCode === 'SAVE10') {
        discountPercentage = 0.1;
      } else {
        alert(`Coupon code ${couponCode} cannot be applied to the current cart total.`);
        return;
      }
      const discount = subtotal * discountPercentage;
      setDiscountedSubtotal(subtotal - discount);
      alert(`Coupon code applied successfully! Discount: ${discountPercentage * 100}%`);
    } else {
      alert('Invalid coupon code');
    }
  };
  return (
    <div>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 style={{fontSize:'40px'}}>My Cart</h2>
          <br></br>
          {cartItems.length === 0 ? (
            <div className="empty-cart-message" style={{color: '#f13a01'}}> 
              <br></br>
              <br></br>
              <br></br>
              <h3>Your cart is empty!!</h3>
              <img src="https://media1.tenor.com/m/tTaCJqHvuLwAAAAC/pleading-puppy-eyes.gif" alt="Empty cart" style={{ width: '100px'}} />
            </div>
          ) : (
            cartItems.map(item => (
                           <div className="flex-container">
                           <div className="text-left m-1 w-100">
                           <h5>{item.name} [{item.varient}]</h5>
                            <h5>Price : {item.quantity} * {item.prices[0][item.varient]} = {item.price}</h5>
                            <h5 style={{display:'inline'}}>Quantity : </h5>
                            <i className="fa fa-minus"  style={{ border: '1px solid #ddd', borderRadius: '50%', padding: '5px', cursor: 'pointer' }}  aria-hidden="true"  onClick={()=>{dispatch(addToCart(item , item.quantity-1 , item.varient))}}></i>
                            <b>{item.quantity}</b>
                            <i className="fa fa-plus"  style={{ border: '1px solid #ddd', borderRadius: '50%', padding: '5px', cursor: 'pointer' }}  aria-hidden="true" onClick={()=>{dispatch(addToCart(item , item.quantity+1 , item.varient))}}></i>
                            
                            <hr/>
                           </div>
                           <div className='m-1 w-100'>
                           <img src={item.image} style={{height:'110px'}}/>
                           </div>
                           <div className='m-1 w-100'>
                           <i className="fa fa-trash mt-5" aria-hidden="true"  style={{ border: '1px solid #ddd', borderRadius: '50%', padding: '5px', cursor: 'pointer' }}  onClick={()=>{dispatch(deleteFromCart(item))}}></i>
                           </div>
                         </div>
                           
                           ))
          )}
         
        </div>
        <div className="col-md-4 text-center">
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <h2 style={{ fontSize: '40px' }}>SUBTOTAL : {discountedSubtotal > 0 ? discountedSubtotal : subtotal} /-</h2>
          {!discountedSubtotal && (
            <>
            <input
  type="text"
  placeholder="Enter coupon code"
  value={couponCode}
  onChange={(e) => setCouponCode(e.target.value)}
  style={{
    padding: '10px',
    fontSize: '16px',
    border: '2px solid #ccc',
    borderRadius: '5px',
    marginRight: '10px',
    width: '200px',
  }}
/>

<button
  onClick={applyCoupon}
  style={{
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#f13a01',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  }}
>
  Apply Coupon
</button>
            
            </>
          )}
          <br></br>
          <br></br>
          <Checkout subtotal={discountedSubtotal > 0 ? discountedSubtotal : subtotal} />
       
        </div>
      </div>
    </div>
  )
}
