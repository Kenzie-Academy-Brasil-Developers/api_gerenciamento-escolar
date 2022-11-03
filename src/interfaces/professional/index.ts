export interface IAddressRequest {
    zipCode: string
    district: string
    city: string
    number: string
    state: string
    country: string
}

export interface IProfessionalRequest {
    name: string
    email: string
    password: string
    isPermission: boolean
}

export interface IProfessional extends IProfessionalRequest {
    id: string
    name: string
    contact: string
    cpf: string
    email: string
    isPermission: boolean
    createdAt: Date
    updatedAt: Date
    isActive: true;
}

export interface IProfessionalLogin {
    email: string
    password: string
}

export interface IProfessionalUpdate {
    name?: string
    email?: string
    password?: string
}