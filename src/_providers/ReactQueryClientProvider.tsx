"use client";

import { QueryClientProvider } from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import queryClient from "../_utils/queryClient";

interface ReactQueryClientProviderProps {
  children: React.ReactNode;
}

/**
 * A React Query client provider component that wraps the application with a QueryClient instance.
 *
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The child elements to be wrapped with the QueryClient provider.
 * @return {JSX.Element} The QueryClientProvider component with the child elements.
 */
export const ReactQueryClientProvider = ({
  children,
}: ReactQueryClientProviderProps): JSX.Element => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  );
};
