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

    const response = await apiClient.get<OrganizationListResponse>(endpoint);
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
};
