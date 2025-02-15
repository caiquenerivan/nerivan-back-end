import { FastifyInstance } from "fastify";
import SkillController from "../controllers/SkillController";

const skillRoutes = async (fastify: FastifyInstance) => {
  fastify.post("/skills", SkillController.createSkill);
  fastify.get("/skills", SkillController.listSkills);
  fastify.get("/skills/:id", SkillController.getSkill);
  fastify.put("/skills/:id", SkillController.updateSkill);
  fastify.delete("/skills/:id", SkillController.deleteSkill);
};

export default skillRoutes;