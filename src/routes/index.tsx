import { createBrowserRouter } from "react-router";
import { App } from "../App.tsx";
import { Client } from "../components/Client";

  
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
  