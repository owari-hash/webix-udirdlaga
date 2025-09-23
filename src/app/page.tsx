'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { paths } from 'src/routes/paths';
import { useAuth } from 'src/contexts/auth-context';

// ----------------------------------------------------------------------

export default function HomePage() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      router.push(paths.dashboard.root);
    } else {
      router.push(paths.loginCover);
    }
  }, [isAuthenticated, router]);

  return null; // This will show nothing while redirecting
}
