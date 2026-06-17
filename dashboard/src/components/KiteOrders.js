import React, { useState, useContext } from "react";
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import RefreshIcon from "@mui/icons-material/Refresh";
import { KiteContext } from "./KiteContext";
import {
  accountSummary,
  localOrders,
  tradingLog,
  formatMoney,
} from "../data/tradingLog";

const OrdersIllustration = () => (
  <svg className="k-empty-art" viewBox="0 0 220 180" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="40" y="36" width="140" height="110" rx="6" stroke="#9aa0a6" strokeWidth="2" strokeDasharray="7 7" />
    <path d="M58 30h60l14 14v70a6 6 0 0 1-6 6H58a6 6 0 0 1-6-6V36a6 6 0 0 1 6-6z" fill="#f3f4f6" stroke="#cfd3d8" strokeWidth="2" transform="rotate(-8 92 80)" />
    <g transform="rotate(-8 92 80)" stroke="#b8bdc4" strokeWidth="3" strokeLinecap="round">
      <line x1="66" y1="52" x2="104" y2="52" />
      <line x1="66" y1="66" x2="112" y2="66" />
      <line x1="66" y1="80" x2="98" y2="80" />
    </g>
    <g transform="rotate(-8 92 50)">
      <line x1="70" y1="44" x2="80" y2="44" stroke="#4184f3" strokeWidth="3" strokeLinecap="round" />
      <line x1="86" y1="44" x2="96" y2="44" stroke="#e85044" strokeWidth="3" strokeLinecap="round" />
    </g>
    <path d="M108 70h54l12 12v60a6 6 0 0 1-6 6h-60a6 6 0 0 1-6-6V76a6 6 0 0 1 6-6z" fill="#fbfbfc" stroke="#cfd3d8" strokeWidth="2" transform="rotate(10 142 116)" />
    <g transform="rotate(10 142 116)" stroke="#b8bdc4" strokeWidth="3" strokeLinecap="round">
      <line x1="118" y1="92" x2="156" y2="92" />
      <line x1="118" y1="106" x2="162" y2="106" />
      <line x1="118" y1="120" x2="150" y2="120" />
    </g>
    <path d="M150 30a16 16 0 0 1 16 16h-16z" fill="#f3b73c" />
    <path d="M44 150l10-16 10 16z" fill="#4184f3" />
    <path d="M176 150l-8-13 14-1z" fill="#e85044" />
  </svg>
);

const tabs = ["Open", "Executed", "GTT", "Baskets", "SIPs"];
const filters = [
  { key: "history", label: "Full history" },
  { key: "all", label: "All" },
  { key: "losses", label: "Losses" },
  { key: "profits", label: "Profits" },
  { key: "openBuys", label: "Open buys" },
];

const Orders = () => {
  const { showToast } = useContext(KiteContext);
  const [tab, setTab] = useState("Executed");
  const [searchOpen, setSearchOpen] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(true);
  const [filter, setFilter] = useState("history");
  const [q, setQ] = useState("");

  // All placed orders are treated as executed (market orders).
  const realisedLoss = localOrders.reduce(
    (sum, o) => sum + Math.min(Number(o.realisedPnl || 0), 0),
    0
  );
  const rows = filter === "history" ? tradingLog : localOrders;
  const lossTrades = localOrders.filter((o) => Number(o.realisedPnl || 0) < 0);
  const executed = rows
    .filter((o) => {
      if (filter === "history") return true;
      if (filter === "losses") return Number(o.realisedPnl || 0) < 0;
      if (filter === "profits") return Number(o.realisedPnl || 0) > 0;
      if (filter === "openBuys") return o.mode === "BUY";
      return true;
    })
    .filter((o) =>
      (o.name || "").toUpperCase().includes(q.trim().toUpperCase())
    );
  const showList = tab === "Executed" && executed.length > 0;

  return (
    <div className="k-orders">
      <div className="k-tabs">
        {tabs.map((t) => (
          <button
            key={t}
            className={t === tab ? "active" : ""}
            onClick={() => setTab(t)}
          >
            {t}
            {t === "Executed" && executed.length > 0 && (
              <span className="k-badge">{executed.length}</span>
            )}
          </button>
        ))}
      </div>

      <div className="k-orders-tools">
        <div className="k-tools-left">
          <SearchIcon
            style={{ cursor: "pointer" }}
            onClick={() => setSearchOpen((v) => !v)}
          />
          <TuneIcon
            style={{ cursor: "pointer" }}
            onClick={() => setFiltersOpen((v) => !v)}
          />
          <RefreshIcon
            onClick={() => showToast("Tradebook is loaded from local CSV data")}
            style={{ cursor: "pointer" }}
          />
        </div>
        <div
          className="k-tradebook"
          onClick={() => showToast("Opening tradebook…")}
        >
          <DonutLargeIcon /> Tradebook
        </div>
      </div>

      {searchOpen && (
        <div className="k-inline-search">
          <SearchIcon />
          <input
            autoFocus
            placeholder="Search orders by instrument"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>
      )}

      {filtersOpen && (
        <div className="k-filter-panel">
          <div className="k-till-date-card">
            <span>Till-date net P&amp;L</span>
            <strong className="k-down">
              -{formatMoney(Math.abs(accountSummary.netPnl))}
            </strong>
            <div>
              Realised -{formatMoney(Math.abs(accountSummary.realisedPnl))} ·
              Unrealised -{formatMoney(Math.abs(accountSummary.unrealisedPnl))}
            </div>
          </div>
          <div className="k-filter-summary">
            <span>Realised loss trades</span>
            <strong className="k-down">
              -{formatMoney(Math.abs(realisedLoss))}
            </strong>
            <small>{lossTrades.length} closed loss trades</small>
          </div>
          <div className="k-filter-chips">
            {filters.map((item) => (
              <button
                key={item.key}
                className={filter === item.key ? "active" : ""}
                onClick={() => setFilter(item.key)}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {showList ? (
        <div className="k-order-list">
          {executed.map((o, i) => {
            const action = (o.mode || o.action || "").toUpperCase();
            const isDeposit = action === "DEPOSIT";
            const buy = action === "BUY";
            return (
              <div className="k-order-row" key={o._id || i}>
                <div className="k-order-left">
                  <span
                    className={`k-tag ${
                      isDeposit ? "deposit" : buy ? "buy" : "sell"
                    }`}
                  >
                    {isDeposit ? "FUNDS" : buy ? "BUY" : "SELL"}
                  </span>
                  <div>
                    <div className="k-order-sym">{o.name}</div>
                    <div className="k-order-sub">
                      {o.date}
                      {o.qty ? ` · Qty ${o.qty}` : ""} ·{" "}
                      {isDeposit ? "Deposit" : `NSE · ${buy ? "Buy" : "Sell"}`}
                    </div>
                  </div>
                </div>
                <div className="k-order-right">
                  <div className="k-order-price">
                    {isDeposit
                      ? formatMoney(o.tradeValue)
                      : formatMoney(o.price)}
                  </div>
                  <div className="k-order-status">
                    {isDeposit
                      ? `Balance ${formatMoney(o.cashBalance)}`
                      : o.realisedPnl === null
                      ? "COMPLETE"
                      : `P&L ${o.realisedPnl >= 0 ? "+" : "-"}${formatMoney(
                          Math.abs(o.realisedPnl)
                        )}`}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="k-empty">
          <OrdersIllustration />
          <h3>No {tab === "Open" ? "pending" : tab.toLowerCase()} orders</h3>
          <p>Place an order from your watchlist</p>
        </div>
      )}
    </div>
  );
};

export default Orders;
