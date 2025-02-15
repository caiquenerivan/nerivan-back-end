import pool from '../config/db';
import { User } from '../interfaces/User';
import bcrypt from 'bcrypt';

const saltRounds = 10;

const UserModel = {
  // Cria um novo usuário com senha hasheada
  async create(user: User): Promise<User> {
    const hashedPassword = await bcrypt.hash(user.password, saltRounds);
    const { rows } = await pool.query(
      'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *',
      [user.username, hashedPassword]
    );
    return rows[0];
  },

  // Busca usuário pelo username
  async findByUsername(username: string): Promise<User | null> {
    const { rows } = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    return rows[0] || null;
  }
};

export default UserModel;