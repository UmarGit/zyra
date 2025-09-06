"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { trackPageView } from "@/lib/analytics";

export const useAnalytics = () => {
  const pathname = usePathname();

  useEffect(() => {
    // Track page view on route change
    if (typeof window !== 'undefined') {
      trackPageView(document.title, window.location.href);
    }
  }, [pathname]);

  return null;
};
