import { WorkType } from "../interfaces/WorkType";
import pool from "../config/db";

const WorkTypeModel = {
  // CREATE
  create: async (workType: WorkType): Promise<WorkType> => {
    const { rows } = await pool.query(
      "INSERT INTO work_types (title_pt, title_en, desc_pt, desc_en, image) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [workType.titlePt, workType.titleEn, workType.descPt, workType.descEn, workType.image]
    );
    return rows[0];
  },

  // READ
  findAll: async (): Promise<WorkType[]> => {
    const { rows } = await pool.query("SELECT * FROM work_types");
    return rows;
  },
  findById: async (id: number): Promise<WorkType | null> => {
    const { rows } = await pool.query("SELECT * FROM work_types WHERE id = $1", [id]);
    return rows[0] || null;
  },

  // UPDATE
  update: async (id: number, workType: WorkType): Promise<WorkType | null> => {
    const { rows } = await pool.query(
      `UPDATE work_types SET
        title_pt = $1,
        title_en = $2,
        desc_pt = $3,
        desc_en = $4,
        image = $5
      WHERE id = $6
      RETURNING *`,
      [workType.titlePt, workType.titleEn, workType.descPt, workType.descEn, workType.image, id]
    );
    return rows[0] || null;
  },

  // DELETE
  delete: async (id: number): Promise<void> => {
    await pool.query("DELETE FROM work_types WHERE id = $1", [id]);
  },
};

export default WorkTypeModel;