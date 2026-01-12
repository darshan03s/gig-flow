import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Header from './components/header';
import Gigs from './pages/Gigs';

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gigs" element={<Gigs />} />
      </Routes>
    </>
  );
};

export default App;
