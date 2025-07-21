
import { FastifyReply, FastifyRequest } from "fastify";
import { TransactionRepositoryPrisma } from "../repositories/transaction-repository-prisma.js";
import { CreateTransactionService } from "../services/transactions/create-transaction-service.js";
import { ListTransactionsService } from "../services/transactions/list-transactions-service.js";
import { GetTransactionService } from "../services/transactions/get-transaction-service.js";
import { UpdateTransactionService } from "../services/transactions/update-transaction-service.js";
import { DeleteTransactionService } from "../services/transactions/delete-transaction-service.js";

export async function createTransactionController(request: FastifyRequest, reply: FastifyReply) {
  const { description, type, amount, categoryId, date, bankId } = request.body as {
    description: string;
    type: 'income' | 'expense';
    amount: number;
    categoryId: string;
    date: string;
    bankId?: string | null;
  };

  const repository = new TransactionRepositoryPrisma();
  const service = new CreateTransactionService(repository);

  const transaction = await service.execute({
    description,
    type,
    amount,
    categoryId,
    date: new Date(date),
    bankId
  });

  return reply.status(201).send(transaction);
}

export async function listTransactionsController(_: FastifyRequest, reply: FastifyReply) {
  const repository = new TransactionRepositoryPrisma();
  const service = new ListTransactionsService(repository);

  const transactions = await service.execute();
  return reply.status(200).send(transactions);
}

export async function getTransactionController(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: string };

  const repository = new TransactionRepositoryPrisma();
  const service = new GetTransactionService(repository);

  const transaction = await service.execute(id);
  return reply.status(200).send(transaction);
}

export async function updateTransactionController(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: string };
  const { description, type, amount, categoryId, date, bankId } = request.body as {
    description: string;
    type: 'income' | 'expense';
    amount: number;
    categoryId: string;
    date: string;
    bankId?: string | null;
  };

  const repository = new TransactionRepositoryPrisma();
  const service = new UpdateTransactionService(repository);

  const updated = await service.execute(
    id,
    description,
    type,
    amount,
    categoryId,
    new Date(date),
    bankId
  );

  return reply.status(200).send(updated);
}

export async function deleteTransactionController(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: string };

  const repository = new TransactionRepositoryPrisma();
  const service = new DeleteTransactionService(repository);

  await service.execute(id);
  return reply.status(204).send();
}
