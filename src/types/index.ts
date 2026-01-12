export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

export interface Gig {
  _id: string;
  title: string;
  description: string;
  budget: number;
  status: string;
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
  status: string;
}
