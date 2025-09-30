'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { paths } from 'src/routes/paths';
import { useAuth } from 'src/contexts/auth-context';
import { LoadingScreen } from 'src/components/loading-screen';

// ----------------------------------------------------------------------

export default function HomePage() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (isLoading) return;

    if (isAuthenticated) {
      router.push(paths.dashboard.root);
    } else {
      router.push(paths.loginCover);
    }
  }, [isAuthenticated, isLoading, router]);

  return <LoadingScreen />;
}
