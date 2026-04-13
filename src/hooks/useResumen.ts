import { useState, useCallback } from 'react';
import type { ResumenResponse, NivelConfianza } from '../types/onpe.types';
import { fetchResumen } from '../services/api';

interface UseResumenOptions {
  confianza: NivelConfianza;
  topN: number;
}

interface UseResumenReturn {
  data: ResumenResponse | null;
  loading: boolean;
  error: string | null;
  lastUpdate: Date | null;
  refresh: () => Promise<void>;
}

export function useResumen({ confianza, topN }: UseResumenOptions): UseResumenReturn {
  const [data, setData] = useState<ResumenResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const json = await fetchResumen(confianza, topN);
      setData(json);
      setLastUpdate(new Date());
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  }, [confianza, topN]);

  return { data, loading, error, lastUpdate, refresh };
}
