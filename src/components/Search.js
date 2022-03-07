import { useState, useEffect } from "react";

function Search({
  name,
  image,
  symbol,
  volume,
  price,
  priceChange,
  marketcap,
}) {
  return (
    <>
      <div
        style={{
          width: "270px",

          margin: "7px",
          height: "270px",
        }}
        className={
          priceChange < 0
            ? "card text-white bg-danger mb-3"
            : "card text-white bg-success mb-3"
        }
      >
        <div className="card-header">{name.slice(0, 12)}</div>
        <div className="card-body">
          <img
            style={{
              width: "70px",
            }}
            src={image}
            alt="crypto"
          />

          <h3 style={{ marginTop: "20px" }} className="card-title">
            {priceChange.toFixed(2)}%
          </h3>
          <h3
            className="card-text"
            style={{
              border: "solid 2px black",
              marginTop: "25px",
            }}
          >
            <strong style={{ color: "black" }}>$ {price}</strong>
          </h3>
        </div>
      </div>
    </>
  );
}

export default Search;
