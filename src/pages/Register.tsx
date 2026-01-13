import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  async function registerUser() {
    const API_URL = import.meta.env.VITE_API_URL;
    try {
      const res = await fetch(`${API_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password })
      });
      const data = await res.json();
      if (data.message) {
        toast.info(data.message);
      }
      if (data.error) {
        toast.error(data.error);
      }

      if (res.status === 201 || res.status === 409) {
        navigate('/login');
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleRegister = () => {
    if (!name || !email || !password) {
      return;
    }
    registerUser();
  };

  return (
    <main className="h-[calc(100vh-40px)] flex items-center justify-center">
      <div className="w-[400px] flex flex-col gap-8">
        <h1 className="text-center text-2xl font-bold">Register to GigFlow</h1>
        <div className="space-y-4">
          <div className="login-inputs space-y-2">
            <Input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
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
          <Button className="w-full" onClick={handleRegister}>
            Register
          </Button>
          <p className="text-center">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-500 underline hover:text-blue-600">
              Login
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
};

export default Register;
