import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from "./page/Signup";
import Signin from "./page/Signin";
import Home from "./page/Home";
import UserInformation from "./page/Userinformation/UserInformation";
import App from "./App";
import { HelmetProvider } from "react-helmet-async";
import Erroe404 from "./shared/errorPage";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Erroe404 />,
  },
  {
    path: "/UserInformation/:id",
    element: <UserInformation />,
  },
  {
    path: "/Signup",
    element: <Signup />,
  },

  {
    path: "/Home",
    element: <Home />,
  },
  {
    path: "/Signin",
    element: <Signin />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <HelmetProvider>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </HelmetProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
