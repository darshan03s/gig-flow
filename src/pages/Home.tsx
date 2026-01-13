import GigItem from '@/components/gig-item';
import { Input } from '@/components/ui/input';
import { useUser } from '@/contexts/user/useUser';
import type { Bid, Gig } from '@/types';
import { useEffect, useState } from 'react';

const Home = () => {
  const [gigs, setGigs] = useState<Gig[]>([]);
  const [myBids, setMyBids] = useState<Bid[]>([]);
  const [search, setSearch] = useState('');
  const { user } = useUser();

  const fetchGigs = async (search?: string): Promise<void> => {
    try {
      const API_URL = import.meta.env.VITE_API_URL as string;
      const response = await fetch(`${API_URL}/api/gigs${search ? `?search=${search}` : ''}`, {
        credentials: 'include',
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const data: { gigs: Gig[] } = await response.json();
      setGigs(data.gigs);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchGigs();
  }, []);

  const fetchMyBids = async (): Promise<void> => {
    try {
      const API_URL = import.meta.env.VITE_API_URL as string;
      const response = await fetch(`${API_URL}/api/bids`, {
        credentials: 'include',
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const data: { bids: Bid[] } = await response.json();
      setMyBids(data.bids);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMyBids();
  }, []);

  function onBid() {
    fetchMyBids();
  }

  function handleSearchInput(value: string) {
    setSearch(value);
    if (value === '') {
      fetchGigs();
    }
  }

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchGigs(search);
  };

  return (
    <main>
      <div className="sm:max-w-2xl md:max-w-3xl mx-auto py-4 space-y-4">
        <div>
          <form onSubmit={handleSearch}>
            <Input
              type="search"
              placeholder="Search gigs"
              value={search}
              onChange={(e) => handleSearchInput(e.target.value)}
            />
          </form>
        </div>
        <h1 className="text-2xl font-bold">All gigs</h1>
        <div className="space-y-4">
          {gigs.map((gig: Gig) => (
            <GigItem
              key={gig._id}
              gig={gig}
              allowBid={user?.id !== gig.ownerId}
              applied={myBids.map((bid) => bid.gigId._id).includes(gig._id)}
              onBid={onBid}
            />
          ))}
        </div>
      </div>
    </main>
  );
};

export default Home;
