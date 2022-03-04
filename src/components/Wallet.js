import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useList } from "../context/ListContext";
import Search from "./Search";
import WalletDetail from "./WalletDetail";

function Wallet() {
  //context
  const { items, usd, setUSD } = useList();
  const [total, setTotal] = useState(
    items.reduce((acc, obj) => acc + obj.current_price, 0) +
      JSON.parse(localStorage.getItem("usd")) || 1000000
  );

  useEffect(() => {
    setTotal(
      items.reduce((acc, obj) => acc + obj.current_price, 0) +
        JSON.parse(localStorage.getItem("usd"))
    );
    localStorage.setItem("total", JSON.stringify(total));
  }, [usd]);

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-black  position-sticky fixed-top">
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
              <li className="nav-item">
                <Link className="nav-link" to="/wallet">
                  <button type="button" className="btn btn-warning">
                    Wallet
                  </button>
                </Link>
              </li>

              <li className="nav-item">
                <h6 className="nav-link">
                  <button type="button" className="btn btn-light">
                    {total.toFixed(0)}
                    💰
                  </button>
                </h6>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div
        style={{
          marginTop: "2%",
          justifyContent: "flex",
        }}
        className="row"
      >
        <div style={{ width: "60%" }}>
          <div
            style={{
              margin: "10px",
            }}
            className="list-group"
          >
            <div className="list-group-item d-flex justify-content-between align-items-center">
              <img
                style={{ width: "50px" }}
                src="https://www.pngall.com/wp-content/uploads/12/USD-Background-PNG.png"
              />
              <span>
                <button
                  style={{ margin: "5px" }}
                  type="button"
                  className="btn btn-outline-dark"
                >
                  {JSON.parse(localStorage.getItem("usd")).toFixed(0)}$
                </button>
              </span>
            </div>
          </div>
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
        <div style={{ width: "30%" }}>
          <h1> {total.toFixed(0)}$</h1>
        </div>
      </div>
    </div>
  );
}

export default Wallet;
