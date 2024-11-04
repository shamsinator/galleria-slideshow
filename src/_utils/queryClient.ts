import { QueryClient } from "@tanstack/react-query";

/**
 * Creates and returns a new QueryClient instance.
 *
 * @returns {QueryClient}
 *
 * @see {@link https://tanstack.com/query/v4/docs/guides/ssr}
 */
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // With SSR, we usually want to set some default staleTime
      // above 0 to avoid refetching immediately on the client
      staleTime: 60 * 1000,
    },
  },
});

export default queryClient;
