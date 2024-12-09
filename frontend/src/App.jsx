import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import Layout from "./layouts/Layout";
import AppRoutes from "./router/AppRoutes";
import { Blank } from "./layouts/Blank";
import { LoginPage } from "./pages/authentication/LoginPage";

function App() {
  const location = useLocation();
  const isAuthPath = location.pathname.includes("auth") || location.pathname.includes("error") || location.pathname.includes("under-maintenance") | location.pathname.includes("blank");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
    setLoading(false);
  }, []);

  if (loading) {
    return <Blank/>
  }
  
  return (
    <>
      {isAuthPath ? (
        <AppRoutes>
            <Blank/>
          </AppRoutes>
      ) : isLoggedIn ? (
        <Layout>
          <AppRoutes />
        </Layout>
      ) : (
        <LoginPage/>
      )}
    </>
  );
}

export default App;
