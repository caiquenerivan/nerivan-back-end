import fastify, { FastifyReply, FastifyRequest } from "fastify";
import cors from '@fastify/cors';

import skillRoutes from "./routes/skillRoutes";
import workRoutes from "./routes/workRoutes";
import workTypeRoutes from "./routes/workTypeRoutes";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import { randomBytes } from "crypto";
import { log } from "console";

dotenv.config();


const apiKeyGenerator = randomBytes(32).toString('hex');

const server = fastify({ logger: true });
const API_KEY = process.env.API_KEY;

server.addHook('onRequest', async (request: FastifyRequest, reply: FastifyReply) => {
  const apiKey = request.headers['x-api-key'];
  if (!apiKey || apiKey !== API_KEY) {
    return reply.code(401).send({error: "Unauthorized"})
  }
});

const allowedOrigins = [
  'https://nerivan.com.br',
  'http://localhost:3000'
];

// Registrar rotas
server.register(skillRoutes);
server.register(workRoutes);
server.register(workTypeRoutes);
server.register(authRoutes);
server.register(userRoutes);

server.register(cors, {
  origin: allowedOrigins, // Permite todas as origens (não recomendado para produção)
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
});
server.get('/', async (request, reply) => {
  return { message: 'Hello, world!' };
});

const port = process.env.PORT || 3000;


const start = async () => {
  try {
    await server.listen({ host: '0.0.0.0', port: 3000 });
    console.log(`Server listening on port ${port}`);
    console.log(apiKeyGenerator);
    
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();