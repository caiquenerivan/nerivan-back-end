import fastify from "fastify";
import cors from '@fastify/cors';

import skillRoutes from "./routes/skillRoutes";
import workRoutes from "./routes/workRoutes";
import workTypeRoutes from "./routes/workTypeRoutes";
import dotenv from "dotenv";
import personalInfoRoutes from "./routes/personalInfoRoutes";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";

dotenv.config();

const server = fastify({ logger: true });

// Registrar rotas
server.register(skillRoutes);
server.register(workRoutes);
server.register(workTypeRoutes);
//server.register(personalInfoRoutes);
server.register(authRoutes);
server.register(userRoutes);

server.register(cors, {
  //origin: '*', // Permite todas as origens (não recomendado para produção)
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
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();