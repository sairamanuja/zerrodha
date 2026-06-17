import React, { useState, useContext } from "react";
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";
import { ongoingIpos, closedIpos, upcomingIpos } from "./kiteData";
import { KiteContext } from "./KiteContext";

const tabs = [
  { label: "IPO", badge: 4 },
  { label: "Govt. securities" },
  { label: "Auctions" },
  { label: "Corporate actions" },
];

const subTabs = ["Ongoing", "Applied", "Upcoming"];
const APPLIED_KEY = "kite_applied_ipos";

const loadApplied = () => {
  try {
    const a = JSON.parse(localStorage.getItem(APPLIED_KEY));
    if (Array.isArray(a)) return a;
  } catch (_) {
    /* ignore */
  }
  return [];
};

const Bids = () => {
  const { showToast } = useContext(KiteContext);
  const [tab, setTab] = useState("IPO");
  const [sub, setSub] = useState("Ongoing");
  const [applied, setApplied] = useState(loadApplied);
  const [searchOpen, setSearchOpen] = useState(false);
  const [q, setQ] = useState("");

  const apply = (ipo) => {
    if (applied.includes(ipo.sym)) return;
    const next = [...applied, ipo.sym];
    setApplied(next);
    try {
      localStorage.setItem(APPLIED_KEY, JSON.stringify(next));
    } catch (_) {
      /* ignore */
    }
    showToast(`Applied to ${ipo.sym} IPO`);
  };

  const appliedIpos = [...ongoingIpos, ...closedIpos].filter((i) =>
    applied.includes(i.sym)
  );

  let list;
  if (tab !== "IPO") {
    list = [];
  } else if (sub === "Ongoing") {
    list = [...ongoingIpos, ...closedIpos];
  } else if (sub === "Applied") {
    list = appliedIpos;
  } else {
    list = upcomingIpos;
  }

  if (q.trim()) {
    const query = q.trim().toUpperCase();
    list = list.filter(
      (i) =>
        i.sym.includes(query) || i.name.toUpperCase().includes(query)
    );
  }

  const renderRight = (ipo) => {
    const isClosed = closedIpos.some((c) => c.sym === ipo.sym);
    const isApplied = applied.includes(ipo.sym);
    const isUpcoming = upcomingIpos.some((u) => u.sym === ipo.sym);

    if (isUpcoming) return <span className="k-closed upcoming">UPCOMING</span>;
    if (isClosed) return <span className="k-closed">CLOSED</span>;
    if (isApplied) return <span className="k-applied">Applied ✓</span>;
    return (
      <button className="k-apply" onClick={() => apply(ipo)}>
        Apply
      </button>
    );
  };

  return (
    <div className="k-bids">
      <div className="k-bids-tabs">
        {tabs.map((t) => (
          <button
            key={t.label}
            className={t.label === tab ? "active" : ""}
            onClick={() => setTab(t.label)}
          >
            {t.label}
            {t.badge && <span className="k-badge-blue">{t.badge}</span>}
          </button>
        ))}
      </div>

      <div className="k-bids-sub">
        <div className="k-tools-left">
          <SearchIcon
            style={{ cursor: "pointer" }}
            onClick={() => setSearchOpen((v) => !v)}
          />
          <TuneIcon
            style={{ cursor: "pointer" }}
            onClick={() => showToast("Filter IPOs")}
          />
        </div>
        <div className="k-subtabs">
          {subTabs.map((s) => (
            <button
              key={s}
              className={s === sub ? "active" : ""}
              onClick={() => setSub(s)}
            >
              {s}
              {s === "Applied" && applied.length > 0 && (
                <span className="k-badge-blue">{applied.length}</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {searchOpen && tab === "IPO" && (
        <div className="k-inline-search">
          <SearchIcon />
          <input
            autoFocus
            placeholder="Search IPOs by name or symbol"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>
      )}

      {tab !== "IPO" ? (
        <div className="k-empty">
          <h3>Nothing here yet</h3>
          <p>{tab} will appear here</p>
        </div>
      ) : list.length === 0 ? (
        <div className="k-empty">
          <h3>No {sub.toLowerCase()} IPOs</h3>
          <p>
            {sub === "Applied"
              ? "Apply to an ongoing IPO to see it here"
              : "Check back soon"}
          </p>
        </div>
      ) : (
        <div className="k-ipo-list">
          {list.map((ipo) => (
            <div className="k-ipo-row" key={ipo.sym}>
              <div className="k-ipo-left">
                <div className="k-ipo-name">{ipo.name}</div>
                <div className="k-ipo-sym">
                  {ipo.sym}
                  {ipo.sme && <span className="k-sme">SME</span>}
                </div>
                <div className="k-ipo-price">{ipo.price}</div>
              </div>
              <div className="k-ipo-right">
                <div className="k-ipo-date">{ipo.date}</div>
                {renderRight(ipo)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Bids;
