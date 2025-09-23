import Link from '@mui/material/Link';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';

import Iconify from 'src/components/iconify';
import { RouterLink } from 'src/routes/components';

import { NavItemProps } from '../types';

import { StyledNavItem } from './styles';

// ----------------------------------------------------------------------

export default function NavItem({ item, open, active, externalLink, ...other }: NavItemProps) {
  const renderContent = (
    <StyledNavItem active={active} {...other}>
      <ListItemIcon>
        {item.icon && (
          <Iconify
            icon={item.icon}
            width={20}
            sx={{
              color: active ? 'primary.main' : 'text.secondary',
            }}
          />
        )}
      </ListItemIcon>

      <ListItemText
        disableTypography
        primary={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <span>{item.title}</span>
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
                }}
              />
            )}
          </Box>
        }
      />

      {!!item.children && (
        <Iconify
          width={16}
          icon={open ? 'carbon:chevron-down' : 'carbon:chevron-right'}
          sx={{
            ml: 1,
            color: 'text.secondary',
            transition: 'transform 0.2s ease-in-out',
          }}
        />
      )}
    </StyledNavItem>
  );

  // ExternalLink
  if (externalLink && item.path) {
    return (
      <Link href={item.path} target="_blank" rel="noopener" underline="none">
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
    <Link component={RouterLink} href={item.path} underline="none">
      {renderContent}
    </Link>
  ) : (
    renderContent
  );
}
