import React, { useState, useEffect } from "react";
import "whatwg-fetch";
import PropTypes from "prop-types";
// import { authenticated, user } from "../APP_CONFIG";
import { Box, Button, Modal, Typography } from "@material-ui/core";

const Register = ({ parentShow, setParentShow, setSuccess }) => {
  const [userActive, setUserActive] = useState(false);
  const [userID, setUserID] = useState("");
  const [passActive, setPassActive] = useState(false);
  const [password, setPassword] = useState("");

  const localUserID = localStorage.getItem("userID");
  const localUserPassword = localStorage.getItem("password");

  // useEffect(() => {
  //   fetch("http://localhost:5000/posts")
  //     .then((res) => res.json())
  //     .then((data) => console.log(data))
  //     .catch((err) => console.log(err));
  // }, []);

  const handleInput = (type, value) => {
    if (type === "userID") {
      setUserID(value);
      setUserActive(false);
    } else if (type === "password") {
      setPassword(value);
      setPassActive(false);
    }
  };

  const handleSubmit = () => {
    if (userID === localUserID && password === localUserPassword) {
      localStorage.setItem("authenticated", true);
      setSuccess(true);
      setParentShow(false);
    } else {
      setSuccess(false);
      setParentShow(false);
    }
  };

  return (
    <>
      <Modal
        open={parentShow}
        onClose={() => setParentShow(false)}
        aria-labelledby={"modal-modal-title"}
        aria-describedby={"modal-modal-description"}
      >
        <div className="flex justify-center items-center h-screen">
          <div className="max-w-sm rounded-3xl overflow-hidden shadow-lg">
            <img
              className="w-full"
              src="https://img.freepik.com/free-vector/mobile-login-concept-illustration_114360-83.jpg?t=st=1647358300~exp=1647358900~hmac=6c1067594f7ec05277180331f75f32a0045a6106f6f500aaf5faf3b93654d650&w=900"
              alt="Sunset in the mountains"
            />
            <div className="px-6 py-7 bg-white">
              <div className="px-6 text-3xl font-thin text-gray-900">
                <div>Welcome Back,</div>
                <div> Sign In</div>
              </div>
              <div className="pt-5 pb-5 pr-7 pl-7">
                <input
                  className={
                    userActive
                      ? "py-1 px-2 w-full border-b-2 border-red-500 outline-none text-lg font-light"
                      : "py-1 px-2 w-full border-b-2 border-blue-500 outline-none text-lg font-light"
                  }
                  placeholder="userID"
                  onFocus={() => setUserActive(true)}
                  onBlur={(e) => handleInput("userID", e.target.value)}
                />
                <div className="pt-4"></div>
                <input
                  className={
                    passActive
                      ? "py-1 px-2 w-full border-b-2 border-red-500 outline-none text-lg font-light"
                      : "py-1 px-2 w-full border-b-2 border-blue-500 outline-none text-lg font-light"
                  }
                  type="password"
                  placeholder="password"
                  onClick={() => setPassActive(true)}
                  onBlur={(e) => handleInput("password", e.target.value)}
                />

                <div className="mt-4 text-center font-semibold text-red-500 underline">
                  Forgot your password?
                </div>

                <div className="flex justify-center mt-4">
                  <div
                    className="pt-1 pb-2 bg-blue-500 rounded-2xl w-1/3 text-center text-white font-semibold"
                    onClick={handleSubmit}
                  >
                    Sign In
                  </div>
                </div>
              </div>
              <div className="text-center font-medium text-sky-800">
                Don&apos;t have an account?
                <span className="text-red-500 underline"> Register Here!!</span>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

Register.propTypes = {
  parentShow: PropTypes.any.isRequired,
  setParentShow: PropTypes.any.isRequired,
  setSuccess: PropTypes.any.isRequired,
};

export default Register;
