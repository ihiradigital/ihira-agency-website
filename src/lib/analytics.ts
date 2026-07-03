export function trackEvent(event: string): void {
  try {
    fetch('/api/analytics/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ event, page: window.location.pathname }),
      keepalive: true,
    }).catch(() => {});
  } catch {
    // Analytics should never break the UI
  }
}
