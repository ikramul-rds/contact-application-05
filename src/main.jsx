import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.scss";
import "./styles/global.scss";
import "./styles/components.scss";

// routes
import { router } from "./routes/AppRoutes";
import { RouterProvider } from "react-router-dom";
import { ContactProvider } from "./context/ContactContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ContactProvider>
      <RouterProvider router={router} />
    </ContactProvider>
  </StrictMode>,
);
