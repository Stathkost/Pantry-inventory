"use client";

import { Toaster } from "sonner";
import Navbar from "../components/Navbar";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function App(props: { children: React.ReactNode }) {
  const { children } = props;

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Navbar />
      <Toaster position="bottom-right" />
      <div className="flex flex-1">
        <div className="w-full flex flex-col">
          <main className="flex-grow">{children}</main>
        </div>
      </div>
    </QueryClientProvider>
  );
}
