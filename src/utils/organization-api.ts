import { API_CONFIG } from 'src/config/api';
import {
  Organization,
  CreateOrganizationData,
  UpdateOrganizationData,
  OrganizationFilters,
  OrganizationListResponse,
  OrganizationCreationResponse,
} from 'src/types/organization';
import { apiClient } from './api-client';

// ----------------------------------------------------------------------

export const organizationApi = {
  // Get all organizations with filters
  async getOrganizations(filters: OrganizationFilters = {}): Promise<OrganizationListResponse> {
    const params = new URLSearchParams();

    if (filters.status?.length) {
      filters.status.forEach((status) => params.append('status', status));
    }
    if (filters.businessType?.length) {
      filters.businessType.forEach((type) => params.append('businessType', type));
    }
    if (filters.industry?.length) {
      filters.industry.forEach((industry) => params.append('industry', industry));
    }
    if (filters.subscriptionPlan?.length) {
      filters.subscriptionPlan.forEach((plan) => params.append('subscriptionPlan', plan));
    }
    if (filters.search) {
      params.append('search', filters.search);
    }
    if (filters.page) {
      params.append('page', filters.page.toString());
    }
    if (filters.limit) {
      params.append('limit', filters.limit.toString());
    }

    const queryString = params.toString();
    const endpoint = queryString
      ? `${API_CONFIG.ENDPOINTS.ORGANIZATIONS.LIST}?${queryString}`
      : API_CONFIG.ENDPOINTS.ORGANIZATIONS.LIST;

    // Ensure authentication is required for this endpoint
    const response = await apiClient.get<OrganizationListResponse>(endpoint, {
      requireAuth: true,
    });
    return response.data;
  },

  // Get organization by ID
  async getOrganization(id: string): Promise<Organization> {
    const response = await apiClient.get<Organization>(
      `${API_CONFIG.ENDPOINTS.ORGANIZATIONS.GET}/${id}`
    );
    return response.data;
  },

  // Create new organization
  async createOrganization(data: CreateOrganizationData): Promise<OrganizationCreationResponse> {
    const response = await apiClient.post<OrganizationCreationResponse>(
      API_CONFIG.ENDPOINTS.ORGANIZATIONS.CREATE,
      data
    );
    return response.data;
  },

  // Update organization
  async updateOrganization(id: string, data: UpdateOrganizationData): Promise<Organization> {
    const response = await apiClient.put<Organization>(
      `${API_CONFIG.ENDPOINTS.ORGANIZATIONS.UPDATE}/${id}`,
      data
    );
    return response.data;
  },

  // Delete organization
  async deleteOrganization(id: string): Promise<void> {
    await apiClient.delete(`${API_CONFIG.ENDPOINTS.ORGANIZATIONS.DELETE}/${id}`);
  },

  // Verify organization
  async verifyOrganization(id: string): Promise<Organization> {
    const response = await apiClient.post<Organization>(
      `${API_CONFIG.ENDPOINTS.ORGANIZATIONS.VERIFY}/${id}/verify`
    );
    return response.data;
  },

  // Get organization by subdomain (public)
  async getOrganizationBySubdomain(subdomain: string): Promise<Organization> {
    const response = await apiClient.get<Organization>(
      `${API_CONFIG.ENDPOINTS.ORGANIZATIONS.GET_BY_SUBDOMAIN}/${subdomain}`,
      {
        requireAuth: false,
      }
    );
    return response.data;
  },

  // Check if subdomain is available (public)
  async checkSubdomainAvailability(subdomain: string): Promise<{ available: boolean }> {
    const response = await apiClient.get<{ available: boolean }>(
      `${API_CONFIG.ENDPOINTS.ORGANIZATIONS.CHECK_SUBDOMAIN}/${subdomain}`,
      {
        requireAuth: false,
      }
    );
    return response.data;
  },

  // Organization User Management
  // Add user to organization
  async addUserToOrganization(
    orgId: string,
    userData: {
      firstName: string;
      lastName: string;
      username: string;
      email: string;
      password: string;
      role: 'admin' | 'moderator' | 'user';
    }
  ) {
    const response = await apiClient.post(
      `${API_CONFIG.ENDPOINTS.ORGANIZATIONS.GET}/${orgId}/users`,
      userData
    );
    return response.data;
  },

  // Get organization users with filters
  async getOrganizationUsers(
    orgId: string,
    filters?: {
      page?: number;
      limit?: number;
      role?: 'admin' | 'moderator' | 'user';
      status?: 'active' | 'inactive' | 'suspended' | 'banned';
      search?: string;
    }
  ) {
    const params = new URLSearchParams();
    if (filters?.page) params.append('page', filters.page.toString());
    if (filters?.limit) params.append('limit', filters.limit.toString());
    if (filters?.role) params.append('role', filters.role);
    if (filters?.status) params.append('status', filters.status);
    if (filters?.search) params.append('search', filters.search);

    const queryString = params.toString();
    const endpoint = queryString
      ? `${API_CONFIG.ENDPOINTS.ORGANIZATIONS.GET}/${orgId}/users?${queryString}`
      : `${API_CONFIG.ENDPOINTS.ORGANIZATIONS.GET}/${orgId}/users`;

    const response = await apiClient.get(endpoint);
    // apiClient.get returns { data, success, message, status }
    // The data field contains the backend's data object
    return response;
  },

  // Get single organization user
  async getOrganizationUser(orgId: string, userId: string) {
    const response = await apiClient.get(
      `${API_CONFIG.ENDPOINTS.ORGANIZATIONS.GET}/${orgId}/users/${userId}`
    );
    return response.data;
  },

  // Update organization user
  async updateOrganizationUser(
    orgId: string,
    userId: string,
    userData: {
      firstName?: string;
      lastName?: string;
      email?: string;
      role?: 'admin' | 'moderator' | 'user';
      status?: 'active' | 'inactive' | 'suspended' | 'banned';
    }
  ) {
    const response = await apiClient.put(
      `${API_CONFIG.ENDPOINTS.ORGANIZATIONS.UPDATE}/${orgId}/users/${userId}`,
      userData
    );
    return response.data;
  },

  // Delete organization user
  async deleteOrganizationUser(orgId: string, userId: string) {
    await apiClient.delete(`${API_CONFIG.ENDPOINTS.ORGANIZATIONS.DELETE}/${orgId}/users/${userId}`);
  },
};
