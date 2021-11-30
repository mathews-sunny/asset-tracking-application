import React, { useState } from "react";

const useInput = (validateValue:(text:string)=>boolean) => {
  const [enteredInput, setEnteredInput] = useState('');
  const [inputIsTouched, setInputIsTouched] = useState(false);
  const enteredInputIsValid = validateValue(enteredInput);
  let hasError = !enteredInputIsValid && inputIsTouched;

  const inputChangeHandler = (event:React.ChangeEvent<HTMLInputElement>) => {
    setEnteredInput(event.target.value);
  };
  const inputBlurHandler = () => {
    setInputIsTouched(true);
  };
  const reset = () => {
      setEnteredInput('');
      setInputIsTouched(false);
  }
  return {
    value:enteredInput,
    enteredInputIsValid,
    hasError,
    inputChangeHandler,
    inputBlurHandler,
    reset
  };
};

export default useInput;
