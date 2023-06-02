import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginView from "./views/login/loginView";
import PharmaView from "./views/pharma/pharmaView";
import EntreesView from "./views/pharma/content/entrees/entreesView";
import Welcome from "./views/pharma/content/welcome/welcome";
import SortiesView from "./views/pharma/content/sorties/sortiesView";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginView />,
  },
  {
    path: "pharma",
    element: <PharmaView />,
    children: [
      { 
        index: true,
        element: <Welcome /> 
      },
      {
        path: "rapport",
        element: <LoginView />,
      },
      {
        path: "entrees",
        element: <EntreesView />,
      },
      {
        path: "sorties",
        element: <SortiesView />,
      },
      {
        path: "stock",
        element: <LoginView />,
      },
      {
        path: "profil",
        element: <LoginView />,
      },
      {
        path: "reglages",
        element: <LoginView />,
      },
    ]
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);
