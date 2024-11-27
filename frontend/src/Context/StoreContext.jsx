import { createContext, useEffect, useState } from "react";
import { food_list, menu_list } from "../assets/assets";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import "react-toastify/dist/ReactToastify.css"; // import first
import { ToastContainer, toast } from 'react-toastify'; // then this
export const StoreContext = createContext(null);

const StoreContextProvider   = (props) => {

    const url = "https://deploy-test-xspm.onrender.com";

    const [food_list, setFoodList] = useState([]);
    const [food_listcart, setFoodListcart] = useState([]);
    const [cartItems, setCartItems] = useState({});
    //const [token, setToken] = useState("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE1NTMwNTI0LCJpYXQiOjE3MTU0NDQxMjQsImp0aSI6ImE1YTcxYTM2MTNhZjQyNDE4MjU5NjA1NjdiYjQyY2I5IiwidXNlcl9pZCI6N30.XKQc2s1W6Qx3qawUjs8qMI2nkP5CgUfIdyQ7SOYmibY");
     /*the above line should be replaced with const [token, setToken] = useState("")*/
     const [token, setToken] =useState("");
     const [userid,setUserId] =useState("");
     const navigate = useNavigate();
    const checkitem = (item) => {
      let checkitm = 0;
    
              checkitm = cartItems.find((product) => product.food === item);
              
          
      
      return checkitm;
  }

  const placeOrderload = async (address,discount,total,phone,token) => {
    if(token){
     const response=await axios.post(url + "/bill_status/create/", { "bill_address":  address,"bill_discount": "0","bill_total": total,"bill_phone":  phone},{ headers: {"Authorization" : `Bearer ${token}`} });
     await axios.delete(url + "/cart/deleteAllFoodFromCart/",{ headers: {"Authorization" : `Bearer ${token}`} });
        loadCartData(token); 
        console.log(response);
     const message = response?.statusText;
     const status = response?.status;
     if (status === "pfalse"){

       toast.error(message);
     }
     else{
       toast.info("The order is created sucessfully");
     }
        navigate('/myorder');
    }
    else{
        alert("PLease sign in to place the order")
    }
  }

  const BookTableLoad = async (tableNumber,numberPeople,bookName,bookPhone,bookNote,bookDate,token,userid) => {
     
    if(token){
     const response=await axios.post(url + "/book_table/create/", { "book_people": tableNumber,"book_tables": numberPeople,"book_note": bookNote,"book_name": bookName,"book_phone": bookPhone,"user_id": userid, "book_when": bookDate},{ headers: {"Authorization" : `Bearer ${token}`} });
    console.log(response);
     const message = response?.statusText;
     const status = response?.status;
     if (status === "pfalse"){

       toast.error(message);
     }
     else{
        toast.info("The table is booked");
     }
        navigate('/mytable');
     }  
     else{
        alert("PLease sign in to place the order")
    } 
 
  }



    const addToCart = async (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
        }
        else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        }
        if (token) {
            await axios.post(url + "/cart/addFoodToCart/", {"food":itemId,"item_qty":"1"},{ headers: {"Authorization" : `Bearer ${token}`} });
            loadCartData(token);
          }
    }/*item_qty should be replace with correct qty*/

    const removeFromCart = async (itemId) => {
      
        if (token) {
            await axios.delete(url + "/cart/deleteFoodFromCart/"+itemId,{ headers: {"Authorization" : `Bearer ${token}`} });
            loadCartData(token);
          }
    }

    const getNewTotalCartAmount = () => {
      let totalAmount = 0;
      for(let i = 0; i<food_listcart.length;i++) {
        let itemInfo = food_list.find((product) => product.id === Number(food_listcart[i].food));
              totalAmount += itemInfo.food_price * food_listcart[i].item_qty;
    }
    
      return totalAmount;
  }
    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = food_list.find((product) => product.id === Number(item));
                totalAmount += itemInfo.food_price * cartItems[item];
            }
        }
        return totalAmount;
    }

    const getFoodName = (item) => {
      let FoodName = 0;
      
              let itemInfo = food_list.find((product) => product.id === Number(item));
              FoodName = itemInfo.food_name;
         
      return FoodName;
  }
  const getFoodSRC = (item) => {
    let FoodSRC = 0;
    
            let itemInfo = food_list.find((product) => product.id === Number(item));
            FoodSRC = '../../src/assets' + itemInfo.food_src;
       
    return FoodSRC;
}
const getFoodPrice = (item,qty) => {
  let FoodPrice = 0;
  
          let itemInfo = food_list.find((product) => product.id === Number(item));
          FoodPrice = qty* itemInfo.food_price;
     
  return FoodPrice;
}

    const fetchFoodList = async () => {
        const response = await axios.get(url + "/food/getAllFood/");
        console.log(response.data);
        setFoodList(response.data);
    }

    const loadCartData = async (token) => {
        if(token){
        const response = await axios.get(url + "/cart/getFoodInCart/", { headers: {"Authorization" : `Bearer ${token}`} })
       console.log(response.data);
       // setCartItems(response.data);
        setFoodListcart(response.data);
        }
    }

    useEffect(() => {
        async function loadData() {
            await fetchFoodList();
            //await loadCartData(token);/* this line should be removed*/
            if (localStorage.getItem("user-token")) {
                setToken(localStorage.getItem("user-token"))
                setUserId(localStorage.getItem("user-id"))
                await loadCartData({ token: localStorage.getItem("user-token") })
            }
        }
        loadData()
    }, [])

    const contextValue = {
        url,
        food_list,
        food_listcart,
        menu_list,
        cartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        getNewTotalCartAmount,
        placeOrderload,
        BookTableLoad,
        token,
        userid,
        setToken,
        loadCartData,
        setCartItems
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )

}

export default StoreContextProvider;