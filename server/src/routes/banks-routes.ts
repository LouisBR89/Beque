import { FastifyInstance } from "fastify";
import { CreateBankService } from "../services/banks/create-banks.js";

export async function banksRoutes(fastify: FastifyInstance, opts: any) {
  const bankRepository = opts.bankRepository;
  const createBankService = new CreateBankService(bankRepository);

  fastify.post('/banks', async (request, reply) => {
    const data = request.body as any;
    const bank = await createBankService.execute(data);
    return reply.send(bank);
  });

  fastify.get('/banks', async (request, reply) => {
    const banks = await bankRepository.findAll();
    return reply.send(banks);
  });

  fastify.get('/banks/:id', async (request, reply) => {
    const { id } = request.params as { id: string };
    const bank = await bankRepository.findById(id);
    if (!bank) return reply.status(404).send({ error: 'Bank not found' });
    return reply.send(bank);
  });

  fastify.patch('/banks/:id', async (request, reply) => {
    const { id } = request.params as { id: string };
    const { name, code, fullName, ispb } = request.body as any;
    const bank = await bankRepository.findById(id);
    if (!bank) return reply.status(404).send({ error: 'Bank not found' });

    if (name) bank.name = name;
    if (code) bank.code = code;
    if (fullName) bank.fullName = fullName;
    if (ispb) bank.ispb = ispb;

    await bankRepository.update(bank);
    return reply.send(bank);
  });

  fastify.delete('/banks/:id', async (request, reply) => {
    const { id } = request.params as { id: string };
    await bankRepository.delete(id);
    return reply.status(204).send();
  });
}