import { useState, useEffect } from "react";
import { useAuth } from "./useAuth";

export const useAdmin = () => {
  const { user } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAdminRole = async () => {
      if (!user) {
        setIsAdmin(false);
        setLoading(false);
        return;
      }

      // For now, set first user as admin or check email
      // This will be replaced with proper role checking once user_roles table is created
      const adminEmails = ['admin@example.com', 'codeitakki@gmail.com']; // Add your admin email here
      setIsAdmin(adminEmails.includes(user.email || ''));
      setLoading(false);
    };

    checkAdminRole();
  }, [user]);

  return { isAdmin, loading };
};