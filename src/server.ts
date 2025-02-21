import fastify, { FastifyReply, FastifyRequest } from "fastify";
import cors from '@fastify/cors';

import skillRoutes from "./routes/skillRoutes";
import workRoutes from "./routes/workRoutes";
import workTypeRoutes from "./routes/workTypeRoutes";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import { randomBytes } from "crypto";

dotenv.config();


const apiKeyGenerator = randomBytes(32).toString('hex');

const server = fastify({ logger: true });
const API_KEY = process.env.API_KEY;
const allowedOrigins = [
  'https://nerivan.com.br',
  'https://www.nerivan.com.br',
  'http://localhost:3000',
  'http://localhost:5173',
];
server.register(cors, {
  origin: allowedOrigins, // URL exata do seu frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Inclua OPTIONS
  allowedHeaders: ['Content-Type', 'Authorization', 'x-api-key'],
  exposedHeaders: ['Authorization'],
  credentials: true, // Se estiver usando cookies/tokens,
  maxAge: 86400
})

server.addHook('onRequest', async (request: FastifyRequest, reply: FastifyReply) => {
  const apiKey = request.headers['x-api-key'];
  if (!apiKey || apiKey !== API_KEY) {
    return reply.code(401).send({ error: "Unauthorized" })
  } 
});



// Registrar rotas
server.register(skillRoutes);
server.register(workRoutes);
server.register(workTypeRoutes);
server.register(authRoutes);
server.register(userRoutes);



const port = 3000;


const start = async () => {
  try {
    await server.listen({ host: '0.0.0.0', port: Number(port) }, (err) => {
      if (err) throw err
      console.log(`Server listening on port ${port}`);
    });
    //console.log(apiKeyGenerator);

  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();