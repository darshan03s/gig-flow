import GigItem from '@/components/gig-item';
import { useUser } from '@/contexts/user/useUser';
import type { Bid, Gig } from '@/types';
import { useEffect, useState } from 'react';

const Home = () => {
  const [gigs, setGigs] = useState<Gig[]>([]);
  const [myBids, setMyBids] = useState<Bid[]>([]);
  const { user } = useUser();

  useEffect(() => {
    const fetchGigs = async (): Promise<void> => {
      try {
        const API_URL = import.meta.env.VITE_API_URL as string;
        const response = await fetch(`${API_URL}/api/gigs`, {
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

  return (
    <main>
      <div className="max-w-3xl mx-auto py-4">
        <h1 className="text-2xl font-bold mb-4">All gigs</h1>
        <div className="space-y-4">
          {gigs.map((gig) => (
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
