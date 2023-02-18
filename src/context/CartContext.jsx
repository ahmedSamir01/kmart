import { useState, createContext } from "react";

export const stateContext = createContext();

export default function CartContext(props) {
  const [cartList, setCartList] = useState([]);

  // Handle adding process, considering avoiding the direct state mutation
  // in redux-toolkit, we can mutate state directly, since it uses immerJS
  function handleAdd(item) {
    const foundedProduct = cartList.find((e) => e.id === item.id);
    if (foundedProduct) {
      const newList = cartList.map((e) => {
        if (e.id === item.id) {
          return { ...foundedProduct, quantity: foundedProduct.quantity + 1 };
        } else {
          return e;
        }
      });
      setCartList(newList);
    } else {
      setCartList((list) => list.concat({ ...item, quantity: 1 }));
    }
  }
  function handleRemove(id) {
    setCartList(cartList.filter((e) => e.id !== id));
  }
  function handleClear() {
    setCartList([]);
  }

  return (
    <stateContext.Provider
      value={{ cartList, handleAdd, handleRemove, handleClear }}
    >
      {props.children}
    </stateContext.Provider>
  );
}
