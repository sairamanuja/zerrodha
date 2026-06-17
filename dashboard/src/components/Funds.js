import React from "react";
import { Link } from "react-router-dom";

const equityDetails = [
  { label: "Opening Balance", value: "4,043.10" },
  { label: "Payin", value: "4,064.00" },
  { label: "Payout", value: "0.00" },
  { label: "SPAN", value: "0.00" },
  { label: "Delivery margin", value: "0.00" },
  { label: "Exposure", value: "0.00" },
  { label: "Options premium", value: "0.00" },
];

const collateralDetails = [
  { label: "Collateral (Liquid funds)", value: "0.00" },
  { label: "Collateral (Equity)", value: "0.00" },
  { label: "Total Collateral", value: "0.00" },
];

const Funds = () => {
  return (
    <div className="funds-page">
      <div className="funds-bar">
        <p>Instant, zero-cost fund transfers with UPI</p>
        <div className="funds-actions">
          <Link className="funds-btn add">Add funds</Link>
          <Link className="funds-btn withdraw">Withdraw</Link>
        </div>
      </div>

      <div className="funds-grid">
        {/* Equity */}
        <section className="funds-card">
          <div className="funds-card-head">
            <h4>Equity</h4>
          </div>

          <div className="funds-highlight">
            <div className="hl-item">
              <span className="hl-value primary">4,043.10</span>
              <span className="hl-label">Available margin</span>
            </div>
            <div className="hl-item">
              <span className="hl-value">3,757.30</span>
              <span className="hl-label">Used margin</span>
            </div>
            <div className="hl-item">
              <span className="hl-value">4,043.10</span>
              <span className="hl-label">Available cash</span>
            </div>
          </div>

          <div className="funds-detail">
            {equityDetails.map((row) => (
              <div className="detail-row" key={row.label}>
                <span>{row.label}</span>
                <span>{row.value}</span>
              </div>
            ))}
            <div className="detail-divider" />
            {collateralDetails.map((row) => (
              <div
                className={`detail-row ${
                  row.label === "Total Collateral" ? "total" : ""
                }`}
                key={row.label}
              >
                <span>{row.label}</span>
                <span>{row.value}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Commodity */}
        <section className="funds-card commodity-card">
          <div className="commodity-empty">
            <p>You don't have a commodity account</p>
            <span>Open a commodity account to trade in MCX.</span>
            <Link className="funds-btn open">Open account</Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Funds;
