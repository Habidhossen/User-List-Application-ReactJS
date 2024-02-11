import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import UserDetail from "./components/UserDetail.jsx";
import "./index.css";

// react router dom
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "user-detail/:userId",
    element: <UserDetail />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
