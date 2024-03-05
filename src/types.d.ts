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

interface UserInvitation {
  id: string;
  reference: string | null;
  sourceUserId: string;
  targetUserId: string | null;
  roleId: string;
  branchId: string;
  createdAt: string;
}
