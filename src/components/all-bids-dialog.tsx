import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import type { Bid } from '@/types';
import BidItem from './bid-item';

interface AllBidsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  gigTitle: string;
  gigId: string;
}

const AllBidsDialog = ({ open, onOpenChange, gigTitle, gigId }: AllBidsDialogProps) => {
  const [bids, setBids] = useState<Bid[]>([]);

  useEffect(() => {
    if (!open) return;
    async function fetchBids() {
      try {
        const API_URL = import.meta.env.VITE_API_URL as string;
        const response = await fetch(`${API_URL}/api/bids/${gigId}`, {
          credentials: 'include',
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        const data: { bids: Bid[] } = await response.json();
        setBids(data.bids);
      } catch (error) {
        toast.error('Failed to fetch bids');
        console.error(error);
      }
    }
    fetchBids();
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="h-140 flex flex-col">
        <DialogHeader>
          <DialogTitle>All bids for this gig</DialogTitle>
          <DialogDescription className="flex flex-col gap-2">
            <p className="line-clamp-1">{gigTitle}</p>
            <span>See all bids for this gig to hire the best bidder</span>
          </DialogDescription>
        </DialogHeader>
        <div className="flex-1">
          {bids.map((bid) => (
            <BidItem key={bid._id} bid={bid} />
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AllBidsDialog;
