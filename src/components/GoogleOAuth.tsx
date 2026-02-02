/**
 * ============================================================================
 * GOOGLE OAUTH AUTHENTICATION
 * ============================================================================
 * Implements Google OAuth with @mortgagegenius.pro domain restriction
 * Only users with @mortgagegenius.pro email addresses can access admin area
 * ============================================================================
 */

import { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Shield, LogOut } from 'lucide-react';
import logo from '../assets/mortgage-genius-logo.png';

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || '';
const ALLOWED_DOMAIN = 'mortgagegenius.pro';

interface GoogleUser {
  email: string;
  name: string;
  picture: string;
}

interface GoogleOAuthProps {
  children: React.ReactNode;
}

export function GoogleOAuth({ children }: GoogleOAuthProps) {
  const [user, setUser] = useState<GoogleUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    // Check for existing session
    const savedUser = sessionStorage.getItem('google_user');
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      if (isAuthorizedDomain(userData.email)) {
        setUser(userData);
        setIsLoading(false);
        return;
      } else {
        // Clear invalid session
        sessionStorage.removeItem('google_user');
      }
    }

    // Initialize Google OAuth
    initializeGoogleOAuth();
  }, []);

  const initializeGoogleOAuth = () => {
    if (!GOOGLE_CLIENT_ID) {
      setError('Google OAuth not configured. Please add VITE_GOOGLE_CLIENT_ID.');
      setIsLoading(false);
      return;
    }

    // Load Google OAuth script
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = () => {
      // Initialize Google Sign-In
      if (window.google) {
        window.google.accounts.id.initialize({
          client_id: GOOGLE_CLIENT_ID,
          callback: handleCredentialResponse,
        });
        setIsLoading(false);
      }
    };
    document.body.appendChild(script);
  };

  const handleCredentialResponse = (response: any) => {
    try {
      // Decode JWT token to get user info
      const token = response.credential;
      const payload = JSON.parse(atob(token.split('.')[1]));
      
      const userData: GoogleUser = {
        email: payload.email,
        name: payload.name,
        picture: payload.picture,
      };

      // Check domain restriction
      if (!isAuthorizedDomain(userData.email)) {
        setError(`Access denied. Only @${ALLOWED_DOMAIN} email addresses are authorized.`);
        return;
      }

      // Save to session and grant access
      sessionStorage.setItem('google_user', JSON.stringify(userData));
      setUser(userData);
      setError('');
    } catch (err) {
      console.error('Error processing Google sign-in:', err);
      setError('Failed to process sign-in. Please try again.');
    }
  };

  const isAuthorizedDomain = (email: string): boolean => {
    return email.toLowerCase().endsWith(`@${ALLOWED_DOMAIN}`);
  };

  const handleSignOut = () => {
    sessionStorage.removeItem('google_user');
    setUser(null);
    if (window.google) {
      window.google.accounts.id.disableAutoSelect();
    }
  };

  const renderGoogleButton = () => {
    if (!window.google) return null;

    setTimeout(() => {
      window.google.accounts.id.renderButton(
        document.getElementById('google-signin-button'),
        {
          theme: 'filled_blue',
          size: 'large',
          width: 300,
          text: 'signin_with',
        }
      );
    }, 100);

    return <div id="google-signin-button"></div>;
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#003366] to-[#002244] flex items-center justify-center">
        <div className="text-white text-xl">Initializing authentication...</div>
      </div>
    );
  }

  // Show login if not authenticated
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#003366] to-[#002244] flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center space-y-4">
            <div className="flex justify-center">
              <img src={logo} alt="Mortgage Genius" className="h-16 w-auto" />
            </div>
            <div className="mx-auto w-16 h-16 bg-[#10b981] rounded-full flex items-center justify-center">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl">Admin Access Required</CardTitle>
            <CardDescription>
              Sign in with your @{ALLOWED_DOMAIN} Google account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600 text-center">{error}</p>
              </div>
            )}

            {GOOGLE_CLIENT_ID ? (
              <div className="flex justify-center">
                {renderGoogleButton()}
              </div>
            ) : (
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm text-yellow-800 text-center">
                  Google OAuth is not configured. Please contact your administrator.
                </p>
              </div>
            )}

            <div className="text-center pt-4">
              <p className="text-xs text-muted-foreground">
                Only @{ALLOWED_DOMAIN} email addresses are authorized
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // User is authenticated - show content with sign out option
  return (
    <div className="relative">
      {/* Sign out button in top right */}
      <div className="fixed top-4 right-4 z-50">
        <Card className="p-3">
          <div className="flex items-center gap-3">
            <img
              src={user.picture}
              alt={user.name}
              className="w-8 h-8 rounded-full"
            />
            <div className="text-sm">
              <p className="font-medium">{user.name}</p>
              <p className="text-xs text-muted-foreground">{user.email}</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSignOut}
              className="ml-2"
            >
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </Card>
      </div>

      {children}
    </div>
  );
}

// Helper: Clear Google auth
export function clearGoogleAuth(): void {
  sessionStorage.removeItem('google_user');
  if (window.google) {
    window.google.accounts.id.disableAutoSelect();
  }
}

// Extend window interface for TypeScript
declare global {
  interface Window {
    google: any;
  }
}
