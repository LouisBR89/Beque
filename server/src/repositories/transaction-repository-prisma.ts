
import { prisma } from "../database/prisma.js";
import { Transaction } from "../entities/transaction.js";
import { ITransactionRepository, CreateTransactionDTO } from "./transaction-interface-repository.js";

export class TransactionRepositoryPrisma implements ITransactionRepository {

  async findById(id: string): Promise<Transaction | null> {
    return await prisma.transaction.findUnique({ where: { id } });
  }

  async findAll(): Promise<Transaction[]> {
    return await prisma.transaction.findMany({
      include: {
        category: true,
        bank: true
      }
    });
  }

  async create(data: CreateTransactionDTO): Promise<Transaction> {
    const transaction = await prisma.transaction.create({
      data: {
        description: data.description,
        type: data.type,
        amount: data.amount,
        categoryId: data.categoryId,
        date: data.date,
        bankId: data.bankId ?? undefined
      }
    });
    return transaction;
  }

  async update(transaction: Transaction): Promise<Transaction> {
    const updated = await prisma.transaction.update({
      where: { id: transaction.id },
      data: {
        description: transaction.description,
        type: transaction.type,
        amount: transaction.amount,
        categoryId: transaction.categoryId,
        bankId: transaction.bankId ?? undefined,
        date: transaction.date,
        updatedAt: new Date()
      }
    });
    return updated;
  }

  async delete(id: string): Promise<void> {
    await prisma.transaction.delete({ where: { id } });
  }
}
