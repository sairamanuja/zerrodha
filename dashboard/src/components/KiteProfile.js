import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import SupportOutlinedIcon from "@mui/icons-material/SupportOutlined";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import CallOutlinedIcon from "@mui/icons-material/CallOutlined";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import { getUser } from "./kiteUser";
import { KiteContext } from "./KiteContext";

const LANDING = "http://localhost:3001";

const Profile = () => {
  const { name } = getUser();
  const navigate = useNavigate();
  const { showToast } = useContext(KiteContext);

  const handleLogout = () => {
    try {
      localStorage.removeItem("zerodha_user");
    } catch (_) {
      /* ignore */
    }
    window.location.href = `${LANDING}/signup`;
  };

  const openExternal = (path, label) => {
    showToast(`Opening ${label}…`);
    window.open(`${LANDING}${path}`, "_blank", "noopener");
  };

  const consoleLinks = [
    { label: "Portfolio", action: () => navigate("/portfolio") },
    { label: "Tradebook", action: () => navigate("/orders") },
    { label: "P&L", action: () => navigate("/portfolio") },
    { label: "Tax P&L", action: () => navigate("/portfolio") },
    { label: "Gift stocks", action: () => showToast("Gift stocks — coming soon") },
    { label: "Family", action: () => showToast("Family accounts — coming soon") },
    { label: "Downloads", action: () => showToast("Preparing your downloads…") },
  ];

  return (
    <div className="k-profile">
      <div className="k-prof-header">
        <span className="k-prof-name">{name}</span>
        <NotificationsNoneOutlinedIcon
          className="k-prof-bell"
          onClick={() => showToast("No new notifications")}
        />
      </div>

      <button className="k-prof-row k-logout" onClick={handleLogout}>
        <span>Logout</span>
        <LogoutOutlinedIcon />
      </button>

      <div className="k-prof-section">
        <div className="k-prof-section-head">
          <span>Console</span>
          <DonutLargeIcon className="k-console-logo" />
        </div>
        <div className="k-console-links">
          {consoleLinks.map((l) => (
            <button type="button" key={l.label} onClick={l.action}>
              {l.label}
            </button>
          ))}
        </div>
      </div>

      <div className="k-prof-section">
        <div className="k-prof-section-head">
          <span>Support</span>
        </div>
        <button
          className="k-prof-row"
          onClick={() => openExternal("/support", "Support portal")}
        >
          <span>Support portal</span>
          <SupportOutlinedIcon />
        </button>
        <button
          className="k-prof-row"
          onClick={() => openExternal("/support", "User manual")}
        >
          <span>User manual</span>
          <HelpOutlineIcon />
        </button>
        <button
          className="k-prof-row"
          onClick={() => showToast("Call support: 080 4718 1888")}
        >
          <span>Contact</span>
          <CallOutlinedIcon />
        </button>
      </div>

      <div className="k-prof-section">
        <div className="k-prof-section-head">
          <span>Others</span>
        </div>
        <button
          className="k-prof-row"
          onClick={() => showToast("Invite link copied — share with friends!")}
        >
          <span>Invite friends</span>
          <PersonAddAltOutlinedIcon />
        </button>
        <button
          className="k-prof-row"
          onClick={() => showToast("Open-source licenses")}
        >
          <span>Licenses</span>
          <DescriptionOutlinedIcon />
        </button>
      </div>

      <div className="k-prof-version">Kite v3 b246</div>
    </div>
  );
};

export default Profile;
