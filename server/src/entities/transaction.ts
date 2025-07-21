
import { randomUUID } from "node:crypto";

export type TransactionType = 'income' | 'expense';

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
  icon: string | null;
  name: string;

  constructor(name: string, icon?: string | null, id?: string, createdAt?: Date, updatedAt?: Date | null) {
    super(id, createdAt, updatedAt);
    this.icon = icon ?? null;
    this.name = name;
  }
}

export class Bank extends Entity {
  code: number;
  name: string;
  fullName: string;

  constructor(code: number, name: string, fullName: string, id?: string, createdAt?: Date, updatedAt?: Date | null) {
    super(id, createdAt, updatedAt);
    this.code = code;
    this.name = name;
    this.fullName = fullName;
  }
}

export class Transaction extends Entity {
  description: string;
  type: TransactionType;
  amount: number;
  bankId: string | null;
  categoryId: string;
  date: Date;

  constructor(
    description: string,
    type: TransactionType,
    amount: number,
    categoryId: string,
    date: Date,
    bankId?: string | null,
    id?: string,
    createdAt?: Date,
    updatedAt?: Date | null
  ) {
    super(id, createdAt, updatedAt);
    this.description = description;
    this.type = type;
    this.amount = amount;
    this.categoryId = categoryId;
    this.bankId = bankId ?? null;
    this.date = date;
  }
}
