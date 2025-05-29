import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import RecycleApp from "./RecycleApp.tsx";
// import { LoginPage } from './auth/pages/LoginPage';

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <StrictMode>
      <RecycleApp />
      {/* <LoginPage /> */}
    </StrictMode>
  </BrowserRouter>
);
