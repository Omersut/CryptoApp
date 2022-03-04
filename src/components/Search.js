import { useEffect, useState } from "react";
import { useList } from "../context/ListContext";

function Search({
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
  // context basket
  const { addToList, items, removeFromList, usd, setUSD } = useList();
  const findListItem = items.find((list_item) => list_item._id === key);
  const [inWalled, setInwallet] = useState(false);

  const Add = async () => {
    if (usd > item.current_price) {
      addToList(item);
      setInwallet(true);
      setUSD(parseInt(localStorage.getItem("usd")) - item.current_price);
      localStorage.setItem("usd", JSON.stringify(usd));
    }
  };
  const Remove = async () => {
    removeFromList(item.id);
    setInwallet(false);
    setUSD(parseInt(localStorage.getItem("usd")) + item.current_price);
    localStorage.setItem("usd", JSON.stringify(usd));
  };

  return (
    <>
      <div
        style={{
          width: "250px",

          margin: "7px",
          height: "250px",
        }}
        className={
          priceChange < 0
            ? "card border-danger mb-3"
            : "card border-success mb-3"
        }
      >
        <div className="card-header">{item.name}</div>
        <div className="card-body">
          <img
            style={{
              height: "88px",
            }}
            src={item.image}
            alt="crypto"
          />
          <div style={{ marginTop: "12px" }}>
            <h4
              className="card-text"
              style={{
                marginTop: "25px",
                display: "inline",
              }}
            >
              <strong style={{ color: "black" }}> {item.current_price}</strong>
            </h4>
          </div>
          <div
            style={{
              marginTop: "8px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            {!inWalled && (
              <button
                style={{ margin: "5px", height: "41px", width: "45%" }}
                type="button"
                className="btn btn-success"
                onClick={Add}
              >
                BUY
              </button>
            )}
            <button
              style={{ margin: "5px", width: "45%" }}
              type="button"
              className={
                priceChange < 0
                  ? "btn btn-outline-danger"
                  : "btn btn-outline-success"
              }
            >
              {item.market_cap_change_percentage_24h.toFixed(1)}%
            </button>
            {inWalled && (
              <button
                style={{ margin: "5px", height: "41px", width: "45%" }}
                type="button"
                className="btn btn-danger"
                onClick={Add}
              >
                ✗
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Search;
