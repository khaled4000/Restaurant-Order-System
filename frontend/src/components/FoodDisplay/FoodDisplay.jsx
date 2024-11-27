import React, { useContext } from 'react'
import './FoodDisplay.css'
import FoodItem from '../FoodItem/FoodItem'
import { StoreContext } from '../../Context/StoreContext'

const FoodDisplay = ({category}) => {

  const {food_list} = useContext(StoreContext);

  return (
    <div className='food-display' id='food-display'>
      <h2>Top dishes near you</h2>
      <div className='food-display-list'>
        {food_list.map((item)=>{
          if (category==="All" || category===item.food_category) {
            return <FoodItem key={item.id} image={item.food_src} name={item.food_name} desc={item.food_descprition} price={item.food_price} id={item.id}/>
          }
        })}
      </div>
    </div>
  )
}

export default FoodDisplay
