"use client";

import React from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { getQueryClient } from "@utils/queryClient";

/**
 * React Query Client Provider component that wraps the application
 * and provides a consistent query client for data fetching.
 */
export const ReactQueryClientProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const queryClient = getQueryClient();
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
