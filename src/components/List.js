import { useState, useEffect } from "react";
import Search from "./Search";

function List() {
  const [list, setList] = useState([]);
  const [filterText, setFilterText] = useState("");
  useEffect(() => {
    fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
    )
      .then((res) => res.json())
      .then((res) => setList(res))
      .catch((e) => console.log(e));
  }, []);
  console.log(list);

  const filteredCoins = list.filter((item) =>
    item.name.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <>
      <h1 style={{ marginTop: "3%", fontSize: "70px" }}> CRYPT🤑 </h1>
      <div
        style={{
          marginTop: "3%",
          width: "60%",
          height: "45px",
        }}
        className="input-group mb-3"
      >
        <span className="input-group-text" id="basic-addon1">
          <strong>💰</strong>
        </span>
        <input
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          type="text"
          className="form-control"
          placeholder="Search"
        />
      </div>
      <div
        style={{ marginTop: "2%", display: "center", justifyContent: "center" }}
        class="row"
      >
        {filteredCoins.map((coin) => {
          return (
            <Search
              key={coin.id}
              name={coin.name}
              image={coin.image}
              symbol={coin.symbol}
              marketcap={coin.market_cap}
              price={coin.current_price}
              priceChange={coin.price_change_percentage_24h}
              volume={coin.total_volume}
            />
          );
        })}
      </div>
    </>
  );
}

export default List;
