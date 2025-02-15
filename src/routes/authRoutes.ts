import { FastifyInstance } from 'fastify';
import UserModel from '../models/UserModel';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { User } from '../interfaces/User';



const authRoutes = async (fastify: FastifyInstance) => {
    // Registro de novo usuário
    fastify.post<{ Body: User }>('/register', async (request, reply) => {
        try {
            const user = await UserModel.create(request.body);
            reply.status(201).send(user);
        } catch (error) {
            reply.status(500).send({ error: 'Erro ao registrar usuário' });
        }
    });

    // Login
    fastify.post('/login', async (request, reply) => {
        const { username, password } = request.body as { username: string; password: string };

        // Busca usuário
        const user = await UserModel.findByUsername(username);
        if (!user) return reply.status(401).send({ error: 'Credenciais inválidas' });

        // Verifica senha
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return reply.status(401).send({ error: 'Credenciais inválidas' });

        if (!process.env.JWT_SECRET) {
            throw new Error('JWT_SECRET não está definido nas variáveis de ambiente');
        }
        // Gera token JWT
        const token = jwt.sign(
            { userId: user.id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        reply.send({ token });
    });
};

export default authRoutes;