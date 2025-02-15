import { FastifyRequest, FastifyReply } from "fastify";
import SkillModel from "../models/SkillModel";
import { Skill } from "../interfaces/Skill";

const SkillController = {
  // CREATE
  createSkill: async (request: FastifyRequest<{ Body: Skill }>, reply: FastifyReply) => {
    try {
      const newSkill = await SkillModel.create(request.body);
      reply.status(201).send(newSkill);
    } catch (error) {
      reply.status(500).send({ error: "Erro ao criar skill" });
    }
  },

  // READ
  listSkills: async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const skills = await SkillModel.findAll();
      reply.send(skills);
    } catch (error) {
      reply.status(500).send({ error: "Erro ao buscar skills" });
    }
  },

  getSkill: async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
    try {
      const skill = await SkillModel.findById(parseInt(request.params.id));
      if (!skill) reply.status(404).send({ error: "Skill não encontrada" });
      else reply.send(skill);
    } catch (error) {
      reply.status(500).send({ error: "Erro ao buscar skill" });
    }
  },

  // UPDATE
  updateSkill: async (request: FastifyRequest<{ Params: { id: string }; Body: Skill }>, reply: FastifyReply) => {
    try {
      const updatedSkill = await SkillModel.update(
        parseInt(request.params.id),
        request.body
      );
      if (!updatedSkill) reply.status(404).send({ error: "Skill não encontrada" });
      else reply.send(updatedSkill);
    } catch (error) {
      reply.status(500).send({ error: "Erro ao atualizar skill" });
    }
  },

  // DELETE
  deleteSkill: async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
    try {
      await SkillModel.delete(parseInt(request.params.id));
      reply.send({ message: "Skill deletada com sucesso" });
    } catch (error) {
      reply.status(500).send({ error: "Erro ao deletar skill" });
    }
  },
};

export default SkillController;