/**
 * ============================================================================
 * ADMIN SECURITY MIDDLEWARE
 * ============================================================================
 * Implements IP whitelist + password protection for /admin routes
 * - Checks IP against whitelist CSV
 * - Prompts for password if IP not whitelisted
 * - Stores auth in session storage
 * ============================================================================
 */

import { useEffect, useState } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Lock, Shield } from 'lucide-react';

// Admin password - stored as environment variable for security
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'MortgageGenius2025!';

interface AdminSecurityProps {
  children: React.ReactNode;
}

export function AdminSecurityGate({ children }: AdminSecurityProps) {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [userIP, setUserIP] = useState<string>('');

  useEffect(() => {
    checkAuthorization();
  }, []);

  const checkAuthorization = async () => {
    // Check if already authorized in session
    const sessionAuth = sessionStorage.getItem('admin_authorized');
    if (sessionAuth === 'true') {
      setIsAuthorized(true);
      setIsLoading(false);
      return;
    }

    // Get user's IP address
    try {
      const ipResponse = await fetch('https://api.ipify.org?format=json');
      const ipData = await ipResponse.json();
      setUserIP(ipData.ip);

      // Check if IP is whitelisted
      const isWhitelisted = await checkIPWhitelist(ipData.ip);
      
      if (isWhitelisted) {
        // IP is whitelisted - grant access automatically
        sessionStorage.setItem('admin_authorized', 'true');
        setIsAuthorized(true);
      }
    } catch (error) {
      console.log('Could not fetch IP for whitelist check');
    }
    
    setIsLoading(false);
  };

  const checkIPWhitelist = async (ip: string): Promise<boolean> => {
    try {
      // Fetch the whitelist CSV
      const response = await fetch('/admin-whitelist.csv');
      const csvText = await response.text();
      
      // Parse CSV and check for IP
      const lines = csvText.split('\n');
      for (const line of lines) {
        // Skip comments and empty lines
        if (line.trim().startsWith('#') || !line.trim()) continue;
        
        // Check if this line contains the IP
        const [whitelistedIP] = line.split(',');
        if (whitelistedIP && whitelistedIP.trim() === ip) {
          return true;
        }
      }
      
      return false;
    } catch (error) {
      console.error('Failed to check IP whitelist:', error);
      return false;
    }
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem('admin_authorized', 'true');
      setIsAuthorized(true);
    } else {
      setError('Incorrect password. Access denied.');
      setPassword('');
    }
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#003366] to-[#002244] flex items-center justify-center">
        <div className="text-white text-xl">Checking authorization...</div>
      </div>
    );
  }

  // Show password gate if not authorized
  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#003366] to-[#002244] flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center space-y-3">
            <div className="mx-auto w-16 h-16 bg-[#10b981] rounded-full flex items-center justify-center">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl">Admin Access Required</CardTitle>
            <p className="text-sm text-muted-foreground">
              This area is restricted to authorized personnel only.
            </p>
          </CardHeader>
          <CardContent>
            {userIP && (
              <div className="mb-4 p-3 bg-gray-50 rounded-lg text-sm">
                <p className="text-gray-600">
                  <strong>Your IP:</strong> {userIP}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Not whitelisted. Password required.
                </p>
              </div>
            )}

            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div>
                <label htmlFor="admin-password" className="block text-sm mb-2 font-medium">
                  Admin Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="admin-password"
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="pl-10"
                    autoFocus
                  />
                </div>
              </div>

              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              <Button
                type="submit"
                className="w-full bg-[#10b981] hover:bg-[#059669]"
              >
                Access Admin Area
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-xs text-muted-foreground">
                Authorized personnel only
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // User is authorized - show protected content
  return <>{children}</>;
}

// Helper: Check if current route is admin route
export function isAdminRoute(pathname: string): boolean {
  return pathname.startsWith('/admin');
}

// Helper: Clear admin authorization
export function clearAdminAuth(): void {
  sessionStorage.removeItem('admin_authorized');
}
