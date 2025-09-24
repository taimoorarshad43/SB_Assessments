import React, { createContext, useContext } from 'react';

/** AuthContext for managing user authentication state */
const AuthContext = createContext();

/** Custom hook to use auth context */
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default AuthContext;
