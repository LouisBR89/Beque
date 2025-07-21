
import { ITransactionRepository } from "../../repositories/transaction-interface-repository.js";
import { AppError } from "../../common/AppError.js";
import { TransactionType } from "../../entities/transaction.js";

export class UpdateTransactionService {
  constructor(private transactionRepository: ITransactionRepository) {}

  async execute(
    id: string,
    description: string,
    type: TransactionType,
    amount: number,
    categoryId: string,
    date: Date,
    bankId?: string | null
  ) {
    const transaction = await this.transactionRepository.findById(id);
    if (!transaction) {
      throw new AppError('Transaction not found', 404);
    }
    transaction.description = description ?? transaction.description;
    transaction.type = type ?? transaction.type;
    transaction.amount = amount ?? transaction.amount;
    transaction.categoryId = categoryId ?? transaction.categoryId;
    transaction.date = date ?? transaction.date;
    transaction.bankId = bankId ?? transaction.bankId;
    return await this.transactionRepository.update(transaction);
  }
}
