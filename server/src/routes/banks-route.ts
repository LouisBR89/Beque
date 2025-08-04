import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

let banks = [
  { id: 1, name: "Banco A" },
  { id: 2, name: "Banco B" }
];

export async function createBankController(request: FastifyRequest, reply: FastifyReply) {
  const { name } = request.body as { name: string };
  if (!name) {
    return reply.status(400).send({ error: "Nome do banco é obrigatório." });
  }
  const newBank = { id: Date.now(), name };
  banks.push(newBank);
  return reply.status(201).send({ message: "Banco criado com sucesso!", bank: newBank });
}

export async function listBanksController(request: FastifyRequest, reply: FastifyReply) {
  return reply.send(banks);
}

export async function getBankController(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: string };
  const bank = banks.find(b => b.id === Number(id));
  if (!bank) {
    return reply.status(404).send({ error: "Banco não encontrado." });
  }
  return reply.send(bank);
}

export async function updateBankController(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: string };
  const { name } = request.body as { name?: string };
  const bank = banks.find(b => b.id === Number(id));
  if (!bank) {
    return reply.status(404).send({ error: "Banco não encontrado." });
  }
  if (!name) {
    return reply.status(400).send({ error: "Nome do banco é obrigatório para atualização." });
  }
  bank.name = name;
  return reply.send({ message: "Banco atualizado com sucesso!", bank });
}

export async function deleteBankController(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: string };
  banks = banks.filter(b => b.id !== Number(id));
  return reply.send({ message: `Banco ${id} deletado com sucesso!` });
}

export async function banksRoute(app: FastifyInstance) {
  app.get('/banks', listBanksController);
  app.post('/banks', createBankController);
  app.get('/banks/:id', getBankController);
  app.patch('/banks/:id', updateBankController);
  app.delete('/banks/:id', deleteBankController);

  app.get('/', async (request, reply) => {
    let html = `
      <h1>Bancos</h1>
      <form method="POST" action="/banks">
        <input name="name" placeholder="Nome do banco" required />
        <button type="submit">Criar banco</button>
      </form>
      <ul>
        ${banks.map(b => `
          <li>
            ${b.name} 
            <form method="POST" action="/banks/${b.id}?_method=DELETE" style="display:inline;">
              <button type="submit">Deletar</button>
            </form>
          </li>
        `).join('')}
      </ul>
      <script>
        // Permite DELETE via formulário HTML
        document.querySelectorAll('form[action*="?_method=DELETE"]').forEach(form => {
          form.addEventListener('submit', function(e) {
            e.preventDefault();
            fetch(form.action.replace('?_method=DELETE',''), { method: 'DELETE' })
              .then(() => location.reload());
          });
        });
        document.querySelector('form[action="/banks"]').addEventListener('submit', function(e) {
          e.preventDefault();
          fetch('/banks', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: this.name.value })
          }).then(() => location.reload());
        });
      </script>
    `;
    reply.type('text/html').send(html);
  });
}