export interface Transaction {
  id: string,
  description: string,
  type: "expense" | "income",
  amount: number,
  bank: string,
  category: {
    icon: string,
    name: string,
  },
  date: string
}

export interface TransactionResponse {
  first: number,
  prev: number,
  next: number,
  last: number,
  pages: number,
  items: number,
  currentPage: number,
  perPage: number,
  data: Transaction[]
}
