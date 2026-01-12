import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="h-10 px-4 flex items-center justify-between border-b">
      <Link to={'/'} className="app-name font-bold">
        GigFlow
      </Link>
    </header>
  );
};

export default Header;
