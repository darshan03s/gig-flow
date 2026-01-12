import { Link } from 'react-router-dom';
import { useUser } from '@/contexts/user/useUser';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  async function logout() {
    const API_URL = import.meta.env.VITE_API_URL;
    try {
      const res = await fetch(`${API_URL}/api/auth/logout`, {
        credentials: 'include'
      });
      const data = await res.json();
      if (data.message) {
        toast.info(data.message);
      }
      if (data.error) {
        toast.error(data.error);
      }
      if (res.status === 200) {
        navigate('/login');
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <header className="h-10 px-4 flex items-center justify-between border-b">
      <Link to={'/'} className="app-name font-bold">
        GigFlow
      </Link>
      {user && (
        <DropdownMenu>
          <DropdownMenuTrigger className="border-none outline-none rounded-full size-7 bg-primary text-primary-foreground">
            {user?.name.at(0)}
          </DropdownMenuTrigger>
          <DropdownMenuContent className="relative right-4">
            <DropdownMenuLabel>
              <div className="flex flex-col">
                <span>{user?.name}</span>
                <span className="text-xs text-muted-foreground">{user?.email}</span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">
              <Link className="w-full" to={'/my-gigs'}>
                My Gigs
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <Link className="w-full" to={'/create-gig'}>
                Create Gig
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <Link className="w-full" to={'/my-bids'}>
                My Bids
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer hover:bg-red-200!" onClick={logout}>
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </header>
  );
};

export default Header;
