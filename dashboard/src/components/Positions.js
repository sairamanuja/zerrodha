import React from "react";
import { localPositions, formatMoney } from "../data/tradingLog";

const Positions = () => {
  // Portfolio-wide totals
  const totalInvestment = localPositions.reduce(
    (sum, s) => sum + s.avg * s.qty,
    0
  );
  const currentValue = localPositions.reduce(
    (sum, s) => sum + s.price * s.qty,
    0
  );
  const totalPnl = currentValue - totalInvestment;
  const pnlPercent = totalInvestment
    ? (totalPnl / totalInvestment) * 100
    : 0;

  if (localPositions.length === 0) {
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
      <h3 className="title">Positions ({localPositions.length})</h3>

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
            {localPositions.map((stock, index) => {
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
                  <td>{formatMoney(stock.avg)}</td>
                  <td>{formatMoney(stock.price)}</td>
                  <td className={profClass}>
                    {pnl >= 0 ? "+" : "-"}
                    {formatMoney(Math.abs(pnl))}
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
          <h5>{formatMoney(totalInvestment)}</h5>
          <p>Total investment</p>
        </div>
        <div className="col">
          <h5>{formatMoney(currentValue)}</h5>
          <p>Current value</p>
        </div>
        <div className="col">
          <h5 className={totalPnl >= 0 ? "profit" : "loss"}>
            {totalPnl >= 0 ? "+" : "-"}
            {formatMoney(Math.abs(totalPnl))} ({pnlPercent >= 0 ? "+" : ""}
            {pnlPercent.toFixed(2)}%)
          </h5>
          <p>P&L</p>
        </div>
      </div>
    </>
  );
};

export default Positions;
