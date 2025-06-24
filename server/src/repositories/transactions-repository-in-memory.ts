import { Transaction } from "../entities/transaction.js";
import { TransactionInterfaceRepository, CreateTransactionDTO } from "./transactions-interface-repository.js";
import { Category } from "../entities/transaction.js";
import { Bank } from "../entities/transaction.js"; // Certifique-se de que o caminho está correto
import { CategoryRepositoryInMemory } from "./category-repository-in-memory.js";

export class TransactionRepositoryInMemory implements TransactionInterfaceRepository {
  transactions: Transaction[] = [];

  // Supondo que você tenha essas listas disponíveis no repositório:
  categories: Category[] = []; // Use a instância de CategoryRepositoryInMemory para acessar as categorias
  banks: Bank[] = [];

  async findById(id: string): Promise<Transaction | null> {
    const transaction = this.transactions.find(transaction => transaction.id === id);
    return transaction || null;
  }

  async findAll(): Promise<Transaction[]> {
    return this.transactions;
  }

  async findByCategory(categoryId: string): Promise<Transaction[]> {
    return this.transactions.filter(transaction => transaction.category.id === categoryId);
  }

  async create(transaction: CreateTransactionDTO): Promise<Transaction> {
    const category = this.categories.find(cat => cat.id === transaction.categoryId);
    if (!category) throw new Error("Categoria não encontrada");

    // Buscar banco pelo ispb
    const bank = this.banks.find(bk => bk.ispb === transaction.ispb);
    if (!bank) throw new Error("Banco não encontrado");

    const newTransaction = new Transaction(
      transaction.description,
      transaction.type,
      transaction.amount,
      bank,
      category,
      transaction.date
    );
    this.transactions.push(newTransaction);
    return newTransaction;
  }

  async update(transaction: Transaction): Promise<Transaction> {
    const index = this.transactions.findIndex(t => t.id === transaction.id);
    if (index === -1) throw new Error("Transação não encontrada");
    this.transactions[index] = transaction;
    return transaction;
  }

  async delete(id: string): Promise<void> {
    const index = this.transactions.findIndex(t => t.id === id);
    if (index === -1) throw new Error("Transação não encontrada");
    this.transactions.splice(index, 1);
  }
}