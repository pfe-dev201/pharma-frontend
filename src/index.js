import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginView from "./views/login/loginView";
import PharmaView from "./views/pharma/pharmaView";
import EntreesView from "./views/pharma/content/entrees/entreesView";

const router = createBrowserRouter ([
  {
    path: "/",
    element: <LoginView />,
  },
  {
    path: "pharma",
    element: <PharmaView />,
    children: [
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
        element: <LoginView />,
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
