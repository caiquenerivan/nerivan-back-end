import { FastifyInstance } from "fastify";
import WorkTypeController from "../controllers/WorktypeController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { WorkType } from "../interfaces/WorkType";

const workTypeRoutes = async (fastify: FastifyInstance) => {
  fastify.post<{ Body: WorkType }>("/work-types", { preHandler: authMiddleware }, WorkTypeController.createWorkType);
  fastify.get("/work-types", WorkTypeController.listWorkTypes);
  fastify.get("/work-types/:id", WorkTypeController.getWorkType);
  fastify.put<{ Params: { id: string }; Body: WorkType }>("/work-types/:id", { preHandler: authMiddleware }, WorkTypeController.updateWorkType);
  fastify.delete<{ Params: { id: string }; Body: WorkType }>("/work-types/:id", { preHandler: authMiddleware }, WorkTypeController.deleteWorkType);
};

export default workTypeRoutes;