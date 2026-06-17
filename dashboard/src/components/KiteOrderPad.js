import React, { useState } from "react";
import axios from "axios";
import { findInstrument } from "./kiteData";

const API_URL = "http://localhost:8080";

const KiteOrderPad = ({ pad, onClose, showToast, onPlaced }) => {
  const inst = findInstrument(pad.uid);
  const isBuy = pad.mode === "BUY";

  const [qty, setQty] = useState(1);
  const [price, setPrice] = useState(pad.price || inst.price || 0);
  const [product, setProduct] = useState("CNC"); // CNC | MIS
  const [placing, setPlacing] = useState(false);

  const margin = (Number(qty) * Number(price || 0)).toFixed(2);

  const place = async () => {
    if (Number(qty) <= 0) return;
    setPlacing(true);
    try {
      await axios.post(`${API_URL}/newOrder`, {
        name: pad.uid,
        qty: Number(qty),
        price: Number(price),
        mode: pad.mode,
      });
      onPlaced();
      showToast(`${isBuy ? "Buy" : "Sell"} order placed · ${pad.uid}`);
      onClose();
    } catch (err) {
      showToast("Order failed — is the backend running?");
      setPlacing(false);
    }
  };

  return (
    <div className="k-pad-overlay" onClick={onClose}>
      <div className="k-pad" onClick={(e) => e.stopPropagation()}>
        <div className={`k-pad-head ${isBuy ? "buy" : "sell"}`}>
          <div>
            <div className="k-pad-sym">{pad.uid}</div>
            <div className="k-pad-exch">
              {inst.exch} · ₹{inst.price.toFixed(2)}
            </div>
          </div>
          <div className="k-pad-toggle">
            <span className={isBuy ? "on" : ""}>BUY</span>
            <span className={!isBuy ? "on" : ""}>SELL</span>
          </div>
        </div>

        <div className="k-pad-products">
          {["CNC", "MIS"].map((p) => (
            <button
              key={p}
              className={product === p ? "active" : ""}
              onClick={() => setProduct(p)}
            >
              {p === "CNC" ? "Longterm" : "Intraday"}{" "}
              <small>{p}</small>
            </button>
          ))}
        </div>

        <div className="k-pad-fields">
          <div className="k-pad-field">
            <label>Qty</label>
            <input
              type="number"
              min="1"
              value={qty}
              onChange={(e) => setQty(e.target.value)}
            />
          </div>
          <div className="k-pad-field">
            <label>Price</label>
            <input
              type="number"
              step="0.05"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
        </div>

        <div className="k-pad-foot">
          <span className="k-pad-margin">
            Approx margin <strong>₹{margin}</strong>
          </span>
          <div className="k-pad-actions">
            <button className="k-pad-cancel" onClick={onClose}>
              Cancel
            </button>
            <button
              className={`k-pad-submit ${isBuy ? "buy" : "sell"}`}
              onClick={place}
              disabled={placing}
            >
              {placing ? "Placing…" : isBuy ? "BUY" : "SELL"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KiteOrderPad;
