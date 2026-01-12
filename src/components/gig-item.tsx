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

const GigItem = ({ gig, showBid = true }: { gig: Gig; showBid?: boolean }) => {
  return (
    <Item className="border border-border">
      <ItemContent>
        <ItemTitle>{gig.title}</ItemTitle>
        <ItemDescription>{gig.description}</ItemDescription>
      </ItemContent>
      <ItemActions>{showBid && <Button>Bid</Button>}</ItemActions>
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
