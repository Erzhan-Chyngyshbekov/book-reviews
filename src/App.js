import React from "react";
import AuthContextProvider from "./Contexts/AuthContext";
import StoreContextProvider from "./Contexts/StoreContext";
import Routes from "./Routes";

export default function App() {
  return (
    <StoreContextProvider>
      <AuthContextProvider>
        <Routes />
      </AuthContextProvider>
    </StoreContextProvider>
  );
}
