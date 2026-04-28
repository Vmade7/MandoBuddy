import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from 'react';

/**
 * Decode the JWT payload without a library.
 * Security validation always happens server-side; this is only for reading the `sub` claim.
 */
function decodeJwtSub(token: string): string | null {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return (payload.sub as string) ?? null;
  } catch {
    return null;
  }
}

interface AuthContextValue {
  userId: string | null;
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue>({
  userId: null,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [userId, setUserId] = useState<string | null>(() => {
    const token = localStorage.getItem('access_token');
    return token ? decodeJwtSub(token) : null;
  });

  const login = useCallback((token: string) => {
    const sub = decodeJwtSub(token);
    if (!sub) return;
    localStorage.setItem('access_token', token);
    setUserId(sub);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('access_token');
    setUserId(null);
  }, []);

  return (
    <AuthContext.Provider value={{ userId, isAuthenticated: userId !== null, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
