import { Work } from "../interfaces/Work";
import { Skill } from "../interfaces/Skill";
import pool from "../config/db";

const WorkModel = {
  // CREATE
  create: async (work: Work): Promise<Work> => {
    const client = await pool.connect();
    try {
      await client.query("BEGIN");

      // Insere o work
      const { rows: workRows } = await client.query(
        `INSERT INTO works 
        (title_pt, title_en, description_pt, description_en, photo, link_github, link_project, main_language_id) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
        RETURNING *`,
        [
          work.titlePt,
          work.titleEn,
          work.descriptionPt,
          work.descriptionEn,
          work.photo,
          work.linkGitHub,
          work.linkProject,
          work.mainLanguage.id,
        ]
      );

      // Insere as skills relacionadas
      for (const skill of work.skills) {
        await client.query(
          "INSERT INTO work_skills (work_id, skill_id) VALUES ($1, $2)",
          [workRows[0].id, skill.id]
        );
      }

      await client.query("COMMIT");
      return workRows[0];
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  },

  // READ
  findAll: async (): Promise<Work[]> => {
    const { rows } = await pool.query(`
      SELECT 
        w.*,
        json_agg(s.*) AS skills,
        ml.* AS main_language
      FROM works w
      LEFT JOIN work_skills ws ON w.id = ws.work_id
      LEFT JOIN skills s ON ws.skill_id = s.id
      LEFT JOIN skills ml ON w.main_language_id = ml.id
      GROUP BY w.id, ml.id
    `);
    return rows.map(row => ({
      ...row,
      skills: row.skills.filter((skill: Skill) => skill.id !== null),
      mainLanguage: row.main_language,
    }));
  },

  // UPDATE
  update: async (id: number, work: Work): Promise<Work | null> => {
    const client = await pool.connect();
    try {
      await client.query("BEGIN");

      // Atualiza o work
      const { rows: workRows } = await client.query(
        `UPDATE works SET
          title_pt = $1,
          title_en = $2,
          description_pt = $3,
          description_en = $4,
          photo = $5,
          link_github = $6,
          link_project = $7,
          main_language_id = $8
        WHERE id = $9
        RETURNING *`,
        [
          work.titlePt,
          work.titleEn,
          work.descriptionPt,
          work.descriptionEn,
          work.photo,
          work.linkGitHub,
          work.linkProject,
          work.mainLanguage.id,
          id,
        ]
      );

      // Atualiza as skills (remove todas e insere as novas)
      await client.query("DELETE FROM work_skills WHERE work_id = $1", [id]);
      for (const skill of work.skills) {
        await client.query(
          "INSERT INTO work_skills (work_id, skill_id) VALUES ($1, $2)",
          [id, skill.id]
        );
      }

      await client.query("COMMIT");
      return workRows[0];
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  },

  // DELETE
  delete: async (id: number): Promise<void> => {
    const client = await pool.connect();
    try {
      await client.query("BEGIN");
      await client.query("DELETE FROM work_skills WHERE work_id = $1", [id]);
      await client.query("DELETE FROM works WHERE id = $1", [id]);
      await client.query("COMMIT");
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  },
};

export default WorkModel;