'use client';

import { useState } from 'react';

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

import { paths } from 'src/routes/paths';
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import { RouterLink } from 'src/routes/components';
import { useBoolean } from 'src/hooks/use-boolean';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

// ----------------------------------------------------------------------

// Mock data for organizations
const MOCK_ORGANIZATIONS = [
  {
    id: '1',
    name: 'Монгол Улсын Их Сургууль',
    subdomain: 'mongol-ulsyn-ikh-surguul',
    type: 'Боловсрол',
    address: 'Улаанбаатар хот, Сүхбаатар дүүрэг',
    phone: '+976-11-320077',
    email: 'info@num.edu.mn',
    status: 'active',
    createdAt: '2024-01-15',
  },
  {
    id: '2',
    name: 'Худалдааны банк',
    subdomain: 'khudaldaany-bank',
    type: 'Санхүү',
    address: 'Улаанбаатар хот, Баянгол дүүрэг',
    phone: '+976-11-331111',
    email: 'info@tradebank.mn',
    status: 'active',
    createdAt: '2024-02-20',
  },
  {
    id: '3',
    name: 'Эрүүл мэндийн яам',
    subdomain: 'eruul-mendiin-yaam',
    type: 'Төр засаг',
    address: 'Улаанбаатар хот, Хан-Уул дүүрэг',
    phone: '+976-11-323232',
    email: 'info@mohs.gov.mn',
    status: 'inactive',
    createdAt: '2024-03-10',
  },
];

// ----------------------------------------------------------------------

export default function OrganizationListView() {
  const theme = useTheme();
  const [organizations, setOrganizations] = useState(MOCK_ORGANIZATIONS);

  const openEditDialog = useBoolean();
  const openDeleteDialog = useBoolean();

  const handleStatusToggle = (id: string) => {
    setOrganizations(
      organizations.map((org) =>
        org.id === id ? { ...org, status: org.status === 'active' ? 'inactive' : 'active' } : org
      )
    );
  };

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
                  <TableCell>Төлөв</TableCell>
                  <TableCell>Үүсгэсэн огноо</TableCell>
                  <TableCell align="right">Үйлдэл</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {organizations.map((row) => (
                  <TableRow key={row.id} hover>
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
                            .webix.mn
                          </Typography>
                        </Box>
                        <IconButton
                          size="small"
                          onClick={() => {
                            navigator.clipboard.writeText(`${row.subdomain}.webix.mn`);
                            // You could add a toast notification here
                          }}
                        >
                          <Iconify icon="solar:copy-bold" width={16} />
                        </IconButton>
                      </Stack>
                    </TableCell>

                    <TableCell>{row.phone}</TableCell>

                    <TableCell>{row.email}</TableCell>

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
                            row.status === 'active'
                              ? theme.palette.success.main
                              : theme.palette.error.main,
                            0.16
                          ),
                          color:
                            row.status === 'active'
                              ? theme.palette.success.darker
                              : theme.palette.error.darker,
                        }}
                      >
                        {row.status === 'active' ? 'Идэвхтэй' : 'Идэвхгүй'}
                      </Box>
                    </TableCell>

                    <TableCell>{row.createdAt}</TableCell>

                    <TableCell align="right">
                      <Stack direction="row" spacing={1} justifyContent="flex-end">
                        <IconButton
                          size="small"
                          color="info"
                          onClick={() => window.open(`https://${row.subdomain}.webix.mn`, '_blank')}
                          title="Дэд домэйн нээх"
                        >
                          <Iconify icon="solar:link-bold" />
                        </IconButton>

                        <IconButton size="small" color="primary">
                          <Iconify icon="solar:eye-bold" />
                        </IconButton>

                        <IconButton
                          size="small"
                          color="warning"
                          onClick={() => {
                            openEditDialog.onTrue();
                          }}
                        >
                          <Iconify icon="solar:pen-bold" />
                        </IconButton>

                        <IconButton
                          size="small"
                          color={row.status === 'active' ? 'error' : 'success'}
                          onClick={() => handleStatusToggle(row.id)}
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
                            openDeleteDialog.onTrue();
                          }}
                        >
                          <Iconify icon="solar:trash-bin-trash-bold" />
                        </IconButton>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Scrollbar>
        </TableContainer>
      </Card>

      {/* Add Organization Dialog */}
      {/* Edit Organization Dialog */}
      {/* Delete Confirmation Dialog */}
      {/* View Organization Dialog */}
    </Container>
  );
}
