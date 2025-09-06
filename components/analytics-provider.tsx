"use client";

import { useEffect } from "react";
import { analytics } from "@/lib/firebase";
import { useAnalytics } from "@/hooks/use-analytics";

interface AnalyticsProviderProps {
  children: React.ReactNode;
}

export function AnalyticsProvider({ children }: AnalyticsProviderProps) {
  // Initialize page tracking
  useAnalytics();

  useEffect(() => {
    // Set initial user properties
    if (analytics && typeof window !== 'undefined') {
      // You can set user properties here
      // setAnalyticsUserProperties({
      //   platform: 'web',
      //   version: '1.0.0'
      // });
    }
  }, []);

  return <>{children}</>;
}
