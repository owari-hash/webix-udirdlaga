'use client';

import { Organization } from 'src/types/organization';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';

// ----------------------------------------------------------------------

type Props = {
  organization: Organization;
};

export default function OrganizationSubdomainView({ organization }: Props) {
  const getStatusColor = (status: string) => {
    const colorMap = {
      active: 'success',
      inactive: 'error',
      pending: 'warning',
      suspended: 'error',
      deleted: 'default',
    };
    return colorMap[status as keyof typeof colorMap] || 'default';
  };

  const getStatusLabel = (status: string) => {
    const statusMap = {
      active: 'Идэвхтэй',
      inactive: 'Идэвхгүй',
      pending: 'Хүлээгдэж буй',
      suspended: 'Түдгэлзүүлсэн',
      deleted: 'Устгасан',
    };
    return statusMap[status as keyof typeof statusMap] || status;
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" gutterBottom>
          {organization.displayName}
        </Typography>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          {organization.name}
        </Typography>
        <Stack direction="row" spacing={2} alignItems="center" sx={{ mt: 2 }}>
          <Chip
            label={getStatusLabel(organization.status)}
            color={getStatusColor(organization.status) as any}
            size="small"
          />
          <Chip label={organization.businessType} variant="outlined" size="small" />
          <Chip label={organization.industry} variant="outlined" size="small" />
        </Stack>
      </Box>

      {/* Organization Details */}
      <Stack spacing={3}>
        {/* Basic Information */}
        <Card sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Үндсэн мэдээлэл
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Stack spacing={2}>
            <Box>
              <Typography variant="body2" color="text.secondary">
                Дэд домэйн
              </Typography>
              <Typography variant="body1">{organization.subdomain}.localhost:8002</Typography>
            </Box>

            {organization.description && (
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Тайлбар
                </Typography>
                <Typography variant="body1">{organization.description}</Typography>
              </Box>
            )}

            <Box>
              <Typography variant="body2" color="text.secondary">
                Бүртгэлийн дугаар
              </Typography>
              <Typography variant="body1">{organization.registrationNumber}</Typography>
            </Box>
          </Stack>
        </Card>

        {/* Contact Information */}
        <Card sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Холбоо барих мэдээлэл
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Stack spacing={2}>
            {organization.email.length > 0 && (
              <Box>
                <Typography variant="body2" color="text.secondary">
                  И-мэйл
                </Typography>
                {organization.email.map((email, index) => (
                  <Typography key={index} variant="body1">
                    {email}
                  </Typography>
                ))}
              </Box>
            )}

            {organization.phone.length > 0 && (
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Утас
                </Typography>
                {organization.phone.map((phone, index) => (
                  <Typography key={index} variant="body1">
                    {phone}
                  </Typography>
                ))}
              </Box>
            )}
          </Stack>
        </Card>

        {/* Address Information */}
        <Card sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Хаягийн мэдээлэл
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Stack spacing={1}>
            {organization.address.street && (
              <Typography variant="body1">{organization.address.street}</Typography>
            )}
            {organization.address.city && (
              <Typography variant="body1">{organization.address.city}</Typography>
            )}
            {organization.address.state && (
              <Typography variant="body1">{organization.address.state}</Typography>
            )}
            {organization.address.postalCode && (
              <Typography variant="body1">{organization.address.postalCode}</Typography>
            )}
            <Typography variant="body1">{organization.address.country}</Typography>
          </Stack>
        </Card>

        {/* Subscription Information */}
        <Card sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Захиалгын мэдээлэл
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Stack spacing={2}>
            <Box>
              <Typography variant="body2" color="text.secondary">
                Төлөвлөгөө
              </Typography>
              <Typography variant="body1">{organization.subscription.plan}</Typography>
            </Box>
            <Box>
              <Typography variant="body2" color="text.secondary">
                Төлөв
              </Typography>
              <Typography variant="body1">{organization.subscription.status}</Typography>
            </Box>
            <Box>
              <Typography variant="body2" color="text.secondary">
                Эхлэх огноо
              </Typography>
              <Typography variant="body1">
                {new Date(organization.subscription.startDate).toLocaleDateString('mn-MN')}
              </Typography>
            </Box>
          </Stack>
        </Card>

        {/* Statistics */}
        <Card sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Статистик
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Stack direction="row" spacing={4}>
            <Box>
              <Typography variant="h4" color="primary">
                {organization.stats.totalUsers}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Хэрэглэгч
              </Typography>
            </Box>
            <Box>
              <Typography variant="h4" color="primary">
                {organization.stats.totalWebtoons}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Вебтуун
              </Typography>
            </Box>
            <Box>
              <Typography variant="h4" color="primary">
                {organization.stats.totalRentals}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Түрээс
              </Typography>
            </Box>
          </Stack>
        </Card>
      </Stack>
    </Container>
  );
}
