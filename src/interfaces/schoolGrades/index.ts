import { IStudentRequest } from "../student";

export interface ISchoolMaterials {
    id: string;
    school_subject: string;
	firstGrade: BigInteger;
	secondGrade: BigInteger;
	thirdGrade: BigInteger;
	fourthGrade: BigInteger;
	absences: BigInteger;
	schoolGrade: ISchoolGrade;
}

export interface ISchoolGrade extends ISchoolMaterials {
	id: string;
	name: string;
	student: IStudentRequest;
}
