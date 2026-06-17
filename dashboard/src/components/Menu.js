import React, { useState } from "react";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const links = [
  { to: "/", label: "Dashboard" },
  { to: "/orders", label: "Orders" },
  { to: "/holdings", label: "Holdings" },
  { to: "/positions", label: "Positions" },
  { to: "/funds", label: "Funds" },
  { to: "/apps", label: "Apps" },
];

const getUser = () => {
  try {
    const u = JSON.parse(localStorage.getItem("zerodha_user"));
    if (u && u.name) {
      const parts = u.name.trim().split(/\s+/);
      const initials = (
        parts.length > 1
          ? parts[0][0] + parts[parts.length - 1][0]
          : parts[0].slice(0, 2)
      ).toUpperCase();
      return { username: parts[0], initials };
    }
  } catch (_) {
    /* ignore */
  }
  return { username: "USERID", initials: "ZU" };
};

const Menu = () => {
  const [selectedMenu, setSelectedMenu] = useState(0);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const { username, initials } = getUser();

  const handleMenuClick = (index) => {
    setSelectedMenu(index);
    setIsNavOpen(false);
  };

  const menuClass = "menu";
  const activeMenuClass = "menu selected";

  return (
    <div className="menu-container">
      <img src="logo.png" alt="logo" style={{ width: "40px" }} />

      <button
        className="nav-toggle"
        aria-label="Toggle navigation"
        onClick={() => setIsNavOpen((v) => !v)}
      >
        {isNavOpen ? <CloseIcon /> : <MenuIcon />}
      </button>

      <div className={`menus ${isNavOpen ? "open" : ""}`}>
        <ul>
          {links.map((link, index) => (
            <li key={link.to}>
              <Link
                to={link.to}
                onClick={() => handleMenuClick(index)}
                style={{ textDecoration: "none" }}
              >
                <p className={selectedMenu === index ? activeMenuClass : menuClass}>
                  {link.label}
                </p>
              </Link>
            </li>
          ))}
        </ul>
        <hr />
        <div className="profile">
          <div className="avatar">{initials}</div>
          <p className="username">{username}</p>
        </div>
      </div>
    </div>
  );
};

export default Menu;
