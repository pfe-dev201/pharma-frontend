import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginView from "./views/login/loginView";
import PharmaView from "./views/pharma/pharmaView";
import EntreesView from "./views/pharma/content/entrees/entreesView";
import Welcome from "./views/pharma/content/welcome/welcome";
import SortiesView from "./views/pharma/content/sorties/sortiesView";
import ReglagesView from "./views/pharma/content/reglages/reglagesView";
import { Provider } from "react-redux";
import store from "./store/store";
import CheckLogin from "./components/checkLogin";
import Rapport from "./views/pharma/content/rapport/rapport";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginView />,
  },
  {
    path: "pharma",
    element: <CheckLogin Component={PharmaView} />,
    children: [
      {
        index: true,
        element: <Welcome />
      },
      {
        path: "rapport",
        element: <CheckLogin Component={Rapport} />,
      },
      {
        path: "entrees",
        element: <CheckLogin Component={EntreesView} />,
      },
      {
        path: "sorties",
        element: <CheckLogin Component={SortiesView} />,
      },
      {
        path: "stock",
        element: <CheckLogin Component={LoginView} />,
      },
      {
        path: "profil",
        element: <CheckLogin Component={LoginView} />,
      },
      {
        path: "reglages",
        element: <CheckLogin Component={ReglagesView} />,
      },
    ]
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
