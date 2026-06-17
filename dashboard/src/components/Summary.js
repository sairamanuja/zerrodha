import React from "react";

const getUserName = () => {
  try {
    const u = JSON.parse(localStorage.getItem("zerodha_user"));
    if (u && u.name) return u.name.split(" ")[0];
  } catch (_) {
    /* ignore */
  }
  return "User";
};

const Summary = () => {
  const name = getUserName();

  return (
    <div className="summary-page">
      <h6 className="summary-greeting">Hi, {name}!</h6>
      <hr className="summary-divider" />

      {/* Equity */}
      <div className="summary-block">
        <p className="summary-label">Equity</p>
        <div className="summary-row">
          <div className="summary-figure">
            <h3>3.74k</h3>
            <span>Margin available</span>
          </div>
          <div className="summary-meta">
            <p>
              Margins used <span>0</span>
            </p>
            <p>
              Opening balance <span>3.74k</span>
            </p>
          </div>
        </div>
      </div>

      <hr className="summary-divider" />

      {/* Holdings */}
      <div className="summary-block">
        <p className="summary-label">Holdings (13)</p>
        <div className="summary-row">
          <div className="summary-figure">
            <h3 className="profit">
              1.55k <small>+5.20%</small>
            </h3>
            <span>P&L</span>
          </div>
          <div className="summary-meta">
            <p>
              Current Value <span>31.43k</span>
            </p>
            <p>
              Investment <span>29.88k</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summary;
