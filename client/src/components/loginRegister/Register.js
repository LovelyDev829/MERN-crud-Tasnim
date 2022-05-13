import React, { useEffect, useState } from "react";
import "whatwg-fetch";
import PropTypes from "prop-types";
import { APP_CONFIGURATION } from "../../APP_CONFIG";
import Dropdown from "../dropdown/Dropdown";
import axios from 'axios';

const Register = ({ setSigningToggle }) => {
  const [nameActive, setNameActive] = useState(false);
  const [addressActive, setAddressActive] = useState(false);
  const [phoneNoActive, setPhoneNoActive] = useState(false);
  const [emailActive, setEmailActive] = useState(false);
  const [passwordActive, setPasswordActive] = useState(false);
  const [contactNameActive, setContactNameActive] = useState(false);
  const [contactPhoneActive, setContactPhoneActive] = useState(false);
  const [passwordConfirmActive, setPasswordConfirmActive] = useState(false);
  const [userTypeCaterer, setUserTypeCaterer] = useState(false)

  const UserOptions = [
    { label: "Customer", value: "customer" },
    { label: "Caterer", value: "caterer" },
    { label: "Admin", value: "admin" },
  ];

  const [obj, setObj] = useState({
    userID: "",
    name: "",
    address: "",
    phoneNo: "",
    email: "",
    password: "",
    typeOfPerson: "customer",
  });

  useEffect(() => {
    fetch("http://localhost:5000/users", obj)
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  }, []);

  const handleInput = (type, value) => {
    let temp = obj;

    if (type === "name") {
      temp["name"] = value;
      console.log(temp["name"], obj.name);
      setNameActive(false);
    } else if (type === "address") {
      temp["address"] = value;
      setAddressActive(false);
    } else if (type === "phoneNo") {
      temp["phoneNo"] = value;
      setPhoneNoActive(false);
    } else if (type === "email") {
      temp["email"] = value;
      setEmailActive(false);
    } else if (type === "password") {
      temp["password"] = value;
      setPasswordActive(false);
    } else if (type === "typeOfPerson") {
      temp["typeOfPerson"] = value;
      if(value === 'caterer'){
        temp["orders"] = []
      temp["receivePayment"] = "Accept Cash"
      setUserTypeCaterer(!userTypeCaterer)
      } else {
        temp["payment"]= "Pay by card"
        temp["order:"] = [""]
      }
      console.log(temp["typeOfPerson"]);
    }else if (type === "contactName") {
      temp["contactName"] = value;
      setPasswordActive(false);
    }else if (type === "contactPhoneNumber") {
      temp["contactPhoneNumber"] = value;
      setPasswordActive(false);
    }
    setObj(temp);
  };

  const handleSubmit = () => {
    console.log(obj);
    let urlType = ''
    if(obj.typeOfPerson === 'caterer'){
      urlType="caterers"
      axios.post('http://localhost:5000/users/createCaterer', obj)
      .then((res) => {console.log(res.data); setSigningToggle(false)}).catch((err) => console.log(err))
    } else{
      urlType = "customers"
      axios.post('http://localhost:5000/users/createCustomer', obj)
      .then((res) => {console.log(res.data); setSigningToggle(false)}).catch((err) => console.log(err))
    }
    
    // fetch(
    //   APP_CONFIGURATION.DB_PROTOCOL +
    //     "://" +
    //     APP_CONFIGURATION.DB_HOST +
    //     ":" +
    //     APP_CONFIGURATION.DB_PORT +
    //     "/"+urlType,
    //   {
    //     method: "POST",
    //     body: JSON.stringify(obj),
    //     cache: "no-cache",
    //     headers: new Headers({
    //       "Content-Type": "application/json",
    //     }),
    //   }
    // )
    //   .then((res) => {
    //     setSigningToggle(false);
    //     console.log(res);
    //   })
    //   .catch((err) => console.log(err));
  };

  return (
      <div className="px-6 py-7 bg-white">
        <div className="px-6 text-3xl font-thin text-gray-900">
          <div>Create Your Account</div>
          {/* <div> Sign In</div> */}
        </div>
        <div className="pt-5 pb-5 pr-7 pl-7">
          {/* NAME */}
          <input
            className={
              nameActive
                ? "py-1 px-2 w-full border-b-2 border-red-500 outline-none text-lg font-light"
                : "py-1 px-2 w-full border-b-2 border-blue-500 outline-none text-lg font-light"
            }
            placeholder="Full Name"
            onFocus={() => setNameActive(true)}
            onBlur={(e) => handleInput("name", e.target.value)}
          />

          <div className="pt-4"></div>

          {/* ADDRESS */}
          <input
            className={
              addressActive
                ? "py-1 px-2 w-full border-b-2 border-red-500 outline-none text-lg font-light"
                : "py-1 px-2 w-full border-b-2 border-blue-500 outline-none text-lg font-light"
            }
            placeholder="Enter Address"
            onClick={() => setAddressActive(true)}
            onBlur={(e) => handleInput("address", e.target.value)}
          />

          <div className="pt-4"></div>

          {/* PHONE NO */}
          <input
            className={
              phoneNoActive
                ? "py-1 px-2 w-full border-b-2 border-red-500 outline-none text-lg font-light"
                : "py-1 px-2 w-full border-b-2 border-blue-500 outline-none text-lg font-light"
            }
            placeholder="Phone No (e.g. +1-123-456-7890)"
            onClick={() => setPhoneNoActive(true)}
            onBlur={(e) => handleInput("phoneNo", e.target.value)}
          />

          <div className="pt-4"></div>

          {/* EMAIL */}
          <input
            className={
              emailActive
                ? "py-1 px-2 w-full border-b-2 border-red-500 outline-none text-lg font-light"
                : "py-1 px-2 w-full border-b-2 border-blue-500 outline-none text-lg font-light"
            }
            placeholder="Enter Email"
            onClick={() => setEmailActive(true)}
            onBlur={(e) => handleInput("email", e.target.value)}
          />

          <div className="pt-4"></div>

          {/* PASSWORD */}
          <input
            className={
              passwordActive
                ? "py-1 px-2 w-full border-b-2 border-red-500 outline-none text-lg font-light"
                : "py-1 px-2 w-full border-b-2 border-blue-500 outline-none text-lg font-light"
            }
            type="password"
            placeholder="password"
            onClick={() => setPasswordActive(true)}
            onBlur={(e) => handleInput("password", e.target.value)}
          />

          <div className="pt-4"></div>

          <div className="flex justify-center">
            <div>
              <div className="form-check">
                <input
                  className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                  type="checkbox"
                  value=""
                  id="flexCheckDefault"
                  onClick={(e) => handleInput("typeOfPerson", "customer")}
                />
                <label
                  className="form-check-label inline-block text-gray-800"
                  for="flexCheckDefault"
                >
                  I am a customer
                </label>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                  type="checkbox"
                  value=""
                  id="flexCheckDefault"
                  onClick={(e) => handleInput("typeOfPerson", "caterer")}
                />
                <label
                  className="form-check-label inline-block text-gray-800"
                  for="flexCheckDefault"
                >
                  I am a caterer
                </label>
              </div>

              {console.log(obj.typeOfPerson)}
              {userTypeCaterer? (
                <div>
                  <input
            className={
              passwordActive
                ? "py-1 px-2 w-full border-b-2 border-red-500 outline-none text-lg font-light"
                : "py-1 px-2 w-full border-b-2 border-blue-500 outline-none text-lg font-light"
            }
            placeholder="Catering Shop Name"
            onClick={() => setContactNameActive(true)}
            onBlur={(e) => handleInput("contactName", e.target.value)}
          />

          <div className="pt-4"></div><input
            className={
              passwordActive
                ? "py-1 px-2 w-full border-b-2 border-red-500 outline-none text-lg font-light"
                : "py-1 px-2 w-full border-b-2 border-blue-500 outline-none text-lg font-light"
            }
            placeholder="Catering Shop Phone"
            onClick={() => setContactPhoneActive(true)}
            onBlur={(e) => handleInput("contactPhoneNumber", e.target.value)}
          />

          <div className="pt-4"></div>
                </div>
              ): []}
            </div>
          </div>

          {/* <Dropdown
            label="what do we eat?"
            options={UserOptions}
            obj={obj}
            handleInput={handleInput}
          /> */}

          <div className="flex justify-center mt-4">
            <div
              className="pt-1 pb-2 bg-blue-500 rounded-2xl w-1/3 text-center text-white font-semibold"
              onClick={handleSubmit}
            >
              Submit
            </div>
          </div>
        </div>
        <div
          className="text-center font-medium text-sky-800"
          onClick={() => setSigningToggle(false)}
        >
          Already have an account?
          <span className="text-red-500 underline"> Login Here!!</span>
        </div>
      </div>
  );
};

Register.propTypes = {
  setSigningToggle: PropTypes.any,
};

export default Register;
