import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import { KiteContext } from "./KiteContext";

const API_URL = "http://localhost:8080";

const pctOf = (str) => {
  const n = parseFloat(String(str).replace(/[^0-9.-]/g, ""));
  return isNaN(n) ? 0 : n;
};

const Portfolio = () => {
  const { ordersVersion, openOrder, showToast } = useContext(KiteContext);
  const [tab, setTab] = useState("Holdings");
  const [holdings, setHoldings] = useState([]);
  const [positions, setPositions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchOpen, setSearchOpen] = useState(false);
  const [q, setQ] = useState("");

  useEffect(() => {
    let alive = true;
    Promise.all([
      axios.get(`${API_URL}/allHoldings`).then((r) => r.data).catch(() => []),
      axios.get(`${API_URL}/allPositions`).then((r) => r.data).catch(() => []),
    ]).then(([h, p]) => {
      if (!alive) return;
      setHoldings(Array.isArray(h) ? h : []);
      setPositions(Array.isArray(p) ? p : []);
      setLoading(false);
    });
    return () => {
      alive = false;
    };
  }, [ordersVersion]);

  const rows = tab === "Holdings" ? holdings : positions;
  const displayRows = rows.filter((r) =>
    (r.name || "").toUpperCase().includes(q.trim().toUpperCase())
  );

  const invested = rows.reduce((s, r) => s + r.avg * r.qty, 0);
  const current = rows.reduce((s, r) => s + r.price * r.qty, 0);
  const pnl = current - invested;
  const pnlPct = invested ? (pnl / invested) * 100 : 0;
  const dayPnl = rows.reduce(
    (s, r) => s + (r.price * r.qty * pctOf(r.day)) / 100,
    0
  );
  const dayPct = current ? (dayPnl / current) * 100 : 0;

  return (
    <div className="k-pf">
      <div className="k-tabs k-tabs-center">
        <button
          className={tab === "Holdings" ? "active" : ""}
          onClick={() => setTab("Holdings")}
        >
          Holdings <span className="k-badge">{holdings.length}</span>
        </button>
        <button
          className={tab === "Positions" ? "active" : ""}
          onClick={() => setTab("Positions")}
        >
          Positions <span className="k-badge">{positions.length}</span>
        </button>
      </div>

      <div className="k-pf-card">
        <div className="k-pf-card-top">
          <div>
            <div className="k-pf-label">Invested</div>
            <div className="k-pf-amt">{invested.toFixed(2)}</div>
          </div>
          <div className="k-pf-right">
            <div className="k-pf-label">Current</div>
            <div className="k-pf-amt">{current.toFixed(2)}</div>
          </div>
        </div>
        <hr />
        <div className="k-pf-pnl">
          <span className="k-pf-label">P&amp;L</span>
          <span className="k-pf-pnl-val">
            <span className={pnl >= 0 ? "k-up" : "k-down"}>
              {pnl >= 0 ? "+" : ""}
              {pnl.toFixed(2)}
            </span>
            <span className={pnl >= 0 ? "k-pill-up" : "k-pill-down"}>
              {pnl >= 0 ? "+" : ""}
              {pnlPct.toFixed(2)}%
            </span>
          </span>
        </div>
      </div>

      <div className="k-pf-tools">
        <div className="k-tools-left">
          <SearchIcon
            style={{ cursor: "pointer" }}
            onClick={() => setSearchOpen((v) => !v)}
          />
          <TuneIcon
            style={{ cursor: "pointer" }}
            onClick={() => showToast("Filter & sort holdings")}
          />
          <LockOutlinedIcon
            style={{ cursor: "pointer" }}
            onClick={() => showToast("Holdings authorisation")}
          />
          <span className="k-chip" onClick={() => showToast("Segment: Equity")}>
            Equity <KeyboardArrowDownIcon />
          </span>
        </div>
        <div className="k-tools-right">
          <span
            className="k-link-icon"
            onClick={() => showToast("Family accounts — coming soon")}
          >
            <GroupOutlinedIcon /> Family
          </span>
          <span
            className="k-link-icon"
            onClick={() => showToast("Opening analytics…")}
          >
            <DonutLargeIcon /> Analytics
          </span>
        </div>
      </div>

      {searchOpen && (
        <div className="k-inline-search">
          <SearchIcon />
          <input
            autoFocus
            placeholder={`Search ${tab.toLowerCase()} by instrument`}
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>
      )}

      {loading ? (
        <div className="k-empty">
          <p>Loading…</p>
        </div>
      ) : displayRows.length === 0 ? (
        <div className="k-empty">
          <h3>{rows.length === 0 ? `No ${tab.toLowerCase()}` : "No matches"}</h3>
          <p>
            {rows.length === 0
              ? `Your ${tab.toLowerCase()} will appear here`
              : "Try a different search"}
          </p>
        </div>
      ) : (
        displayRows.map((h, i) => {
          const invRow = h.avg * h.qty;
          const curRow = h.price * h.qty;
          const rowPnl = curRow - invRow;
          const rowPct = invRow ? (rowPnl / invRow) * 100 : 0;
          const up = rowPnl >= 0;
          return (
            <div
              className="k-holding"
              key={h._id || i}
              onClick={() => openOrder(h.name, "SELL", h.price)}
            >
              <div className="k-holding-line">
                <span className="k-holding-meta">
                  Qty. <strong>{h.qty}</strong> &nbsp;•&nbsp; Avg.{" "}
                  <strong>{h.avg.toFixed(2)}</strong>
                </span>
                <span className={up ? "k-up" : "k-down"}>
                  {up ? "+" : ""}
                  {rowPct.toFixed(2)}%
                </span>
              </div>
              <div className="k-holding-line">
                <span className="k-holding-sym">{h.name}</span>
                <span className={`k-holding-pnl ${up ? "k-up" : "k-down"}`}>
                  {up ? "+" : ""}
                  {rowPnl.toFixed(2)}
                </span>
              </div>
              <div className="k-holding-line">
                <span className="k-holding-sub">Invested {invRow.toFixed(2)}</span>
                <span className="k-holding-sub">
                  LTP {h.price.toFixed(2)} ({h.day})
                </span>
              </div>
            </div>
          );
        })
      )}

      <div className="k-auth">
        <LockOutlinedIcon /> Authorisation
      </div>

      <div className="k-days-pl">
        <span>Day's P&amp;L</span>
        <span className={dayPnl >= 0 ? "k-up" : "k-down"}>
          {dayPnl >= 0 ? "+" : ""}
          {dayPnl.toFixed(2)} {dayPct >= 0 ? "+" : ""}
          {dayPct.toFixed(2)} %
        </span>
      </div>
    </div>
  );
};

export default Portfolio;
