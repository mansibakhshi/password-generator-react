import "./styles.css";
import { generatePassword } from "./generatePassword";
import { useFormik } from "formik";
import { useState } from "react";

export interface PasswordProps {
  length: number;
  includeUpperCase: boolean;
  includeLowerCase: boolean;
  includeNumber: boolean;
  includeSymbols: boolean;
}

const initialValues: PasswordProps = {
  length: 10,
  includeLowerCase: false,
  includeUpperCase: false,
  includeNumber: false,
  includeSymbols: false
};

const App = () => {
  const [generatedPassword, setGeneratedPassword] = useState('');
  const { getFieldProps, values, handleSubmit } = useFormik({
    initialValues,
    onSubmit: (values) => {
      const password = generatePassword(values);
      console.log(password.length);
      setGeneratedPassword(password);
    },
  });

  return (
    <div className="container">
      <h1 className="heading">Password generator</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <p className="length">Current Length: {values.length}</p>
          {generatePassword() && (
            <p className="generated-pass">{generatedPassword}</p>
          )}
          <div className="flex">
            <p>10</p>
            <input
              id="length"
              {...getFieldProps('length')}
              type="range"
              min={10}
              max={40}
            />
            <p>40</p>
          </div>
        </div>
        // rest of component
      </form>
    </div>
  );
};

export default App;
