import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { toast } from 'sonner';

const CreateGig = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [budget, setBudget] = useState<number>();

  async function handleCreateGig() {
    if (!title || !description || !budget) {
      toast.error('All fields are required');
      return;
    }

    if (!Number.isInteger(budget)) {
      toast.error('Budget must be an integer');
      return;
    }

    const API_URL = import.meta.env.VITE_API_URL;

    try {
      const response = await fetch(`${API_URL}/api/gigs`, {
        credentials: 'include',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, description, budget })
      });

      if (!response.ok) {
        toast.error('Failed to create gig');
        return;
      }

      const data = await response.json();

      if (data.message) {
        toast.info(data.message);
      }
    } catch (error) {
      toast.error('Failed to create gig');
      console.log(error);
    }
  }

  return (
    <main className="h-[calc(100vh-40px)] flex items-center justify-center">
      <div className="w-full max-w-md flex flex-col gap-4">
        <h1 className="text-2xl font-bold text-center">Create a Gig</h1>
        <div className="create-gig-inputs space-y-4">
          <Input
            placeholder="Title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Description"
            className="h-20 w-full p-2 border rounded-md"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Input
            placeholder="Budget"
            type="number"
            value={budget}
            onChange={(e) => setBudget(Number(e.target.value))}
          />
        </div>
        <Button className="w-full" onClick={handleCreateGig}>
          Create Gig
        </Button>
      </div>
    </main>
  );
};

export default CreateGig;
