import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

let transactions = [
  { id: 1, description: "Compra no mercado", amount: 100.5, type: "debit", date: "2024-07-01" },
  { id: 2, description: "Salário", amount: 2500, type: "credit", date: "2024-07-05" }
];

export async function createTransactionController(request: FastifyRequest, reply: FastifyReply) {
  const { description, amount, type, date } = request.body as { description: string; amount: number; type: string; date: string };
  if (!description || !amount || !type || !date) {
    return reply.status(400).send({ error: "Todos os campos são obrigatórios." });
  }
  const newTransaction = { id: Date.now(), description, amount, type, date };
  transactions.push(newTransaction);
  return reply.status(201).send({ message: "Transação criada com sucesso!", transaction: newTransaction });
}

export async function listTransactionsController(request: FastifyRequest, reply: FastifyReply) {
  return reply.send(transactions);
}

export async function getTransactionController(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: string };
  const transaction = transactions.find(t => t.id === Number(id));
  if (!transaction) {
    return reply.status(404).send({ error: "Transação não encontrada." });
  }
  return reply.send(transaction);
}

export async function updateTransactionController(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: string };
  const { description, amount, type, date } = request.body as { description?: string; amount?: number; type?: string; date?: string };
  const transaction = transactions.find(t => t.id === Number(id));
  if (!transaction) {
    return reply.status(404).send({ error: "Transação não encontrada." });
  }
  if (!description || !amount || !type || !date) {
    return reply.status(400).send({ error: "Todos os campos são obrigatórios para atualização." });
  }
  transaction.description = description;
  transaction.amount = amount;
  transaction.type = type;
  transaction.date = date;
  return reply.send({ message: "Transação atualizada com sucesso!", transaction });
}

export async function deleteTransactionController(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: string };
  transactions = transactions.filter(t => t.id !== Number(id));
  return reply.send({ message: `Transação ${id} deletada com sucesso!` });
}

export async function transactionsRoute(app: FastifyInstance) {
  app.get('/transactions', async (request, reply) => {
    let html = `
      <h1>Transações</h1>
      <form method="POST" action="/transactions">
        <input name="description" placeholder="Descrição" required />
        <input name="amount" type="number" step="0.01" placeholder="Valor" required />
        <input name="type" placeholder="Tipo (credit/debit)" required />
        <input name="date" type="date" required />
        <button type="submit">Criar transação</button>
      </form>
      <ul>
        ${transactions.map(t => `
          <li>
            ${t.description} - R$${t.amount} - ${t.type} - ${t.date}
            <form method="POST" action="/transactions/${t.id}?_method=DELETE" style="display:inline;">
              <button type="submit">Deletar</button>
            </form>
          </li>
        `).join('')}
      </ul>
      <script>
        document.querySelectorAll('form[action*="?_method=DELETE"]').forEach(form => {
          form.addEventListener('submit', function(e) {
            e.preventDefault();
            fetch(form.action.replace('?_method=DELETE',''), { method: 'DELETE' })
              .then(() => location.reload());
          });
        });
        document.querySelector('form[action="/transactions"]').addEventListener('submit', function(e) {
          e.preventDefault();
          fetch('/transactions', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              description: this.description.value,
              amount: Number(this.amount.value),
              type: this.type.value,
              date: this.date.value
            })
          }).then(() => location.reload());
        });
      </script>
    `;
    reply.type('text/html').send(html);
  });

  app.post('/transactions', createTransactionController);
  app.get('/transactions', listTransactionsController);
  app.get('/transactions/:id', getTransactionController);
  app.patch('/transactions/:id', updateTransactionController);
  app.delete('/transactions/:id', deleteTransactionController);
}