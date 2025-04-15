import { createBrowserRouter } from "react-router";
import { App } from "../App.tsx";
import { Customer } from "../pages/Customer";

  
export const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
    },
    {
      path: "/customer",
      element: <Customer />,
    },
  ]);
  