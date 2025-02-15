import { FastifyInstance } from "fastify";
import PersonalInfoController from "../controllers/PersonalInfo";
import { PersonalInfo } from "../interfaces/PersonalInfo";
import { authMiddleware } from "../middlewares/authMiddleware";

const personalInfoRoutes = async (fastify: FastifyInstance) => {
  // CREATE
  fastify.post<{ Body: PersonalInfo }>("/personal-info", { preHandler: authMiddleware }, PersonalInfoController.createPersonalInfo);
  
  // READ
  fastify.get("/personal-info", PersonalInfoController.listAllPersonalInfo);
  fastify.get("/personal-info/:id", PersonalInfoController.getPersonalInfo);
  
  // UPDATE
  fastify.put<{ Params: { id: string }; Body: PersonalInfo }>("/personal-info/:id", { preHandler: authMiddleware }, PersonalInfoController.updatePersonalInfo);
  
  // DELETE
  fastify.delete<{ Params: { id: string }; Body: PersonalInfo }>("/personal-info/:id", { preHandler: authMiddleware }, PersonalInfoController.deletePersonalInfo);
};

export default personalInfoRoutes;