import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { AuthProvider } from "@/components/auth/auth-provider";
import { UserSync } from "@/components/auth/user-sync";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <UserSync />
        <App />
        <Toaster />
        <SonnerToaster position="bottom-right" />
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
