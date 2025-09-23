'use client';

import { useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import TableContainer from '@mui/material/TableContainer';
import { alpha, useTheme } from '@mui/material/styles';

import Iconify from 'src/components/iconify';
import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
import Scrollbar from 'src/components/scrollbar';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

// ----------------------------------------------------------------------

// Mock subdomain data
const MOCK_SUBDOMAINS = [
  {
    id: '1',
    subdomain: 'mongol-ulsyn-ikh-surguul',
    organization: 'Монгол Улсын Их Сургууль',
    status: 'active',
    ssl: true,
    createdAt: '2024-01-15',
    lastChecked: '2024-01-20',
  },
  {
    id: '2',
    subdomain: 'khudaldaany-bank',
    organization: 'Худалдааны банк',
    status: 'active',
    ssl: true,
    createdAt: '2024-02-20',
    lastChecked: '2024-02-25',
  },
  {
    id: '3',
    subdomain: 'eruul-mendiin-yaam',
    organization: 'Эрүүл мэндийн яам',
    status: 'inactive',
    ssl: false,
    createdAt: '2024-03-10',
    lastChecked: '2024-03-15',
  },
];

// ----------------------------------------------------------------------

export default function SubdomainManagementView() {
  const theme = useTheme();
  const [subdomains, setSubdomains] = useState(MOCK_SUBDOMAINS);

  const handleStatusToggle = (id: string) => {
    setSubdomains(
      subdomains.map((subdomain) =>
        subdomain.id === id
          ? { ...subdomain, status: subdomain.status === 'active' ? 'inactive' : 'active' }
          : subdomain
      )
    );
  };

  const handleSSLToggle = (id: string) => {
    setSubdomains(
      subdomains.map((subdomain) =>
        subdomain.id === id ? { ...subdomain, ssl: !subdomain.ssl } : subdomain
      )
    );
  };

  const handleRefresh = (id: string) => {
    setSubdomains(
      subdomains.map((subdomain) =>
        subdomain.id === id
          ? { ...subdomain, lastChecked: new Date().toISOString().split('T')[0] }
          : subdomain
      )
    );
  };

  return (
    <Container maxWidth="xl">
      <CustomBreadcrumbs
        sx={{ my: 5 }}
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Байгууллага', href: paths.organization.root },
          { name: 'Дэд домэйн удирдлага' },
        ]}
      />

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 5 }}>
        <Typography variant="h4">Дэд домэйн удирдлага</Typography>

        <Stack direction="row" spacing={2}>
          <Button
            variant="outlined"
            startIcon={<Iconify icon="solar:refresh-bold" />}
            onClick={() => {
              // Refresh all subdomains
              setSubdomains(
                subdomains.map((subdomain) => ({
                  ...subdomain,
                  lastChecked: new Date().toISOString().split('T')[0],
                }))
              );
            }}
          >
            Бүгдийг шинэчлэх
          </Button>

          <Button
            component={RouterLink}
            href={paths.organization.add}
            variant="contained"
            startIcon={<Iconify icon="mingcute:add-line" />}
          >
            Шинэ дэд домэйн нэмэх
          </Button>
        </Stack>
      </Stack>

      <Card>
        <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
          <Scrollbar>
            <Table size="medium" sx={{ minWidth: 960 }}>
              <TableHead>
                <TableRow>
                  <TableCell>Дэд домэйн</TableCell>
                  <TableCell>Байгууллага</TableCell>
                  <TableCell>Төлөв</TableCell>
                  <TableCell>SSL</TableCell>
                  <TableCell>Үүсгэсэн огноо</TableCell>
                  <TableCell>Сүүлд шалгасан</TableCell>
                  <TableCell align="right">Үйлдэл</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {subdomains.map((row) => (
                  <TableRow key={row.id} hover>
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
                          }}
                        >
                          <Iconify icon="solar:copy-bold" width={16} />
                        </IconButton>
                      </Stack>
                    </TableCell>

                    <TableCell>
                      <Typography variant="body2" noWrap>
                        {row.organization}
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
                            row.ssl ? theme.palette.success.main : theme.palette.warning.main,
                            0.16
                          ),
                          color: row.ssl
                            ? theme.palette.success.darker
                            : theme.palette.warning.darker,
                        }}
                      >
                        {row.ssl ? 'Идэвхтэй' : 'Идэвхгүй'}
                      </Box>
                    </TableCell>

                    <TableCell>{row.createdAt}</TableCell>
                    <TableCell>{row.lastChecked}</TableCell>

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

                        <IconButton
                          size="small"
                          color="primary"
                          onClick={() => handleRefresh(row.id)}
                          title="Шинэчлэх"
                        >
                          <Iconify icon="solar:refresh-bold" />
                        </IconButton>

                        <IconButton
                          size="small"
                          color={row.ssl ? 'warning' : 'success'}
                          onClick={() => handleSSLToggle(row.id)}
                          title={row.ssl ? 'SSL унтраах' : 'SSL асаах'}
                        >
                          <Iconify
                            icon={row.ssl ? 'solar:shield-cross-bold' : 'solar:shield-check-bold'}
                          />
                        </IconButton>

                        <IconButton
                          size="small"
                          color={row.status === 'active' ? 'error' : 'success'}
                          onClick={() => handleStatusToggle(row.id)}
                          title={row.status === 'active' ? 'Идэвхгүй болгох' : 'Идэвхжүүлэх'}
                        >
                          <Iconify
                            icon={
                              row.status === 'active' ? 'solar:eye-closed-bold' : 'solar:eye-bold'
                            }
                          />
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

      {/* Subdomain Statistics */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Дэд домэйн статистик
        </Typography>
        <Stack direction="row" spacing={3}>
          <Card sx={{ p: 2, minWidth: 150 }}>
            <Typography variant="h4" color="primary">
              {subdomains.length}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Нийт дэд домэйн
            </Typography>
          </Card>
          <Card sx={{ p: 2, minWidth: 150 }}>
            <Typography variant="h4" color="success.main">
              {subdomains.filter((s) => s.status === 'active').length}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Идэвхтэй
            </Typography>
          </Card>
          <Card sx={{ p: 2, minWidth: 150 }}>
            <Typography variant="h4" color="warning.main">
              {subdomains.filter((s) => s.ssl).length}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              SSL идэвхтэй
            </Typography>
          </Card>
        </Stack>
      </Box>
    </Container>
  );
}
