import type { Bid, GigStatus } from '@/types';
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemTitle
} from '@/components/ui/item';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { toast } from 'sonner';

const BidItem = ({
  bid,
  showBy = true,
  showGigName = true,
  showHire = true,
  showStatus = false,
  onHire,
  gigStatus
}: {
  bid: Bid;
  showBy?: boolean;
  showGigName?: boolean;
  showHire?: boolean;
  showStatus?: boolean;
  onHire?: () => void;
  gigStatus?: GigStatus;
}) => {
  async function handleHire() {
    try {
      const API_URL = import.meta.env.VITE_API_URL as string;
      const res = await fetch(`${API_URL}/api/bids/${bid._id}/hire`, {
        credentials: 'include',
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await res.json();
      if (data.message) {
        toast.info(data.message);
      }
      if (data.error) {
        toast.error(data.error);
      }
      onHire?.();
    } catch (error) {
      toast.error('Failed to hire bid');
      console.error(error);
    }
  }

  return (
    <Item className="border border-border">
      <ItemContent>
        {showBy && <ItemTitle className="line-clamp-1">By: {bid.freelancerId.name}</ItemTitle>}
        {showGigName && <ItemTitle className="line-clamp-1">{bid.gigId.title}</ItemTitle>}
        <ItemDescription>{bid.message}</ItemDescription>
      </ItemContent>
      {showHire && (
        <ItemActions title="Hire">
          <Button onClick={handleHire} disabled={gigStatus !== 'open'}>
            Hire
          </Button>
        </ItemActions>
      )}
      {showStatus && (
        <ItemActions title="Status">
          <Badge>{bid.status}</Badge>
        </ItemActions>
      )}
      <ItemFooter>
        <Badge>Price: ${bid.price}</Badge>
      </ItemFooter>
    </Item>
  );
};

export default BidItem;
