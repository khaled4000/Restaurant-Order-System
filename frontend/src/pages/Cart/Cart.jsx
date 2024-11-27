import React, { useContext } from 'react'
import './Cart.css'
import { StoreContext } from '../../Context/StoreContext'
import { useNavigate } from 'react-router-dom';

const Cart = () => {

  const {cartItems, food_listcart, food_list, removeFromCart,getTotalCartAmount,getNewTotalCartAmount } = useContext(StoreContext);
  const navigate = useNavigate();

  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p> <p>Title</p> <p>Price</p> <p>Quantity</p> <p>Total</p> <p>Remove</p>
        </div>
        <br />
        <hr />
{food_listcart.map((item1, index) => {
           let item = food_list.find((product) => product.id === Number(item1.food));
            
            const imagesrc='../../src/assets'+item.food_src;
            return (<div key={index}>
              <div className="cart-items-title cart-items-item">
                <img src={imagesrc} alt="" />
                <p>{item.food_name}</p>
                <p>${item.food_price}</p>
                <div>{item1.item_qty}</div>
                <p>${item.food_price*item1.item_qty}</p>
                <p className='cart-items-remove-icon' onClick={()=>removeFromCart(item1.id)}>x</p>
              </div>
              <hr />
            </div>)
          
        })}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details"><p>Subtotal</p><p>${getNewTotalCartAmount()}</p></div>
            <hr />
            <div className="cart-total-details"><p>Delivery Fee</p><p>${getNewTotalCartAmount()===0?0:5}</p></div>
            <hr />
            <div className="cart-total-details"><b>Total</b><b>${getNewTotalCartAmount()===0?0:getNewTotalCartAmount()+5}</b></div>
          </div>
          <button onClick={()=>navigate('/order')}>PROCEED TO CHECKOUT</button>
        </div>
        <div className="cart-promocode">
          <div>
            <p>If you have a promo code, Enter it here</p>
            <div className='cart-promocode-input'>
              <input type="text" placeholder='promo code'/>
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
