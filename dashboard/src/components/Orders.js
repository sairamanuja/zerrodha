import React from "react";
import { localOrders, formatMoney } from "../data/tradingLog";

const Orders = () => {
  return (
    <div className="orders">
      {localOrders.length === 0 ? (
        <div className="no-orders">
          <p>You haven't placed any orders yet</p>
        </div>
      ) : (
        <div className="order-table">
          <table>
            <thead>
              <tr>
                <th>Instrument</th>
                <th>Date</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Mode</th>
                <th>Realised P&L</th>
              </tr>
            </thead>
            <tbody>
              {localOrders.map((order, idx) => (
                <tr key={idx}>
                  <td>{order.name}</td>
                  <td>{order.date}</td>
                  <td>{order.qty}</td>
                  <td>{formatMoney(order.price)}</td>
                  <td>{order.mode}</td>
                  <td className={(order.realisedPnl || 0) < 0 ? "loss" : "profit"}>
                    {order.realisedPnl === null
                      ? "-"
                      : `${order.realisedPnl >= 0 ? "+" : "-"}${formatMoney(
                          Math.abs(order.realisedPnl)
                        )}`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Orders;
