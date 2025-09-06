"use client";

import { useEffect, useState } from "react";
import { analytics } from "@/lib/firebase";

interface AnalyticsDebugProps {
  enabled?: boolean;
}

export function AnalyticsDebug({ enabled = false }: AnalyticsDebugProps) {
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    if (!enabled || !analytics) return;

    // This is for development debugging only
    // In production, you would use Firebase Console for analytics
    const originalLogEvent = analytics;
    
    // Note: This is just a development helper
    // Real analytics data should be viewed in Firebase Console
    
  }, [enabled]);

  if (!enabled || process.env.NODE_ENV === 'production') {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 bg-black/80 text-white p-4 rounded-lg text-xs max-w-sm z-50">
      <div className="font-bold mb-2">Analytics Debug (Dev Only)</div>
      <div className="text-gray-300">
        Analytics is {analytics ? 'enabled' : 'disabled'}
      </div>
      <div className="text-gray-300 mt-1">
        Check Firebase Console for real analytics data
      </div>
    </div>
  );
}
