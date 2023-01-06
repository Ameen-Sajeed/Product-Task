import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import baseUrl from "../../axios";

function AddProd() {

    const navigate = useNavigate()

  const notify = () =>
    toast.success("Products Added !", {
      position: toast.POSITION.TOP_RIGHT,
    });
    const initialValues ={    ProductName: "",
    Description: "",
    Inventory: "",
    Price: "",
    Category: "",
    Image: "",}
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

    const formData = new FormData();
    for (let key in prod) {
      formData.append(key, prod[key]);
    }

    axios.post(`${baseUrl}/addProduct`, formData).then((response) => {
      console.log(response);
      setProd(initialValues);
      navigate('/products')
      notify();
    });
  };

  return (
    <div className="">
      <ToastContainer />
      <h1 className="text-4xl font-bold p-2"> Add Products</h1>
      <div className="flex justify-center">

      <div className="block p-6 rounded-lg shadow-lg bg-white max-w-sm w-full ">
        <form>
          <div className="form-group mb-6 ">
            <label className="form-label inline-block mb-2 text-gray-700">
              Product Name
            </label>
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
              placeholder="Name"
              onChange={handleChange}
              required
              />
          </div>
          <div className="form-group mb-6">
              <label
              htmlFor="exampleInputPassword2"
              className="form-label inline-block mb-2 text-gray-700"
            >
              Description
            </label>
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
            <label className="form-label inline-block mb-2 text-gray-700">
              Inventory
            </label>
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
            <label className="form-label inline-block mb-2 text-gray-700">
              Category
            </label>
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
            <label className="form-label inline-block mb-2 text-gray-700">
              Price
            </label>
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
            <label className="form-label inline-block mb-2 text-gray-700">
              Image
            </label>
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
        </form>
      </div>
      </div>
    </div>
  );
}

export default AddProd;
