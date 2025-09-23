'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import List from '@mui/material/List';
import Stack from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer';
import Collapse from '@mui/material/Collapse';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemButton from '@mui/material/ListItemButton';

import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import { useNavigation } from 'src/hooks/use-navigation';
import { navConfig } from 'src/layouts/main/config-navigation';

// ----------------------------------------------------------------------

type SidebarProps = {
  open: boolean;
  onClose: () => void;
  variant?: 'permanent' | 'persistent' | 'temporary';
};

export default function Sidebar({ open, onClose, variant = 'persistent' }: SidebarProps) {
  const pathname = usePathname();
  const { navigateTo } = useNavigation();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  // Get all navigation paths to determine the most specific match
  const getAllNavPaths = () => {
    const paths: string[] = [];
    navConfig.forEach((item) => {
      if (item.path) paths.push(item.path);
      if (item.children) {
        item.children.forEach((child: any) => {
          if (child.path) paths.push(child.path);
        });
      }
    });
    return paths.sort((a, b) => b.length - a.length); // Sort by length, longest first
  };

  const isActive = (path: string) => {
    if (!path) return false;

    // Get all nav paths sorted by specificity (longest first)
    const allPaths = getAllNavPaths();

    // Find the most specific path that matches the current pathname
    const mostSpecificMatch = allPaths.find((p) => pathname === p || pathname.startsWith(`${p}/`));

    // This path is active only if it's the most specific match
    return mostSpecificMatch === path;
  };

  const isParentActive = (item: any) => {
    if (!item.children) return false;
    return item.children.some((child: any) => isActive(child.path));
  };

  const handleToggleExpand = (title: string) => {
    setExpandedItems((prev) =>
      prev.includes(title) ? prev.filter((item) => item !== title) : [...prev, title]
    );
  };

  const handleNavigation = (path: string) => {
    if (path) {
      navigateTo(path);
      if (variant === 'temporary') {
        onClose();
      }
    }
  };

  const renderNavItem = (item: any) => {
    const active = isActive(item.path || '');
    const parentActive = isParentActive(item);
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.includes(item.title) || parentActive;

    return (
      <Box key={item.title}>
        <ListItem disablePadding sx={{ mb: 0.5 }}>
          <ListItemButton
            onClick={() => {
              if (hasChildren) {
                handleToggleExpand(item.title);
              } else {
                handleNavigation(item.path);
              }
            }}
            selected={active}
            sx={{
              minHeight: 48,
              borderRadius: 1.5,
              mx: 1,
              px: 2,
              py: 1.5,
              backgroundColor: active ? 'primary.main' : 'transparent',
              color: active ? 'primary.contrastText' : 'text.primary',
              '&:hover': {
                backgroundColor: active ? 'primary.dark' : 'action.hover',
                color: active ? 'primary.contrastText' : 'text.primary',
              },
              '&.Mui-selected': {
                backgroundColor: 'primary.main',
                color: 'primary.contrastText',
                '&:hover': {
                  backgroundColor: 'primary.dark',
                  color: 'primary.contrastText',
                },
              },
              transition: 'all 0.2s ease-in-out',
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 40,
                color: active ? 'primary.contrastText' : 'text.secondary',
                transition: 'color 0.2s ease-in-out',
              }}
            >
              {item.icon && <Iconify icon={item.icon} width={20} />}
            </ListItemIcon>

            <ListItemText
              primary={
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: active ? 600 : 500,
                      fontSize: '0.875rem',
                    }}
                  >
                    {item.title}
                  </Typography>
                  {item.badge && (
                    <Chip
                      label={item.badge}
                      size="small"
                      color="primary"
                      variant="soft"
                      sx={{
                        height: 18,
                        fontSize: '0.7rem',
                        fontWeight: 600,
                        backgroundColor: active ? 'rgba(255,255,255,0.2)' : undefined,
                        color: active ? 'primary.contrastText' : undefined,
                      }}
                    />
                  )}
                </Stack>
              }
            />

            {hasChildren && (
              <Iconify
                icon="carbon:chevron-right"
                width={16}
                sx={{
                  color: active ? 'primary.contrastText' : 'text.secondary',
                  transition: 'transform 0.2s ease-in-out',
                  transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
                }}
              />
            )}
          </ListItemButton>
        </ListItem>

        {hasChildren && (
          <Collapse in={isExpanded} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {item.children.map((child: any) => {
                const childActive = isActive(child.path);
                return (
                  <ListItem key={child.title} disablePadding sx={{ mb: 0.5 }}>
                    <ListItemButton
                      onClick={() => handleNavigation(child.path)}
                      selected={childActive}
                      sx={{
                        minHeight: 36,
                        borderRadius: 1,
                        mx: 1,
                        px: 2,
                        py: 0.75,
                        backgroundColor: childActive ? 'primary.main' : 'transparent',
                        color: childActive ? 'primary.contrastText' : 'text.primary',
                        '&:hover': {
                          backgroundColor: childActive ? 'primary.dark' : 'action.hover',
                          color: childActive ? 'primary.contrastText' : 'text.primary',
                        },
                        '&.Mui-selected': {
                          backgroundColor: 'primary.main',
                          color: 'primary.contrastText',
                          '&:hover': {
                            backgroundColor: 'primary.dark',
                            color: 'primary.contrastText',
                          },
                        },
                        transition: 'all 0.2s ease-in-out',
                        ml: 3,
                        mr: 1,
                        borderLeft: childActive ? '3px solid' : '3px solid transparent',
                        borderLeftColor: childActive ? 'primary.contrastText' : 'transparent',
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 32,
                          color: childActive ? 'primary.contrastText' : 'text.secondary',
                          transition: 'color 0.2s ease-in-out',
                        }}
                      >
                        {child.icon && <Iconify icon={child.icon} width={16} />}
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Typography
                            variant="body2"
                            sx={{
                              fontWeight: childActive ? 600 : 500,
                              fontSize: '0.8rem',
                            }}
                          >
                            {child.title}
                          </Typography>
                        }
                      />
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Collapse>
        )}
      </Box>
    );
  };

  return (
    <Drawer
      variant={variant}
      open={open}
      onClose={onClose}
      sx={{
        '& .MuiDrawer-paper': {
          width: 280,
          border: 'none',
          boxShadow:
            '0 0 2px rgba(145, 158, 171, 0.08), 0 16px 32px -4px rgba(145, 158, 171, 0.12)',
          top: 0,
          height: '100vh',
        },
      }}
    >
      <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <Box sx={{ p: 3, borderBottom: 1, borderColor: 'divider' }}>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Image
              src="/assets/logo/webix-logo.png"
              alt="Webix Logo"
              sx={{
                width: 48,
                height: 48,
                borderRadius: 2,
              }}
            />
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 700, color: 'text.primary' }}>
                Удирдлага
              </Typography>
            </Box>
          </Stack>
        </Box>

        {/* Navigation */}
        <Box sx={{ flex: 1, overflow: 'auto', py: 2 }}>
          <List disablePadding>{navConfig.map((item) => renderNavItem(item))}</List>
        </Box>

        {/* Footer */}
        <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
          <Typography
            variant="caption"
            sx={{ color: 'text.secondary', textAlign: 'center', display: 'block' }}
          >
            © 2024 Webix Удирдлага
          </Typography>
        </Box>
      </Box>
    </Drawer>
  );
}
