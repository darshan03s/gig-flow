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
import { Input } from './ui/input';

interface BidDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  gigTitle: string;
  gigId: string;
  budget: number;
  onBid?: () => void;
}

const BidDialog = ({ open, onOpenChange, gigTitle, gigId, budget, onBid }: BidDialogProps) => {
  const [message, setMessage] = useState('');
  const [price, setPrice] = useState(budget);

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
          message,
          price
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
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-2">
          <textarea
            className="h-40 w-full resize-none rounded-md border border-border p-2"
            placeholder="Tell the client about your skills and how you can help."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
          <label htmlFor="price" className="text-sm text-muted-foreground">
            Price
          </label>
          <Input
            id="price"
            className="w-full"
            type="number"
            placeholder="Enter your bid amount"
            max={budget}
            min={10}
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
          />
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
