'use client';

import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { alpha, useTheme } from '@mui/material/styles';

import Iconify from 'src/components/iconify';
import { useSnackbar } from 'src/components/snackbar';
import { useAuth } from 'src/contexts/auth-context';
import { organizationApi } from 'src/utils/organization-api';
import { Organization, OrganizationListResponse } from 'src/types/organization';
import { OrganizationUser, OrganizationUsersResponse } from 'src/types/organization-user';
import AddOrgAdminDialog from './add-org-admin-dialog';
import { useBoolean } from 'src/hooks/use-boolean';
import { apiClient } from 'src/utils/api-client';

// ----------------------------------------------------------------------

type UserType = {
  id: string | number;
  name: string;
  email: string;
  organization?: string;
  organizationId?: string;
  role: 'super_admin' | 'org_admin' | 'org_moderator' | 'org_user' | 'viewer';
  status: 'active' | 'inactive' | 'suspended';
  lastLogin: string;
  avatar?: string;
  webtoons?: number;
  views?: number;
};

// System Users (Super Admins)
const MOCK_SYSTEM_USERS: UserType[] = [
  {
    id: 1,
    name: 'Батбаяр',
    email: 'batbayar@num.edu.mn',
    role: 'super_admin',
    status: 'active',
    lastLogin: '2024-01-20 14:30',
    avatar: '/assets/images/avatar/avatar_1.jpg',
  },
];

// Organization Users (org_user, org_moderator)
const MOCK_ORG_USERS: UserType[] = [
  {
    id: 2,
    name: 'Сэрээ',
    email: 'seree@technology.mn',
    organization: 'Шинэ Монгол Технологи',
    organizationId: 'org_001',
    role: 'org_user',
    status: 'active',
    lastLogin: '2024-01-20 12:15',
    avatar: '/assets/images/avatar/avatar_2.jpg',
    webtoons: 8,
    views: 856,
  },
  {
    id: 3,
    name: 'Оюунчимэг',
    email: 'oyunchimeg@bank.mn',
    organization: 'Монголын Банк',
    organizationId: 'org_002',
    role: 'org_moderator',
    status: 'inactive',
    lastLogin: '2024-01-18 09:45',
    avatar: '/assets/images/avatar/avatar_3.jpg',
    webtoons: 15,
    views: 2341,
  },
  {
    id: 4,
    name: 'Энхтуяа',
    email: 'enkhtuya@health.mn',
    organization: 'Эрүүл Мэндийн Төв',
    organizationId: 'org_003',
    role: 'org_user',
    status: 'active',
    lastLogin: '2024-01-20 16:20',
    avatar: '/assets/images/avatar/avatar_4.jpg',
    webtoons: 5,
    views: 432,
  },
  {
    id: 5,
    name: 'Ганбаатар',
    email: 'ganbaatar@university.mn',
    organization: 'Монгол Улсын Их Сургууль',
    organizationId: 'org_001',
    role: 'org_user',
    status: 'suspended',
    lastLogin: '2024-01-15 11:30',
    avatar: '/assets/images/avatar/avatar_5.jpg',
    webtoons: 3,
    views: 123,
  },
];

// Organization Admin Users
const MOCK_ORG_ADMIN_USERS: UserType[] = [
  {
    id: 6,
    name: 'Админ Хэрэглэгч',
    email: 'admin@num.edu.mn',
    organization: 'Монгол Улсын Их Сургууль',
    organizationId: 'org_001',
    role: 'org_admin',
    status: 'active',
    lastLogin: '2024-01-20 10:00',
    avatar: '/assets/images/avatar/avatar_1.jpg',
  },
];

const USER_STATS = [
  {
    title: 'Нийт хэрэглэгч',
    value: '1,234',
    change: '+12%',
    changeType: 'increase',
    icon: 'solar:users-group-rounded-bold',
    color: 'primary',
  },
  {
    title: 'Идэвхтэй хэрэглэгч',
    value: '987',
    change: '+8%',
    changeType: 'increase',
    icon: 'solar:user-check-bold',
    color: 'success',
  },
  {
    title: 'Идэвхгүй хэрэглэгч',
    value: '156',
    change: '-2%',
    changeType: 'decrease',
    icon: 'solar:user-minus-bold',
    color: 'warning',
  },
  {
    title: 'Түдгэлзүүлсэн',
    value: '91',
    change: '+1%',
    changeType: 'increase',
    icon: 'solar:user-block-bold',
    color: 'error',
  },
];

// ----------------------------------------------------------------------

type TabValue = 'system' | 'org_users' | 'org_admins';

export default function DashboardUsersView() {
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();
  const { tokens, isAuthenticated, isLoading: authLoading } = useAuth();
  const addDialogOpen = useBoolean();
  
  const [activeTab, setActiveTab] = useState<TabValue>('system');
  const [systemUsers, setSystemUsers] = useState<UserType[]>(MOCK_SYSTEM_USERS);
  const [orgUsers, setOrgUsers] = useState<UserType[]>([]);
  const [orgAdminUsers, setOrgAdminUsers] = useState<UserType[]>([]);
  const [filterStatus, setFilterStatus] = useState('all');
  const [loading, setLoading] = useState(false);
  const [selectedOrgId, setSelectedOrgId] = useState<string>('');
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [loadingOrgs, setLoadingOrgs] = useState(false);
  
  // Ensure API client has tokens
  useEffect(() => {
    if (tokens) {
      apiClient.setTokens(tokens);
    }
  }, [tokens]);
  
  // Fetch organizations on mount (only if authenticated)
  useEffect(() => {
    if (authLoading || !isAuthenticated) {
      return;
    }

    const fetchOrganizations = async () => {
      try {
        setLoadingOrgs(true);
        const data = await organizationApi.getOrganizations({ limit: 100 });
        // Handle both direct array and response object
        if (Array.isArray(data)) {
          setOrganizations(data);
        } else if (data && data.organizations) {
          setOrganizations(data.organizations);
        } else {
          setOrganizations([]);
        }
      } catch (error) {
        console.error('Error fetching organizations:', error);
        enqueueSnackbar('Байгууллагуудыг ачаалахад алдаа гарлаа', { variant: 'error' });
        setOrganizations([]);
      } finally {
        setLoadingOrgs(false);
      }
    };
    
    fetchOrganizations();
  }, [enqueueSnackbar, isAuthenticated, authLoading]);
  
  // Clear selected org when switching to system tab
  useEffect(() => {
    if (activeTab === 'system') {
      setSelectedOrgId('');
      // Don't clear org users/admin users when switching tabs - keep them for when user comes back
    }
  }, [activeTab]);

  // Fetch organization users when tab changes or filter changes
  useEffect(() => {
    if ((activeTab === 'org_users' || activeTab === 'org_admins') && selectedOrgId) {
      console.log('useEffect triggered - fetching users for tab:', activeTab, 'orgId:', selectedOrgId);
      fetchOrganizationUsers();
    } else {
      console.log('useEffect - not fetching. activeTab:', activeTab, 'selectedOrgId:', selectedOrgId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab, selectedOrgId, filterStatus]);

  const fetchOrganizationUsers = async () => {
    if (!selectedOrgId) {
      // Don't show warning on initial load, only when user tries to interact
      return;
    }

    try {
      setLoading(true);
      // For org_admins tab, fetch all users and filter client-side, or use role filter
      const role = activeTab === 'org_admins' ? 'admin' : undefined;
      
      console.log('Fetching users for tab:', activeTab, 'with role:', role, 'orgId:', selectedOrgId);
      
      const response = await organizationApi.getOrganizationUsers(selectedOrgId, {
        role,
        status: filterStatus !== 'all' ? (filterStatus as any) : undefined,
      });

      console.log('Full API Response:', JSON.stringify(response, null, 2)); // Debug log

      // apiClient.get returns: { data: backendData, success: boolean, message, status }
      // backendData is: { users: [], organization: {}, pagination: {} }
      // So response.data contains: { users: [], organization: {}, pagination: {} }
      
      // Handle response structure
      // apiClient.get returns: { data: backendData, success: boolean, message, status }
      // backendData from backend is: { users: [], organization: {}, pagination: {} }
      // So response.data should be: { users: [], organization: {}, pagination: {} }
      
      let usersData = null;
      
      if (response) {
        console.log('Response structure check:', {
          hasSuccess: 'success' in response,
          success: response.success,
          hasData: 'data' in response,
          dataType: response.data ? typeof response.data : 'null',
          dataKeys: response.data ? Object.keys(response.data) : [],
        });
        
        // The apiClient.get returns the full response object
        // response.data contains the backend's data object
        if (response.data) {
          usersData = response.data;
        } else if (response.success !== false) {
          // Fallback: if no response.data, maybe the data is directly in response
          usersData = response;
        }
      }
      
      console.log('Users data extracted:', usersData);
      console.log('Users data keys:', usersData ? Object.keys(usersData) : 'null');
      
      if (usersData && usersData.users && Array.isArray(usersData.users)) {
        console.log('Users array found:', usersData.users.length, 'users');
        console.log('First user:', usersData.users[0]);
        
        // Filter by role if on org_admins tab and role filter wasn't applied
        let usersToMap = usersData.users;
        if (activeTab === 'org_admins') {
          // Always filter for admin role on org_admins tab
          usersToMap = usersData.users.filter((u: any) => u.role === 'admin');
          console.log('Filtered to admin users:', usersToMap.length);
        }
        
        const mappedUsers = usersToMap.map((user: any) => {
          const mapped = {
            id: user._id || user.id,
            name: `${user.firstName || ''} ${user.lastName || ''}`.trim() || user.username || 'Нэргүй',
            email: user.email || '',
            organization: usersData.organization?.name || usersData.organization?.subdomain || '',
            organizationId: usersData.organization?.id || usersData.organization?._id || selectedOrgId,
            role: user.role === 'admin' ? 'org_admin' : user.role === 'moderator' ? 'org_moderator' : 'org_user',
            status: user.status === 'banned' ? 'suspended' : (user.status || 'active'),
            lastLogin: user.lastLogin || user.lastActivity || user.createdAt || user.updatedAt || '',
          };
          console.log('Mapping user:', user, '->', mapped);
          return mapped;
        });

        console.log('Mapped users for', activeTab, ':', mappedUsers); // Debug log
        console.log('About to set state for tab:', activeTab);

        if (activeTab === 'org_admins') {
          console.log('Setting orgAdminUsers with', mappedUsers.length, 'users');
          setOrgAdminUsers(mappedUsers);
          // Force a re-render check
          setTimeout(() => {
            console.log('After setState - orgAdminUsers should have', mappedUsers.length, 'users');
          }, 100);
        } else {
          console.log('Setting orgUsers with', mappedUsers.length, 'users');
          setOrgUsers(mappedUsers);
        }
      } else {
        console.warn('No users array found in response. usersData:', usersData);
        console.warn('Response structure:', {
          hasResponse: !!response,
          hasData: !!(response && response.data),
          hasUsers: !!(usersData && usersData.users),
          isArray: !!(usersData && usersData.users && Array.isArray(usersData.users)),
        });
        if (activeTab === 'org_admins') {
          setOrgAdminUsers([]);
        } else {
          setOrgUsers([]);
        }
      }
    } catch (error) {
      console.error('Error fetching organization users:', error);
      enqueueSnackbar('Хэрэглэгчдийг ачаалахад алдаа гарлаа', { variant: 'error' });
      if (activeTab === 'org_admins') {
        setOrgAdminUsers([]);
      } else {
        setOrgUsers([]);
      }
    } finally {
      setLoading(false);
    }
  };

  // Get current users based on active tab
  const getCurrentUsers = (): UserType[] => {
    switch (activeTab) {
      case 'system':
        return systemUsers;
      case 'org_users':
        return orgUsers;
      case 'org_admins':
        return orgAdminUsers;
      default:
        return [];
    }
  };

  const getCurrentUsersSetter = () => {
    switch (activeTab) {
      case 'system':
        return setSystemUsers;
      case 'org_users':
        return setOrgUsers;
      case 'org_admins':
        return setOrgAdminUsers;
      default:
        return () => {};
    }
  };

  const handleStatusChange = async (userId: string | number, newStatus: string) => {
    if (!selectedOrgId) {
      enqueueSnackbar('Байгууллага сонгоно уу', { variant: 'warning' });
      return;
    }

    try {
      await organizationApi.updateOrganizationUser(selectedOrgId, String(userId), {
        status: newStatus as any,
      });
      
      const setUsers = getCurrentUsersSetter();
      const users = getCurrentUsers();
      setUsers(users.map((user) => (user.id === userId ? { ...user, status: newStatus as any } : user)));
      
      enqueueSnackbar('Хэрэглэгчийн төлөв амжилттай шинэчлэгдлээ', { variant: 'success' });
    } catch (error) {
      console.error('Error updating user status:', error);
      enqueueSnackbar('Төлөв шинэчлэхэд алдаа гарлаа', { variant: 'error' });
    }
  };

  const handleDeleteUser = async (userId: string | number) => {
    if (!selectedOrgId) {
      enqueueSnackbar('Байгууллага сонгоно уу', { variant: 'warning' });
      return;
    }

    if (!window.confirm('Энэ хэрэглэгчийг устгахдаа итгэлтэй байна уу?')) {
      return;
    }

    try {
      await organizationApi.deleteOrganizationUser(selectedOrgId, String(userId));
      
      const setUsers = getCurrentUsersSetter();
      const users = getCurrentUsers();
      setUsers(users.filter((user) => user.id !== userId));
      
      enqueueSnackbar('Хэрэглэгч амжилттай устгагдлаа', { variant: 'success' });
    } catch (error) {
      console.error('Error deleting user:', error);
      enqueueSnackbar('Хэрэглэгч устгахад алдаа гарлаа', { variant: 'error' });
    }
  };

  const handleAddOrgAdmin = () => {
    if (!selectedOrgId) {
      enqueueSnackbar('Байгууллага сонгоно уу', { variant: 'warning' });
      return;
    }
    addDialogOpen.onTrue();
  };

  const handleSubmitAddOrgAdmin = async (data: {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
    role: 'admin';
  }) => {
    if (!selectedOrgId) {
      enqueueSnackbar('Байгууллага сонгоно уу', { variant: 'warning' });
      return;
    }

    try {
      const response = await organizationApi.addUserToOrganization(selectedOrgId, data);
      
      if (response.success) {
        enqueueSnackbar('Админ хэрэглэгч амжилттай нэмэгдлээ', { variant: 'success' });
        // Refresh the list
        await fetchOrganizationUsers();
      }
    } catch (error) {
      console.error('Error adding org admin:', error);
      enqueueSnackbar('Админ нэмэхэд алдаа гарлаа', { variant: 'error' });
      throw error;
    }
  };

  const currentUsers = getCurrentUsers();
  const filteredUsers =
    filterStatus === 'all' ? currentUsers : currentUsers.filter((user) => user.status === filterStatus);

  // Debug: Log current state
  useEffect(() => {
    console.log('Current tab:', activeTab);
    console.log('Current users:', currentUsers);
    console.log('Filtered users:', filteredUsers);
    console.log('Org admin users state:', orgAdminUsers);
    console.log('Org users state:', orgUsers);
  }, [activeTab, currentUsers, filteredUsers, orgAdminUsers, orgUsers]);

  const getRoleLabel = (role: UserType['role']): string => {
    const roleMap: Record<UserType['role'], string> = {
      super_admin: 'Сүпер Админ',
      org_admin: 'Байгууллагын Админ',
      org_moderator: 'Модератор',
      org_user: 'Хэрэглэгч',
      viewer: 'Үзэгч',
    };
    return roleMap[role] || role;
  };

  return (
    <Container maxWidth="xl">
      <AddOrgAdminDialog
        open={addDialogOpen.value}
        onClose={addDialogOpen.onFalse}
        onSubmit={handleSubmitAddOrgAdmin}
      />
      {/* User Stats */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: 3,
          mb: 3,
        }}
      >
        {USER_STATS.map((stat, index) => (
          <Card key={index} sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box
                sx={{
                  width: 64,
                  height: 64,
                  borderRadius: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  bgcolor: alpha((theme.palette as any)[stat.color].main, 0.08),
                  color: (theme.palette as any)[stat.color].main,
                }}
              >
                <Iconify icon={stat.icon} width={32} />
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography variant="h4" sx={{ mb: 0.5 }}>
                  {stat.value}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  {stat.title}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    color: stat.changeType === 'increase' ? 'success.main' : 'error.main',
                    fontWeight: 'fontWeightSemiBold',
                  }}
                >
                  {stat.change} өнгөрсөн сартай харьцуулахад
                </Typography>
              </Box>
            </Box>
          </Card>
        ))}
      </Box>

      {/* Users Table */}
      <Card sx={{ p: 3 }}>
        {/* Organization Selector - Show only for org tabs */}
        {(activeTab === 'org_users' || activeTab === 'org_admins') && (
          <Box sx={{ mb: 3, p: 2, bgcolor: 'background.neutral', borderRadius: 1 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              Байгууллага сонгох *
            </Typography>
            <FormControl fullWidth sx={{ maxWidth: 400 }}>
              <InputLabel id="organization-select-label">Байгууллага сонгох</InputLabel>
              <Select
                labelId="organization-select-label"
                id="organization-select"
                value={selectedOrgId}
                label="Байгууллага сонгох"
                onChange={(e) => {
                  console.log('Organization selected:', e.target.value);
                  setSelectedOrgId(e.target.value);
                }}
                disabled={loadingOrgs}
                error={!selectedOrgId && (activeTab === 'org_users' || activeTab === 'org_admins')}
              >
                <MenuItem value="">
                  <em>Байгууллага сонгоно уу</em>
                </MenuItem>
                {loadingOrgs ? (
                  <MenuItem value="" disabled>
                    Ачааллаж байна...
                  </MenuItem>
                ) : organizations && organizations.length > 0 ? (
                  organizations.map((org) => (
                    <MenuItem key={org._id} value={org._id}>
                      {org.displayName || org.name} ({org.subdomain})
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem value="" disabled>
                    Байгууллага олдсонгүй
                  </MenuItem>
                )}
              </Select>
              {!selectedOrgId && (activeTab === 'org_users' || activeTab === 'org_admins') && (
                <Typography variant="caption" color="error" sx={{ mt: 0.5, display: 'block' }}>
                  Байгууллага сонгох шаардлагатай
                </Typography>
              )}
            </FormControl>
          </Box>
        )}

        {/* Tabs */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
          <Tabs value={activeTab} onChange={(_, newValue) => setActiveTab(newValue)}>
            <Tab
              label="Системийн хэрэглэгчид"
              value="system"
              icon={<Iconify icon="solar:user-id-bold" width={20} />}
              iconPosition="start"
            />
            <Tab
              label="Байгууллагын хэрэглэгчид"
              value="org_users"
              icon={<Iconify icon="solar:users-group-rounded-bold" width={20} />}
              iconPosition="start"
            />
            <Tab
              label="Байгууллагын Админ"
              value="org_admins"
              icon={<Iconify icon="solar:user-shield-bold" width={20} />}
              iconPosition="start"
            />
          </Tabs>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6">
            {activeTab === 'system'
              ? 'Системийн хэрэглэгчид'
              : activeTab === 'org_users'
              ? 'Байгууллагын хэрэглэгчид'
              : 'Байгууллагын Админ хэрэглэгчид'}
          </Typography>
          <Stack direction="row" spacing={1}>
            {activeTab === 'org_admins' && (
              <Button variant="contained" startIcon={<Iconify icon="solar:user-plus-bold" />} onClick={handleAddOrgAdmin}>
                Админ нэмэх
              </Button>
            )}
            <Button
              variant={filterStatus === 'all' ? 'contained' : 'outlined'}
              size="small"
              onClick={() => setFilterStatus('all')}
            >
              Бүгд
            </Button>
            <Button
              variant={filterStatus === 'active' ? 'contained' : 'outlined'}
              size="small"
              onClick={() => setFilterStatus('active')}
            >
              Идэвхтэй
            </Button>
            <Button
              variant={filterStatus === 'inactive' ? 'contained' : 'outlined'}
              size="small"
              onClick={() => setFilterStatus('inactive')}
            >
              Идэвхгүй
            </Button>
            <Button
              variant={filterStatus === 'suspended' ? 'contained' : 'outlined'}
              size="small"
              onClick={() => setFilterStatus('suspended')}
            >
              Түдгэлзүүлсэн
            </Button>
          </Stack>
        </Box>

        <Box sx={{ overflow: 'auto' }}>
          <Box sx={{ minWidth: 1000 }}>
            {/* Table Header */}
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: '60px 1fr 1fr 1fr 100px 120px 100px 100px 120px',
                gap: 2,
                p: 2,
                bgcolor: 'grey.50',
                borderRadius: 1,
                mb: 1,
              }}
            >
              <Typography variant="subtitle2" fontWeight="bold">
                Аватар
              </Typography>
              <Typography variant="subtitle2" fontWeight="bold">
                Нэр
              </Typography>
              <Typography variant="subtitle2" fontWeight="bold">
                Имэйл
              </Typography>
              <Typography variant="subtitle2" fontWeight="bold">
                Байгууллага
              </Typography>
              <Typography variant="subtitle2" fontWeight="bold" textAlign="center">
                Роль
              </Typography>
              <Typography variant="subtitle2" fontWeight="bold" textAlign="center">
                Төлөв
              </Typography>
              <Typography variant="subtitle2" fontWeight="bold" textAlign="center">
                Вэбтоон
              </Typography>
              <Typography variant="subtitle2" fontWeight="bold" textAlign="center">
                Үзэлт
              </Typography>
              <Typography variant="subtitle2" fontWeight="bold" textAlign="center">
                Үйлдэл
              </Typography>
            </Box>

            {/* Table Rows */}
            {loading ? (
              <Box sx={{ p: 3, textAlign: 'center' }}>
                <Typography>Ачааллаж байна...</Typography>
              </Box>
            ) : filteredUsers.length === 0 ? (
              <Box sx={{ p: 3, textAlign: 'center' }}>
                <Typography color="text.secondary">
                  {selectedOrgId
                    ? 'Хэрэглэгч олдсонгүй'
                    : activeTab === 'org_admins' || activeTab === 'org_users'
                    ? 'Байгууллага сонгоно уу'
                    : 'Хэрэглэгч олдсонгүй'}
                </Typography>
              </Box>
            ) : (
              filteredUsers.map((user) => (
              <Box
                key={user.id}
                sx={{
                  display: 'grid',
                  gridTemplateColumns: '60px 1fr 1fr 1fr 100px 120px 100px 100px 120px',
                  gap: 2,
                  p: 2,
                  borderBottom: '1px solid',
                  borderColor: 'divider',
                  alignItems: 'center',
                }}
              >
                <Avatar src={user.avatar} sx={{ width: 40, height: 40 }} />

                <Box>
                  <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                    {user.name}
                  </Typography>
                </Box>

                <Typography variant="body2" color="text.secondary">
                  {user.email}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  {user.organization}
                </Typography>

                <Typography variant="body2" textAlign="center" fontWeight="bold">
                  {getRoleLabel(user.role)}
                </Typography>

                <Box textAlign="center">
                  <Box
                    sx={{
                      display: 'inline-block',
                      px: 1.5,
                      py: 0.5,
                      borderRadius: 1,
                      bgcolor:
                        user.status === 'active'
                          ? alpha(theme.palette.success.main, 0.1)
                          : user.status === 'inactive'
                          ? alpha(theme.palette.warning.main, 0.1)
                          : alpha(theme.palette.error.main, 0.1),
                      color:
                        user.status === 'active'
                          ? 'success.main'
                          : user.status === 'inactive'
                          ? 'warning.main'
                          : 'error.main',
                    }}
                  >
                    <Typography variant="caption" fontWeight="bold">
                      {user.status === 'active'
                        ? 'Идэвхтэй'
                        : user.status === 'inactive'
                        ? 'Идэвхгүй'
                        : 'Түдгэлзүүлсэн'}
                    </Typography>
                  </Box>
                </Box>

                <Typography variant="body2" textAlign="center">
                  {user.webtoons ?? '-'}
                </Typography>

                <Typography variant="body2" textAlign="center">
                  {user.views ? user.views.toLocaleString() : '-'}
                </Typography>

                <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'center' }}>
                  <IconButton
                    size="small"
                    color="info"
                    onClick={() => {
                      // TODO: Implement user view functionality
                    }}
                  >
                    <Iconify icon="solar:eye-bold" width={16} />
                  </IconButton>
                  <IconButton
                    size="small"
                    color="warning"
                    onClick={() =>
                      handleStatusChange(user.id, user.status === 'active' ? 'suspended' : 'active')
                    }
                  >
                    <Iconify
                      icon={
                        user.status === 'active' ? 'solar:user-block-bold' : 'solar:user-check-bold'
                      }
                      width={16}
                    />
                  </IconButton>
                  <IconButton size="small" color="error" onClick={() => handleDeleteUser(user.id)}>
                    <Iconify icon="solar:trash-bin-trash-bold" width={16} />
                  </IconButton>
                </Box>
              </Box>
            ))
            )}
          </Box>
        </Box>
      </Card>
    </Container>
  );
}
