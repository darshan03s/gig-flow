import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemTitle
} from '@/components/ui/item';
import type { Gig } from '@/types';
import { Button } from './ui/button';
import { useState } from 'react';
import BidDialog from './bid-dialog';
import AllBidsDialog from './all-bids-dialog';

const GigItem = ({
  gig,
  showBid = true,
  allowBid = true,
  showAllBids = false,
  applied = false,
  onBid
}: {
  gig: Gig;
  showBid?: boolean;
  allowBid?: boolean;
  showAllBids?: boolean;
  applied?: boolean;
  onBid?: () => void;
}) => {
  const [showBidDialog, setShowBidDialog] = useState(false);
  const [showAllBidsDialog, setShowAllBidsDialog] = useState(false);

  function handleBid() {
    setShowBidDialog(true);
  }

  function handleShowBids() {
    setShowAllBidsDialog(true);
  }

  return (
    <Item className="border border-border">
      <ItemContent>
        <ItemTitle>{gig.title}</ItemTitle>
        <ItemDescription>{gig.description}</ItemDescription>
        <ItemDescription>Created By: {gig.ownerName}</ItemDescription>
      </ItemContent>
      <ItemActions title={allowBid ? 'Bid' : 'You cannot bid on your own gig'}>
        {showBid && (
          <Button disabled={!allowBid || applied} onClick={handleBid}>
            {applied ? 'Applied' : 'Bid'}
          </Button>
        )}
        {showAllBids && <Button onClick={handleShowBids}>Show Bids</Button>}
      </ItemActions>
      <ItemFooter>
        <div className="flex items-center gap-4">
          <span>Budget: ${gig.budget}</span>
          <span>Status: {gig.status}</span>
          <span>Bids: {gig.bidCount}</span>
        </div>
      </ItemFooter>
      <BidDialog
        open={showBidDialog}
        onOpenChange={setShowBidDialog}
        gigTitle={gig.title}
        gigId={gig._id}
        onBid={onBid}
      />
      <AllBidsDialog
        open={showAllBidsDialog}
        onOpenChange={setShowAllBidsDialog}
        gigTitle={gig.title}
        gigId={gig._id}
      />
    </Item>
  );
};

export default GigItem;
