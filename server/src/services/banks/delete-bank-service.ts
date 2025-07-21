
import { IBankRepository } from "../../repositories/bank-interface-repository.js";
import { AppError } from "../../common/AppError.js";

export class DeleteBankService {
  constructor(private bankRepository: IBankRepository) {}

  async execute(id: string) {
    const bank = await this.bankRepository.findById(id);
    if (!bank) {
      throw new AppError('Bank not found', 404);
    }
    await this.bankRepository.delete(id);
  }
}
