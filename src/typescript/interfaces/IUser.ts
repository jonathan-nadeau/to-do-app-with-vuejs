export interface IUser {
  token: string;
  user: {
    _id: string;
    createdAt: string;
    updatedAt: string;
    email: string;
    firstName: string;
    lastName: string;
    avatar: {
      url: null;
      alt: null;
      name: null;
    };
    authId: string;
    authType: string;
    authToken: string;
    username: string;
    password: string;
  };
}
