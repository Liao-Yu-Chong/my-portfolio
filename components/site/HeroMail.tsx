'use client';

import type { ReactNode } from 'react';
import { ButtonLink, useEmailLinks } from '@/components/ui/Cta';

/** The page's one filled action: write to me. Client-side because the
    address is assembled after mount (see useEmailAddress). */
export function HeroMail({ icon }: { icon: ReactNode }) {
  const { composeUrl } = useEmailLinks();
  return (
    <ButtonLink href={composeUrl} primary external>
      {icon}
      寄信給我
    </ButtonLink>
  );
}
