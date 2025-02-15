import { FastifyRequest, FastifyReply } from "fastify";
import WorkTypeModel from "../models/WorkTypeModel";
import { WorkType } from "../interfaces/WorkType";

const WorkTypeController = {
  // CREATE
  createWorkType: async (request: FastifyRequest<{ Body: WorkType }>, reply: FastifyReply) => {
    try {
      const newWorkType = await WorkTypeModel.create(request.body);
      reply.status(201).send(newWorkType);
    } catch (error) {
      reply.status(500).send({ error: "Erro ao criar work type" });
    }
  },

  // READ
  listWorkTypes: async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const workTypes = await WorkTypeModel.findAll();
      reply.send(workTypes);
    } catch (error) {
      reply.status(500).send({ error: "Erro ao buscar work types" });
    }
  },

  //FIND BY ID
  getWorkType: async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
    try {
      const workType = await WorkTypeModel.findById(parseInt(request.params.id));
      if (!workType) reply.status(404).send({ error: "WorkType não encontrada" });
      else reply.send(workType);
    } catch (error) {
      reply.status(500).send({ error: "Erro ao buscar WorkType" });
    }
  },

  // UPDATE
  updateWorkType: async (request: FastifyRequest<{ Params: { id: string }; Body: WorkType }>, reply: FastifyReply) => {
    try {
      const updatedWorkType = await WorkTypeModel.update(
        parseInt(request.params.id),
        request.body
      );
      if (!updatedWorkType) reply.status(404).send({ error: "Work type não encontrado" });
      else reply.send(updatedWorkType);
    } catch (error) {
      reply.status(500).send({ error: "Erro ao atualizar work type" });
    }
  },

  // DELETE
  deleteWorkType: async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
    try {
      await WorkTypeModel.delete(parseInt(request.params.id));
      reply.send({ message: "Work type deletado com sucesso" });
    } catch (error) {
      reply.status(500).send({ error: "Erro ao deletar work type" });
    }
  },
};

export default WorkTypeController;