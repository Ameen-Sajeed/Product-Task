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
  return (
    <div>
      <h1 className="text-dark text-center text-4xl p-4 font-extrabold">
        Products list
      </h1>
      <div class="flex justify-center ">
        {forms.map((obj) => {
          return (
            <div class="rounded-lg shadow-lg bg-white max-w-sm p-2">
              <a href="#!" data-mdb-ripple="true" data-mdb-ripple-color="light">
                <img class="rounded-t-lg" src={PF + obj.Image} alt="" />
              </a>
              <div class="p-6">
                <h5 class="text-gray-900 text-xl font-medium mb-2">
                  {obj.ProductName}
                </h5>
                <p class="text-gray-700 text-base mb-4">{obj.Description}</p>
                <p class="text-gray-700 text-base mb-4 font-semibold">
                  ₹ {obj.Price}
                </p>
                <p class="text-gray-700 text-base mb-4 font-semibold">
                  Category : {obj.Category}
                </p>

                <button
                  type="button"
                  class=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
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
