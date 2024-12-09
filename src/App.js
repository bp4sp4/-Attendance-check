import React from "react";
import AppRouter from "./components/router";
import { LoginProvider } from "./components/login/LoginContext";

function App() {
  return (
    <div className="App">
      <LoginProvider>
        <AppRouter />
      </LoginProvider>
    </div>
  );
}

export default App;
