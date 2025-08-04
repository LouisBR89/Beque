import { FastifyReply, FastifyRequest } from "fastify";

export async function createBankController(request: FastifyRequest, reply: FastifyReply) {
  const { name } = request.body as { name: string };
  if (!name) {
    return reply.status(400).send({ error: "Nome do banco é obrigatório." });
  }
  return reply.status(201).send({ message: "Banco criado com sucesso!", bank: { id: Date.now(), name } });
}

export async function listBanksController(request: FastifyRequest, reply: FastifyReply) {
  const banks = [
    { id: 1, name: "Banco A" },
    { id: 2, name: "Banco B" }
  ];
  return reply.send(banks);
}

export async function getBankController(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: string };
  const bank = { id, name: `Banco ${id}` };
  return reply.send(bank);
}

export async function updateBankController(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: string };
  const { name } = request.body as { name?: string };
  if (!name) {
    return reply.status(400).send({ error: "Nome do banco é obrigatório para atualização." });
  }
  return reply.send({ message: "Banco atualizado com sucesso!", bank: { id, name } });
}

export async function deleteBankController(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: string };
  return reply.send({ message: `Banco ${id} deletado com sucesso!` });
}