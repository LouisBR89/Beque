import { FastifyInstance } from 'fastify';
import {
  createBankController,
  listBanksController,
  getBankController,
  updateBankController,
  deleteBankController
} from '../controllers/bank-controller.js';

export async function banksRoutes(fastify: FastifyInstance) {
  fastify.post('/banks', createBankController);
  fastify.get('/banks', listBanksController);
  fastify.get('/banks/:id', getBankController);
  fastify.patch('/banks/:id', updateBankController);
  fastify.delete('/banks/:id', deleteBankController);
}
