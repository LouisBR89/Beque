import { FastifyInstance } from 'fastify';
import {
  createTransactionController,
  listTransactionsController,
  getTransactionController,
  updateTransactionController,
  deleteTransactionController
} from '../controllers/transaction-controller.js';

export async function transactionsRoutes(fastify: FastifyInstance) {
  fastify.post('/transactions', createTransactionController);
  fastify.get('/transactions', listTransactionsController);
  fastify.get('/transactions/:id', getTransactionController);
  fastify.patch('/transactions/:id', updateTransactionController);
  fastify.delete('/transactions/:id', deleteTransactionController);
}
