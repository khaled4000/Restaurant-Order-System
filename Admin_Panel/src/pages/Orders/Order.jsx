import React, { useEffect, useState } from "react";
import "./Order.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocalStorage } from "../../utils/localStorage";
import { fetchData } from "../../utils/fetchData";
import { assets } from "../../assets/assets";

const Order = () => {
  const { getStorage } = useLocalStorage();
  const [orders, setOrders] = useState([]);
  const [orderDetails, setOrderDetails] = useState(null);

  const fetchAllOrders = async () => {
    let method = "GET";
    let api = "bill_status/getAdminBillStatus";

    const token = getStorage("admin-token");
    let header = { token };

    const response = await fetchData({
      method,
      api,
     
      header,
    });
  
     
    setOrders(response);
    console.log(response);
  };
  


  const deleteorder = async (id) =>{
    let method="DELETE"
    let api = `bill_status/cancel/${id}`;
    const token = getStorage("admin-token");
    let header = { token };
    
    const response = await fetchData({  
      method,
      api,
      header,
    
      }); 
     console.log(response);
     if (response){
      toast.success(response.message);
      setOrders(orders.filter(n => n.id !== id))
      
     } else
{
toast.error(response);
}

  }

  const handleStatusChange = async (event, id ,user_id) => {
     let method ="POST"
     let api ="bill_status/send"
     const token = getStorage("admin-token");
     let header = { token };
      const response = await fetchData({
        method,
        api,
        reqBody: {
          id,
          bill_status: event.target.value,
          user_id,
        },
        header,
       
      });
      console.log(response);

      if (response) {
        toast.success(response.message);
        await fetchAllOrders();
      } else {
        console.error("Error updating order status:", response);
        toast.error("Error updating order status");
      }
    
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  const handleOrderClick = (order) => {
    setOrderDetails(order);
  };

  return (
    <div className="order">
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.map((order, index) => (
          <div
            key={index}
            className="order-item"
            onClick={() => handleOrderClick(order)}
          >
            <img src={assets.parcel_icon} alt="" className="im" />
            <div className="ptag">
              <p className="order-item-address">address:{order.bill_address}</p>
              <p className="order-item-phone"> phone:{order.bill_phone}</p>
              <p>Status: {order.bill_status}</p>
              <p>Total: ${order.bill_total}</p>
            </div>
            
          </div>
        ))}

      </div>
      {orderDetails && (
        <div className="order-details">
          <h4>Order Details</h4>
          <p>Address: {orderDetails.bill_address}</p>
          <p>Phone: {orderDetails.bill_phone}</p>
          <p>Discount: {orderDetails.bill_discount}</p>
          <p>Delivery: {orderDetails.bill_delivery}</p>
          <p>Total: {orderDetails.bill_total}</p>
          <p>When: {new Date(orderDetails.bill_when).toLocaleString()}</p>
          <p>Method: {orderDetails.bill_method}</p>
          <select
            onChange={(event) => handleStatusChange(event, orderDetails.id,orderDetails.user_id)}
            value={orderDetails.bill_status}
          >
            <option value="confirmed">confirmed</option>
            <option value="preparing">preparing</option>
            <option value="delivered">delivered</option>
          </select>

          <br/>
          <button onClick={() => {
      deleteorder(orderDetails.id);
      setOrderDetails(false); 
    }}>Cancel</button>
          
          
        </div>
      )}
    </div>
  );
};

export default Order;
