import React, { useState } from "react";
import styled from "styled-components";
import { version as uuidVersion } from "uuid";
import { validate as uuidValidate } from "uuid";

const theme = {
  amber: {
    default: "#ffa000",
    hover: "#ff8f00"
  },
  blue: {
    default: "#3f51b5",
    hover: "#283593"
  }
};

const Button = styled.button`
  background-color: ${(props) => theme[props.theme].default};
  color: white;
  padding: 5px 15px;
  border-radius: 5px;
  outline: 0;
  text-transform: uppercase;
  margin: 10px 0px;
  cursor: pointer;
  box-shadow: 0px 2px 2px lightgray;
  transition: ease background-color 250ms;
  &:hover {
    background-color: ${(props) => theme[props.theme].hover};
  }
  &:disabled {
    cursor: default;
    opacity: 0.7;
  }
`;

const GuidInput = styled.input`
  display: block;
  margin: 20px 0px;
  border: 1px solid lightblue;
`;

// Creating a custom hook
function useInput(defaultValue) {
  const [value, setValue] = useState(defaultValue);
  function onChange(e) {
    setValue(e.target.value);
  }
  return {
    value,
    onChange
  };
}

/* test GUID: f7cf0cbf-5779-4269-a15d-c4bac5c47ee0
 To identify the version of the GUID, just look at the version digit e.g version 4 
 GUIDs have the format xxxxxxxx-xxxx-4xxx-Nxxx-xxxxxxxxxxxx where N is one of 8,9,A, or B.
*/
function extractDate(input) {
  if (uuidValidate(input)) {
    let version = uuidVersion(input);
    alert(`${input} is a version ${version} RFC 4122 UUID`);
  } else {
    alert(`Sorry, ${input} is not an RFC 4122 compliant UUID.`);
  }
}

Button.defaultProps = {
  theme: "amber"
};

// Usage in App
export default function App() {
  const inputProps = useInput();
  return (
    <body>
      <h3>Enter a GUID to extract the date from.</h3>

      <div>
        <GuidInput {...inputProps} placeholder="Type a GUID here" />
        <Button onClick={() => extractDate(inputProps.value)}>
          Extract Date
        </Button>
        <p>Value: {inputProps.value} </p>
      </div>
    </body>
  );
}
