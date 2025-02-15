import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import SkillController from "../controllers/SkillController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { Skill } from "../interfaces/Skill";

const skillRoutes = async (fastify: FastifyInstance) => {
  fastify.post<{ Body: Skill }>("/skills", { preHandler: authMiddleware }, async (request: FastifyRequest<{ Body: Skill }>, reply: FastifyReply) => {
    return SkillController.createSkill(request, reply);
  });
  fastify.get("/skills", SkillController.listSkills);
  fastify.get("/skills/:id", SkillController.getSkill);
  fastify.put<{ Params: { id: string }; Body: Skill }>(
    '/skills/:id',
    { preHandler: authMiddleware },
    SkillController.updateSkill

  );
  fastify.delete<{ Params: { id: string }; Body: Skill }>("/skills/:id", { preHandler: authMiddleware }, SkillController.deleteSkill);
};

export default skillRoutes;