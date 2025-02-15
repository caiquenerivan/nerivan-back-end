import { FastifyRequest, FastifyReply } from 'fastify';
import jwt from 'jsonwebtoken';

// Estendendo a interface FastifyRequest para incluir a propriedade 'user'
declare module 'fastify' {
    interface FastifyRequest {
        user?: any; // Ou substitua 'any' por um tipo mais específico, se possível
    }
}

export const authMiddleware = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const token = request.headers.authorization?.split(' ')[1];
        if (!token) throw new Error('Token não fornecido');

        if (!process.env.JWT_SECRET) {
            throw new Error('JWT_SECRET não está definido nas variáveis de ambiente');
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        request.user = decoded; // Agora o TypeScript reconhece a propriedade user

    } catch (error) {
        reply.status(401).send({ error: 'Não autorizado' });
    }
};
