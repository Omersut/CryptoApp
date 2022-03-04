import { useState, createContext, useContext, useEffect } from "react";

const ListContext = createContext();

const defaultWallet = JSON.parse(localStorage.getItem("wallet"));

const ListProvider = ({ children }) => {
  const [items, setItems] = useState(defaultWallet || []);
  useEffect(() => {
    localStorage.setItem("wallet", JSON.stringify(items));
  }, [items]);

  const addToList = (data, findListItem) => {
    if (!findListItem) {
      return setItems((items) => [data, ...items]);
    }

    const filtered = items.filter((item) => item.id !== findListItem._id);
    setItems(filtered);
  };
  const removeFromList = (item_id) => {
    const filtered = items.filter((item) => item.id !== item_id);
    setItems(filtered);
  };
  const [usd, setUSD] = useState(
    JSON.parse(localStorage.getItem("usd"))
      ? JSON.parse(localStorage.getItem("usd"))
      : 1000000
  );

  const values = {
    items,
    setItems,
    addToList,
    removeFromList,
    usd,
    setUSD,
  };

  return <ListContext.Provider value={values}>{children}</ListContext.Provider>;
};

const useList = () => useContext(ListContext);
export { ListProvider, useList };
