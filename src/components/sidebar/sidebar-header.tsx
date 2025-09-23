'use client';

import { useState } from 'react';

import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import Badge from '@mui/material/Badge';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import Iconify from 'src/components/iconify';
import { useAuth } from 'src/contexts/auth-context';
import { useSidebar } from 'src/contexts/sidebar-context';

// ----------------------------------------------------------------------

export default function SidebarHeader() {
  const { isAuthenticated, user, logout } = useAuth();
  const { onToggle, onClose } = useSidebar();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleProfileMenuClose();
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: 'background.paper',
        color: 'text.primary',
        boxShadow: '0 0 2px rgba(145, 158, 171, 0.08), 0 16px 32px -4px rgba(145, 158, 171, 0.12)',
        borderBottom: 1,
        borderColor: 'divider',
      }}
    >
      <Toolbar sx={{ px: 3 }}>
        {/* Sidebar Toggle */}
        <IconButton
          onClick={onToggle}
          sx={{
            mr: 2,
            color: 'text.primary',
            '&:hover': {
              backgroundColor: 'action.hover',
            },
          }}
        >
          <Iconify icon="solar:hamburger-menu-bold" width={24} />
        </IconButton>

        {/* Page Title */}
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary' }}>
            Dashboard
          </Typography>
        </Box>

        {/* Right Side Actions */}
        <Stack direction="row" alignItems="center" spacing={2}>
          {/* Notifications */}
          <IconButton
            sx={{
              color: 'text.secondary',
              '&:hover': {
                backgroundColor: 'action.hover',
              },
            }}
          >
            <Badge badgeContent={3} color="error">
              <Iconify icon="solar:bell-bold" width={20} />
            </Badge>
          </IconButton>

          {/* Messages */}
          <IconButton
            sx={{
              color: 'text.secondary',
              '&:hover': {
                backgroundColor: 'action.hover',
              },
            }}
          >
            <Badge badgeContent={7} color="error">
              <Iconify icon="solar:chat-round-dots-bold" width={20} />
            </Badge>
          </IconButton>

          {/* Profile Menu */}
          <IconButton
            onClick={handleProfileMenuOpen}
            sx={{
              p: 0,
              '&:hover': {
                backgroundColor: 'action.hover',
              },
            }}
          >
            <Avatar
              sx={{
                width: 36,
                height: 36,
                backgroundColor: 'primary.main',
                color: 'primary.contrastText',
                fontSize: '0.875rem',
                fontWeight: 600,
              }}
            >
              {user?.email?.charAt(0).toUpperCase() || 'U'}
            </Avatar>
          </IconButton>

          {/* Profile Dropdown Menu */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleProfileMenuClose}
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
                {user?.email || 'User'}
              </Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                Super Admin
              </Typography>
            </Box>
            <Divider />
            <MenuItem onClick={handleProfileMenuClose}>
              <Iconify icon="solar:user-bold" width={20} sx={{ mr: 2 }} />
              Profile
            </MenuItem>
            <MenuItem onClick={handleProfileMenuClose}>
              <Iconify icon="solar:settings-bold" width={20} sx={{ mr: 2 }} />
              Settings
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleLogout} sx={{ color: 'error.main' }}>
              <Iconify icon="solar:logout-3-bold" width={20} sx={{ mr: 2 }} />
              Logout
            </MenuItem>
          </Menu>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
