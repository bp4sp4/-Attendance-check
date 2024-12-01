import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./main/main";
import Login from "./login/login";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
