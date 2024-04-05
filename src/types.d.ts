interface Branch {
  id: string;
  name: string;
  limit: number;
  counter: number;
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
  role: number;
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

interface FormUserData {
  id: string;
  userType: string;
  fullName: string;
  phone: string;
  branchId: string;
  sex: boolean;
  emergencyContactFullName: string;
  emergencyContactPhone: string;
  allergies: string;
  diseases: string;
  medicine: string;
  branchName: string;
  editable: boolean;
  completed: boolean;
  deleted: boolean;
}
