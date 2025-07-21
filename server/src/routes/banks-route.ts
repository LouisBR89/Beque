
import { FastifyInstance } from "fastify";
import {
  createBankController,
  listBanksController,
  getBankController,
  updateBankController,
  deleteBankController
} from "../controllers/bank-controller.js";

export default async function (app: FastifyInstance) {
  app.post('/banks', createBankController);
  app.get('/banks', listBanksController);
  app.get('/banks/:id', getBankController);
  app.patch('/banks/:id', updateBankController);
  app.delete('/banks/:id', deleteBankController);
}
