import type { ReactNode } from 'react';
import { Navigate } from 'react-router';
import { useAuth } from '@/contexts/AuthContext';

/** Redirect unauthenticated users to /login. */
export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
}
