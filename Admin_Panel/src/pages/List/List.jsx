import React, { useEffect, useState } from 'react';
import './List.css'; // Importing the CSS file
import { toast } from 'react-toastify';
import { useLocalStorage } from '../../utils/localStorage';
import { fetchData } from '../../utils/fetchData';



const List = () => {
  const { getStorage } = useLocalStorage();
  const [list, setList] = useState([]);

  const getList = async () => {
    let method = 'GET';
    let api = 'food/getAllFood';
    const result = await fetchData({ method, api });
    console.log(result);
    
    if (result.error)
       return  setTimeout(() => {
        
        toast.error("check the internet connection");
       
      }, 5000);
     
    setList(result);
  };


  const removeFood = async (foodName) => {
    let method = 'DELETE';
    let api = `food/deleteFoodByName/${foodName}`;
    const token = getStorage('admin-token');
    let header = { token };
    const response = await fetchData({ method, api, header });
    console.log(response);

     if (response?.error) {
       toast.error(response.error);}

    await getList();
    const message=response?.message;
    if (message==="Food deleted successfully") {
      toast.success(message);

    } 
    
    else {
      toast.error(message);
    }
  };

  useEffect(() => {
    getList();
  }, []);

  return (
    <div className="list add flex-col">
      <p>ALL Food List</p>
      <div className="list-table">
        <table border={1}>
          <thead>
            <tr>
           
              <th>Name</th>
              <th>Category</th>
              <th>Description</th>
              <th>Discount</th>
              <th>Price</th>
              <th>Star</th>
              <th>Type</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {list.map((item, index) => (
              <tr key={index}>
  
                <td>{item.food_name}</td>
                <td>{item.food_category}</td>
                <td>{item.food_description}</td>
                <td>{item.food_discount}</td>
                <td>{item.food_price}</td>
                <td>{item.food_star}</td>
                <td>{item.food_type}</td>
                <td><p className="cursor" onClick={() => removeFood(item.food_name)}>X</p></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default List;









