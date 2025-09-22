import { BaseService } from "./base-service";
import { LoginDetails, LoginResponseData } from "@/types";

export class AuthService extends BaseService {
  constructor(headers?: Record<string, string>) {
    super("auth", headers);
  }

  public handleLogin(loginDetails: LoginDetails) {
    return this.post<LoginResponseData, LoginDetails>("/login", loginDetails);
  }
}
