import { randomUUID } from "node:crypto";


type TransactionType = 'income' | 'expense';

export class Entity {
  id: string;
  createdAt: Date;
  updatedAt: Date | null;
  constructor(id?: string, createdAt?: Date, updatedAt?: Date | null) {
    this.id = id || randomUUID();
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || null;
  }
}

export class Category extends Entity {
  icon?: string | null;
  name: string;
  constructor(name: string, icon?: string | null, id?: string, createdAt?: Date, updatedAt?: Date | null) {
    super(id, createdAt, updatedAt);
    this.icon = icon;
    this.name = name;
  }
}

/**
  "ispb": "00000208",
  "name": "BRB - BCO DE BRASILIA S.A.",
  "code": 70,
  "fullName": "BRB - BANCO DE BRASILIA S.A."
 */
export class Bank extends Entity {
  ispb: string;
  name: string;
  code: string;
  fullName: string;

  constructor(ispb: string, name: string, code: string, fullName: string, id?: string, createdAt?: Date, updatedAt?: Date | null) {
    super(id, createdAt, updatedAt);
    this.ispb = ispb;
    this.name = name;
    this.code = code;
    this.fullName = fullName;
  }
}


export class Transaction extends Entity {
  description: string;
  type: 'expense' | 'income';
  amount: number;
  bank: Bank;
  category: Category;
  date: Date;

  constructor(description: string, type: TransactionType, amount: number, bank: Bank, category: Category, date: Date, id?: string, createdAt?: Date, updatedAt?: Date | null) {
    super(id, createdAt, updatedAt);
    this.description = description;
    this.type = type;
    this.amount = amount;
    this.bank = bank;
    this.category = category;
    this.date = date;
  }
}
