import pool from '../config/db';
import { User } from '../interfaces/User';
import bcrypt from 'bcrypt';

const saltRounds = 10;

const UserModel = {
  // Cria um novo usuário com senha hasheada
  async create(user: User): Promise<User> {
    const hashedPassword = await bcrypt.hash(user.password, saltRounds);
    const { rows } = await pool.query(
      `INSERT INTO users 
      (username, password, foto, about_pt, about_en, work_title_pt, work_title_en, email) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
      RETURNING *`,
      [
        user.username,
        hashedPassword,
        user.foto,
        user.about_pt,
        user.about_en,
        user.work_title_pt,
        user.work_title_en,
        user.email
      ]
    );
    return rows[0];
  },

  findAll: async(): Promise<User[]> => {
    const {rows} = await pool.query("SELECT * FROM users");
    return rows;
  },

  // Busca usuário pelo username
  async findByUsername(username: string): Promise<User | null> {
    const { rows } = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    return rows[0] || null;
  },

  // Busca usuário pelo id
  async findById(id: number): Promise<User | null> {
    const { rows } = await pool.query('SELECT * FROM users WHERE user_id = $1', [id]);
    return rows[0] || null;
  },

  // Atualizar os dados do usuario
   async updateUser (user_id: number, user: User): Promise<User | null> {
    const hashedPassword = await bcrypt.hash(user.password, saltRounds);

    const { rows } = await pool.query(
      "UPDATE users SET username = $1, password = $2, role = $3, foto = $4, about_pt = $5, about_en = $6, work_title_pt = $7, work_title_en = $8, email = $9 WHERE user_id = $10 RETURNING *",
      [user.username, hashedPassword, user.role, user.foto, user.about_pt, user.about_en, user.work_title_pt, user.work_title_en, user.email, user_id]
    )
    return rows[0] || null;
  },

  //deletar usuário
  async deleteUser (user_id: number): Promise<void> {
    await pool.query("DELETE FROM users WHERE user_id = $1", [user_id]);
  }

};

export default UserModel;