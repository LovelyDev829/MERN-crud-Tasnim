import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import React from "react";
import "./Banner.css";
import { useState } from "react";
import LoginRegister from "../components/loginRegister/LoginRegister";

function Banner() {
  const [openRegisterModal, setOpenRegisterModal] = useState(false);
  const [success, setSuccess] = useState(false);

  return (
    <div className="banner">
      <div className="banner__search">
        <Button className="banner__searchButton button" variant="outlined">
          Search Dates
        </Button>
      </div>
      <div className="banner__info">
        <Button
          variant="outlined"
          className="my-button button"
          onClick={() => setOpenRegisterModal(true)}
        >SignIn / SignUp</Button>
        {openRegisterModal ? (
          <LoginRegister
            parentShow={openRegisterModal}
            setParentShow={setOpenRegisterModal}
            setSuccess={setSuccess}
          />
        ) : (
          []
        )}

        {success ? <div>User Signed in</div> : <div>User/Pass not matched</div>}
      </div>
    </div>
  );
}

function Banner2() {
  return (
    <div className="banner">
      <div className="banner__search">
        <Button className="banner__searchButton button" variant="outlined">
          Search Dates
        </Button>
      </div>
      <div className="banner__info">
        <h1>World Class Service at your Door!</h1>

        <h5>Type your things here</h5>

        {/* <Button variant='outlined' onClick={()=>{
              navigate(`/Home`)
            }}>Explore Nearby</Button> */}
        <Link to={`/Home`}>
          <Button variant="outlined button" className="my-button">
            Explore Nearby
          </Button>
          <h5>Signup as A Customer</h5>
        </Link>
      </div>
    </div>
  );
}

export default Banner;
