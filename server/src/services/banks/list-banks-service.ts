
import { IBankRepository } from "../../repositories/bank-interface-repository.js";

export class ListBanksService {
  constructor(private bankRepository: IBankRepository) {}

  async execute() {
    return await this.bankRepository.findAll();
  }
}
