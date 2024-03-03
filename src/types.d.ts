interface Branch {
  id: string;
  name: string;
  limit: number;
}

interface User {
  branchId: string;
  createdAt: string;
  email: string;
  expiresIn: number;
  id: string;
  roleId: string;
  username: string;
  verified: boolean;
  token: string;
}
