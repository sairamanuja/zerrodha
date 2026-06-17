import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";

import Apps from "./Apps";
import Funds from "./Funds";
import Holdings from "./Holdings";

import Orders from "./Orders";
import Positions from "./Positions";
import Summary from "./Summary";
import WatchList from "./WatchList";
import { GeneralContextProvider } from "./GeneralContext";

const Dashboard = () => {
  const [watchlistOpen, setWatchlistOpen] = useState(false);

  return (
    <div className="dashboard-container">
      <GeneralContextProvider>
        <WatchList
          open={watchlistOpen}
          onClose={() => setWatchlistOpen(false)}
        />
      </GeneralContextProvider>

      {watchlistOpen && (
        <div
          className="wl-overlay"
          onClick={() => setWatchlistOpen(false)}
        />
      )}

      <div className="content">
        <Routes>
          <Route exact path="/" element={<Summary />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/holdings" element={<Holdings />} />
          <Route path="/positions" element={<Positions />} />
          <Route path="/funds" element={<Funds />} />
          <Route path="/apps" element={<Apps />} />
        </Routes>
      </div>

      <button
        className="watchlist-fab"
        aria-label="Toggle watchlist"
        onClick={() => setWatchlistOpen((v) => !v)}
      >
        <FormatListBulletedIcon />
        <span>Watchlist</span>
      </button>
    </div>
  );
};

export default Dashboard;
