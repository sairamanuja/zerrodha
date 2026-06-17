import React, { useState, useContext } from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import BusinessCenterOutlinedIcon from "@mui/icons-material/BusinessCenterOutlined";
import GavelIcon from "@mui/icons-material/Gavel";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ShowChartIcon from "@mui/icons-material/ShowChart";

import Watchlist from "./KiteWatchlist";
import Orders from "./KiteOrders";
import Portfolio from "./KitePortfolio";
import Bids from "./KiteBids";
import Profile from "./KiteProfile";
import { getUser } from "./kiteUser";
import { KiteProvider, KiteContext } from "./KiteContext";
import "./kite.css";

const moreIndices = [
  { name: "SENSEX", val: "78,553.20", chg: "+290.40 (+0.37%)", up: true },
  { name: "FINNIFTY", val: "23,310.55", chg: "+96.20 (+0.41%)", up: true },
  { name: "NIFTY MIDCAP", val: "53,120.10", chg: "-84.30 (-0.16%)", up: false },
  { name: "INDIA VIX", val: "13.42", chg: "-0.38 (-2.75%)", up: false },
];

const MarketBar = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className={`k-marketbar-wrap ${open ? "open" : ""}`}>
      <div className="k-marketbar" onClick={() => setOpen((v) => !v)}>
        <div className="k-indices">
          <div className="k-index">
            <span className="k-index-name">NIFTY 50</span>
            <span className="k-index-row">
              <span className="k-up">24,078.20</span>
              <span className="k-index-chg">+89.05 (+0.37%)</span>
            </span>
          </div>
          <div className="k-index">
            <span className="k-index-name">NIFTY BANK</span>
            <span className="k-index-row">
              <span className="k-up">57,561.00</span>
              <span className="k-index-chg">+263.85 (+0.46%)</span>
            </span>
          </div>
        </div>
        <KeyboardArrowDownIcon className="k-mb-chevron" />
      </div>
      {open && (
        <div className="k-mb-panel">
          {moreIndices.map((idx) => (
            <div className="k-mb-panel-row" key={idx.name}>
              <span className="k-mb-panel-name">{idx.name}</span>
              <span className="k-mb-panel-vals">
                <span className={idx.up ? "k-up" : "k-down"}>{idx.val}</span>
                <span className="k-index-chg">{idx.chg}</span>
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const Fab = () => {
  const { showToast } = useContext(KiteContext);
  return (
    <button
      className="k-fab"
      aria-label="Charts"
      onClick={() => showToast("Charts — opening market view")}
    >
      <ShowChartIcon />
    </button>
  );
};

const BottomNav = ({ clientId }) => {
  const items = [
    { to: "/", label: "Watchlist", icon: <BookmarkBorderIcon />, end: true },
    { to: "/orders", label: "Orders", icon: <ArticleOutlinedIcon /> },
    { to: "/portfolio", label: "Portfolio", icon: <BusinessCenterOutlinedIcon /> },
    { to: "/bids", label: "Bids", icon: <GavelIcon /> },
    { to: "/profile", label: clientId, icon: <PersonOutlineIcon /> },
  ];
  return (
    <nav className="k-nav">
      {items.map((it) => (
        <NavLink
          key={it.to}
          to={it.to}
          end={it.end}
          className={({ isActive }) => `k-nav-item ${isActive ? "active" : ""}`}
        >
          {it.icon}
          <span>{it.label}</span>
        </NavLink>
      ))}
    </nav>
  );
};

const KiteApp = () => {
  const { clientId } = getUser();
  return (
    <KiteProvider>
      <div className="k-app">
        <MarketBar />
        <div className="k-screen">
          <Routes>
            <Route path="/" element={<Watchlist />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/holdings" element={<Portfolio />} />
            <Route path="/positions" element={<Portfolio />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/bids" element={<Bids />} />
            <Route path="/funds" element={<Profile />} />
            <Route path="/apps" element={<Profile />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
        <Fab />
        <BottomNav clientId={clientId} />
      </div>
    </KiteProvider>
  );
};

export default KiteApp;
