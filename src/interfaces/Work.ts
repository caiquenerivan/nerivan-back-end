import { Skill } from "./Skill";

export interface Work {
  work_id?: number;
  title_pt: string;
  title_en: string;
  description_pt: string;
  description_en: string;
  photo: string;
  link_github?: string;
  link_project?: string;
  skills: Skill[];
  main_language: Skill;
}