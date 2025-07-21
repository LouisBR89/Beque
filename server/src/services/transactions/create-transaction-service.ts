
import { ITransactionRepository, CreateTransactionDTO } from "../../repositories/transaction-interface-repository.js";

export class CreateTransactionService {
  constructor(private transactionRepository: ITransactionRepository) {}

  async execute(data: CreateTransactionDTO) {
    return await this.transactionRepository.create(data);
  }
}
