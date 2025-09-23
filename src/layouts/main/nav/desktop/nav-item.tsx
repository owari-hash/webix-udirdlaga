import { forwardRef } from 'react';

import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';

import Iconify from 'src/components/iconify';
import { RouterLink } from 'src/routes/components';

import { NavItemProps } from '../types';

import { StyledNavItem } from './styles';

// ----------------------------------------------------------------------

export const NavItem = forwardRef<HTMLDivElement, NavItemProps>(
  ({ item, open, active, subItem, externalLink, ...other }, ref) => {
    const renderContent = (
      <StyledNavItem
        ref={ref}
        disableRipple
        subItem={subItem}
        active={active}
        open={open}
        {...other}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, width: '100%' }}>
          {item.icon && (
            <Iconify
              icon={item.icon}
              width={20}
              sx={{
                color: active ? 'primary.main' : 'text.secondary',
                transition: 'all 0.2s ease-in-out',
              }}
            />
          )}
          <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
            <span>{item.title}</span>
            {item.badge && (
              <Chip
                label={item.badge}
                size="small"
                color="primary"
                variant="soft"
                sx={{
                  height: 20,
                  fontSize: '0.75rem',
                  fontWeight: 600,
                }}
              />
            )}
          </Box>
          {!!item.children && (
            <Iconify
              width={16}
              icon="carbon:chevron-down"
              sx={{
                ml: 'auto',
                color: 'text.secondary',
                transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.2s ease-in-out',
              }}
            />
          )}
        </Box>
      </StyledNavItem>
    );

    // ExternalLink
    if (externalLink && item.path) {
      return (
        <Link href={item.path} target="_blank" rel="noopener" color="inherit" underline="none">
          {renderContent}
        </Link>
      );
    }

    // Has child
    if (item.children) {
      return renderContent;
    }

    // Default
    return item.path ? (
      <Link component={RouterLink} href={item.path} color="inherit" underline="none">
        {renderContent}
      </Link>
    ) : (
      renderContent
    );
  }
);
