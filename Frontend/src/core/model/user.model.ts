export class UserReturnDto {
  id: number;
  firstName: string;
  lastName: string;
  fullName: string;
  user_image: string;
  role: string;
  email: string;
}

export class UserRegisterDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  birthDate: string;
}

export enum UserRole {
  admin = '4',
  university = '3',
  company = '2',
  student = '1',
}
