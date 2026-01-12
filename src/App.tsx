import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Header from './components/header';
import MyGigs from './pages/MyGigs';
import MyBids from './pages/MyBids';
import { Toaster } from './components/ui/sonner';
import Login from './pages/Login';
import Protected from './components/protected';
import Register from './pages/Register';
import CreateGig from './pages/CreateGig';
import { useEffect } from 'react';
import { socket } from '@/lib/socket';
import { toast } from 'sonner';
import { X } from 'lucide-react';

const App = () => {
  useEffect(() => {
    socket.on('hired', ({ gigTitle }) => {
      toast.success(`You were hired for ${gigTitle}`, {
        duration: Infinity,
        action: (
          <button onClick={() => toast.dismiss()} className="absolute right-2 top-2">
            <X className="size-4" />
          </button>
        )
      });
    });

    return () => {
      socket.off('hired');
    };
  }, []);

  return (
    <>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <Protected>
              <Home />
            </Protected>
          }
        />
        <Route
          path="/my-gigs"
          element={
            <Protected>
              <MyGigs />
            </Protected>
          }
        />
        <Route
          path="/create-gig"
          element={
            <Protected>
              <CreateGig />
            </Protected>
          }
        />
        <Route
          path="/my-bids"
          element={
            <Protected>
              <MyBids />
            </Protected>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Toaster />
    </>
  );
};

export default App;
