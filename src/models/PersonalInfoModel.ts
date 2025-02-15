import { PersonalInfo } from "../interfaces/PersonalInfo";
import pool from "../config/db";
import { create } from "domain";

const PersonalInfoModel = {
    async create(personalInfo: PersonalInfo): Promise<PersonalInfo> {
        const { rows } = await pool.query(
            `INSERT INTO personal_info
            (work_title_pt, work_title_en, about_pt, about_en) 
            VALUES ($1, $2, $3, $4) 
            RETURNING *`,
            [
                personalInfo.workTitlePt,
                personalInfo.workTitleEn,
                personalInfo.aboutEn,
                personalInfo.aboutEn,
            ]
        );
        return rows[0];
    },

    async findAll(): Promise<PersonalInfo[]> {
        const { rows } = await pool.query("SELECT * FROM personal_info");
        return rows;
    },

    findById: async (id: number): Promise<PersonalInfo | null> => {
        const { rows } = await pool.query("SELECT * FROM personal_info WHERE id = $1", [id]);
        return rows[0] || null;
    },
    update: async (id: number, personalInfo: PersonalInfo): Promise<PersonalInfo | null> => {
        const { rows } = await pool.query(
            `UPDATE personal_info SET
            work_title_pt = $1,
            work_title_en = $2,
            about_pt = $3,
            about_en = $4
          WHERE id = $5
          RETURNING *`,
            [
                personalInfo.workTitlePt,
                personalInfo.workTitleEn,
                personalInfo.aboutPt,
                personalInfo.aboutEn,
                id
            ]
        );
        return rows[0] || null;
    },
    delete: async (id: number): Promise<void> => {
        await pool.query("DELETE FROM personal_info WHERE id = $1", [id]);
    }
}

export default PersonalInfoModel;
