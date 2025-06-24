import { BankInterfaceRepository, CreateBankDTO } from "../../repositories/banks-interface-repository.js";

export class CreateBankService {
  private bankRepository: BankInterfaceRepository;

  constructor(bankRepository: BankInterfaceRepository) {
    this.bankRepository = bankRepository;
  }

  async execute(data: CreateBankDTO): Promise<any> {
    // Validação básica
    if (
      !data.ispb ||
      !data.name ||
      !data.code ||
      !data.fullName
    ) {
      throw new Error("Todos os campos obrigatórios devem ser preenchidos");
    }

    // Aqui você pode adicionar validações extras, como checar duplicidade de ispb ou nome

        const newBank = await this.bankRepository.create(data);
        return newBank;
      }
    }