import { Role } from "./role";

export class UserInfo {
  id: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  userImage: string;
  role: Role;
  validationCode: string;
  active: string;
}

export class UserLoginInfo {
  email: string;
  password: string;
}
