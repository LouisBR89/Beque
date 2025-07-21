
import { IBankRepository, CreateBankDTO } from "../../repositories/bank-interface-repository.js";

export class CreateBankService {
  constructor(private bankRepository: IBankRepository) {}

  async execute(data: CreateBankDTO) {
    return await this.bankRepository.create(data);
  }
}
