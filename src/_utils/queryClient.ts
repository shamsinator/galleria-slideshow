import { QueryClient } from "@tanstack/react-query";

// Create a global query client instance
let client: QueryClient | null = null;

/**
 * Creates and returns a new instance of QueryClient with default options.
 *
 * If the instance is already created, it returns the existing one.
 *
 * @returns {QueryClient} A QueryClient instance with default options.
 */
export function getQueryClient(): QueryClient {
  if (!client) {
    client = new QueryClient({
      // Add better caching and stale data handling
      defaultOptions: {
        queries: {
          staleTime: 5 * 60 * 1000, // 5 minutes
          gcTime: 10 * 60 * 1000, // 10 minutes
          refetchOnWindowFocus: false, // Don't refetch on window focus
          retry: 3, // Retry failed requests 3 times
          retryDelay: (attemptIndex) =>
            Math.min(1000 * 2 ** attemptIndex, 30000), // Exponential backoff with a max delay of 30 seconds
        },
      },
    });
  }
  return client;
}
