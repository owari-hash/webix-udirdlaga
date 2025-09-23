import Collapse from '@mui/material/Collapse';

import { usePathname } from 'src/routes/hooks';
import { useBoolean } from 'src/hooks/use-boolean';
import { NavSectionVertical } from 'src/components/nav-section';

import { NavItemBaseProps } from '../types';

import NavItem from './nav-item';

// ----------------------------------------------------------------------

type NavListProps = {
  item: NavItemBaseProps;
};

export default function NavList({ item }: NavListProps) {
  const pathname = usePathname();

  const externalLink = item.path?.includes('http') || false;

  const listOpen = useBoolean();

  return (
    <>
      <NavItem
        item={item}
        open={listOpen.value}
        onClick={listOpen.onToggle}
        active={item.path ? pathname === item.path : false}
        externalLink={externalLink}
      />

      {!!item.children && (
        <Collapse in={listOpen.value} unmountOnExit>
          <NavSectionVertical data={item.children} />
        </Collapse>
      )}
    </>
  );
}
