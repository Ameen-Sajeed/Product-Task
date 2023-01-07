import axios from "axios";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import baseUrl from "../../axios";
import { io } from "socket.io-client";
import Dropdown from "rsuite/Dropdown";
import "rsuite/dist/rsuite.min.css";
import PageIcon from "@rsuite/icons/Page"
import "./View.css";

function View() {
  const notify = () =>
    toast.success("Product purchased !", {
      position: toast.POSITION.TOP_RIGHT,
    });
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [forms, setForms] = useState([]);
  const [check, setCheck] = useState(false);
  const [userData, setUserData] = useState({});
  const [Cat, setCat] = useState([]);
  const [filt, setFilt] = useState(null);
  const [data, setData] = useState([]);
  const [socket, setSoket] = useState(null);

  // call socket
  useEffect(() => {
    setSoket(io("http://localhost:8800"));
  }, []);

  // send data to socket
  useEffect(() => {
    socket?.emit("setdata", userData);
  }, [socket, userData]);

  useEffect(() => {
    axios
      .get(`${baseUrl}/viewProducts`)
      .then((response) => {
        if (response.data) {
          setForms(response.data);
          setData(response.data)
          setCat(response.data);
        } else {
          console.log("erorr");
        }
      })
      .catch((error) => {
        console.log(error, "erorr ocurred");
      });
  }, [check]);

  const buyProduct = async (id) => {
    try {
      await axios.post(`${baseUrl}/buyProduct/${id}`).then((response) => {
        setUserData(Date.now());
        setCheck(!check);
        notify();
      });
    } catch (error) {
      console.log(error);
    }
  };

  const Category = (id) => {
    if (id !== null) {
      setFilt(id);
      const fil = forms.filter((data) => {
        return data.Category === id;
      });
      setData(fil);
    } else {
      setData(forms);
    }
  };

  return (
    <div className="user ">
      <ToastContainer />
      <h1 className="text-dark text-center text-5xl p-4 font-extrabold text-green-900">
        Products list
      </h1>
      <div className="flex justify-center m-4">
        <Dropdown title="Choose a Category">
          <Dropdown.Item onClick={() => Category(null)} icon={<PageIcon />}>
            All
          </Dropdown.Item>
          {Cat.map((obj, index) => {
            return (
              <Dropdown.Item
                key={index}
                onClick={() => Category(obj.Category)}
                icon={<PageIcon />}
              >
                {obj.Category}
              </Dropdown.Item>
            );
          })}
        </Dropdown>
      </div>

      <div className="flex justify-evenly  ">
        {/* {
          filt === null ?
       
          
        } */}
        {data.map((obj, index) => {
          return (
            <div
              className="rounded-lg shadow-lg bg-white max-w-xs p-2"
              key={index}
            >
              <a href="#!" data-mdb-ripple="true" data-mdb-ripple-color="light">
                <img
                  className="rounded-t-lg h-40"
                  src={PF + obj.Image}
                  alt=""
                />
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
                {obj.Inventory !== 0 && (
                  <p className="text-gray-700 text-base mb-4 font-semibold">
                    Stock Available
                  </p>
                )}
                {obj.Inventory !== 0 ? (
                  <button
                    onClick={(e) => {
                      buyProduct(obj._id);
                    }}
                    type="button"
                    className=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                  >
                    BUY
                  </button>
                ) : (
                  <p className="text-lg font-semibold text-red-700">
                    Out of Stock
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default View;
