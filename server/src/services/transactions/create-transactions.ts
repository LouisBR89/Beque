import { TransactionInterfaceRepository, CreateTransactionDTO } from "../../repositories/transactions-interface-repository.js";

export class CreateTransactionService {
  private transactionRepository: TransactionInterfaceRepository;

  constructor(transactionRepository: TransactionInterfaceRepository) {
    this.transactionRepository = transactionRepository;
  }

  async execute(data: CreateTransactionDTO): Promise<any> {
    // Validação básica
    if (
      !data.amount ||
      !data.description ||
      !data.date ||
      !data.categoryId ||
      !data.ispb ||
      !data.type
    ) {
      throw new Error("Todos os campos obrigatórios devem ser preenchidos");
    }

    // Aqui você pode adicionar validações extras, como valores negativos, tipos, etc.

    const newTransaction = await this.transactionRepository.create(data);
    return newTransaction;
  }
}