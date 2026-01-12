import BidItem from '@/components/bid-item';
import type { Bid } from '@/types';
import { useEffect, useState } from 'react';

const MyBids = () => {
  const [bids, setBids] = useState<Bid[]>([]);

  useEffect(() => {
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
        setBids(data.bids);
      } catch (error) {
        console.log(error);
      }
    };

    fetchMyBids();
  }, []);

  return (
    <main>
      <div className="max-w-3xl mx-auto py-4">
        <h1 className="text-2xl font-bold mb-4">My bids</h1>
        <div className="space-y-4">
          {bids.map((bid) => (
            <BidItem
              key={bid._id}
              bid={bid}
              showBy={false}
              showGigName={true}
              showHire={false}
              showStatus={true}
            />
          ))}
        </div>
      </div>
    </main>
  );
};

export default MyBids;
