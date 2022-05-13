import React, { useState, useEffect } from "react";
import "whatwg-fetch";
import PropTypes from "prop-types";
// import { authenticated, user } from "../APP_CONFIG";
import { Box, Button, Modal, Typography } from "@material-ui/core";
import Login from "./Login";
import Register from "./Register";
import { APP_CONFIGURATION } from "../../APP_CONFIG";
import axios from 'axios';

const LoginRegister = ({ parentShow, setParentShow, setSuccess }) => {
  const [signingToggle, setSigningToggle] = useState(false);
  const [userActive, setUserActive] = useState(false);
  const [userID, setUserID] = useState("");
  const [passActive, setPassActive] = useState(false);
  const [password, setPassword] = useState("");
  const [passError, setPassError] = useState(false);
  const [userError, setUserError] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);

  const localUserID = localStorage.getItem("userID");
  const localUserPassword = localStorage.getItem("password");

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
    console.log(userID)
    const userInfo={
      userEmail : userID,
      userPassword : password
    }
    axios.post('http://localhost:5000/users/authentication', userInfo)
    .then(res => {
      console.log(res.data?.userType)
      if ( res.data?.userType!=='fake' ) setLoginSuccess(true);
      else { setLoginSuccess(false); }
    }).catch((err) => console.log(err))

    // fetch(`http://localhost:5000/users/${userID}`)
    //   .then((res) => res.json())
    //   .then((data) => {
    //     console.log(data);
    //     if (data.length <= 0) {
    //       setUserError(true);
    //       localStorage.setItem("userId", data[0]["userID"]);
    //       setLoginSuccess(false);
    //     } else {
    //       setUserError(false);
    //       if (data[0]["password"] === password) {
    //         console.log("Matched");
    //         setPassError(false);
    //         setLoginSuccess(true);
    //         setTimeout(() => {
    //           setParentShow(false);
    //         }, 2000);
    //       } else {
    //         console.log("Not Matched");
    //         setPassError(true);
    //         setLoginSuccess(false);
    //       }
    //     }
    //   })
    //   .catch((err) => console.log(err));
  };

  return (
    <>
      <Modal
        open={parentShow}
        onClose={() => setParentShow(false)}
        aria-labelledby={"modal-modal-title"}
        aria-describedby={"modal-modal-description"}
      >
        {loginSuccess ? 
          <a href='/caterer'>
            <div className="flex justify-center items-center h-screen" >
              <div className="max-w-sm rounded-3xl overflow-hidden shadow-lg">
                <img
                  className="w-full"
                  src="https://img.freepik.com/free-vector/mobile-login-concept-illustration_114360-83.jpg?t=st=1647358300~exp=1647358900~hmac=6c1067594f7ec05277180331f75f32a0045a6106f6f500aaf5faf3b93654d650&w=900"
                  alt="Sunset in the mountains"
                />

                {loginSuccess ? (
                  <>
                    <div className="px-6 py-7 bg-white">
                      <div className="px-6 text-3xl font-thin text-gray-900">
                        <div className="text-center text-green-500">
                          Signed In Successful
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {signingToggle ? (
                      <Register
                        userActive={userActive}
                        setUserActive={setUserActive}
                        handleInput={handleInput}
                        passActive={passActive}
                        setPassActive={setPassActive}
                        handleSubmit={handleSubmit}
                        setSigningToggle={setSigningToggle}
                      />
                    ) : (
                      <Login
                        userActive={userActive}
                        setUserActive={setUserActive}
                        handleInput={handleInput}
                        passActive={passActive}
                        setPassActive={setPassActive}
                        handleSubmit={handleSubmit}
                        setSigningToggle={setSigningToggle}
                        passError={passError}
                        userError={userError}
                      />
                    )}
                  </>
                )}
              </div>
            </div>
          </a>
          :
          <div className="flex justify-center items-center h-screen" >
            <div className="max-w-sm rounded-3xl overflow-hidden shadow-lg">
              <img
                className="w-full"
                src="https://img.freepik.com/free-vector/mobile-login-concept-illustration_114360-83.jpg?t=st=1647358300~exp=1647358900~hmac=6c1067594f7ec05277180331f75f32a0045a6106f6f500aaf5faf3b93654d650&w=900"
                alt="Sunset in the mountains"
              />

              {loginSuccess ? (
                <>
                  <div className="px-6 py-7 bg-white">
                    <div className="px-6 text-3xl font-thin text-gray-900">
                      <div className="text-center text-green-500">
                        Signed In Successful
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {signingToggle ? (
                    <Register
                      userActive={userActive}
                      setUserActive={setUserActive}
                      handleInput={handleInput}
                      passActive={passActive}
                      setPassActive={setPassActive}
                      handleSubmit={handleSubmit}
                      setSigningToggle={setSigningToggle}
                    />
                  ) : (
                    <Login
                      userActive={userActive}
                      setUserActive={setUserActive}
                      handleInput={handleInput}
                      passActive={passActive}
                      setPassActive={setPassActive}
                      handleSubmit={handleSubmit}
                      setSigningToggle={setSigningToggle}
                      passError={passError}
                      userError={userError}
                    />
                  )}
                </>
              )}
            </div>
          </div>
        } 
      </Modal>
    </>
  );
};

LoginRegister.propTypes = {
  parentShow: PropTypes.any.isRequired,
  setParentShow: PropTypes.any.isRequired,
  setSuccess: PropTypes.any.isRequired,
};

export default LoginRegister;
