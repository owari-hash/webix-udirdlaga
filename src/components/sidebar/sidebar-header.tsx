'use client';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import Iconify from 'src/components/iconify';
import { useSidebar } from 'src/contexts/sidebar-context';
import ProfilePopover from 'src/components/profile/profile-popover';
import MessagesPopover from 'src/components/messages/messages-popover';
import NotificationsPopover from 'src/components/notifications/notifications-popover';

// ----------------------------------------------------------------------

export default function SidebarHeader() {
  const { onToggle } = useSidebar();

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
            Хяналтын самбар
          </Typography>
        </Box>

        {/* Right Side Actions */}
        <Stack direction="row" alignItems="center" spacing={2}>
          {/* Notifications */}
          <NotificationsPopover />

          {/* Messages */}
          <MessagesPopover />

          {/* Profile Menu */}
          <ProfilePopover />
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
