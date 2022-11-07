export interface IschoolGrade {
	id: string,
	name: string,
	createAt: Date,
	updateAt: Date,
	nameClass?: string,
	registration?: string,
	student?: string,
	schoolGrade: IGradesHistory,
}

export interface IGradesHistory {
	schoolGrade: IschoolGrade
	student?: string
	grade: IGrades

}

export interface IGrades {
    id: string;
    school_subject: string;
	firstGrade: BigInteger;
	secondGrade: BigInteger;
	thirdGrade: BigInteger;
	fourthGrade: BigInteger;
	absences: BigInteger;
}
