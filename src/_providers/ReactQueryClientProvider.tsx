"use client";

import React from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { getQueryClient } from "@utils/queryClient";

interface ReactQueryClientProviderProps {
  children: React.ReactNode;
}

/**
 * React Query Client Provider component that wraps the application
 * and provides a consistent query client for data fetching.
 *
 * @param {ReactQueryClientProviderProps} props - Component props
 * @returns {JSX.Element} The provider component
 */
export const ReactQueryClientProvider: React.FC<ReactQueryClientProviderProps> = ({
  children,
}): JSX.Element => {
  const queryClient = getQueryClient();
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
