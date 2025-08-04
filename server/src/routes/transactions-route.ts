import { Router } from 'express';
import { TransactionController } from '../controllers/TransactionController.ts';
import { TransactionService } from '../services/TransactionService.ts';
import { TransactionRepository } from '../repositories/TransactionRepository.ts';

const transactionsRouter = Router();
const transactionRepository = new TransactionRepository();
const transactionService = new TransactionService(transactionRepository);
const transactionController = new TransactionController(transactionService);

transactionsRouter.post('/', (req, res) => transactionController.create(req, res));
transactionsRouter.get('/', (req, res) => transactionController.findAll(req, res));
transactionsRouter.get('/:id', (req, res) => transactionController.findById(req, res));
transactionsRouter.patch('/:id', (req, res) => transactionController.update(req, res));
transactionsRouter.delete('/:id', (req, res) => transactionController.delete(req, res));

export { transactionsRouter };
