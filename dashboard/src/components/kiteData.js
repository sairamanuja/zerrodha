// Master list of tradable instruments used for the watchlist + search.
export const instruments = [
  { sym: "HDFCBANK", exch: "NSE", price: 792.8, chg: 7.9, pct: 1.0 },
  { sym: "TMPV", exch: "NSE", price: 384.6, chg: -9.0, pct: -2.28 },
  { sym: "INFY", exch: "NSE", price: 1555.45, chg: -25.3, pct: -1.6 },
  { sym: "TCS", exch: "NSE", price: 3194.8, chg: -8.1, pct: -0.25 },
  { sym: "RELIANCE", exch: "NSE", price: 2112.4, chg: 30.0, pct: 1.44 },
  { sym: "SBIN", exch: "NSE", price: 430.2, chg: -1.5, pct: -0.34 },
  { sym: "WIPRO", exch: "NSE", price: 577.75, chg: 1.85, pct: 0.32 },
  { sym: "ITC", exch: "NSE", price: 207.9, chg: 1.65, pct: 0.8 },
  { sym: "KPITTECH", exch: "NSE", price: 266.45, chg: 9.1, pct: 3.54 },
  { sym: "ONGC", exch: "NSE", price: 116.8, chg: -0.1, pct: -0.09 },
  { sym: "BHARTIARTL", exch: "NSE", price: 541.15, chg: 15.7, pct: 2.99 },
  { sym: "HINDUNILVR", exch: "NSE", price: 2417.4, chg: 5.1, pct: 0.21 },
  { sym: "M&M", exch: "NSE", price: 779.8, chg: -0.1, pct: -0.01 },
  { sym: "TATAPOWER", exch: "NSE", price: 124.15, chg: -0.3, pct: -0.24 },
  { sym: "ICICIBANK", exch: "NSE", price: 1024.5, chg: 6.3, pct: 0.62 },
  { sym: "AXISBANK", exch: "NSE", price: 1102.2, chg: -4.4, pct: -0.4 },
  { sym: "LT", exch: "NSE", price: 3560.0, chg: 22.1, pct: 0.62 },
  { sym: "MARUTI", exch: "NSE", price: 12850.0, chg: 110.0, pct: 0.86 },
  { sym: "SUNPHARMA", exch: "NSE", price: 1685.3, chg: -3.2, pct: -0.19 },
  { sym: "GOLDCASE", exch: "NSE", price: 23.54, chg: -0.1, pct: -0.42 },
  { sym: "QUICKHEAL", exch: "NSE", price: 308.55, chg: -0.45, pct: -0.15 },
  { sym: "HUL", exch: "NSE", price: 512.4, chg: 5.3, pct: 1.04 },
];

export const findInstrument = (sym) =>
  instruments.find((i) => i.sym === sym) || {
    sym,
    exch: "NSE",
    price: 0,
    chg: 0,
    pct: 0,
  };

// IPO data for the Bids screen.
export const ongoingIpos = [
  { name: "Leapfrog Engineering Services", sym: "LESL", sme: true, price: "₹21 - ₹23", date: "17th - 19th Jun" },
  { name: "Diksha Polymers", sym: "DIKSHA", sme: true, price: "₹112", date: "17th - 19th Jun" },
  { name: "Liotech Industries", sym: "LIOTECH", sme: true, price: "₹321", date: "17th - 19th Jun" },
  { name: "Clay Craft India", sym: "CLAYCRAFT", sme: true, price: "₹193 - ₹203", date: "17th - 19th Jun" },
];

export const closedIpos = [
  { name: "Cmr Green Technologies", sym: "CMRGREEN", sme: false, price: "₹182 - ₹192", date: "3rd - 5th Jun" },
  { name: "Hexagon Nutrition", sym: "HEXAGON", sme: false, price: "₹78 - ₹82", date: "29th - 31st May" },
];

export const upcomingIpos = [
  { name: "Sunrise Industries", sym: "SUNRISE", sme: false, price: "₹95 - ₹100", date: "24th - 26th Jun" },
  { name: "Greenline Logistics", sym: "GREENLINE", sme: true, price: "₹54 - ₹57", date: "26th - 28th Jun" },
];
