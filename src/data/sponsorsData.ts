export interface Sponsor {
  id: string;
  name: string;
  avatar: string;
  amount: number; // Used for value-based ranking sorting
  type: 'github' | 'razorpay' | 'upi';
  tier: 'Platinum' | 'Gold' | 'Silver';
  role?: string;
  link?: string;
}

export const INITIAL_SPONSORS: Sponsor[] = [
  { 
    id: '1', 
    name: 'Acme Enterprise', 
    avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=80&auto=format&fit=crop&q=60', 
    amount: 5000, 
    type: 'github', 
    tier: 'Platinum', 
    role: 'Infrastructure Sponsor', 
    link: 'https://github.com' 
  },
  { 
    id: '2', 
    name: 'Rajesh Kumar', 
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=60', 
    amount: 2500, 
    type: 'upi', 
    tier: 'Gold', 
    role: 'Core Contributor' 
  },
  { 
    id: '3', 
    name: 'DevOps Labs', 
    avatar: 'https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?w=80&auto=format&fit=crop&q=60', 
    amount: 1500, 
    type: 'razorpay', 
    tier: 'Gold', 
    role: 'Sustaining Member', 
    link: '#' 
  },
  { 
    id: '4', 
    name: 'Sarah Chen', 
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=80&auto=format&fit=crop&q=60', 
    amount: 500, 
    type: 'github', 
    tier: 'Silver' 
  },
];