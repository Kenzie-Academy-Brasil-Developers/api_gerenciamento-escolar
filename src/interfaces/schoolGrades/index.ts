import { IStudent } from "../student"

export interface IGradesHistoryRequest {
	schoolGrade?: string
	student?: string
	grade: string[]
}

export interface IHistoryUpdate extends IGradesHistoryRequest {
	school_subject?: string
	firstGrade?: number
	secondGrade?: number
	thirdGrade?: number
	fourthGrade?: number
	absences?: number
}
