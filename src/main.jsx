import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router/dom";
import { router } from "./Routes/router";

import "leaflet/dist/leaflet.css";

import AOS from "aos";
import "aos/dist/aos.css";
import AuthProvider from "./AuthProvider/AuthProvider";
import { Toaster } from "react-hot-toast";
AOS.init();

createRoot(document.getElementById("root")).render(
  <StrictMode>
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
      <div className="md:max-w-screen-1xl mx-auto font-urbanist bg-slate-200">
        <RouterProvider router={router} />
      </div>
    </AuthProvider>
  </StrictMode>
);
