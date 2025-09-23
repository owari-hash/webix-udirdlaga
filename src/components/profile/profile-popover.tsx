'use client';

import { useState } from 'react';

import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';
import Iconify from 'src/components/iconify';
import { RouterLink } from 'src/routes/components';
import { useAuth } from 'src/contexts/auth-context';

// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {
    label: 'Профайл',
    icon: 'solar:user-bold',
    href: paths.dashboard.settings,
  },
  {
    label: 'Тохиргоо',
    icon: 'solar:settings-bold',
    href: paths.dashboard.settings,
  },
  {
    label: 'Дэмжлэг',
    icon: 'solar:headphones-bold',
    href: paths.dashboard.support,
  },
];

// ----------------------------------------------------------------------

export default function ProfilePopover() {
  const { user, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      await logout();
      handleClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          p: 0,
          '&:hover': {
            backgroundColor: 'action.hover',
          },
        }}
      >
        <Avatar
          src={user?.photoURL}
          alt={user?.displayName}
          sx={{
            width: 36,
            height: 36,
            backgroundColor: 'primary.main',
            color: 'primary.contrastText',
            fontSize: '0.875rem',
            fontWeight: 600,
          }}
        >
          {user?.displayName?.charAt(0)?.toUpperCase() ||
            user?.email?.charAt(0)?.toUpperCase() ||
            'Х'}
        </Avatar>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          sx: {
            mt: 1.5,
            minWidth: 200,
            boxShadow:
              '0 0 2px rgba(145, 158, 171, 0.08), 0 16px 32px -4px rgba(145, 158, 171, 0.12)',
            border: 1,
            borderColor: 'divider',
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Box sx={{ px: 2, py: 1.5 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
            {user?.displayName || user?.email || 'Хэрэглэгч'}
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            {user?.email || 'user@example.com'}
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>
            Сүпер админ
          </Typography>
        </Box>

        <Divider />

        {MENU_OPTIONS.map((option) => (
          <MenuItem
            key={option.label}
            component={RouterLink}
            href={option.href}
            onClick={handleClose}
            sx={{
              py: 1,
              px: 2,
            }}
          >
            <Iconify icon={option.icon} width={20} sx={{ mr: 2 }} />
            {option.label}
          </MenuItem>
        ))}

        <Divider />

        <MenuItem
          onClick={handleLogout}
          sx={{
            py: 1,
            px: 2,
            color: 'error.main',
          }}
        >
          <Iconify icon="solar:logout-3-bold" width={20} sx={{ mr: 2 }} />
          Гарах
        </MenuItem>
      </Menu>
    </>
  );
}
