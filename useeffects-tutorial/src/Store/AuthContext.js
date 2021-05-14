import { createContext, useEffect, useState } from "react";

const AuthContext = createContext({
  isLoggedIn: false,
  onLogout: () => {},
  onLogin: (email, password) => {},
});

export const AuthContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedUserLogInInformation = localStorage.getItem("isLoggedIn");

    storedUserLogInInformation === "1" && setIsLoggedIn(true);
  }, [isLoggedIn]);

  const logoutHandler = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
  };
  const loginHandler = () => {
    setIsLoggedIn(true);
    console.log("LOGIN:", isLoggedIn);
    localStorage.setItem("isLoggedIn", "1"); // 1 => True
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: false,
        onLogout: logoutHandler,
        onLogin: loginHandler,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
