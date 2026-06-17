import React from "react";
import { localHoldings, formatMoney, formatSignedMoney } from "../data/tradingLog";

const Holdings = () => {
  const totalInvestment = localHoldings.reduce(
    (sum, stock) => sum + stock.avg * stock.qty,
    0
  );
  const currentValue = localHoldings.reduce(
    (sum, stock) => sum + stock.price * stock.qty,
    0
  );
  const totalPnl = currentValue - totalInvestment;
  const totalPnlPct = totalInvestment ? (totalPnl / totalInvestment) * 100 : 0;

  return (
    <>
      <h3 className="title">Holdings ({localHoldings.length})</h3>

      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Avg. cost</th>
              <th>LTP</th>
              <th>Cur. val</th>
              <th>P&L</th>
              <th>Net chg.</th>
              <th>Day chg.</th>
            </tr>
          </thead>
          <tbody>
            {localHoldings.map((stock, index) => {
              const currValue = stock.price * stock.qty;
              const pnl = currValue - stock.avg * stock.qty;
              const profClass = pnl >= 0 ? "profit" : "loss";
              const dayClass = stock.isLoss ? "loss" : "profit";
              return (
                <tr key={index}>
                  <td>{stock.name}</td>
                  <td>{stock.qty}</td>
                  <td>{formatMoney(stock.avg)}</td>
                  <td>{formatMoney(stock.price)}</td>
                  <td>{formatMoney(currValue)}</td>
                  <td className={profClass}>{formatSignedMoney(pnl)}</td>
                  <td className={profClass}>{stock.net}</td>
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
            {formatSignedMoney(totalPnl)} ({totalPnlPct >= 0 ? "+" : ""}
            {totalPnlPct.toFixed(2)}%)
          </h5>
          <p>P&L</p>
        </div>
      </div>
    </>
  );
};

export default Holdings;
