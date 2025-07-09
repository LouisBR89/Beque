'use server';
import { TransactionResponse } from "./types/transactions";

export async function getTransactions() {
  const response = await fetch("http://localhost:3333/transactions?_page=2&_per_page=10")
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await response.json() as TransactionResponse;
  return data;
}
