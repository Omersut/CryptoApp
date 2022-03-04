import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useList } from "../context/ListContext";
import Search from "./Search";
import WalletDetail from "./WalletDetail";

function List() {
  const { items, usd, setUSD } = useList();
  const [list, setList] = useState([]);
  const [filterText, setFilterText] = useState("");

  localStorage.setItem("usd", JSON.stringify(usd));

  fetch(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
  )
    .then((res) => res.json())
    .then((res) => setList(res))
    .catch((e) => console.log(e));

  const filteredCoins = list.filter((item) =>
    item.name.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-black position-sticky fixed-top">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <h5>crypto</h5>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarScroll"
            aria-controls="navbarScroll"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarScroll">
            <ul
              className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll"
              style={{ bsScrollHeight: "100px" }}
            >
              <li className="nav-item"></li>

              <li className="nav-item"></li>
            </ul>
            <form className="d-flex">
              <input
                style={{ marginRight: "10px" }}
                className="form-control me-2"
                aria-label="c"
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
                type="text"
                placeholder="Coin Name"
              />
              <button s className="btn btn-outline-primary" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>

      <div style={{ marginTop: "15px" }}>
        <button
          style={{ border: "solid 1px black" }}
          className="btn btn-warning"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasRight"
          aria-controls="offcanvasRight"
        >
          Wallet <span class="badge bg-dark">{items.length}</span>
        </button>
        <div
          className="offcanvas offcanvas-end"
          tabIndex={-1}
          id="offcanvasRight"
          aria-labelledby="offcanvasRightLabel"
        >
          <div className="offcanvas-header">
            <h5 id="offcanvasRightLabel">Wallet</h5>
            <button
              type="button"
              className="btn-close text-reset"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            />
          </div>
          <div className="offcanvas-body">
            {" "}
            <span>
              <button
                style={{ margin: "5px" }}
                type="button"
                className="btn btn-outline-dark"
              >
                {JSON.parse(localStorage.getItem("usd")).toFixed(0)}$
              </button>
            </span>
            {items.map((coin) => {
              return (
                <WalletDetail
                  item={coin}
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
        </div>
      </div>
      <div
        style={{
          marginTop: "20px",
          display: "center",
          justifyContent: "center",
        }}
        className="row"
      >
        {filteredCoins.map((coin) => (
          <Search item={coin} />
        ))}
      </div>
    </div>
  );
}

export default List;
