import { IStudentRequest } from "../student";

export interface ISchoolMaterials {
  id: string;
  school_subject: string;
  firstGrade: number;
  secondGrade: number;
  thirdGrade: number;
  fourthGrade: number;
  absences: number;
  schoolGrade: ISchoolGrade;
}

export interface ISchoolGrade extends ISchoolMaterials {
  id: string;
  name: string;
  student: IStudentRequest;
}
