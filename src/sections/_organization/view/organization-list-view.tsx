'use client';

import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { alpha, useTheme } from '@mui/material/styles';
import TableContainer from '@mui/material/TableContainer';
import CircularProgress from '@mui/material/CircularProgress';

import { paths } from 'src/routes/paths';
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import { RouterLink } from 'src/routes/components';
import { useBoolean } from 'src/hooks/use-boolean';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { useSnackbar } from 'src/components/snackbar';
import { organizationApi } from 'src/utils/organization-api';
import { Organization, OrganizationStatus, SubscriptionStatus } from 'src/types/organization';
import QPayRegisterDialog from './qpay-register-dialog';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function OrganizationListView() {
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();

  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const openDeleteDialog = useBoolean();
  const openQPayDialog = useBoolean();
  const [selectedOrgId, setSelectedOrgId] = useState<string | null>(null);

  // Load organizations on component mount
  useEffect(() => {
    const loadOrganizations = async () => {
      try {
        setLoading(true);
        const data = await organizationApi.getOrganizations();
        setOrganizations(data.organizations);
      } catch (err) {
        console.error('Failed to load organizations:', err);
        setError('Байгууллагуудыг ачаалахад алдаа гарлаа');
        enqueueSnackbar('Байгууллагуудыг ачаалахад алдаа гарлаа', { variant: 'error' });
      } finally {
        setLoading(false);
      }
    };

    loadOrganizations();
  }, [enqueueSnackbar]);

  const handleStatusToggle = async (id: string) => {
    try {
      const org = organizations.find((o) => o._id === id);
      if (!org) return;

      const newStatus: OrganizationStatus = org.status === 'active' ? 'inactive' : 'active';
      await organizationApi.updateOrganization(id, { status: newStatus });

      setOrganizations(organizations.map((o) => (o._id === id ? { ...o, status: newStatus } : o)));

      enqueueSnackbar(
        `Байгууллага ${newStatus === 'active' ? 'идэвхжүүллээ' : 'идэвхгүй болголоо'}`,
        { variant: 'success' }
      );
    } catch (err) {
      console.error('Failed to update organization status:', err);
      enqueueSnackbar('Төлөв шинэчлэхэд алдаа гарлаа', { variant: 'error' });
    }
  };

  const handleExtendLicense = async (id: string) => {
    try {
      const org = organizations.find((o) => o._id === id);
      if (!org) return;

      const currentEndDate = org.subscription?.endDate ? new Date(org.subscription.endDate) : new Date();
      // If expired, start from now. If active, add to existing end date.
      const baseDate = currentEndDate < new Date() ? new Date() : currentEndDate;
      
      const newEndDate = new Date(baseDate);
      newEndDate.setDate(newEndDate.getDate() + 30);

      const updateData = {
        subscription: {
          ...org.subscription,
          status: 'active' as SubscriptionStatus, // Reactivate if inactive
          endDate: newEndDate.toISOString(),
        }
      };

      await organizationApi.updateOrganization(id, updateData);

      setOrganizations(organizations.map((o) => (o._id === id ? { 
        ...o, 
        subscription: { 
          ...o.subscription, 
          status: 'active', 
          endDate: newEndDate.toISOString() 
        } 
      } : o)));

      enqueueSnackbar('Лиценз 30 хоногоор сунгагдлаа', { variant: 'success' });
    } catch (err) {
      console.error('Failed to extend license:', err);
      enqueueSnackbar('Лиценз сунгахад алдаа гарлаа', { variant: 'error' });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await organizationApi.deleteOrganization(id);
      setOrganizations(organizations.filter((org) => org._id !== id));
      enqueueSnackbar('Байгууллага амжилттай устгалаа', { variant: 'success' });
      openDeleteDialog.onFalse();
    } catch (err) {
      console.error('Failed to delete organization:', err);
      enqueueSnackbar('Байгууллага устгахад алдаа гарлаа', { variant: 'error' });
    }
  };

  const getStatusLabel = (status: OrganizationStatus) => {
    const statusMap = {
      active: 'Идэвхтэй',
      inactive: 'Идэвхгүй',
      pending: 'Хүлээгдэж буй',
      suspended: 'Түдгэлзүүлсэн',
      deleted: 'Устгасан',
    };
    return statusMap[status] || status;
  };

  const getStatusColor = (status: OrganizationStatus) => {
    const colorMap = {
      active: 'success',
      inactive: 'error',
      pending: 'warning',
      suspended: 'error',
      deleted: 'default',
    };
    return colorMap[status] || 'default';
  };

  if (loading) {
    return (
      <Container maxWidth="xl">
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="xl">
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
          <Typography color="error">{error}</Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl">
      <CustomBreadcrumbs
        sx={{ my: 5 }}
        links={[{ name: 'Dashboard', href: paths.dashboard.root }, { name: 'Байгууллага' }]}
      />

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 5 }}>
        <Typography variant="h4">Байгууллага</Typography>

        <Button
          component={RouterLink}
          href={paths.organization.add}
          variant="contained"
          startIcon={<Iconify icon="mingcute:add-line" />}
        >
          Шинэ байгууллага нэмэх
        </Button>
      </Stack>

      <Card>
        <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
          <Scrollbar>
            <Table size="medium" sx={{ minWidth: 960 }}>
              <TableHead>
                <TableRow>
                  <TableCell>Байгууллагын нэр</TableCell>
                  <TableCell>Дэд домэйн</TableCell>
                  <TableCell>Утас</TableCell>
                  <TableCell>И-мэйл</TableCell>
                  <TableCell>Лиценз дуусах</TableCell>
                  <TableCell>Төлөв</TableCell>
                  <TableCell>Үүсгэсэн огноо</TableCell>
                  <TableCell align="right">Үйлдэл</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {organizations && organizations.length > 0 ? (
                  organizations.map((row) => (
                    <TableRow key={row._id} hover>
                      <TableCell>
                        <Typography variant="subtitle2" noWrap>
                          {row.name}
                        </Typography>
                      </TableCell>

                      <TableCell>
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              px: 1,
                              py: 0.5,
                              bgcolor: 'primary.50',
                              borderRadius: 1,
                              border: '1px solid',
                              borderColor: 'primary.200',
                            }}
                          >
                            <Typography variant="body2" color="primary.main" fontWeight="medium">
                              {row.subdomain}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ ml: 0.5 }}>
                              .anzaidev.fun
                            </Typography>
                          </Box>
                          <IconButton
                            size="small"
                            onClick={() => {
                              navigator.clipboard.writeText(`${row.subdomain}..anzaidev.fun`);
                              enqueueSnackbar('Дэд домэйн хуулагдлаа', { variant: 'success' });
                            }}
                          >
                            <Iconify icon="solar:copy-bold" width={16} />
                          </IconButton>
                        </Stack>
                      </TableCell>

                      <TableCell>{row.phone?.[0] || '-'}</TableCell>

                      <TableCell>{row.email?.[0] || '-'}</TableCell>

                      <TableCell>
                        <Typography 
                          variant="body2" 
                          color={
                            row.subscription?.endDate && new Date(row.subscription.endDate) < new Date() 
                              ? 'error.main' 
                              : 'success.main'
                          }
                          fontWeight="bold"
                        >
                          {row.subscription?.endDate 
                            ? new Date(row.subscription.endDate).toLocaleDateString('mn-MN') 
                            : 'Хугацаагүй'}
                        </Typography>
                      </TableCell>

                      <TableCell>
                        <Box
                          sx={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            px: 1.5,
                            py: 0.5,
                            borderRadius: 1,
                            typography: 'caption',
                            bgcolor: alpha(
                              getStatusColor(row.status) === 'success'
                                ? theme.palette.success.main
                                : getStatusColor(row.status) === 'warning'
                                  ? theme.palette.warning.main
                                  : theme.palette.error.main,
                              0.16
                            ),
                            color:
                              getStatusColor(row.status) === 'success'
                                ? theme.palette.success.darker
                                : getStatusColor(row.status) === 'warning'
                                  ? theme.palette.warning.darker
                                  : theme.palette.error.darker,
                          }}
                        >
                          {getStatusLabel(row.status)}
                        </Box>
                      </TableCell>

                      <TableCell>{new Date(row.createdAt).toLocaleDateString('mn-MN')}</TableCell>

                      <TableCell align="right">
                        <Stack direction="row" spacing={1} justifyContent="flex-end">
                          <IconButton
                            size="small"
                            color="info"
                            onClick={() =>
                              window.open(`http://${row.subdomain}.anzaidev.fun`, '_blank')
                            }
                            title="Дэд домэйн нээх"
                          >
                            <Iconify icon="solar:link-bold" />
                          </IconButton>

                          <Button
                            size="small"
                            variant="soft"
                            color="success"
                            startIcon={<Iconify icon="solar:calendar-add-bold" />}
                            onClick={() => handleExtendLicense(row._id)}
                            sx={{ px: 1, minWidth: 'auto' }}
                          >
                            +30
                          </Button>

                          <IconButton
                            size="small"
                            color="secondary"
                            onClick={() => {
                              setSelectedOrgId(row._id);
                              openQPayDialog.onTrue();
                            }}
                            title="QPay бүртгэл"
                          >
                            <Iconify icon="solar:wallet-money-bold" />
                          </IconButton>

                          <IconButton size="small" color="primary">
                            <Iconify icon="solar:eye-bold" />
                          </IconButton>

                          <IconButton
                            size="small"
                            color="warning"
                            component={RouterLink}
                            href={`${paths.organization.edit}/${row._id}`}
                          >
                            <Iconify icon="solar:pen-bold" />
                          </IconButton>

                          <IconButton
                            size="small"
                            color={row.status === 'active' ? 'error' : 'success'}
                            onClick={() => handleStatusToggle(row._id)}
                          >
                            <Iconify
                              icon={
                                row.status === 'active' ? 'solar:eye-closed-bold' : 'solar:eye-bold'
                              }
                            />
                          </IconButton>

                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => {
                              handleDelete(row._id);
                            }}
                          >
                            <Iconify icon="solar:trash-bin-trash-bold" />
                          </IconButton>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} align="center" sx={{ py: 4 }}>
                      <Typography variant="body2" color="text.secondary">
                        Байгууллага олдсонгүй
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </Scrollbar>
        </TableContainer>
      </Card>

      {/* Add Organization Dialog */}
      {/* Edit Organization Dialog */}
      {/* Delete Confirmation Dialog */}
      {/* View Organization Dialog */}

      {/* QPay Register Dialog */}
      {selectedOrgId && (
        <QPayRegisterDialog
          open={openQPayDialog.value}
          onClose={() => {
            openQPayDialog.onFalse();
            setSelectedOrgId(null);
          }}
          orgId={selectedOrgId}
          onSuccess={() => {
            // Optionally refresh organizations list
            const loadOrganizations = async () => {
              try {
                const data = await organizationApi.getOrganizations();
                setOrganizations(data.organizations);
              } catch (err) {
                console.error('Failed to load organizations:', err);
              }
            };
            loadOrganizations();
          }}
        />
      )}
    </Container>
  );
}
