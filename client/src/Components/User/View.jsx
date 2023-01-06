import axios from "axios";
import React, { useEffect, useState } from "react";
import baseUrl from "../../axios";

function View() {
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
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <h1 className="text-dark text-center text-4xl p-4 font-extrabold">
        Products list
      </h1>
      <div className="flex justify-center ">
        {forms.map((obj, index) => {
          return (
            <div
              className="rounded-lg shadow-lg bg-white max-w-sm p-2"
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

                <button
                  onClick={(e) => {
                    buyProduct(obj._id);
                  }}
                  type="button"
                  className=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                >
                  BUY
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default View;
