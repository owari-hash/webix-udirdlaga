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
    const response = await apiClient.get<{ organization: Organization } | Organization>(
      `${API_CONFIG.ENDPOINTS.ORGANIZATIONS.GET}/${id}`
    );
    // Handle both response structures: {organization: {...}} or direct organization object
    const data = response.data as any;
    return data.organization || data;
  },

  // Create new organization
  async createOrganization(data: CreateOrganizationData): Promise<OrganizationCreationResponse> {
    // If logo is a File, use FormData, otherwise use JSON
    if (data.logo instanceof File) {
      const formData = new FormData();

      // Add logo file (multer expects field name 'logo')
      formData.append('logo', data.logo);

      // Add other fields
      formData.append('name', data.name);
      formData.append('displayName', data.displayName);
      if (data.description) formData.append('description', data.description);

      // Add email array - send as repeated fields for proper parsing
      data.email.forEach((email) => {
        formData.append('email', email);
      });

      // Add phone array - send as repeated fields for proper parsing
      data.phone.forEach((phone) => {
        formData.append('phone', phone);
      });

      formData.append('registrationNumber', data.registrationNumber);
      if (data.taxId) formData.append('taxId', data.taxId);

      // Add address as JSON string
      if (data.address) {
        formData.append('address', JSON.stringify(data.address));
      }

      formData.append('subdomain', data.subdomain);
      if (data.customDomain) formData.append('customDomain', data.customDomain);
      formData.append('businessType', data.businessType);
      formData.append('industry', data.industry);

      // Add adminUser if password is provided (as nested FormData fields)
      if (data.password) {
        formData.append('adminUser[firstName]', 'Admin');
        formData.append('adminUser[lastName]', 'User');
        formData.append('adminUser[email]', data.email[0] || '');
        formData.append('adminUser[password]', data.password);
      }

      if (data.subscription) {
        formData.append('subscription', JSON.stringify(data.subscription));
      }

      if (data.settings) {
        formData.append('settings', JSON.stringify(data.settings));
      }

      const response = await apiClient.post<OrganizationCreationResponse>(
        API_CONFIG.ENDPOINTS.ORGANIZATIONS.CREATE,
        formData
      );
      return response.data;
    }

    // For JSON requests, also add adminUser if password is provided
    const requestData: any = { ...data };
    if (data.password && !requestData.adminUser) {
      requestData.adminUser = {
        firstName: 'Admin',
        lastName: 'User',
        email: data.email[0] || '',
        password: data.password,
      };
      // Remove password from top level as it should be in adminUser
      delete requestData.password;
    }

    const response = await apiClient.post<OrganizationCreationResponse>(
      API_CONFIG.ENDPOINTS.ORGANIZATIONS.CREATE,
      requestData
    );
    return response.data;
  },

  // Update organization
  async updateOrganization(id: string, data: UpdateOrganizationData): Promise<Organization> {
    // If logo is a File, use FormData, otherwise use JSON
    if (data.logo instanceof File) {
      const formData = new FormData();

      // Add logo file (multer expects field name 'logo')
      formData.append('logo', data.logo);

      // Add other fields
      if (data.name) formData.append('name', data.name);
      if (data.displayName) formData.append('displayName', data.displayName);
      if (data.description !== undefined) formData.append('description', data.description || '');

      // Add email array - send as repeated fields for proper parsing
      if (data.email) {
        data.email.forEach((email) => {
          formData.append('email', email);
        });
      }

      // Add phone array - send as repeated fields for proper parsing
      if (data.phone) {
        data.phone.forEach((phone) => {
          formData.append('phone', phone);
        });
      }

      if (data.registrationNumber) formData.append('registrationNumber', data.registrationNumber);
      if (data.taxId) formData.append('taxId', data.taxId);

      // Add address as JSON string
      if (data.address) {
        formData.append('address', JSON.stringify(data.address));
      }

      if (data.subdomain) formData.append('subdomain', data.subdomain);
      if (data.customDomain) formData.append('customDomain', data.customDomain);
      if (data.businessType) formData.append('businessType', data.businessType);
      if (data.industry) formData.append('industry', data.industry);

      if (data.status) formData.append('status', data.status);
      if (data.isVerified !== undefined) formData.append('isVerified', String(data.isVerified));

      if (data.subscription) {
        formData.append('subscription', JSON.stringify(data.subscription));
      }

      if (data.settings) {
        formData.append('settings', JSON.stringify(data.settings));
      }

      const response = await apiClient.put<Organization>(
        `${API_CONFIG.ENDPOINTS.ORGANIZATIONS.UPDATE}/${id}`,
        formData
      );
      return response.data;
    }

    // For JSON requests, include logo if it's a string (existing URL)
    // If logo is null/undefined, don't send it (to keep existing logo)
    // If logo is a string, send it to update the logo URL
    const requestData: any = { ...data };

    // Only include logo in request if it's explicitly provided (string or null)
    // If logo is undefined, remove it from the request to keep existing logo
    if (data.logo === null || (typeof data.logo === 'string' && data.logo !== '')) {
      requestData.logo = data.logo;
    } else if (data.logo === undefined) {
      delete requestData.logo;
    }

    const response = await apiClient.put<Organization>(
      `${API_CONFIG.ENDPOINTS.ORGANIZATIONS.UPDATE}/${id}`,
      requestData
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

  // QPay Methods
  // Get QPay settings
  async getQPaySettings(orgId: string) {
    const response = await apiClient.get(
      `${API_CONFIG.ENDPOINTS.ORGANIZATIONS.GET}/${orgId}/qpay/settings`
    );
    return response.data;
  },

  // Set QPay settings
  async setQPaySettings(orgId: string, data: { terminal_id: string }) {
    const response = await apiClient.put(
      `${API_CONFIG.ENDPOINTS.ORGANIZATIONS.UPDATE}/${orgId}/qpay/settings`,
      data
    );
    return response.data;
  },

  // Get QPay merchant status
  async getQPayMerchant(orgId: string) {
    const response = await apiClient.get(
      `${API_CONFIG.ENDPOINTS.ORGANIZATIONS.GET}/${orgId}/qpay/merchant`
    );
    return response.data;
  },

  // Register QPay merchant
  async registerQPayMerchant(
    orgId: string,
    data: {
      merchant_type: 'company' | 'person';
      terminal_id?: string;
      username?: string;
      password?: string;
      // Company merchant fields
      owner_first_name?: string;
      owner_last_name?: string;
      register_number: string;
      company_name?: string;
      name?: string;
      name_eng?: string;
      mcc_code: string;
      city: string;
      district: string;
      address: string;
      phone: string;
      email: string;
      owner_register_no?: string;
      // Person merchant fields
      first_name?: string;
      last_name?: string;
      business_name?: string;
      business_name_eng?: string;
    }
  ) {
    const response = await apiClient.post(
      `${API_CONFIG.ENDPOINTS.ORGANIZATIONS.GET}/${orgId}/qpay/register`,
      data
    );
    return response.data;
  },

  // Delete QPay merchant
  async deleteQPayMerchant(orgId: string) {
    const response = await apiClient.delete(
      `${API_CONFIG.ENDPOINTS.ORGANIZATIONS.DELETE}/${orgId}/qpay/merchant`
    );
    return response.data;
  },
};
