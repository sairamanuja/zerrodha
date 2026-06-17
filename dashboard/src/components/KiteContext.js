import React, { createContext, useState, useCallback } from "react";
import KiteOrderPad from "./KiteOrderPad";

export const KiteContext = createContext({
  openOrder: () => {},
  closeOrder: () => {},
  showToast: () => {},
  ordersVersion: 0,
});

export const KiteProvider = ({ children }) => {
  const [pad, setPad] = useState(null); // { uid, mode, price }
  const [toast, setToast] = useState("");
  const [ordersVersion, setOrdersVersion] = useState(0);

  const showToast = useCallback((msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2200);
  }, []);

  const openOrder = useCallback((uid, mode, price = 0) => {
    setPad({ uid, mode, price });
  }, []);

  const closeOrder = useCallback(() => setPad(null), []);

  const markOrderPlaced = useCallback(() => {
    setOrdersVersion((v) => v + 1);
  }, []);

  return (
    <KiteContext.Provider value={{ openOrder, closeOrder, showToast, ordersVersion }}>
      {children}
      {pad && (
        <KiteOrderPad
          pad={pad}
          onClose={closeOrder}
          showToast={showToast}
          onPlaced={markOrderPlaced}
        />
      )}
      {toast && (
        <div className="k-toast">
          <span>{toast}</span>
        </div>
      )}
    </KiteContext.Provider>
  );
};
