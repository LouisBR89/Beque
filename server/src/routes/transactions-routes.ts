import { FastifyInstance } from "fastify";
import { CreateTransactionService } from "../services/transactions/create-transactions.js";

export async function transactionsRoutes(fastify: FastifyInstance, opts: any) {
  const transactionRepository = opts.transactionRepository;
  const createTransactionService = new CreateTransactionService(transactionRepository);

  fastify.post('/transactions', async (request, reply) => {
    const data = request.body as any;
    const transaction = await createTransactionService.execute(data);
    return reply.send(transaction);
  });

  fastify.get('/transactions', async (request, reply) => {
    const transactions = await transactionRepository.findAll();
    return reply.send(transactions);
  });

  fastify.get('/transactions/:id', async (request, reply) => {
    const { id } = request.params as { id: string };
    const transaction = await transactionRepository.findById(id);
    if (!transaction) return reply.status(404).send({ error: 'Transaction not found' });
    return reply.send(transaction);
  });

  fastify.patch('/transactions/:id', async (request, reply) => {
    const { id } = request.params as { id: string };
    const { description, amount, date, categoryId, ispb, type } = request.body as any;
    const transaction = await transactionRepository.findById(id);
    if (!transaction) return reply.status(404).send({ error: 'Transaction not found' });

    if (description) transaction.description = description;
    if (amount) transaction.amount = amount;
    if (date) transaction.date = new Date(date);
    if (categoryId) transaction.category.id = categoryId;
    if (ispb) transaction.bank.ispb = ispb;
    if (type) transaction.type = type;

    await transactionRepository.update(transaction);
    return reply.send(transaction);
  });

  fastify.delete('/transactions/:id', async (request, reply) => {
    const { id } = request.params as { id: string };
    await transactionRepository.delete(id);
    return reply.status(204).send();
  });
}