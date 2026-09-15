import React, { useCallback, useState,useEffect } from "react";


export function useMockSocket(onMessage) {
  useEffect(() => {
    const interval = setInterval(() => {
      const randomOrder = {
        price: +(Math.random() * 100).toFixed(2),
        size: +(Math.random() * 5).toFixed(2),
        side: Math.random() > 0.5 ? "buy" : "sell",
      };

      onMessage(randomOrder);
    }, 500);

    return () => clearInterval(interval);
  }, [onMessage]);
}

export const aggregateOrders = (orders) => {
  const map = {};

  orders.forEach(({ price, size }) => {
    map[price] = (map[price] || 0) + size;
  });

  return Object.entries(map).map(([price, size]) => ({
    price: Number(price),
    size,
  }));
};

export const sortBids = (bids) =>
  [...bids].sort((a, b) => b.price - a.price);

export const sortAsks = (asks) =>
  [...asks].sort((a, b) => a.price - b.price);


function OrderList({ title, orders, color }) {
  return (
    <div style={{ flex: 1 }}>
      <h3>{title}</h3>
      {orders.map((order, index) => (
        <div key={index} style={{ color }}>
          {order.price} — {order.size.toFixed(2)}
        </div>
      ))}
    </div>
  );
}

function OrderBook() {
  const [bids, setBids] = useState([]);
  const [asks, setAsks] = useState([]);

  const handleMessage = useCallback((order) => {
    if (order.side === "buy") {
      setBids((prev) => [...prev, order]);
    } else {
      setAsks((prev) => [...prev, order]);
    }
  }, []);

  useMockSocket(handleMessage);

  // Aggregate + sort
  const aggregatedBids = sortBids(aggregateOrders(bids)).slice(0, 10);
  const aggregatedAsks = sortAsks(aggregateOrders(asks)).slice(0, 10);

  // Spread
  const bestBid = aggregatedBids[0]?.price || 0;
  const bestAsk = aggregatedAsks[0]?.price || 0;
  const spread = (bestAsk - bestBid).toFixed(2);

  return (
    <div>
      <h2>📊 Order Book</h2>

      <h3>Spread: {spread}</h3>

      <div style={{ display: "flex", gap: "20px" }}>
        <OrderList title="Bids" orders={aggregatedBids} color="green" />
        <OrderList title="Asks" orders={aggregatedAsks} color="red" />
      </div>
    </div>
  );
}

export default OrderBook;
