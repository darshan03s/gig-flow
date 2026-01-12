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

const GigItem = ({
  gig,
  showBid = true,
  allowBid = true
}: {
  gig: Gig;
  showBid?: boolean;
  allowBid?: boolean;
}) => {
  return (
    <Item className="border border-border">
      <ItemContent>
        <ItemTitle>{gig.title}</ItemTitle>
        <ItemDescription>{gig.description}</ItemDescription>
        <ItemDescription>Created By: {gig.ownerName}</ItemDescription>
      </ItemContent>
      <ItemActions title={allowBid ? 'Bid' : 'You cannot bid on your own gig'}>
        {showBid && <Button disabled={!allowBid}>Bid</Button>}
      </ItemActions>
      <ItemFooter>
        <div className="flex items-center gap-4">
          <span>Budget: ${gig.budget}</span>
          <span>Status: {gig.status}</span>
          <span>Bids: {gig.bidCount}</span>
        </div>
      </ItemFooter>
    </Item>
  );
};

export default GigItem;
