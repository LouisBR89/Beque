
import { FastifyInstance } from "fastify";
import {
  createTransactionController,
  listTransactionsController,
  getTransactionController,
  updateTransactionController,
  deleteTransactionController
} from "../controllers/transaction-controller.js";

export default async function (app: FastifyInstance) {
  app.post('/transactions', createTransactionController);
  app.get('/transactions', listTransactionsController);
  app.get('/transactions/:id', getTransactionController);
  app.patch('/transactions/:id', updateTransactionController);
  app.delete('/transactions/:id', deleteTransactionController);
}
