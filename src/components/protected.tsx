import { useUser } from '@/contexts/user/useUser';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const Protected = ({ children }: { children: React.ReactNode }) => {
  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const { setFetchingUser, fetchingUser, user, setUser } = useUser();

  async function getUser() {
    if (user) return;

    setFetchingUser(true);

    try {
      const res = await fetch(`${API_URL}/api/auth/whoami`, {
        credentials: 'include'
      });
      const data = await res.json();
      if (data.message) {
        toast.info(data.message);
      }

      if (res.status === 401) {
        navigate('/login');
      }

      const user = {
        id: data.user._id,
        name: data.user.name,
        email: data.user.email,
        createdAt: data.user.createdAt
      };

      setUser(user);
    } catch (error) {
      console.log(error);
    } finally {
      setFetchingUser(false);
    }
  }

  useEffect(() => {
    getUser();
  }, []);

  return fetchingUser ? null : <>{children}</>;
};

export default Protected;
