import { FastifyInstance } from "fastify";
import WorkController from "../controllers/WorkController";
import { Work } from "../interfaces/Work";
import { authMiddleware } from "../middlewares/authMiddleware";

const workRoutes = async (fastify: FastifyInstance) => {
  fastify.post<{ Body: Work }>("/works", { preHandler: authMiddleware }, WorkController.createWork);
  fastify.get("/works", WorkController.listWorks);
  fastify.put<{ Params: { id: string }; Body: Work }>("/works/:id", { preHandler: authMiddleware }, WorkController.updateWork);
  fastify.delete<{ Params: { id: string }; Body: Work }>("/works/:id", { preHandler: authMiddleware }, WorkController.deleteWork);
};

export default workRoutes;