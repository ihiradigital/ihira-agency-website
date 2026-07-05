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
    // Attach click handler to footer Cookie Preferences button
    // The button has class termly-display-preferences but Termly's auto-binding
    // doesn't work with React's dynamically rendered elements
    const prefsButton = document.querySelector('.termly-display-preferences');
    if (prefsButton && typeof window.displayPreferenceModal === 'function') {
      prefsButton.addEventListener('click', (e) => {
        e.preventDefault();
        window.displayPreferenceModal();
      });
    }
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
