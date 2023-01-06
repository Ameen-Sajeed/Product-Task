import axios from "axios";
import React, { useEffect, useState } from "react";
import baseUrl from "../../axios";

function Product() {
  const [forms, setForms] = useState([]);
  const [showMOd, SetShowMod] = useState(false);
  const [Image, setImage] = useState("");
  const [prod, setProd] = useState({
    ProductName: "",
    Description: "",
    Inventory: "",
    Price: "",
    Category: "",
    Image: "",
  });

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
    console.log(Image, "ddsd");
  };

  const updateProduct = async (e, id) => {
    // e.preventDefault();
    console.log(id);

    const formData = new FormData();
    for (let key in prod) {
      formData.append(key, prod[key]);
    }

    axios.post(`${baseUrl}/updateProduct/${id}`, formData).then((response) => {
      console.log(response);
    });
  };

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
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

  const delProduct = async (id) => {
    await axios.delete(`${baseUrl}/deleteProduct/${id}`);
    // alert("deleted");
    window.location.reload();
  };

  const change = (obj) => {
    SetShowMod(true);
    setProd({
      ProductName: obj.ProductName,
      Description: obj.Description,
      Inventory: obj.Inventory,
      Price: obj.Price,
      Category: obj.Category,
      Image: obj.Image,
    });
  };

  return (
    <div className=" w-full">
      <h1 className="text-5xl font-bold p-2 text-center">Products</h1>

      <div className="w-full">
        <div className="inline-block shadow rounded-lg overflow-hidden p-4 w-full">
          <table className=" leading-normal w-full">
            <thead>
              <tr>
                <th className="px-5  py-3 border-b-2 border-gray-200 bg-gray-100  text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  SL NO:
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100  text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  PRODUCT
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  IMAGE
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  DESCRIPTION
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  CATEGORY
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  PRICE
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  INVENTORY
                </th>

                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  VIEW
                </th>

                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  ACTION
                </th>
              </tr>
            </thead>
            <tbody>
              {forms.map((obj, index) => {
                return (
                  <tr key={index}>
                    <td className="text-center">{index + 1} </td>
                    <td className="text-center">{obj.ProductName}</td>
                    <td className="text-center p-2">
                      <img src={PF + obj.Image} className="w-20 "></img>
                    </td>
                    <td className="text-center">{obj.Description}</td>
                    <td className="text-center">{obj.Category}</td>

                    <td className="text-center">{obj.Price}</td>
                    <td className="text-center">{obj.Inventory}</td>

                    <td className="text-center p-6 ">
                      <button
                        onClick={() => change(obj)}
                        type="button"
                        className="  inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-blue-200 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out"
                      >
                        UPDATE
                      </button>
                    </td>

                    <td className="text-center p-6 ">
                      <button
                        onClick={(e) => {
                          delProduct(obj._id);
                        }}
                        type="button"
                        className="  inline-block px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-red-400 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out"
                      >
                        DELETE
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      {showMOd ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Update Product</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => SetShowMod(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                <div className="relative p-6 flex-auto">
                  <input
                    name="ProductName"
                    className="p-2"
                    placeholder="ProductName"
                    value={prod?.ProductName}
                    onChange={(e) => handleChange(e)}
                    required
                  />
                  <input
                    className="p-2"
                    name="Description"
                    placeholder="Description"
                    value={prod?.Description}
                    onChange={(e) => handleChange(e)}
                    required
                  />{" "}
                  <input
                    className="p-2"
                    name="Inventory"
                    type="number"
                    value={prod?.Inventory}
                    placeholder="Inventory"
                    onChange={(e) => handleChange(e)}
                    required
                  />{" "}
                  <input
                    className="p-2"
                    name="Price"
                    type="number"
                    value={prod?.Price}
                    placeholder="Price"
                    onChange={(e) => handleChange(e)}
                    required
                  />{" "}
                  <input
                    className="p-2"
                    name="Category"
                    value={prod?.Category}
                    placeholder="Category"
                    onChange={(e) => handleChange(e)}
                    required
                  />
                  <div className="inline-grid">
                    <img
                      className="w-20 inline"
                      src={Image ? Image : PF + prod?.Image}
                      alt=""
                    />
                    <input
                      className="ml-5"
                      type="file"
                      name="Image"
                      onChange={(e) => fileUpload(e)}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => SetShowMod(false)}
                  >
                    Close
                  </button>

                  <button
                    onClick={(e) => {
                      updateProduct(prod?._id);
                    }}
                    className="bg-blue-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </div>
  );
}

export default Product;
