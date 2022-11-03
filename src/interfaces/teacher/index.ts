export interface ITeacherRequest {
    name: string
    email: string
    password: string
    isPermission: boolean
}

export interface ITeacher extends ITeacherRequest {
    id: string
    name: string
    email: string
    isPermission: boolean
    createdAt: Date
    updatedAt: Date
    isActive: true;
}


export interface ITeacherLogin {
    email: string
    password: string
}

export interface ITeacherUpdate {
    name?: string
    email?: string
    password?: string
}