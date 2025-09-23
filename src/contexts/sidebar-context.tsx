'use client';

import { useMemo, useState, ReactNode, useContext, useCallback, createContext } from 'react';

// ----------------------------------------------------------------------

type SidebarContextType = {
  open: boolean;
  onToggle: () => void;
  onClose: () => void;
  onOpen: () => void;
};

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

type SidebarProviderProps = {
  children: ReactNode;
};

export function SidebarProvider({ children }: SidebarProviderProps) {
  const [open, setOpen] = useState(true);

  const onToggle = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  const onClose = useCallback(() => {
    setOpen(false);
  }, []);

  const onOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const value = useMemo(
    () => ({
      open,
      onToggle,
      onClose,
      onOpen,
    }),
    [open, onToggle, onClose, onOpen]
  );

  return <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>;
}

// ----------------------------------------------------------------------

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
}
