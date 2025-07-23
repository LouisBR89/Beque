export interface Category {
  id?: number; 
  icon: string;
  name: string;
}


export interface Bank {
  id: number;
  name: string;
  icon: string;
}


export interface Transaction {
  id: string;
  description: string;
  type: 'expense' | 'income';
  amount: number;
  bank: string; 
  category: Category; 
  date: string; 
}
