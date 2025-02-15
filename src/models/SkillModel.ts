import { Skill } from "../interfaces/Skill";
import pool from "../config/db";

const SkillModel = {
  // CREATE
  create: async (skill: Skill): Promise<Skill> => {
    const { rows } = await pool.query(
      "INSERT INTO skills (name, color_hexa) VALUES ($1, $2) RETURNING *",
      [skill.name, skill.color_hexa]
    );
    return rows[0];
  },

  // READ
  findAll: async (): Promise<Skill[]> => {
    const { rows } = await pool.query("SELECT * FROM skills");
    return rows;
  },

  //FIND BY ID
  findById: async (id: number): Promise<Skill | null> => {
    const { rows } = await pool.query("SELECT * FROM skills WHERE id = $1", [id]);
    return rows[0] || null;
  },

  // UPDATE
  update: async (id: number, skill: Skill): Promise<Skill | null> => {
    const { rows } = await pool.query(
      "UPDATE skills SET name = $1, color_hexa = $2 WHERE id = $3 RETURNING *",
      [skill.name, skill.color_hexa, id]
    );
    return rows[0] || null;
  },

  // DELETE
  delete: async (id: number): Promise<void> => {
    await pool.query("DELETE FROM skills WHERE id = $1", [id]);
  },
};

export default SkillModel;