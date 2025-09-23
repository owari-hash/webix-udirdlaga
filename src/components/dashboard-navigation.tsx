import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

type DashboardNavigationProps = {
  currentPage:
    | 'overview'
    | 'analytics'
    | 'users'
    | 'reports'
    | 'settings'
    | 'support'
    | 'payment'
    | 'organization'
    | 'webtoons'
    | 'content'
    | 'notifications'
    | 'security'
    | 'logs'
    | 'backup';
};

export default function DashboardNavigation({ currentPage }: DashboardNavigationProps) {
  const getButtonVariant = (page: string) => (currentPage === page ? 'contained' : 'outlined');

  const navigationSections = [
    {
      title: 'Үндсэн',
      items: [
        { id: 'overview', title: 'Нүүр', href: paths.dashboard.root, icon: 'solar:home-bold' },
        {
          id: 'analytics',
          title: 'Аналитик',
          href: paths.dashboard.analytics,
          icon: 'solar:chart-2-bold',
        },
        {
          id: 'reports',
          title: 'Тайлан',
          href: paths.dashboard.reports,
          icon: 'solar:file-text-bold',
        },
      ],
    },
    {
      title: 'Удирдлага',
      items: [
        {
          id: 'users',
          title: 'Хэрэглэгчид',
          href: paths.dashboard.users,
          icon: 'solar:users-group-rounded-bold',
        },
        {
          id: 'organization',
          title: 'Байгууллага',
          href: paths.organization.root,
          icon: 'solar:buildings-2-bold',
        },
        {
          id: 'webtoons',
          title: 'Вэбтоон',
          href: paths.dashboard.webtoons,
          icon: 'solar:book-2-bold',
        },
        {
          id: 'content',
          title: 'Контент',
          href: paths.dashboard.content,
          icon: 'solar:gallery-bold',
        },
      ],
    },
    {
      title: 'Санхүү',
      items: [
        {
          id: 'payment',
          title: 'Төлбөр & Нэхэмжлэл',
          href: paths.payment.root,
          icon: 'solar:card-bold',
        },
      ],
    },
    {
      title: 'Систем',
      items: [
        {
          id: 'notifications',
          title: 'Мэдэгдэл',
          href: paths.dashboard.notifications,
          icon: 'solar:bell-bold',
        },
        {
          id: 'security',
          title: 'Аюулгүй байдал',
          href: paths.dashboard.security,
          icon: 'solar:shield-bold',
        },
        { id: 'logs', title: 'Лог', href: paths.dashboard.logs, icon: 'solar:document-text-bold' },
        {
          id: 'backup',
          title: 'Нөөцлөл',
          href: paths.dashboard.backup,
          icon: 'solar:database-bold',
        },
      ],
    },
    {
      title: 'Тусламж',
      items: [
        {
          id: 'settings',
          title: 'Тохиргоо',
          href: paths.dashboard.settings,
          icon: 'solar:settings-bold',
        },
        {
          id: 'support',
          title: 'Дэмжлэг',
          href: paths.dashboard.support,
          icon: 'solar:headphones-bold',
        },
      ],
    },
  ];

  return (
    <Card sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold' }}>
        Хяналтын самбар
      </Typography>

      <Stack spacing={3}>
        {navigationSections.map((section, sectionIndex) => (
          <Box key={section.title}>
            <Typography
              variant="subtitle2"
              sx={{ mb: 1.5, color: 'text.secondary', fontWeight: 600 }}
            >
              {section.title}
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              {section.items.map((item) => (
                <Button
                  key={item.id}
                  component={RouterLink}
                  href={item.href}
                  variant={getButtonVariant(item.id)}
                  startIcon={<Iconify icon={item.icon} width={16} />}
                  size="small"
                  sx={{
                    minWidth: 'auto',
                    px: 2,
                    py: 1,
                    borderRadius: 2,
                    textTransform: 'none',
                    fontWeight: 500,
                  }}
                >
                  {item.title}
                </Button>
              ))}
            </Stack>
            {sectionIndex < navigationSections.length - 1 && (
              <Divider sx={{ mt: 2, opacity: 0.5 }} />
            )}
          </Box>
        ))}
      </Stack>
    </Card>
  );
}
