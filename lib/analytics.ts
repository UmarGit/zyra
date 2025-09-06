import { logEvent, setUserProperties } from "firebase/analytics";
import { analytics } from "./firebase";

// Custom event types
export interface AnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
}

// Track page views
export const trackPageView = (page_title: string, page_location: string) => {
  if (analytics) {
    logEvent(analytics, 'page_view', {
      page_title,
      page_location,
    });
  }
};

// Track button clicks
export const trackButtonClick = (button_name: string, location: string) => {
  if (analytics) {
    logEvent(analytics, 'button_click', {
      button_name,
      location,
    });
  }
};

// Track playground usage
export const trackPlaygroundAction = (action: string, details?: Record<string, any>) => {
  if (analytics) {
    logEvent(analytics, 'playground_action', {
      action,
      ...details,
    });
  }
};

// Track image generation
export const trackImageGeneration = (
  model: string,
  success: boolean,
  generation_time?: number
) => {
  if (analytics) {
    logEvent(analytics, 'image_generation', {
      model,
      success,
      generation_time,
    });
  }
};

// Track GitHub interactions
export const trackGitHubInteraction = (action: string) => {
  if (analytics) {
    logEvent(analytics, 'github_interaction', {
      action,
    });
  }
};

// Track user engagement
export const trackEngagement = (engagement_time_msec: number) => {
  if (analytics) {
    logEvent(analytics, 'user_engagement', {
      engagement_time_msec,
    });
  }
};

// Set user properties
export const setAnalyticsUserProperties = (properties: Record<string, string>) => {
  if (analytics) {
    setUserProperties(analytics, properties);
  }
};

// Generic event tracker
export const trackEvent = (eventName: string, parameters?: Record<string, any>) => {
  if (analytics) {
    logEvent(analytics, eventName, parameters);
  }
};
