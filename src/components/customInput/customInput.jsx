import React from "react";
import PropTypes from "prop-types";
import { MenuItem, OutlinedInput, TextField } from "@mui/material";
import "./customInputStyle.css";

function CustomInput({
  inputLabel,
  type,
  id,
  name,
  placeholder,
  isSelect,
  disabled,
  error,
  textError,
  options,
  value,
  onChangeValue
}) {
  return (
    <div className="input">
      <label htmlFor={id}>{inputLabel}</label>
      <br/>
      
      { 
        isSelect 
          ?(
            <TextField
              id={id}
              select
              value={value}
              disabled = {disabled}
              fullWidth
              error = {error}
              onChange={onChangeValue}
              helperText={textError}
              style={disabled ? {backgroundColor: "#D9D9D9", opacity: "0.8"} : {}}
            >
              {options.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          )
          :(
            <>
              <OutlinedInput
                type={type}
                id="input-label"
                name={name}
                placeholder={placeholder}
                fullWidth
                disabled = {disabled}
                error = {error}
                value={value}
                onChange={onChangeValue}
                inputProps={{min: 0}}
                style={disabled ? {backgroundColor: "#D9D9D9", opacity: "0.8"} : {}}
              />
              <p className="textError">{textError}</p>
            </>
          )
      }
    </div>
  );
}

CustomInput.propTypes = {
  inputLabel: PropTypes.string.isRequired,
  type: PropTypes.string,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  isSelect: PropTypes.bool,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  textError: PropTypes.array,
  options: PropTypes.array,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChangeValue: PropTypes.func.isRequired
};

export default CustomInput;