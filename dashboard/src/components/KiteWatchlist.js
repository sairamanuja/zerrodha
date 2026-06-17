import React, { useState, useContext, useMemo } from "react";
import AddIcon from "@mui/icons-material/Add";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import LayersOutlinedIcon from "@mui/icons-material/LayersOutlined";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import { instruments, findInstrument } from "./kiteData";
import { KiteContext } from "./KiteContext";

const STORAGE_KEY = "kite_wl_pages";

const loadPages = () => {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (saved && typeof saved === "object") return saved;
  } catch (_) {
    /* ignore */
  }
  return { 1: ["HDFCBANK", "TMPV"] };
};

const Watchlist = () => {
  const { openOrder, showToast } = useContext(KiteContext);
  const [active, setActive] = useState(1);
  const [pages, setPages] = useState(loadPages);
  const [query, setQuery] = useState("");
  const [openRow, setOpenRow] = useState(null);

  const symbols = pages[active] || [];

  const persist = (next) => {
    setPages(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch (_) {
      /* ignore */
    }
  };

  const addSymbol = (sym) => {
    const list = pages[active] || [];
    if (!list.includes(sym)) {
      persist({ ...pages, [active]: [...list, sym] });
    }
    setQuery("");
  };

  const removeSymbol = (sym) => {
    const list = pages[active] || [];
    persist({ ...pages, [active]: list.filter((s) => s !== sym) });
    setOpenRow(null);
  };

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.trim().toUpperCase();
    return instruments.filter((i) => i.sym.includes(q)).slice(0, 8);
  }, [query]);

  return (
    <div className="k-wl">
      <div className="k-wl-tabs">
        <div className="k-wl-pages">
          {[1, 2, 3, 4, 5, 6, 7].map((n) => (
            <button
              key={n}
              className={n === active ? "active" : ""}
              onClick={() => {
                setActive(n);
                setOpenRow(null);
              }}
            >
              {n}
            </button>
          ))}
        </div>
        <button className="k-wl-stack" aria-label="Manage lists">
          <LayersOutlinedIcon />
          <span className="k-wl-stack-plus">+</span>
        </button>
      </div>

      <div className="k-wl-search">
        <SearchIcon />
        <input
          placeholder="Search & add eg: INFY, TCS, RELIANCE"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {query && (
          <CloseIcon className="k-wl-search-clear" onClick={() => setQuery("")} />
        )}
        <span className="k-wl-count">
          {symbols.length} / 50
        </span>
      </div>

      {results.length > 0 && (
        <div className="k-wl-results">
          {results.map((r) => {
            const added = symbols.includes(r.sym);
            return (
              <div className="k-wl-result" key={r.sym} onClick={() => addSymbol(r.sym)}>
                <div>
                  <span className="k-wl-result-sym">{r.sym}</span>
                  <span className="k-wl-result-exch">{r.exch}</span>
                </div>
                <span className={`k-wl-result-add ${added ? "added" : ""}`}>
                  {added ? "✓ Added" : "+ Add"}
                </span>
              </div>
            );
          })}
        </div>
      )}

      {!query && (
        <>
          <div className="k-wl-newgroup">
            <span
              onClick={() => {
                const empty = [1, 2, 3, 4, 5, 6, 7].find(
                  (n) => !(pages[n] && pages[n].length)
                );
                if (empty) {
                  setActive(empty);
                  setOpenRow(null);
                  showToast(`Switched to watchlist ${empty}`);
                } else {
                  showToast("All 7 watchlists are in use");
                }
              }}
            >
              + New group
            </span>
          </div>

          <div className="k-group">
            <div className="k-group-head">
              <span className="k-group-title">
                stocks <small>({symbols.length})</small>
              </span>
              <span className="k-group-actions">
                <AddIcon />
                <OpenInFullIcon />
              </span>
            </div>

            {symbols.length === 0 && (
              <div className="k-wl-emptylist">
                Search above to add stocks to this watchlist.
              </div>
            )}

            {symbols.map((sym) => {
              const s = findInstrument(sym);
              const up = s.pct >= 0;
              const isOpen = openRow === sym;
              return (
                <div className="k-wl-item" key={sym}>
                  <div
                    className="k-wl-row"
                    onClick={() => setOpenRow(isOpen ? null : sym)}
                  >
                    <div className="k-wl-left">
                      <div className="k-wl-sym">{s.sym}</div>
                      <div className="k-wl-exch">
                        {s.exch} <span className="k-event">EVENT</span>
                      </div>
                    </div>
                    <div className={`k-wl-right ${up ? "k-up" : "k-down"}`}>
                      <div className="k-wl-price">{s.price.toFixed(2)}</div>
                      <div className="k-wl-chg">
                        {up ? "+" : ""}
                        {s.chg.toFixed(2)} ({up ? "+" : ""}
                        {s.pct.toFixed(2)}%)
                      </div>
                    </div>
                  </div>

                  {isOpen && (
                    <div className="k-wl-actions">
                      <button
                        className="k-act buy"
                        onClick={() => openOrder(sym, "BUY", s.price)}
                      >
                        B
                      </button>
                      <button
                        className="k-act sell"
                        onClick={() => openOrder(sym, "SELL", s.price)}
                      >
                        S
                      </button>
                      <button className="k-act ghost">
                        <ShowChartIcon />
                      </button>
                      <button className="k-act ghost" onClick={() => removeSymbol(sym)}>
                        <DeleteOutlineIcon />
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default Watchlist;
