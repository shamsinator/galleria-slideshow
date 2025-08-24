"use client";

import { useEffect } from "react";
import type { Metric } from "web-vitals";

/**
 * Performance monitoring component that tracks Core Web Vitals
 * and other performance metrics in development mode
 */
export function PerformanceMonitor() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return;

    // Track Core Web Vitals using the modern web-vitals API
    const trackWebVitals = async () => {
      try {
        const { onCLS, onINP, onFCP, onLCP, onTTFB } = await import(
          "web-vitals"
        );

        // Handler function for logging metrics
        const handleMetric = (metric: Metric) => {
          console.log(`${metric.name}:`, {
            value: metric.value,
            rating: metric.rating,
            delta: metric.delta,
            id: metric.id,
            navigationType: metric.navigationType,
          });
        };

        // Track Core Web Vitals
        onCLS(handleMetric);
        onINP(handleMetric); // INP replaces FID in modern web-vitals
        onFCP(handleMetric);
        onLCP(handleMetric);
        onTTFB(handleMetric);
      } catch (error) {
        console.error("Failed to load web-vitals:", error);
      }
    };

    trackWebVitals();

    // Track navigation timing with better error handling
    const trackNavigationTiming = () => {
      try {
        if (typeof window === "undefined" || !window.performance) {
          return;
        }

        const navigation = performance.getEntriesByType(
          "navigation",
        )[0] as PerformanceNavigationTiming;

        if (navigation) {
          const metrics = {
            domContentLoaded: Math.round(
              navigation.domContentLoadedEventEnd -
                navigation.domContentLoadedEventStart,
            ),
            loadComplete: Math.round(
              navigation.loadEventEnd - navigation.loadEventStart,
            ),
            firstByte: Math.round(
              navigation.responseStart - navigation.requestStart,
            ),
            domInteractive: Math.round(
              navigation.domInteractive - navigation.startTime,
            ),
            totalLoadTime: Math.round(
              navigation.loadEventEnd - navigation.startTime,
            ),
          };

          console.log("Navigation Performance Metrics:", metrics);
        }
      } catch (error) {
        console.error("Failed to track navigation timing:", error);
      }
    };

    // Track navigation timing after a short delay to ensure page is loaded
    const timeoutId = setTimeout(trackNavigationTiming, 100);

    // Cleanup timeout on unmount
    return () => clearTimeout(timeoutId);
  }, []);

  return null;
}
