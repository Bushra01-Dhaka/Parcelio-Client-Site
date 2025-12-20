import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router/dom";
import { router } from "./Routes/router";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

import "leaflet/dist/leaflet.css";

import AOS from "aos";
import "aos/dist/aos.css";
import AuthProvider from "./AuthProvider/AuthProvider";
import { Toaster } from "react-hot-toast";
AOS.init();

const queryClient = new QueryClient()

createRoot(document.getElementById("root")).render(
  <StrictMode>
  <QueryClientProvider client={queryClient}>
      <AuthProvider>
       <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          duration: 4000,
          style: {
            borderRadius: "12px",
            background: "#333",
            color: "#fff",
          },
        }}
      />
      <div className="md:max-w-screen-1xl mx-auto font-urbanist bg-[#F9FAFB]">
        <RouterProvider router={router} />
      </div>
    </AuthProvider>
  </QueryClientProvider>
  </StrictMode>
);
