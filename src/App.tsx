import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Header from './components/header';
import Gigs from './pages/Gigs';
import { Toaster } from './components/ui/sonner';
import Login from './pages/Login';
import Protected from './components/protected';
import Register from './pages/Register';

const App = () => {
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
          path="/gigs"
          element={
            <Protected>
              <Gigs />
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
