
import { ITransactionRepository } from "../../repositories/transaction-interface-repository.js";

export class ListTransactionsService {
  constructor(private transactionRepository: ITransactionRepository) {}

  async execute() {
    return await this.transactionRepository.findAll();
  }
}
