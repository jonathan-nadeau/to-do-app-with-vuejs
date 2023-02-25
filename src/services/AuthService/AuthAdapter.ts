import type { IUser, IUserRaw } from "@/typescript";

class AuthAdapter {
  formatUser(userRaw: IUserRaw): IUser {
    return {
      token: userRaw.token,
      user: {
        _id: userRaw.user._id,
        email: userRaw.user.email,
      },
    };
  }
}

export default AuthAdapter;
