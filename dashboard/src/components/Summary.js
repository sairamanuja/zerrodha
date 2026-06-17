import React from "react";
import {
  accountProfile,
  accountSummary,
  localHoldings,
  formatMoney,
  formatSignedMoney,
} from "../data/tradingLog";

const getUserName = () => {
  try {
    const u = JSON.parse(localStorage.getItem("zerodha_user"));
    if (u && u.name) return u.name.split(" ")[0];
  } catch (_) {
    /* ignore */
  }
  return accountProfile.name;
};

const Summary = () => {
  const name = getUserName();
  const totalInvestment = localHoldings.reduce(
    (sum, stock) => sum + stock.avg * stock.qty,
    0
  );
  const currentValue = localHoldings.reduce(
    (sum, stock) => sum + stock.price * stock.qty,
    0
  );
  const holdingsPnl = currentValue - totalInvestment;
  const holdingsPnlPct = totalInvestment
    ? (holdingsPnl / totalInvestment) * 100
    : 0;
  const marginAvailable = accountSummary.currentHoldingsValue;

  return (
    <div className="summary-page">
      <h6 className="summary-greeting">Hi, {name}!</h6>
      <hr className="summary-divider" />

      {/* Equity */}
      <div className="summary-block">
        <p className="summary-label">Equity</p>
        <div className="summary-row">
          <div className="summary-figure">
            <h3>{formatMoney(marginAvailable)}</h3>
            <span>Margin available</span>
          </div>
          <div className="summary-meta">
            <p>
              Own capital <span>{formatMoney(accountSummary.ownCapitalDeposited)}</span>
            </p>
            <p>
              Borrowed <span>{formatMoney(accountSummary.borrowedLoanOutstanding)}</span>
            </p>
          </div>
        </div>
      </div>

      <hr className="summary-divider" />

      {/* Holdings */}
      <div className="summary-block">
        <p className="summary-label">Holdings ({localHoldings.length})</p>
        <div className="summary-row">
          <div className="summary-figure">
            <h3 className={holdingsPnl >= 0 ? "profit" : "loss"}>
              {formatSignedMoney(holdingsPnl)} {" "}
              <small>
                {holdingsPnlPct >= 0 ? "+" : ""}
                {holdingsPnlPct.toFixed(2)}%
              </small>
            </h3>
            <span>P&L</span>
          </div>
          <div className="summary-meta">
            <p>
              Current Value <span>{formatMoney(currentValue)}</span>
            </p>
            <p>
              Investment <span>{formatMoney(totalInvestment)}</span>
            </p>
            <p>
              Realised P&L <span>{formatSignedMoney(accountSummary.realisedPnl)}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summary;
