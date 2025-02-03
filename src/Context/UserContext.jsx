import { useEffect, useState } from "react";
import { createContext } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export let UserContext = createContext();

export default function USerContextProvider({ children }) {
  const [userData, setUserData] = useState(null);

  const [userId, setUserId] = useState(null);


  useEffect(() => {

    if (localStorage.getItem("userToken") !== null) {
      setUserData(localStorage.getItem("userToken"));

    }
  }, []);


  return (
    <UserContext.Provider value={{ userData, setUserData, userId, setUserId }}>
      {children}
    </UserContext.Provider>
  );
}
