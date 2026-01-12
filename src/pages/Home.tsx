import GigItem from '@/components/gig-item';
import type { Gig } from '@/types';
import { useEffect, useState } from 'react';

const Home = () => {
  const [gigs, setGigs] = useState<Gig[]>([]);

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

  return (
    <main>
      <div className="max-w-3xl mx-auto py-4">
        <h1 className="text-2xl font-bold mb-4">All gigs</h1>
        <div className="space-y-4">
          {gigs.map((gig) => (
            <GigItem key={gig._id} gig={gig} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default Home;
