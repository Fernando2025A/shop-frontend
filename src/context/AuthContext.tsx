import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

type User = {
  id?: number;
  username?: string;
  email?: string;
  amount?: number;
  roleId?: number;
  avatar?: string;
  background?: string;
  subscription?: { plan: { id: number } };
  planId?: number;
  [key: string]: unknown;
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  refreshUser: () => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const fetchMe = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${apiUrl}/auth/me`, {
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('No autorizado');
      }

      const data = await response.json();
      setUser(data);
      setIsAuthenticated(true);
    } catch (error) {
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void fetchMe();
  }, [apiUrl]);

  const logout = async () => {
    try {
      await fetch(`${apiUrl}/auth/logout`, {
        credentials: 'include',
      });
    } finally {
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated,
        refreshUser: fetchMe,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider');
  }
  return context;
}

export function RequireAuth() {
  const { isLoading, isAuthenticated } = useAuth();

  if (isLoading) {
    return (
      <div className="app-container" style={{ backgroundColor: 'black', color: 'blue' }}>
        Cargando...
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden"></span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
