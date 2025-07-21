
import { prisma } from "../database/prisma.js";
import { Bank } from "../entities/transaction.js";
import { IBankRepository, CreateBankDTO } from "./bank-interface-repository.js";

export class BankRepositoryPrisma implements IBankRepository {

  async findById(id: string): Promise<Bank | null> {
    return await prisma.bank.findUnique({ where: { id } });
  }

  async findAll(): Promise<Bank[]> {
    return await prisma.bank.findMany();
  }

  async create(data: CreateBankDTO): Promise<Bank> {
    const bank = await prisma.bank.create({
      data: {
        name: data.name,
        code: data.code,
        fullName: data.fullName,
      }
    });
    return bank;
  }

  async update(bank: Bank): Promise<Bank> {
    const updatedBank = await prisma.bank.update({
      where: { id: bank.id },
      data: {
        name: bank.name,
        code: bank.code,
        fullName: bank.fullName,
        updatedAt: new Date()
      }
    });
    return updatedBank;
  }

  async delete(id: string): Promise<void> {
    await prisma.bank.delete({ where: { id } });
  }
}
