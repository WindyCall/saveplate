"use client";

import { NextUIProvider } from "@nextui-org/react";
import { Toaster } from "react-hot-toast";
export function Providers({ children }) {
  return (
    <NextUIProvider>
      {children}
      <Toaster position="top-center" reverseOrder={false} />
    </NextUIProvider>
  );
}