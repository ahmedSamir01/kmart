import { useState, createContext } from "react";

export const stateContext = createContext();

export default function CartContext(props) {
  const [cartLits, setCartList] = useState([]);

  function handleAdd() {
    // code here
  }
  function handleRemove() {
    // code here
  }
  function handleClear() {
    // code here
  }

  return (
    <stateContext.Provider
      value={{ cartLits, handleAdd, handleRemove, handleClear }}
    >
      {props.children}
    </stateContext.Provider>
  );
}
