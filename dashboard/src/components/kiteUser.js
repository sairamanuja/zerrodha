import { accountProfile } from "../data/tradingLog";

// Resolves the local dashboard user for the Kite mobile UI.
const DEFAULT_NAME = accountProfile.name;

export const getUser = () => {
  let name = DEFAULT_NAME;

  const parts = name.trim().split(/\s+/);
  const initials = (
    parts.length > 1
      ? parts[0][0] + parts[parts.length - 1][0]
      : parts[0].slice(0, 2)
  ).toUpperCase();

  // Default account keeps a stable sample client id; real users get a derived one.
  let clientId = "VIS142";
  if (name !== DEFAULT_NAME) {
    const base = (parts[0].slice(0, 3) || "ZER").toUpperCase().padEnd(3, "Z");
    const num = ((name.length * 7) % 900) + 100;
    clientId = `${base}${num}`;
  }

  return { name, initials, clientId };
};
