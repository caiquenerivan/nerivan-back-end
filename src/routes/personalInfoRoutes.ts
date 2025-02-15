import { FastifyInstance } from "fastify";
import PersonalInfoController from "../controllers/PersonalInfo";

const personalInfoRoutes = async (fastify: FastifyInstance) => {
  // CREATE
  fastify.post("/personal-info", PersonalInfoController.createPersonalInfo);
  
  // READ
  fastify.get("/personal-info", PersonalInfoController.listAllPersonalInfo);
  fastify.get("/personal-info/:id", PersonalInfoController.getPersonalInfo);
  
  // UPDATE
  fastify.put("/personal-info/:id", PersonalInfoController.updatePersonalInfo);
  
  // DELETE
  fastify.delete("/personal-info/:id", PersonalInfoController.deletePersonalInfo);
};

export default personalInfoRoutes;