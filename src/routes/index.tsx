import { createBrowserRouter } from "react-router";
import { App } from "../App.tsx";
import { Client } from "../pages/Client/index.tsx";

  
export const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
    },
    {
      path: "/client",
      element: <Client />,
    },
  ]);
  