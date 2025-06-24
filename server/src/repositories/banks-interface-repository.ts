import { Bank } from "../entities/transaction.js";

export type CreateBankDTO = {
  ispb: string;
  name: string;
  code: string;
  fullName: string;
  icon?: string | null;
}

export interface BankInterfaceRepository {
  findById(id: string): Promise<Bank | null>;
  findByName(name: string): Promise<Bank | null>;
  findAll(): Promise<Bank[]>;
  create(bank: CreateBankDTO): Promise<Bank>;
  update(bank: Bank): Promise<Bank>;
  delete(id: string): Promise<void>;
}