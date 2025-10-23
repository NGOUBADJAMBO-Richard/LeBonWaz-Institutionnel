import { useMemo } from 'react';

export const useDashboard = (leads = []) => {
  const stats = useMemo(() => {
    const total = leads.length;
    const converted = leads.filter((l) => l.status === 'converti').length;
    const contacted = leads.filter((l) => l.status === 'contacté').length;
    return { total, converted, contacted };
  }, [leads]);

  return { stats };
};
