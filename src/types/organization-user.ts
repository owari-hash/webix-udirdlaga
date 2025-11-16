// ----------------------------------------------------------------------
// Organization User Types
// ----------------------------------------------------------------------

export type OrganizationUserRole = 'admin' | 'moderator' | 'user';
export type OrganizationUserStatus = 'active' | 'inactive' | 'suspended' | 'banned';

export interface OrganizationUser {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  role: OrganizationUserRole;
  status: OrganizationUserStatus;
  createdAt: string;
  updatedAt?: string;
  lastLogin?: string;
  organizationId?: string;
  organization?: {
    id: string;
    name: string;
    subdomain: string;
  };
}

export interface AddOrganizationUserData {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  role: OrganizationUserRole;
}

export interface UpdateOrganizationUserData {
  firstName?: string;
  lastName?: string;
  email?: string;
  role?: OrganizationUserRole;
  status?: OrganizationUserStatus;
}

export interface OrganizationUsersResponse {
  users: OrganizationUser[];
  organization: {
    id: string;
    name: string;
    subdomain: string;
  };
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}

export interface AddOrganizationUserResponse {
  user: OrganizationUser;
  organization: {
    id: string;
    name: string;
    subdomain: string;
  };
}

