import React, { useState } from "react";
import "./Add.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocalStorage } from "../../utils/localStorage";
import { fetchData } from "../../utils/fetchData";

const initialState = {
  food_name: "",
  food_star: "",
  food_vote: "",
  food_price: "",
  food_discount: "",
  food_description: "",
  food_status: "available",
  food_type: "appetizer",
  food_category: "",
  food_src: null,
};

const Add = () => {
  const { getStorage } = useLocalStorage();
  const [state, setState] = useState(initialState);
  const [imagePreview, setImagePreview] = useState(null);

  const handleChangeFile = (event) => {
    const file = event.target.files[0] ?? null;
    setState({ ...state, food_src: file });

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    let method = "POST";
    let api = "food/addFood";
    let reqBody = state;
    const token = getStorage("admin-token");
    let header = { token };

    const response = await fetchData({
      method,
      api,
      reqBody,
      header,
      isFormData: true,
    });
    console.log(response);

    if (response?.error) toast.error(response?.error);
    else {
      const message = response?.message;
      const errorMessageSrc = response?.food_src?.[0];
      const errorMessageStar = response?.food_star?.[0];
      const errorMessageF = response.food_name?.[0];
      const errorMessageC = response.food_category?.[0];
      const errorMessageD = response.food_description?.[0];
      const errorMessageP = response.food_price?.[0];
      const errorMessageV = response.food_vote?.[0];
      const errorMessageDC = response.food_discount?.[0];

      if (message === "Food added successfully") {
        setState(initialState);
        setImagePreview(null);
        toast.success("Item added successfully");
      } else if (message === "Food already exists") {
        toast.warning("Food already exists, add another one");
      } else if (
        errorMessageSrc ===
        "The submitted data was not a file. Check the encoding type on the form."
      ) {
        toast.warning("Please add an image file.");
      } else if (
        errorMessageStar ===
        "Ensure that there are no more than 1 digits before the decimal point."
      ) {
        toast.warning("The star number should be betwen 1 and 5");
      } else if (errorMessageF === "This field may not be blank.") {
        toast.error("Add food_name field!");
      } else if (
        errorMessageP === "A valid number is required." ||
        errorMessageV === "A valid integer is required." ||
        errorMessageDC === "A valid number is required." ||
        errorMessageStar === "A valid number is required."
      ) {
        toast.error("A valid number is required.");
      } else if (errorMessageC === "This field may not be blank.") {
        toast.info(message);
      } else if (errorMessageD === "This field may not be blank.") {
        toast.error("Description field is required");
      }
    }
  };

  const handleUploadClick = () => {
    document.getElementById("imageInput").click();
  };

  return (
    <div className="add">
      <form onSubmit={onSubmitHandler}>
        <div className="area">
          <label className="lab"> &nbsp; &nbsp; Click to Upload Image:</label>
          <br />
          <input
            className="hidden-file-input"
            type="file"
            accept="image/*"
            name="food_src"
            placeholder=""
            onChange={handleChangeFile}
            id="imageInput"
            required
          />
          <button type="button" className="custom-upload-button" onClick={handleUploadClick}>
            Choose File
          </button>
        
        </div>
        <br />
        <br />

        {imagePreview && (
          <img
            src={imagePreview}
            alt="Food Preview"
            style={{ maxWidth: "300px", maxHeight: "300px" }}
          />
        )}
        <br />
        <br />
        <p>Food name:</p>
        <input
          required
          name="food_name"
          value={state.food_name}
          placeholder="food_name"
          onChange={handleChange}
        />
        <br />

        <p>Description:</p>
        <textarea
          required
          name="food_description"
          value={state.food_description}
          placeholder="food_description"
          onChange={handleChange}
        />
        <br />

        <p>Category:</p>
        <input
          name="food_category"
          value={state.food_category}
          placeholder="food_category"
          onChange={handleChange}
          required
        />
        <br />

        <p>Type:</p>
        <select onChange={handleChange} name="food_type">
          <option value="appetizer">Appetizer</option>
          <option value="main_course">Main Course</option>
          <option value="dessert">Dessert</option>
        </select>
        <br />

        <p>Status:</p>
        <select onChange={handleChange} name="food_status">
          <option value="available">Available</option>
          <option value="sold_out">Sold Out</option>
          <option value="coming_soon">Coming Soon</option>
        </select>
        <br />

        <p>Food star:</p>
        <input
          required
          type="number"
          name="food_star"
          value={state.food_star}
          placeholder="food_star"
          onChange={handleChange}
        />
        <br />

        <p>Vote:</p>
        <input
          required
          type="number"
          name="food_vote"
          value={state.food_vote}
          placeholder="food_vote"
          onChange={handleChange}
        />
        <br />

        <p>Price:</p>
        <input
          required
          type="number"
          name="food_price"
          value={state.food_price}
          placeholder="food_price"
          onChange={handleChange}
        />
        <br />

        <p>Discount:</p>
        <input
          required
          type="number"
          name="food_discount"
          value={state.food_discount}
          placeholder="food_discount"
          onChange={handleChange}
        />
        <br />
        <br />
        <button onClick={onSubmitHandler} type="submit">
          ADD
        </button>
      </form>
    </div>
  );
};

export default Add;
