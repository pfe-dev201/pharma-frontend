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
              fullWidth
              error = {error}
              onChange={onChangeValue}
              helperText={textError}
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
              />
              <p className="textError">{textError}</p>
            </>
          )
      }
    </div>
  );
}

CustomInput.propTypes = {
  inputLabel: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  isSelect: PropTypes.bool,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  textError: PropTypes.string,
  options: PropTypes.array,
  value: PropTypes.object,
  onChangeValue: PropTypes.func.isRequired
};

export default CustomInput;