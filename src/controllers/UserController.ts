import { FastifyRequest, FastifyReply } from "fastify";
import UserModel from "../models/UserModel";
import { User } from "../interfaces/User";

const UserController = {
    createUser: async (request: FastifyRequest<{Body: User}>, reply: FastifyReply)=>{
        try{
            const newUser = await UserModel.create(request.body);
            reply.status(201).send(newUser);
        }catch(error){
            reply.status(500).send({error: "Erro ao criar usuário"});
        }
    },
    findAll: async (request: FastifyRequest, reply: FastifyReply) => {
        try {
            const users = await UserModel.findAll();
            reply.send(users)
        } catch (error) {
            reply.status(500).send({error: "Erro ao buscar usuarios"})
        }
    },
    findByUsername: async (request: FastifyRequest<{Params: {username: string}}>, reply: FastifyReply) => {
        try {
            const user = await UserModel.findByUsername(request.params.username);
            if(!user) reply.status(404).send({error: "Usuário não encontrado"});
            else reply.send(user)
        } catch (error) {
            reply.status(500).send({error: "Erro ao buscar usuário"});
        }
    },
    findById: async (request: FastifyRequest<{Params: {id: string}}>, reply: FastifyReply) => {
        try {
            const user = await UserModel.findById(parseInt(request.params.id));
            if(!user) reply.status(404).send({error: "Usuário não encontrado"});
            else reply.send(user)
        } catch (error) {
            reply.status(500).send({error: "Erro ao buscar usuário"});
        }
    },
    updateUser: async (request: FastifyRequest<{Params: {id: string}, Body: User}>, reply: FastifyReply) => {
        try {
            const updatedUser = await UserModel.updateUser(parseInt(request.params.id), request.body);
            if(!updatedUser) reply.status(404).send({error: "Usuário não encontrado"});
            else reply.send(updatedUser);
        } catch (error) {
            reply.status(500).send({error: "Erro ao atualizar usuário"})
        }
    },
    deleteUser: async (request: FastifyRequest<{Params: {id: string}}>, reply: FastifyReply) => {
        try {
            await UserModel.deleteUser(parseInt(request.params.id));
            reply.send({message: "Usuário deletado com sucesso"})
        } catch (error) {
            reply.status(500).send({error: "Erro ao deletar skill"})
        }
    }
}

export default UserController;