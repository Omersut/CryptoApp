import { useState, createContext, useContext, useEffect } from "react";

const ListContext = createContext();

const ListProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  const addToList = (data, findListItem) => {
    if (!findListItem) {
      return setItems((items) => [data, ...items]);
    }
    const filtered = items.filter((item) => item._id !== findListItem._id);
    setItems(filtered);
  };
  const removeFromList = (item_id) => {
    const filtered = items.filter((item) => item._id !== item_id);
    setItems(filtered);
  };

  const values = {
    items,
    setItems,
    addToList,
    removeFromList,
  };

  return <ListContext.Provider value={values}>{children}</ListContext.Provider>;
};

const useList = () => useContext(ListContext);
export { ListProvider, useList };
