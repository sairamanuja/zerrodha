import React, { useState } from "react";

// Real brand logos bundled locally in /public/apps. If one fails to load we
// fall back to a coloured initial badge so the layout never breaks.
const apps = [
  {
    name: "Kite",
    tag: "Trading platform",
    desc: "Our ultra-fast flagship trading platform with streaming market data and advanced charts.",
    icon: "K",
    color: "#ff5722",
    logo: "/apps/kite.png",
    action: "Open",
    connected: true,
  },
  {
    name: "Console",
    tag: "Reports & analytics",
    desc: "The central dashboard for your account. In-depth reports, P&L, and tax statements.",
    icon: "C",
    color: "#387ed1",
    logo: "/apps/console.png",
    action: "Open",
    connected: true,
  },
  {
    name: "Coin",
    tag: "Mutual funds",
    desc: "Buy direct mutual funds online, commission-free, delivered to your demat account.",
    icon: "₹",
    color: "#21ba45",
    logo: "/apps/coin.png",
    action: "Open",
    connected: true,
  },
  {
    name: "Varsity",
    tag: "Education",
    desc: "The largest online stock market education resource, from basics to advanced trading.",
    icon: "V",
    color: "#f2a900",
    logo: "/apps/varsity.png",
    action: "Open",
    connected: true,
  },
  {
    name: "Kite Connect",
    tag: "Developer APIs",
    desc: "Build trading and investment platforms with simple HTTP/JSON APIs.",
    icon: "</>",
    color: "#5e35b1",
    logo: "/apps/kiteconnect.png",
    action: "Connect",
    connected: false,
  },
  {
    name: "Streak",
    tag: "Algo trading",
    desc: "Create, backtest and deploy trading strategies without writing any code.",
    icon: "S",
    color: "#00897b",
    logo: "/apps/streak.png",
    action: "Connect",
    connected: false,
  },
  {
    name: "smallcase",
    tag: "Thematic investing",
    desc: "Invest in ready-made, professionally managed baskets of stocks and ETFs.",
    icon: "sc",
    color: "#e0245e",
    logo: "/apps/smallcase.png",
    action: "Connect",
    connected: false,
  },
  {
    name: "Sensibull",
    tag: "Options trading",
    desc: "India's largest options trading platform with strategy builder and analytics.",
    icon: "Se",
    color: "#1565c0",
    logo: "/apps/sensibull.png",
    action: "Connect",
    connected: false,
  },
];

const AppIcon = ({ app }) => {
  const [errored, setErrored] = useState(false);

  if (errored || !app.logo) {
    return (
      <div className="app-icon" style={{ background: app.color }}>
        {app.icon}
      </div>
    );
  }

  return (
    <div className="app-icon logo">
      <img src={app.logo} alt={`${app.name} logo`} onError={() => setErrored(true)} />
    </div>
  );
};

const Apps = () => {
  return (
    <div className="apps-page">
      <div className="apps-head">
        <h3 className="title">Apps</h3>
        <p>Connect your Zerodha account with the apps and platforms you love.</p>
      </div>

      <div className="apps-grid">
        {apps.map((app) => (
          <div className="app-card" key={app.name}>
            <AppIcon app={app} />
            <div className="app-info">
              <div className="app-name-row">
                <h4>{app.name}</h4>
                {app.connected && <span className="app-badge">Connected</span>}
              </div>
              <span className="app-tag">{app.tag}</span>
              <p>{app.desc}</p>
            </div>
            <button className={`app-btn ${app.connected ? "open" : "connect"}`}>
              {app.action}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Apps;
