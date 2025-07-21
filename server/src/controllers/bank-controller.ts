
import { FastifyReply, FastifyRequest } from "fastify";
import { BankRepositoryPrisma } from "../repositories/bank-repository-prisma.js";
import { CreateBankService } from "../services/banks/create-bank-service.js";
import { ListBanksService } from "../services/banks/list-banks-service.js";
import { GetBankService } from "../services/banks/get-bank-service.js";
import { UpdateBankService } from "../services/banks/update-bank-service.js";
import { DeleteBankService } from "../services/banks/delete-bank-service.js";

export async function createBankController(request: FastifyRequest, reply: FastifyReply) {
  const { code, name, fullName } = request.body as { code: number; name: string; fullName: string };

  const repository = new BankRepositoryPrisma();
  const service = new CreateBankService(repository);
  const bank = await service.execute({ code, name, fullName });

  return reply.status(201).send(bank);
}

export async function listBanksController(_: FastifyRequest, reply: FastifyReply) {
  const repository = new BankRepositoryPrisma();
  const service = new ListBanksService(repository);

  const banks = await service.execute();
  return reply.status(200).send(banks);
}

export async function getBankController(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: string };

  const repository = new BankRepositoryPrisma();
  const service = new GetBankService(repository);

  const bank = await service.execute(id);
  return reply.status(200).send(bank);
}

export async function updateBankController(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: string };
  const { code, name, fullName } = request.body as { code: number; name: string; fullName: string };

  const repository = new BankRepositoryPrisma();
  const service = new UpdateBankService(repository);

  const updated = await service.execute(id, code, name, fullName);
  return reply.status(200).send(updated);
}

export async function deleteBankController(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: string };

  const repository = new BankRepositoryPrisma();
  const service = new DeleteBankService(repository);

  await service.execute(id);
  return reply.status(204).send();
}
