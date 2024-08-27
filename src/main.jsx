import React from "react";
import ReactDOM from "react-dom/client";
import { router } from "./Router/Router";
import "./index.css";

import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";

import { RouterProvider } from "react-router-dom";
import AuthProvider from "./providers/AuthProviders";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ParcelProvider } from "./providers/ParcelProvider";


const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <QueryClientProvider client={queryClient}>
      <ParcelProvider>
        <React.StrictMode>
          <RouterProvider router={router} />
        </React.StrictMode>
      </ParcelProvider>
    </QueryClientProvider>
  </AuthProvider>
);
