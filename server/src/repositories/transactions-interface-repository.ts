import { Transaction } from "../entities/transaction.js";

export type CreateTransactionDTO = {
  amount: number;
  description: string;
  date: Date;
  categoryId: string;
  ispb: string; // Adicione esta linha
  type: "income" | "expense";
}

export interface TransactionInterfaceRepository {
  findById(id: string): Promise<Transaction | null>;
  findAll(): Promise<Transaction[]>;
  findByCategory(categoryId: string): Promise<Transaction[]>;
  create(transaction: CreateTransactionDTO): Promise<Transaction>;
  update(transaction: Transaction): Promise<Transaction>;
  delete(id: string): Promise<void>;
}