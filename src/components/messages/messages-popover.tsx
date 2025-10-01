'use client';

import { useState } from 'react';

import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Badge from '@mui/material/Badge';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Popover from '@mui/material/Popover';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';

import { paths } from 'src/routes/paths';
import Iconify from 'src/components/iconify';
import { RouterLink } from 'src/routes/components';

// ----------------------------------------------------------------------

const MESSAGES = [
  {
    id: '1',
    name: 'Батбаяр',
    email: 'batbayar@example.com',
    avatar: '/assets/images/avatar/avatar_1.jpg',
    message: 'Сайн байна уу? Төслийн талаар асуух зүйл байгаа.',
    time: new Date('2024-01-15T10:30:00'),
    isUnRead: true,
  },
  {
    id: '2',
    name: 'Оюунчимэг',
    email: 'oyunchimeg@example.com',
    avatar: '/assets/images/avatar/avatar_2.jpg',
    message: 'Танай системийн тухай дэлгэрэнгүй мэдээлэл авмаар байна.',
    time: new Date('2024-01-15T09:15:00'),
    isUnRead: true,
  },
  {
    id: '3',
    name: 'Энхбаяр',
    email: 'enhbayar@example.com',
    avatar: '/assets/images/avatar/avatar_3.jpg',
    message: 'Төлбөрийн асуудлыг шийдвэрлэх хэрэгтэй.',
    time: new Date('2024-01-14T16:45:00'),
    isUnRead: false,
  },
  {
    id: '4',
    name: 'Сарантуяа',
    email: 'sarantuya@example.com',
    avatar: '/assets/images/avatar/avatar_4.jpg',
    message: 'Маргааш уулзах цагийг тохирох боломжтой юу?',
    time: new Date('2024-01-14T14:20:00'),
    isUnRead: false,
  },
];

// ----------------------------------------------------------------------

export default function MessagesPopover() {
  const [messages] = useState(MESSAGES);
  const [open, setOpen] = useState<HTMLElement | null>(null);

  const totalUnRead = messages.filter((item) => item.isUnRead === true).length;

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
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
          <Iconify icon="solar:chat-round-dots-bold" width={20} />
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
            <Typography variant="subtitle1">Зурвас</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {totalUnRead > 0 ? `${totalUnRead} шинэ зурвас байна` : 'Шинэ зурвас байхгүй'}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <List disablePadding>
          {messages.slice(0, 5).map((message) => (
            <ListItem
              key={message.id}
              sx={{
                py: 1.5,
                px: 2.5,
                mt: '1px',
                cursor: 'pointer',
                '&:hover': {
                  bgcolor: 'action.hover',
                },
                ...(message.isUnRead && {
                  bgcolor: 'action.selected',
                }),
              }}
            >
              <ListItemAvatar>
                <Avatar src={message.avatar} alt={message.name}>
                  {message.name.charAt(0)}
                </Avatar>
              </ListItemAvatar>

              <ListItemText
                primary={
                  <Box
                    sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                  >
                    <Typography variant="subtitle2" noWrap>
                      {message.name}
                      {message.isUnRead && (
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
                    <Typography variant="caption" sx={{ color: 'text.disabled', flexShrink: 0 }}>
                      {formatTime(message.time)}
                    </Typography>
                  </Box>
                }
                secondary={
                  <Typography
                    variant="body2"
                    sx={{
                      mt: 0.5,
                      color: 'text.secondary',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                    }}
                  >
                    {message.message}
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
            href={paths.dashboard.support}
            onClick={handleClose}
          >
            Бүх зурвасыг үзэх
          </Button>
        </Box>
      </Popover>
    </>
  );
}
