import React, { useState } from "react";
import "./Header.css";
import SearchIcon from "@material-ui/icons/Search";
import LanguageIcon from "@material-ui/icons/Language";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Avatar, FormControl, Select } from "@material-ui/core";
import { APP_CONFIGURATION } from "../APP_CONFIG";
import { Dropdown } from "react-bootstrap";

function Header() {
  const [showUserDropDown, setShowUserDropdown] = useState(false);

  return (
    <>
      {/* <div className=" flex flex-row justify-between items-center">
        <div className="w-24 mr-5">
          <a href="/">
            <img className="object-cover" src="./images/myLogo.jpg" alt="" />
          </a>
        </div>
        <div className="bg-blue-500">
          <input className="border-2 border-black" />
        </div>
        <div className="flex flex-row">
          <a href="/caterer">Become Caterer</a>
          <LanguageIcon />
          <ExpandMoreIcon />
          <Avatar onClick={() => setShowUserDropdown(!showUserDropDown)} />

          {showUserDropDown ? (
            <>
              <Dropdown>
                <Dropdown.Toggle className="bg-blue-500" id="dropdown-basic">
                  Dropdown Button
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                  <Dropdown.Item href="#/action-2">
                    Another action
                  </Dropdown.Item>
                  <Dropdown.Item href="#/action-3">
                    Something else
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </>
          ) : (
            []
          )}
        </div>
      </div> */}

      <div className="header">
        <a href="/">
          <img className="header__icon" src="./images/myLogo.jpg" alt="" />
        </a>
        <div className="header__center">
          <input type="text" />
          <SearchIcon />
        </div>

        <div className="header__right">
          <a href="/caterer">Become Caterer</a>
          <LanguageIcon />
          <ExpandMoreIcon />
          <div>User</div>
          <Avatar onClick={() => setShowUserDropdown(!showUserDropDown)} />

          {showUserDropDown ? (
            <>
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  Dropdown Button
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                  <Dropdown.Item href="#/action-2">
                    Another action
                  </Dropdown.Item>
                  <Dropdown.Item href="#/action-3">
                    Something else
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </>
          ) : (
            []
          )}
        </div>
      </div>
    </>
  );
}

export default Header;
