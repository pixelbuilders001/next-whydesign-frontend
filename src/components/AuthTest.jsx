"use client";

import React from 'react';
import { useAuth } from '@/lib/useAuth';
import { useSession, signIn, signOut } from 'next-auth/react';
import { debugStoredTokens } from '@/lib/tokenStorage';

const AuthTest = () => {
  const { isAuthenticated, user, login, logout, isLoading } = useAuth();
  const { data: session } = useSession();

  const handleCustomLogin = async () => {
    try {
      const result = await login('test@example.com', 'password123');
      console.log('Custom login result:', result);
    } catch (error) {
      console.error('Custom login error:', error);
    }
  };

  const handleCustomLogout = async () => {
    try {
      const result = await logout();
      console.log('Custom logout result:', result);
    } catch (error) {
      console.error('Custom logout error:', error);
    }
  };

  if (isLoading) {
    return <div className="p-4">Loading authentication...</div>;
  }

  return (
    <div className="p-4 border rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Authentication Test</h3>

      {/* Custom Authentication Status */}
      <div className="mb-4 p-3 bg-blue-50 rounded">
        <h4 className="font-medium">Custom Authentication:</h4>
        <p>Authenticated: {isAuthenticated ? 'Yes' : 'No'}</p>
        <p>User: {user ? JSON.stringify(user, null, 2) : 'Not logged in'}</p>
      </div>

      {/* NextAuth Status */}
      <div className="mb-4 p-3 bg-green-50 rounded">
        <h4 className="font-medium">NextAuth (Google OAuth):</h4>
        <p>Session: {session ? 'Active' : 'Not active'}</p>
        <p>User: {session?.user?.email || 'Not logged in'}</p>
      </div>

      {/* Action Buttons */}
      <div className="space-y-2">
        <div>
          <h5 className="font-medium mb-2">Custom Auth Actions:</h5>
          <button
            onClick={handleCustomLogin}
            className="mr-2 px-3 py-1 bg-blue-500 text-white rounded text-sm"
          >
            Test Custom Login
          </button>
          <button
            onClick={handleCustomLogout}
            className="px-3 py-1 bg-red-500 text-white rounded text-sm"
          >
            Test Custom Logout
          </button>
          <button
            onClick={debugStoredTokens}
            className="ml-2 px-3 py-1 bg-purple-500 text-white rounded text-sm"
          >
            Debug Tokens
          </button>
        </div>

        <div>
          <h5 className="font-medium mb-2">Google OAuth Actions:</h5>
          <button
            onClick={() => signIn('google')}
            className="mr-2 px-3 py-1 bg-green-500 text-white rounded text-sm"
          >
            Sign in with Google
          </button>
          <button
            onClick={() => signOut()}
            className="px-3 py-1 bg-gray-500 text-white rounded text-sm"
          >
            Sign out Google
          </button>
        </div>
      </div>

      {/* Debug Info */}
      <div className="mt-4 p-3 bg-gray-50 rounded text-xs">
        <h5 className="font-medium mb-2">Debug Information:</h5>
        <details>
          <summary>Custom Auth State</summary>
          <pre>{JSON.stringify({ isAuthenticated, user, isLoading }, null, 2)}</pre>
        </details>
        <details>
          <summary>NextAuth Session</summary>
          <pre>{JSON.stringify(session, null, 2)}</pre>
        </details>
      </div>
    </div>
  );
};

export default AuthTest;