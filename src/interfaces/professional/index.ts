export interface IAddress {
  id: string;
  zipCode: string;
  district: string;
  city: string;
  number: string;
  state: string;
  country: string;
}

export interface IProfessionalRequest {
  name: string;
  email: string;
  password: string;
  IsTeacher: boolean;
}

export interface IProfessional extends IProfessionalRequest {
  id: string;
  type: string;
  name: string;
  contact: string;
  cpf: string;
  email: string;
  permission: boolean;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  id_address: IAddress;
}

export interface IProfessionalLogin {
  email: string;
  password: string;
}

export interface IProfessionalUpdate {
  name?: string;
  email?: string;
  password?: string;
}
