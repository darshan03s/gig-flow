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
  bidCount: number;
}
