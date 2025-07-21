
import { IBankRepository } from "../../repositories/bank-interface-repository.js";
import { AppError } from "../../common/AppError.js";

export class UpdateBankService {
  constructor(private bankRepository: IBankRepository) {}

  async execute(id: string, code: number, name: string, fullName: string) {
    const bank = await this.bankRepository.findById(id);
    if (!bank) {
      throw new AppError('Bank not found', 404);
    }
    bank.code = code ?? bank.code;
    bank.name = name ?? bank.name;
    bank.fullName = fullName ?? bank.fullName;
    return await this.bankRepository.update(bank);
  }
}
