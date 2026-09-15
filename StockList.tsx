import React, { useState ,useEffect} from "react";

const stocksData = [
  { id: 1, name: "Apple", symbol: "AAPL" },
  { id: 2, name: "Tesla", symbol: "TSLA" },
  { id: 3, name: "Amazon", symbol: "AMZN" },
  { id: 4, name: "Google", symbol: "GOOGL" },
  { id: 5, name: "Microsoft", symbol: "MSFT" },
];


function SearchBar({ search, setSearch }) {
  return (
    <input
      type="text"
      placeholder="Search stocks..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  );
}


function StockList({ stocks, addToWatchlist }) {
  return (
    <div>
      <h3>All Stocks</h3>
      {stocks.map((stock) => (
        <div key={stock.id}>
          {stock.name} ({stock.symbol})
          <button onClick={() => addToWatchlist(stock)}>Add</button>
        </div>
      ))}
    </div>
  );
}



function Watchlist({ watchlist, removeFromWatchlist }) {
  return (
    <div>
      <h3>Watchlist</h3>
      {watchlist.length === 0 && <p>No stocks added</p>}

      {watchlist.map((stock) => (
        <div key={stock.id}>
          {stock.name} ({stock.symbol})
          <button onClick={() => removeFromWatchlist(stock.id)}>
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}

function StockBar() {
  const [search, setSearch] = useState("");
  const [watchlist, setWatchlist] = useState([]);

  // 🔍 Filter stocks
  const filteredStocks = stocksData.filter((stock) =>
    stock.name.toLowerCase().includes(search.toLowerCase()) ||
    stock.symbol.toLowerCase().includes(search.toLowerCase())
  );

  // ⭐ Add to watchlist
  const addToWatchlist = (stock) => {
    const exists = watchlist.find((item) => item.id === stock.id);
    if (!exists) {
      setWatchlist((prev) => [...prev, stock]);
    }
  };

  // ❌ Remove from watchlist
  const removeFromWatchlist = (id) => {
    setWatchlist((prev) => prev.filter((stock) => stock.id !== id));
  };
  useEffect(() => {
  const saved = JSON.parse(localStorage.getItem("watchlist"));
  if (saved) setWatchlist(saved);
}, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Stock Watchlist</h1>

      <SearchBar search={search} setSearch={setSearch} />

      <StockList stocks={filteredStocks} addToWatchlist={addToWatchlist} />

      <Watchlist
        watchlist={watchlist}
        removeFromWatchlist={removeFromWatchlist}
      />
    </div>
  );
}

export default StockBar;
