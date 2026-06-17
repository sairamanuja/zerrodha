import React, { useState, useContext } from "react";

import { Tooltip, Grow } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import BarChartIcon from "@mui/icons-material/BarChart";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import CloseIcon from "@mui/icons-material/Close";

import { watchlist } from "../data/data";
import GeneralContext from "./GeneralContext";

const WatchList = ({ open, onClose }) => {
  return (
    <div className={`watchlist-container ${open ? "open" : ""}`}>
      <div className="search-container">
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search eg:infy, bse, nifty fut weekly, gold mcx"
          className="search"
        />
        <span className="counts"> {watchlist.length} / 50</span>
        <button className="wl-close" aria-label="Close watchlist" onClick={onClose}>
          <CloseIcon />
        </button>
      </div>

      <ul className="list">
        {watchlist.map((stock, index) => {
          return <WatchListItem stock={stock} key={index} onAction={onClose} />;
        })}
      </ul>
    </div>
  );
};

export default WatchList;

const WatchListItem = ({ stock, onAction }) => {
  const [active, setActive] = useState(false);

  return (
    <li
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onClick={() => setActive((v) => !v)}
      className={active ? "active" : ""}
    >
      <div className="item">
        <p className={stock.isDown ? "down" : "up"}>{stock.name}</p>
        <div className="itemInfo">
          <span className="percent">{stock.percent}</span>
          {stock.isDown ? (
            <ArrowDropDownIcon className="down" />
          ) : (
            <ArrowDropUpIcon className="up" />
          )}
          <span className="price">{stock.price}</span>
        </div>
      </div>
      {active && <WatchListActions uid={stock.name} onAction={onAction} />}
    </li>
  );
};

const WatchListActions = ({ uid, onAction }) => {
  const { openBuyWindow, openSellWindow } = useContext(GeneralContext);

  const handleBuy = (e) => {
    e.stopPropagation();
    openBuyWindow(uid);
    if (onAction) onAction();
  };

  const handleSell = (e) => {
    e.stopPropagation();
    openSellWindow(uid);
    if (onAction) onAction();
  };

  return (
    <span className="actions">
      <span>
        <Tooltip title="Buy (B)" arrow placement="top" TransitionComponent={Grow}>
          <button className="buy" onClick={handleBuy}>
            Buy
          </button>
        </Tooltip>
        <Tooltip title="Sell (S)" arrow placement="top" TransitionComponent={Grow}>
          <button className="sell" onClick={handleSell}>
            Sell
          </button>
        </Tooltip>
        <Tooltip title="Analytics (A)" arrow placement="top" TransitionComponent={Grow}>
          <button className="chart" onClick={(e) => e.stopPropagation()}>
            <BarChartIcon className="icon" />
          </button>
        </Tooltip>
        <Tooltip title="More" arrow placement="top" TransitionComponent={Grow}>
          <button className="action" onClick={(e) => e.stopPropagation()}>
            <MoreHorizIcon className="icon" />
          </button>
        </Tooltip>
      </span>
    </span>
  );
};
