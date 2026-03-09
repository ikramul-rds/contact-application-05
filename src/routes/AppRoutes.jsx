import { createBrowserRouter } from "react-router-dom";

// pages
import LandingPage from "../pages/landingPage/LandingPage";
import CreateContactPage from "../pages/createContactPage/CreateContactPage";

// components
import AppLayout from "../components/layout/AppLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/add-contact",
        element: <CreateContactPage />,
      },
    ],
  },
]);
