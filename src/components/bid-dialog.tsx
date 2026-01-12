import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Button } from './ui/button';
import { useState } from 'react';
import { toast } from 'sonner';

interface BidDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  gigTitle: string;
  gigId: string;
  onBid?: () => void;
}

const BidDialog = ({ open, onOpenChange, gigTitle, gigId, onBid }: BidDialogProps) => {
  const [message, setMessage] = useState('');

  async function bidForGig() {
    const API_URL = import.meta.env.VITE_API_URL;
    try {
      const res = await fetch(`${API_URL}/api/bids/${gigId}`, {
        credentials: 'include',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message
        })
      });
      if (!res.ok) {
        toast.error('Failed to bid for this gig');
        return;
      }

      if (res.status === 201) {
        toast.success('Bid submitted successfully');
        onBid?.();
        onOpenChange(false);
      }
    } catch (error) {
      toast.error('Failed to bid for this gig');
      console.error(error);
    }
  }

  const handleSubmit = () => {
    if (!message) return;
    bidForGig();
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Bid for this gig</DialogTitle>
          <DialogDescription className="flex flex-col gap-2">
            <p className="line-clamp-1 text-foreground!">Title: {gigTitle}</p>
            <span>Enter your skills and how you can help.</span>
          </DialogDescription>
        </DialogHeader>
        <div>
          <textarea
            className="h-40 w-full resize-none rounded-md border border-border p-2"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={handleSubmit} type="submit">
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BidDialog;
