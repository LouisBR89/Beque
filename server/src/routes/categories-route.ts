import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

let categories = [
  { id: 1, name: "Categoria A", icon: "📁" },
  { id: 2, name: "Categoria B", icon: "📂" }
];

export async function createCategoryController(request: FastifyRequest, reply: FastifyReply) {
  const { name, icon } = request.body as { name: string; icon?: string };
  if (!name) {
    return reply.status(400).send({ error: "Nome da categoria é obrigatório." });
  }
  const newCategory = { id: Date.now(), name, icon: icon || "" };
  categories.push(newCategory);
  return reply.status(201).send({ message: "Categoria criada com sucesso!", category: newCategory });
}

export async function listCategoriesController(request: FastifyRequest, reply: FastifyReply) {
  return reply.send(categories);
}

export async function getCategoryController(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: string };
  const category = categories.find(c => c.id === Number(id));
  if (!category) {
    return reply.status(404).send({ error: "Categoria não encontrada." });
  }
  return reply.send(category);
}

export async function updateCategoryController(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: string };
  const { name, icon } = request.body as { name?: string; icon?: string };
  const category = categories.find(c => c.id === Number(id));
  if (!category) {
    return reply.status(404).send({ error: "Categoria não encontrada." });
  }
  if (!name) {
    return reply.status(400).send({ error: "Nome da categoria é obrigatório para atualização." });
  }
  category.name = name;
  category.icon = icon || category.icon;
  return reply.send({ message: "Categoria atualizada com sucesso!", category });
}

export async function deleteCategoryController(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: string };
  categories = categories.filter(c => c.id !== Number(id));
  return reply.send({ message: `Categoria ${id} deletada com sucesso!` });
}

export default async function categoriesRoute(app: FastifyInstance) {
  app.get('/categories', async (request, reply) => {
    let html = `
      <h1>Categorias</h1>
      <form method="POST" action="/categories">
        <input name="name" placeholder="Nome da categoria" required />
        <input name="icon" placeholder="Ícone (opcional)" />
        <button type="submit">Criar categoria</button>
      </form>
      <ul>
        ${categories.map(c => `
          <li>
            ${c.icon} ${c.name}
            <form method="POST" action="/categories/${c.id}?_method=DELETE" style="display:inline;">
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
        document.querySelector('form[action="/categories"]').addEventListener('submit', function(e) {
          e.preventDefault();
          fetch('/categories', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: this.name.value, icon: this.icon.value })
          }).then(() => location.reload());
        });
      </script>
    `;
    reply.type('text/html').send(html);
  });

  app.post('/categories', createCategoryController);
  app.get('/categories/:id', getCategoryController);
  app.patch('/categories/:id', updateCategoryController);
}