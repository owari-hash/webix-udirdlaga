// ----------------------------------------------------------------------

export type OrganizationStatus = 'pending' | 'active' | 'inactive' | 'suspended' | 'deleted';
export type BusinessType = 'publisher' | 'distributor' | 'retailer' | 'library' | 'other';
export type Industry = 'webtoon' | 'manga' | 'comics' | 'books' | 'media' | 'education' | 'other';
export type SubscriptionPlan = 'free' | 'basic' | 'premium' | 'enterprise';
export type SubscriptionStatus = 'active' | 'inactive' | 'suspended' | 'cancelled';
export type AdminRole = 'owner' | 'admin' | 'moderator';

export interface OrganizationAddress {
  street?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country: string;
  coordinates: {
    type: 'Point';
    coordinates: [number, number];
  };
}

export interface OrganizationSubscription {
  plan: SubscriptionPlan;
  status: SubscriptionStatus;
  startDate: string;
  endDate?: string;
  autoRenew: boolean;
}

export interface RentalSettings {
  maxRentalDays: number;
  lateFeePerDay: number;
  gracePeriodDays: number;
  autoReturn: boolean;
}

export interface UserSettings {
  allowSelfRegistration: boolean;
  requireEmailVerification: boolean;
  maxUsers: number;
}

export interface NotificationSettings {
  emailNotifications: boolean;
  smsNotifications: boolean;
  pushNotifications: boolean;
}

export interface OrganizationSettings {
  maxWebtoons: number;
  maxStorage: number;
  rentalSettings: RentalSettings;
  userSettings: UserSettings;
  notifications: NotificationSettings;
}

export interface ApiKey {
  name: string;
  key: string;
  permissions: string[];
  isActive: boolean;
  createdAt: string;
  lastUsed?: string;
}

export interface AdminUser {
  userId: string;
  role: AdminRole;
  permissions: string[];
  addedAt: string;
}

export interface OrganizationStats {
  totalUsers: number;
  totalWebtoons: number;
  totalRentals: number;
  lastActivity?: string;
}

export interface Organization {
  _id: string;
  // Basic Information
  name: string;
  displayName: string;
  description?: string;

  // Contact Information
  email: string[];
  phone: string[];

  // Registration Information
  registrationNumber: string;
  taxId?: string;

  // Address Information
  address: OrganizationAddress;

  // Subdomain Configuration
  subdomain: string;
  customDomain?: string;

  // Business Configuration
  businessType: BusinessType;
  industry: Industry;

  // Subscription and Billing
  subscription: OrganizationSubscription;

  // Settings and Configuration
  settings: OrganizationSettings;

  // API Configuration
  apiKeys: ApiKey[];

  // Status and Metadata
  status: OrganizationStatus;
  isVerified: boolean;
  verificationToken?: string;
  verificationExpires?: string;

  // Admin Information
  adminUsers: AdminUser[];

  // Statistics
  stats: OrganizationStats;

  // Timestamps
  createdAt: string;
  updatedAt: string;

  // Virtual fields
  domainUrl: string;
}

export interface CreateOrganizationData {
  name: string;
  displayName: string;
  description?: string;
  email: string[];
  phone: string[];
  password: string;
  registrationNumber: string;
  taxId?: string;
  address: Partial<OrganizationAddress>;
  subdomain: string;
  customDomain?: string;
  businessType: BusinessType;
  industry: Industry;
  subscription?: Partial<OrganizationSubscription>;
  settings?: Partial<OrganizationSettings>;
}

export interface UpdateOrganizationData extends Partial<CreateOrganizationData> {
  status?: OrganizationStatus;
  isVerified?: boolean;
}

export interface OrganizationFilters {
  status?: OrganizationStatus[];
  businessType?: BusinessType[];
  industry?: Industry[];
  subscriptionPlan?: SubscriptionPlan[];
  search?: string;
  page?: number;
  limit?: number;
}

export interface OrganizationListResponse {
  organizations: Organization[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface OrganizationCreationResponse {
  organization: Organization;
  loginCredentials: {
    username: string;
    password: string;
    loginUrl: string;
  };
}
