import { useState } from "react";
import { useList } from "../context/ListContext";

function WalletDetail({
  item,
  key,
  name,
  image,
  symbol,
  marketcap,
  price,
  priceChange,
  volume,
}) {
  const { addToList, items, removeFromList, usd, setUSD } = useList();
  const findListItem = items.find((list_item) => list_item._id === key);
  const [count, setCount] = useState(1);

  const Add = async () => {
    if (usd > item.current_price) {
      addToList(item, findListItem);
      setCount(count + 1);
      setUSD(parseInt(localStorage.getItem("usd")) - item.current_price);
    }
    localStorage.setItem("usd", JSON.stringify(usd));
  };
  const Remove = async () => {
    setCount(count + 1);
    removeFromList(item.id);
    setUSD(parseInt(localStorage.getItem("usd")) + item.current_price);
    localStorage.setItem("usd", JSON.stringify(usd));
    count -= 1;
  };

  return (
    <div>
      <div className="list-group-item d-flex justify-content-between align-items-center">
        <img style={{ width: "50px" }} src={item.image} />

        <button
          style={{ margin: "5px", height: "41px", width: "45%" }}
          type="button"
          className="btn btn-danger"
          onClick={Add}
        >
          ✗
        </button>
      </div>
    </div>
  );
}

export default WalletDetail;
