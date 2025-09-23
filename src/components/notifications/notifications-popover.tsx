'use client';

import { useState } from 'react';

import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Badge from '@mui/material/Badge';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Popover from '@mui/material/Popover';
import Tooltip from '@mui/material/Tooltip';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';

import { paths } from 'src/routes/paths';
import Iconify from 'src/components/iconify';
import { RouterLink } from 'src/routes/components';

// ----------------------------------------------------------------------

const NOTIFICATIONS = [
  {
    id: '1',
    title: 'Шинэ байгууллага бүртгэгдлээ',
    description: 'Монгол Улсын Их Сургууль байгууллага амжилттай бүртгэгдлээ',
    avatar: null,
    type: 'organization',
    createdAt: new Date('2024-01-15T09:30:00'),
    isUnRead: true,
  },
  {
    id: '2',
    title: 'Төлбөр төлөгдлөө',
    description: 'INV-2024-001 нэхэмжлэлийн төлбөр амжилттай төлөгдлөө',
    avatar: null,
    type: 'payment',
    createdAt: new Date('2024-01-15T14:30:00'),
    isUnRead: true,
  },
  {
    id: '3',
    title: 'Системийн шинэчлэл',
    description: 'Вэбтоон платформын шинэчлэл амжилттай хийгдлээ',
    avatar: null,
    type: 'system',
    createdAt: new Date('2024-01-14T16:30:00'),
    isUnRead: false,
  },
  {
    id: '4',
    title: 'Хэрэглэгчийн хүсэлт',
    description: 'Техникийн дэмжлэгийн шинэ хүсэлт ирлээ',
    avatar: null,
    type: 'support',
    createdAt: new Date('2024-01-14T11:30:00'),
    isUnRead: false,
  },
];

// ----------------------------------------------------------------------

export default function NotificationsPopover() {
  const [notifications, setNotifications] = useState(NOTIFICATIONS);
  const [open, setOpen] = useState<HTMLElement | null>(null);

  const totalUnRead = notifications.filter((item) => item.isUnRead === true).length;

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleMarkAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({
        ...notification,
        isUnRead: false,
      }))
    );
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'organization':
        return 'solar:buildings-2-bold';
      case 'payment':
        return 'solar:card-bold';
      case 'system':
        return 'solar:shield-check-bold';
      case 'support':
        return 'solar:headphones-bold';
      default:
        return 'solar:bell-bold';
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'organization':
        return 'primary.main';
      case 'payment':
        return 'success.main';
      case 'system':
        return 'info.main';
      case 'support':
        return 'warning.main';
      default:
        return 'text.secondary';
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays > 0) {
      return `${diffDays} өдрийн өмнө`;
    }
    if (diffHours > 0) {
      return `${diffHours} цагийн өмнө`;
    }
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    return `${diffMinutes} минутын өмнө`;
  };

  return (
    <>
      <IconButton
        color={open ? 'primary' : 'default'}
        onClick={handleOpen}
        sx={{
          color: 'text.secondary',
          '&:hover': {
            backgroundColor: 'action.hover',
          },
        }}
      >
        <Badge badgeContent={totalUnRead} color="error">
          <Iconify icon="solar:bell-bold" width={20} />
        </Badge>
      </IconButton>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            mt: 1.5,
            ml: 0.75,
            width: 360,
            maxHeight: 500,
          },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', py: 2, px: 2.5 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle1">Мэдэгдэл</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {totalUnRead > 0 ? `${totalUnRead} шинэ мэдэгдэл байна` : 'Шинэ мэдэгдэл байхгүй'}
            </Typography>
          </Box>

          {totalUnRead > 0 && (
            <Tooltip title="Бүгдийг уншсан болгох">
              <IconButton color="primary" onClick={handleMarkAllAsRead}>
                <Iconify icon="eva:done-all-fill" />
              </IconButton>
            </Tooltip>
          )}
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <List disablePadding>
          {notifications.slice(0, 5).map((notification) => (
            <ListItem
              key={notification.id}
              sx={{
                py: 1.5,
                px: 2.5,
                mt: '1px',
                ...(notification.isUnRead && {
                  bgcolor: 'action.selected',
                }),
              }}
            >
              <ListItemAvatar>
                <Avatar
                  sx={{
                    bgcolor: 'background.neutral',
                    color: getNotificationColor(notification.type),
                  }}
                >
                  <Iconify icon={getNotificationIcon(notification.type)} />
                </Avatar>
              </ListItemAvatar>

              <ListItemText
                primary={
                  <Typography variant="subtitle2">
                    {notification.title}
                    {notification.isUnRead && (
                      <Box
                        component="span"
                        sx={{
                          ml: 1,
                          width: 8,
                          height: 8,
                          display: 'inline-block',
                          bgcolor: 'primary.main',
                          borderRadius: '50%',
                        }}
                      />
                    )}
                  </Typography>
                }
                secondary={
                  <Typography
                    variant="caption"
                    sx={{
                      mt: 0.5,
                      display: 'flex',
                      alignItems: 'center',
                      color: 'text.disabled',
                    }}
                  >
                    <Iconify icon="eva:clock-outline" sx={{ mr: 0.5, width: 16, height: 16 }} />
                    {formatTime(notification.createdAt)}
                  </Typography>
                }
              />
            </ListItem>
          ))}
        </List>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Box sx={{ p: 1 }}>
          <Button
            fullWidth
            disableRipple
            component={RouterLink}
            href={paths.dashboard.notifications}
            onClick={handleClose}
          >
            Бүх мэдэгдлийг үзэх
          </Button>
        </Box>
      </Popover>
    </>
  );
}
