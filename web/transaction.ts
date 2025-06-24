// Representa uma categoria de transação
export interface Category {
  id?: number; // id é opcional pois nas transações não aparece, mas na lista de categorias sim
  icon: string;
  name: string;
}

// Representa um banco
export interface Bank {
  id: number;
  name: string;
  icon: string;
}

// Representa uma transação financeira
export interface Transaction {
  id: string;
  description: string;
  type: 'expense' | 'income';
  amount: number;
  bank: string; // nome do banco
  category: Category; // objeto com icon e name
  date: string; // ISO date string
}
