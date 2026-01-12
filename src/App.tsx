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
