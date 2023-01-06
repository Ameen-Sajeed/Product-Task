import axios from "axios";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import baseUrl from "../../axios";
import './View.css'

function View() {
    const notify = () =>
    toast.success("Product purchased !", {
      position: toast.POSITION.TOP_RIGHT,
    });
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [forms, setForms] = useState([]);

  useEffect(() => {
    axios
      .get(`${baseUrl}/viewProducts`)
      .then((response) => {
        if (response.data) {
          setForms(response.data);
        } else {
          console.log("erorr");
        }
      })
      .catch((error) => {
        console.log(error, "erorr ocurred");
      });
  }, []);

  const buyProduct = async (id) => {
    try {
      await axios.post(`${baseUrl}/buyProduct/${id}`).then((response) => {
        console.log(response);
        notify()
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="user">
        <ToastContainer/>
      <h1 className="text-dark text-center text-4xl p-4 font-extrabold">
        Products list
      </h1>
      <div className="flex justify-evenly ">
        {forms.map((obj, index) => {
          return (
            <div
              className="rounded-lg shadow-lg bg-white max-w-xs p-2"
              key={index}
            >
              <a href="#!" data-mdb-ripple="true" data-mdb-ripple-color="light">
                <img className="rounded-t-lg" src={PF + obj.Image} alt="" />
              </a>
              <div className="p-6">
                <h5 className="text-gray-900 text-xl font-medium mb-2">
                  {obj.ProductName}
                </h5>
                <p className="text-gray-700 text-base mb-4">
                  {obj.Description}
                </p>
                <p className="text-gray-700 text-base mb-4 font-semibold">
                  ₹ {obj.Price}
                </p>
                <p className="text-gray-700 text-base mb-4 font-semibold">
                  Category : {obj.Category}
                </p>
{
    obj.Inventory !== 0 ?

                <button
                  onClick={(e) => {
                    buyProduct(obj._id);
                  }}
                  type="button"
                  className=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                >
                  BUY
                </button>
                : <p className="text-lg font-semibold text-red-700">Out of Stock</p>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default View;
