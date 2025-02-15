import { FastifyInstance} from "fastify";
import UserController from "../controllers/UserController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { Skill } from "../interfaces/Skill";
import { User } from "../interfaces/User";

const userRoutes = async (fastify: FastifyInstance) => {
    fastify.get("/users", UserController.findAll);
    fastify.get("/users/id/:id", UserController.findById);
    fastify.get("/users/username/:username", UserController.findByUsername);
    fastify.put<{ Params: { id: string }; Body: User }>(
        "/users/:id",
        { preHandler: authMiddleware },
        UserController.updateUser
    );
    fastify.delete<{ Params: { id: string }; Body: Skill }>(
        "/users/:id",
        { preHandler: authMiddleware },
        UserController.deleteUser
    );

}

export default userRoutes;