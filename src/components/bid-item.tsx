import type { Bid } from '@/types';
import { Item, ItemActions, ItemContent, ItemDescription, ItemTitle } from '@/components/ui/item';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

const BidItem = ({
  bid,
  showBy = true,
  showGigName = true,
  showHire = true,
  showStatus = false
}: {
  bid: Bid;
  showBy?: boolean;
  showGigName?: boolean;
  showHire?: boolean;
  showStatus?: boolean;
}) => {
  return (
    <Item className="border border-border">
      <ItemContent>
        {showBy && <ItemTitle className="line-clamp-1">By: {bid.freelancerId.name}</ItemTitle>}
        {showGigName && <ItemTitle className="line-clamp-1">{bid.gigId.title}</ItemTitle>}
        <ItemDescription>{bid.message}</ItemDescription>
      </ItemContent>
      {showHire && (
        <ItemActions title="Hire">
          <Button>Hire</Button>
        </ItemActions>
      )}
      {showStatus && (
        <ItemActions title="Status">
          <Badge>{bid.status}</Badge>
        </ItemActions>
      )}
    </Item>
  );
};

export default BidItem;
