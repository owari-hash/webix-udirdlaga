'use client';

import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

import { paths } from 'src/routes/paths';

// ----------------------------------------------------------------------

export function useNavigation() {
  const router = useRouter();

  const navigateTo = useCallback(
    (path: string) => {
      if (path) {
        router.push(path);
      }
    },
    [router]
  );

  const navigationMap = {
    // Dashboard
    dashboard: () => navigateTo(paths.dashboard.root),
    analytics: () => navigateTo(paths.dashboard.analytics),
    reports: () => navigateTo(paths.dashboard.reports),
    users: () => navigateTo(paths.dashboard.users),
    webtoons: () => navigateTo(paths.dashboard.webtoons),
    content: () => navigateTo(paths.dashboard.content),
    notifications: () => navigateTo(paths.dashboard.notifications),
    security: () => navigateTo(paths.dashboard.security),
    logs: () => navigateTo(paths.dashboard.logs),
    backup: () => navigateTo(paths.dashboard.backup),
    settings: () => navigateTo(paths.dashboard.settings),
    support: () => navigateTo(paths.dashboard.support),

    // Organization
    organization: () => navigateTo(paths.organization.root),
    organizationList: () => navigateTo(paths.organization.list),
    organizationAdd: () => navigateTo(paths.organization.add),
    organizationSubdomain: () => navigateTo(paths.organization.subdomain),

    // Payment
    payment: () => navigateTo(paths.payment.root),
    paymentManagement: () => navigateTo(paths.payment.root),
    paymentHistory: () => navigateTo(paths.payment.history),

    // Invoice
    invoiceList: () => navigateTo(paths.payment.invoice.list),
    invoiceCreate: () => navigateTo(paths.payment.invoice.create),
    invoiceSend: () => navigateTo(paths.payment.invoice.send),
    invoiceReport: () => navigateTo(paths.payment.invoice.report),

    // Other
    components: () => navigateTo(paths.components.root),
    pages: () => navigateTo(paths.pages),
    docs: () => navigateTo(paths.docs),
  };

  return {
    navigateTo,
    navigationMap,
  };
}
