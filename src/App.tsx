import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Route, Switch, Router as WouterRouter } from 'wouter';
import { useEffect } from 'react';
import Home from '@/pages/Home';
import PrivacyPolicy from '@/pages/PrivacyPolicy';
import TermsAndConditions from '@/pages/TermsAndConditions';
import CookiePolicy from '@/pages/CookiePolicy';

const queryClient = new QueryClient();

// Initialize Termly for SPA to handle dynamically rendered elements
function TermlyInitializer() {
  useEffect(() => {
    // For Termly resource-blocker in SPA, we need to scan for elements with termly-display-preferences class
    // and manually attach click handlers since they're rendered after Termly initializes
    const handlePreferencesClick = (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
      
      // Try to find and trigger the preferences modal through various Termly APIs
      // The resource-blocker script may expose different APIs depending on implementation
      if ((window as any).__TERMLY__?.displayPreferences) {
        (window as any).__TERMLY__.displayPreferences();
      } else if ((window as any).displayPreferencesModal) {
        (window as any).displayPreferencesModal();
      } else {
        // As fallback, dispatch a custom event that Termly might be listening for
        const event = new CustomEvent('termly:openPreferences');
        window.dispatchEvent(event);
      }
    };
    
    const prefsButtons = document.querySelectorAll('.termly-display-preferences');
    prefsButtons.forEach(btn => {
      btn.removeEventListener('click', handlePreferencesClick as EventListener);
      btn.addEventListener('click', handlePreferencesClick as EventListener);
    });
    
    // Clean up
    return () => {
      prefsButtons.forEach(btn => {
        btn.removeEventListener('click', handlePreferencesClick as EventListener);
      });
    };
  }, []);

  return null;
}

function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-foreground">404 - Page Not Found</h1>
        <p className="mt-2 text-sm text-muted-foreground">The page you are looking for does not exist.</p>
        <a href="/" className="mt-4 inline-block text-primary hover:underline">Return Home</a>
      </div>
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/privacy-policy" component={PrivacyPolicy} />
      <Route path="/terms-and-conditions" component={TermsAndConditions} />
      <Route path="/cookie-policy" component={CookiePolicy} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TermlyInitializer />
      <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
        <Router />
      </WouterRouter>
    </QueryClientProvider>
  );
}

export default App;
