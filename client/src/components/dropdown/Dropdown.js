import React from "react";
import PropTypes from "prop-types";

const Dropdown = ({ label, options, obj, handleInput }) => {
  return (
    <>
      <label>
        {label}
        <select
          value={obj.typeOfPerson}
          onChange={(e) => handleInput("typeOfPerson", e.target.value)}
        >
          {options.map((option) => (
            <option value={option.value}>{option.label}</option>
          ))}
        </select>
      </label>
    </>
  );
};

Dropdown.propTypes = {
  label: PropTypes.any,
  options: PropTypes.any,
  obj: PropTypes.any,
  handleInput: PropTypes.any,
};

export default Dropdown;
