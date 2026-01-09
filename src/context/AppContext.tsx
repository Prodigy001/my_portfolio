import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

export interface User {
  email: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  country?: string;
  referralCode?: string;
}

interface AppContextType {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;
  user: User | null;
  setUser: (user: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUserState] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("zabira_user");
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUserState(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Failed to parse saved user:", error);
      }
    }
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  const setUser = (newUser: User) => {
    setUserState(newUser);
    setIsAuthenticated(true);
    // Save to localStorage (excluding password)
    const userToSave = { ...newUser };
    delete userToSave.password;
    localStorage.setItem("zabira_user", JSON.stringify(userToSave));
  };

  const logout = () => {
    setUserState(null);
    setIsAuthenticated(false);
    localStorage.removeItem("zabira_user");
  };

  const value = {
    sidebarOpen,
    setSidebarOpen,
    toggleSidebar,
    user,
    setUser,
    logout,
    isAuthenticated,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
