import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:8080";

const Positions = () => {
  const [allPositions, setAllPositions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`${API_URL}/allPositions`)
      .then((res) => {
        setAllPositions(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching positions:", err);
        setError("Could not load positions. Is the backend running?");
        setLoading(false);
      });
  }, []);

  // Portfolio-wide totals
  const totalInvestment = allPositions.reduce(
    (sum, s) => sum + s.avg * s.qty,
    0
  );
  const currentValue = allPositions.reduce(
    (sum, s) => sum + s.price * s.qty,
    0
  );
  const totalPnl = currentValue - totalInvestment;
  const pnlPercent = totalInvestment
    ? (totalPnl / totalInvestment) * 100
    : 0;

  if (loading) {
    return (
      <div className="positions-state">
        <p>Loading positions…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="positions-state">
        <p className="loss">{error}</p>
      </div>
    );
  }

  if (allPositions.length === 0) {
    return (
      <div className="positions-state empty">
        <h3 className="title">Positions (0)</h3>
        <p>You don't have any open positions.</p>
        <span>Positions you take intraday or in F&amp;O will show up here.</span>
      </div>
    );
  }

  return (
    <>
      <h3 className="title">Positions ({allPositions.length})</h3>

      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Avg.</th>
              <th>LTP</th>
              <th>P&L</th>
              <th>Chg.</th>
            </tr>
          </thead>
          <tbody>
            {allPositions.map((stock, index) => {
              const invested = stock.avg * stock.qty;
              const currValue = stock.price * stock.qty;
              const pnl = currValue - invested;
              const profClass = pnl >= 0.0 ? "profit" : "loss";
              const dayClass = stock.isLoss ? "loss" : "profit";

              return (
                <tr key={stock._id || index}>
                  <td>
                    <span className="product-tag">{stock.product}</span>
                  </td>
                  <td>{stock.name}</td>
                  <td>{stock.qty}</td>
                  <td>{stock.avg.toFixed(2)}</td>
                  <td>{stock.price.toFixed(2)}</td>
                  <td className={profClass}>
                    {pnl >= 0 ? "+" : ""}
                    {pnl.toFixed(2)}
                  </td>
                  <td className={dayClass}>{stock.day}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="row">
        <div className="col">
          <h5>{totalInvestment.toFixed(2)}</h5>
          <p>Total investment</p>
        </div>
        <div className="col">
          <h5>{currentValue.toFixed(2)}</h5>
          <p>Current value</p>
        </div>
        <div className="col">
          <h5 className={totalPnl >= 0 ? "profit" : "loss"}>
            {totalPnl >= 0 ? "+" : ""}
            {totalPnl.toFixed(2)} ({pnlPercent >= 0 ? "+" : ""}
            {pnlPercent.toFixed(2)}%)
          </h5>
          <p>P&L</p>
        </div>
      </div>
    </>
  );
};

export default Positions;
