
import { Bank } from "../entities/transaction.js";

export type CreateBankDTO = {
  code: number;
  name: string;
  fullName: string;
}

export interface IBankRepository {
  findById(id: string): Promise<Bank | null>;
  findAll(): Promise<Bank[]>;
  create(data: CreateBankDTO): Promise<Bank>;
  update(bank: Bank): Promise<Bank>;
  delete(id: string): Promise<void>;
}
