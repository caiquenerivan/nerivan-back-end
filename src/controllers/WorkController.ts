import { FastifyRequest, FastifyReply } from "fastify";
import WorkModel from "../models/WorkModel";
import { Work } from "../interfaces/Work";

const WorkController = {
  // CREATE
  createWork: async (request: FastifyRequest<{ Body: Work }>, reply: FastifyReply) => {
    try {
      const newWork = await WorkModel.create(request.body);
      reply.status(201).send(newWork);
    } catch (error) {
      reply.status(500).send({ error: error });
    }
  },

  // READ
  listWorks: async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const works = await WorkModel.findAll();
      reply.send(works);
    } catch (error) {
      reply.status(500).send({ error: "Erro ao buscar works" });
    }
  },

  // UPDATE
  updateWork: async (request: FastifyRequest<{ Params: { id: string }; Body: Work }>, reply: FastifyReply) => {
    try {
      const updatedWork = await WorkModel.update(
        parseInt(request.params.id),
        request.body
      );
      if (!updatedWork) reply.status(404).send({ error: "Work não encontrado" });
      else reply.send(updatedWork);
    } catch (error) {
      reply.status(500).send({ error: "Erro ao atualizar work" });
    }
  },

  // DELETE
  deleteWork: async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
    try {
      await WorkModel.delete(parseInt(request.params.id));
      reply.send({ message: "Work deletado com sucesso" });
    } catch (error) {
      reply.status(500).send({ error: "Erro ao deletar work" });
    }
  },
};

export default WorkController;