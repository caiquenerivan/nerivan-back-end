import { Skill } from "./Skill";

export interface Work {
  id?: number;
  titlePt: string;
  titleEn: string;
  descriptionPt: string;
  descriptionEn: string;
  photo: string;
  linkGitHub?: string;
  linkProject?: string;
  skills: Skill[];
  mainLanguage: Skill;
}