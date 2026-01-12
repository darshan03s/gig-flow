export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

export type GigStatus = 'open' | 'assigned';
export type BidStatus = 'pending' | 'hired' | 'rejected';

export interface Gig {
  _id: string;
  title: string;
  description: string;
  budget: number;
  status: GigStatus;
  ownerId: string;
  ownerName: string;
  bidCount: number;
}

export interface Bid {
  _id: string;
  gigId: {
    _id: string;
    title: string;
  };
  freelancerId: {
    _id: string;
    name: string;
  };
  message: string;
  price: number;
  status: BidStatus;
}
