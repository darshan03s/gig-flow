import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  async function loginUser() {
    const API_URL = import.meta.env.VITE_API_URL;
    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (data.message) {
        toast.info(data.message);
      }
      if (data.error) {
        toast.error(data.error);
      }

      console.log(data);

      if (res.status === 200) {
        navigate('/');
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleLogin = () => {
    if (!email || !password) {
      return;
    }
    loginUser();
  };

  return (
    <main className="h-[calc(100vh-40px)] flex items-center justify-center">
      <div className="w-[400px] flex flex-col gap-8">
        <h1 className="text-center text-2xl font-bold">Login to GigFlow</h1>
        <div className="space-y-4">
          <div className="login-inputs space-y-2">
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button className="w-full" onClick={handleLogin}>
            Login
          </Button>
          <p className="text-center">
            Don't have an account?{' '}
            <Link to="/register" className="text-blue-500 underline hover:text-blue-600">
              Register
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
};

export default Login;
