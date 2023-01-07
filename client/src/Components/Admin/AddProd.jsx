import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import baseUrl from "../../axios";

function AddProd() {
  const notify = () =>
    toast.success("Products Added !", {
      position: toast.POSITION.TOP_RIGHT,
    });
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const initialValues = {
    ProductName: "",
    Description: "",
    Inventory: "",
    Price: "",
    Category: "",
    Image: "",
  };
  const [Image, setImage] = useState("");
  const [prod, setProd] = useState(initialValues);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProd({
      ...prod,
      [name]: value,
    });
  };

  const fileUpload = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
    setProd({
      ...prod,
      Image: e.target.files[0],
    });
  };

  const upload = async (e) => {
    e.preventDefault();

    try {
      if (!prod.ProductName) {
        setErrorMessage("Product Name is required");
      } else if (!prod.Category) {
        setErrorMessage("Category is required");
      } else if (!prod.Description) {
        setErrorMessage("Description is required");
      } else if (!prod.Image) {
        setErrorMessage("Image is required");
      } else if (!prod.Price) {
        setErrorMessage("Price is required");
      } else if (!prod.Inventory) {
        setErrorMessage("Invetory is required");
      } else {
        const formData = new FormData();
        for (let key in prod) {
          formData.append(key, prod[key]);
        }

        axios.post(`${baseUrl}/addProduct`, formData).then((response) => {
          console.log(response);
          setProd(initialValues);
          navigate("/products");
          notify();
        });
      }
    } catch (error) {}
  };

  return (
    <div className="w-full">
      <ToastContainer />
      <h1 className="text-4xl font-bold p-3 text-blue-900 text-center">
        {" "}
        Add Products
      </h1>
      <div className="flex justify-center w-full">
        <div className=" p-6 rounded-lg shadow-lg bg-white max-w-sm w-full flex  ">
          <form>
            <div className="fle">
              <div className="form-group mb-6  ">
                <input
                  type="text"
                  className="form-control
                block
                w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  name="ProductName"
                  placeholder="Product Name"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group mb-6 fle">
                <input
                  type="name"
                  className="form-control block
                w-full
                px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  name="Description"
                  placeholder="Description"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group mb-6">
                <input
                  type="number"
                  className="form-control block
              
                w-full
                px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  name="Inventory"
                  placeholder="Inventory"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group mb-6">
                <input
                  type="text"
                  className="form-control block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  name="Category"
                  placeholder="Category"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group mb-6">
                <input
                  type="number"
                  className="form-control block
                w-full
                px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  name="Price"
                  placeholder="Price"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group mb-6">
                <input
                  type="file"
                  className="form-control block
                w-full
                px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  name="Image"
                  placeholder="Image"
                  onChange={fileUpload}
                  required
                />
                <img
                  className="w-20 inline m-6"
                  src={Image ? Image : PF + prod?.Image}
                  alt=""
                />
              </div>

              <button
                type="submit"
                className="
      w-full
      px-6
      py-2.5
      bg-blue-600
      text-white
      font-medium
      text-xs
      leading-tight
      uppercase
      rounded
      shadow-md
      hover:bg-blue-700 hover:shadow-lg
      focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
      active:bg-blue-800 active:shadow-lg
      transition
      duration-150
      ease-in-out"
                onClick={upload}
              >
                Add product
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="flex justify-center">
        {errorMessage && (
          <div
            className="p-2 m-4 mb-6  w-52 text-center text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
            role="alert "
          >
            {errorMessage}
          </div>
        )}
      </div>
    </div>
  );
}

export default AddProd;
