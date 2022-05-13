import React from "react";
import PropTypes from "prop-types";

const Login = ({
  userActive,
  setUserActive,
  handleInput,
  passActive,
  setPassActive,
  handleSubmit,
  setSigningToggle,
  passError,
  userError,
}) => {
  return (
    <>
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

          {userError ? (
            <>
              <div className="font-medium text-red-500">
                User not found! Create one!
              </div>
            </>
          ) : (
            []
          )}

          {passError ? (
            <>
              <div className="font-medium text-red-500">
                Password didn&apos;t matched! Try again!
              </div>
            </>
          ) : (
            []
          )}

          <div className="mt-4 text-center font-semibold text-red-500 underline">
            Forgot your password?
          </div>

          <div className="flex justify-center mt-4">
            <div
              className="pt-1 pb-2 bg-blue-500 rounded-2xl w-1/3 text-center text-white font-semibold"
              onClick={handleSubmit}
              style = {{ curser: 'pointer' }}
            >
              Sign In
            </div>
          </div>
        </div>
        <div
          className="text-center font-medium text-sky-800"
          onClick={() => setSigningToggle(true)}
        >
          Don&apos;t have an account?
          <span className="text-red-500 underline"> Register Here!!</span>
        </div>
      </div>
    </>
  );
};

Login.propTypes = {
  userActive: PropTypes.any,
  setUserActive: PropTypes.any,
  handleInput: PropTypes.any,
  passActive: PropTypes.any,
  setPassActive: PropTypes.any,
  handleSubmit: PropTypes.any,
  passError: PropTypes.any,
  userError: PropTypes.any,
};

export default Login;
