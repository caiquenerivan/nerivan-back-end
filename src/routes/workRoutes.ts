import { FastifyInstance } from "fastify";
import WorkController from "../controllers/WorkController";

const workRoutes = async (fastify: FastifyInstance) => {
  fastify.post("/works", WorkController.createWork);
  fastify.get("/works", WorkController.listWorks);
  fastify.put("/works/:id", WorkController.updateWork);
  fastify.delete("/works/:id", WorkController.deleteWork);
};

export default workRoutes;