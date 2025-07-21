
import { Transaction } from "../entities/transaction.js";

export type CreateTransactionDTO = {
  description: string;
  type: 'income' | 'expense';
  amount: number;
  categoryId: string;
  date: Date;
  bankId?: string | null;
}

export interface ITransactionRepository {
  findById(id: string): Promise<Transaction | null>;
  findAll(): Promise<Transaction[]>;
  create(data: CreateTransactionDTO): Promise<Transaction>;
  update(transaction: Transaction): Promise<Transaction>;
  delete(id: string): Promise<void>;
}
