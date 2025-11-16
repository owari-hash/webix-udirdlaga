// ----------------------------------------------------------------------
// Tenant/Database Configuration
// Maps domains to their corresponding API endpoints and database names
// ----------------------------------------------------------------------

// Always use the main production domain
const mainDomain = 'anzaidev.fun';
const protocol = 'https';

export type TenantConfig = {
  subdomain: string;
  database: string;
  name: string;
};

export const TENANT_CONFIGS: TenantConfig[] = [
  {
    subdomain: 'udirdlaga',
    database: 'webix_udirdlaga',
    name: 'Udirdlaga',
  },
  {
    subdomain: 'goytest',
    database: 'webix_goytest',
    name: 'Goytest',
  },
  // Add more tenants as needed
];

// Default tenant (fallback)
export const DEFAULT_TENANT: TenantConfig = TENANT_CONFIGS[0];

// ----------------------------------------------------------------------
// Helper function to get API URL from subdomain
// ----------------------------------------------------------------------

export function getApiUrlFromSubdomain(subdomain: string): string {
  return `${protocol}://${subdomain}.${mainDomain}`;
}

// ----------------------------------------------------------------------
// Get tenant configuration based on domain
// ----------------------------------------------------------------------

export function getTenantByDomain(hostname: string): TenantConfig {
  // Remove port if present (e.g., localhost:3000 -> localhost)
  const domain = hostname.split(':')[0].toLowerCase();

  // Extract subdomain from domain (e.g., goytest.anzaidev.fun -> goytest)
  const parts = domain.split('.');
  let subdomain = '';

  // Check if domain matches main domain pattern
  if (domain.endsWith(mainDomain)) {
    // Extract subdomain (e.g., goytest.anzaidev.fun -> goytest)
    // mainDomain is 'anzaidev.fun', so parts would be ['goytest', 'anzaidev', 'fun']
    // We want the first part before 'anzaidev'
    const mainDomainParts = mainDomain.split('.');
    const mainDomainStartIndex = parts.length - mainDomainParts.length;
    
    if (mainDomainStartIndex > 0) {
      subdomain = parts[mainDomainStartIndex - 1];
    }
  } else if (parts.length > 1) {
    // For localhost or other domains, use first part as subdomain
    subdomain = parts[0];
  }

  // Find matching tenant by subdomain
  const tenant = TENANT_CONFIGS.find((config) => config.subdomain === subdomain);

  return tenant || DEFAULT_TENANT;
}

// ----------------------------------------------------------------------
// Get tenant configuration from current environment
// ----------------------------------------------------------------------

export function getCurrentTenant(): TenantConfig {
  if (typeof window !== 'undefined') {
    // Client-side: use window.location.hostname
    return getTenantByDomain(window.location.hostname);
  }

  // Server-side: use environment variable or default
  const envDomain = process.env.NEXT_PUBLIC_DOMAIN || process.env.DOMAIN;
  if (envDomain) {
    return getTenantByDomain(envDomain);
  }

  return DEFAULT_TENANT;
}

// ----------------------------------------------------------------------
// Get API URL for current tenant
// ----------------------------------------------------------------------

export function getTenantApiUrl(): string {
  const tenant = getCurrentTenant();
  return getApiUrlFromSubdomain(tenant.subdomain);
}

// ----------------------------------------------------------------------
// Get database name for current tenant
// ----------------------------------------------------------------------

export function getTenantDatabase(): string {
  const tenant = getCurrentTenant();
  return tenant.database;
}


