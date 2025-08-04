import Fastify from 'fastify';
import cors from '@fastify/cors';
import { categoriesRoutes } from './routes/categories-route.js';
import { banksRoutes } from './routes/banks-route.js';
import { transactionsRoutes } from './routes/transactions-route.js';

const app = Fastify();

await app.register(cors, {
  origin: '*',
});

await app.register(categoriesRoutes);
await app.register(banksRoutes);
await app.register(transactionsRoutes);

app.setNotFoundHandler((req, reply) => {
  reply.status(404).send({ error: 'Endpoint not found' });
});

app.setErrorHandler((error, req, reply) => {
  console.error(error);
  reply.status(500).send({ error: 'Internal server error' });
});

const PORT = 3000;

app.listen({ port: PORT }).then(() => {
  console.log(`Server running on port ${PORT}`);
});
