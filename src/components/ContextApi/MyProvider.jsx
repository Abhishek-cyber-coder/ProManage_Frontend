import React, { useEffect, useState } from "react";
import MyContext from "./MyContext";
function Provider({ children }) {
  const [isCheckboxUpdated, setIsCheckboxUpdated] = useState(false);
  return (
    <MyContext.Provider value={{ isCheckboxUpdated, setIsCheckboxUpdated }}>
      {children}
    </MyContext.Provider>
  );
}

export default Provider;
