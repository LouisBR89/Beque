
import { ITransactionRepository } from "../../repositories/transaction-interface-repository.js";
import { AppError } from "../../common/AppError.js";

export class GetTransactionService {
  constructor(private transactionRepository: ITransactionRepository) {}

  async execute(id: string) {
    const transaction = await this.transactionRepository.findById(id);
    if (!transaction) {
      throw new AppError('Transaction not found', 404);
    }
    return transaction;
  }
}
