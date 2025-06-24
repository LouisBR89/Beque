import Fastify from 'fastify'
import { Category } from './entities/transaction.js'
import { CategoryRepositoryInMemory } from './repositories/category-repository-in-memory.js'
import { CreateCategoryService } from './services/categories/create-category-service.js'
import { BankRepositoryInMemory } from './repositories/banks-repository-in-memory.js'
import { CreateBankService } from './services/banks/create-banks.js'
import { TransactionRepositoryInMemory } from './repositories/transactions-repository-in-memory.js'
import { CreateTransactionService } from './services/transactions/create-transactions.js'
import { banksRoutes } from './routes/banks-routes.js';
import { transactionsRoutes } from './routes/transactions-routes.js';
import { categoriesRoutes } from './routes/categories-route.js';

const fastify = Fastify({
  logger: true
})

const versionApi = "v1"


const categoryRepository = new CategoryRepositoryInMemory();
const createCategoryService = new CreateCategoryService(categoryRepository);

const bankRepository = new BankRepositoryInMemory();
const createBankService = new CreateBankService(bankRepository);

const transactionRepository = new TransactionRepositoryInMemory();

// Compartilhe as listas!
transactionRepository.categories = categoryRepository.categories;
transactionRepository.banks = bankRepository.banks;

const createTransactionService = new CreateTransactionService(transactionRepository);



// categories
await fastify.register(categoriesRoutes, { categoryRepository });



// banks
await fastify.register(banksRoutes, { bankRepository });

// transactions
await fastify.register(transactionsRoutes, { transactionRepository });

await fastify.listen({ port: 3000, host: '0.0.0.0' });
console.log('🚀 Server rodando em http://localhost:3000');

