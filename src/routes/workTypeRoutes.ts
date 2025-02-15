import { FastifyInstance } from "fastify";
import WorkTypeController from "../controllers/WorktypeController";

const workTypeRoutes = async (fastify: FastifyInstance) => {
  fastify.post("/work-types", WorkTypeController.createWorkType);
  fastify.get("/work-types", WorkTypeController.listWorkTypes);
  fastify.get("/work-types/:id", WorkTypeController.getWorkType);
  fastify.put("/work-types/:id", WorkTypeController.updateWorkType);
  fastify.delete("/work-types/:id", WorkTypeController.deleteWorkType);
};

export default workTypeRoutes;