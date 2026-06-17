import React, { useState, useContext } from "react";

import GeneralContext from "./GeneralContext";
import "./BuyActionWindow.css";

const BuyActionWindow = ({ uid, mode }) => {
    const [stockQuantity, setStockQuantity] = useState(1);
    const [stockPrice, setStockPrice] = useState(0.0);
    const [status, setStatus] = useState("idle"); // idle | placing | success | error
    const { closeBuyWindow, closeSellWindow } = useContext(GeneralContext);

    const isBuy = mode === "BUY";
    const margin = (Number(stockQuantity) * Number(stockPrice || 0)).toFixed(2);

    const close = () => {
        if (isBuy) {
            closeBuyWindow();
        } else {
            closeSellWindow();
        }
    };

    const handleActionClick = async () => {
        if (Number(stockQuantity) <= 0) return;
        setStatus("placing");
        setStatus("success");
        // Let the user see the confirmation briefly, then close.
        setTimeout(close, 1100);
    };

    return (
        <div className="order-modal-overlay" onClick={close}>
            <div
                className="order-modal"
                role="dialog"
                aria-modal="true"
                onClick={(e) => e.stopPropagation()}
            >
                <div className={`order-header ${isBuy ? "buy-header" : "sell-header"}`}>
                    <div>
                        <h3>
                            {isBuy ? "Buy" : "Sell"} {uid}
                        </h3>
                        <span>NSE · Regular order</span>
                    </div>
                    <button className="order-close" aria-label="Close" onClick={close}>
                        ✕
                    </button>
                </div>

                {status === "success" ? (
                    <div className="order-result success">
                        <div className="result-icon">✓</div>
                        <p>
                            {isBuy ? "Buy" : "Sell"} order placed for {stockQuantity}{" "}
                            {Number(stockQuantity) > 1 ? "shares" : "share"} of {uid}.
                        </p>
                    </div>
                ) : (
                    <>
                        <div className="order-body">
                            <div className="field">
                                <label htmlFor="qty">Quantity</label>
                                <input
                                    type="number"
                                    name="qty"
                                    id="qty"
                                    min="1"
                                    onChange={(e) => setStockQuantity(e.target.value)}
                                    value={stockQuantity}
                                />
                            </div>
                            <div className="field">
                                <label htmlFor="price">Price</label>
                                <input
                                    type="number"
                                    name="price"
                                    id="price"
                                    step="0.05"
                                    min="0"
                                    onChange={(e) => setStockPrice(e.target.value)}
                                    value={stockPrice}
                                />
                            </div>
                        </div>

                        {status === "error" && (
                            <p className="order-error">
                                Could not simulate the order.
                            </p>
                        )}

                        <div className="order-footer">
                            <span className="margin">
                                Margin required <strong>₹{margin}</strong>
                            </span>
                            <div className="order-actions">
                                <button
                                    className={`btn ${isBuy ? "btn-buy" : "btn-sell"}`}
                                    onClick={handleActionClick}
                                    disabled={status === "placing"}
                                >
                                    {status === "placing"
                                        ? "Placing…"
                                        : isBuy
                                        ? "Buy"
                                        : "Sell"}
                                </button>
                                <button className="btn btn-grey" onClick={close}>
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default BuyActionWindow;
