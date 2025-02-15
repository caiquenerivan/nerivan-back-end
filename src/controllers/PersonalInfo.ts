import { FastifyRequest, FastifyReply } from "fastify";
import PersonalInfoModel from "../models/PersonalInfoModel";
import { PersonalInfo } from "../interfaces/PersonalInfo";

const PersonalInfoController = {
  // CREATE
  createPersonalInfo: async (request: FastifyRequest<{ Body: PersonalInfo }>, reply: FastifyReply) => {
    try {
      const newInfo = await PersonalInfoModel.create(request.body);
      reply.status(201).send(newInfo);
    } catch (error) {
      reply.status(500).send({ error: "Erro ao criar informações pessoais" });
    }
  },

  // READ
  listAllPersonalInfo: async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const allInfo = await PersonalInfoModel.findAll();
      reply.send(allInfo);
    } catch (error) {
      reply.status(500).send({ error: "Erro ao buscar informações" });
    }
  },

  getPersonalInfo: async (request: FastifyRequest<{ Params: { id: string }}>, reply: FastifyReply) => {
    try {
      const info = await PersonalInfoModel.findById(parseInt(request.params.id));
      if (!info) reply.status(404).send({ error: "Informação não encontrada" });
      else reply.send(info);
    } catch (error) {
      reply.status(500).send({ error: "Erro ao buscar informação" });
    }
  },

  // UPDATE
  updatePersonalInfo: async (request: FastifyRequest<{ Params: { id: string }; Body: PersonalInfo }>, reply: FastifyReply) => {
    try {
      const updatedInfo = await PersonalInfoModel.update(
        parseInt(request.params.id),
        request.body
      );
      if (!updatedInfo) reply.status(404).send({ error: "Informação não encontrada" });
      else reply.send(updatedInfo);
    } catch (error) {
      reply.status(500).send({ error: "Erro ao atualizar informações" });
    }
  },

  // DELETE
  deletePersonalInfo: async (request: FastifyRequest<{ Params: { id: string }}>, reply: FastifyReply) => {
    try {
      await PersonalInfoModel.delete(parseInt(request.params.id));
      reply.send({ message: "Informações deletadas com sucesso" });
    } catch (error) {
      reply.status(500).send({ error: "Erro ao deletar informações" });
    }
  }
};

export default PersonalInfoController;