export interface IStudentRequest {
    name: string
    email: string
    password: string
    isPermission: boolean
}

export interface IStudent extends IStudentRequest {
    id: string
    name: string
    age: string
    email: string
    contact: string
    isPermission: boolean
    createdAt: Date
    updatedAt: Date
    isActive: true;
}

export interface IStudentLogin {
    email: string
    password: string
}

export interface IStudentUpdate {
    name?: string
    email?: string
    password?: string
}