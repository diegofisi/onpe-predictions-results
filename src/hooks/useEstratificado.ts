import { useState, useCallback } from 'react';
import type { ResumenEstratificadoResponse, NivelConfianza } from '../types/onpe.types';
import { fetchEstratificado } from '../services/api';

interface UseEstratificadoOptions {
  confianza: NivelConfianza;
  topN: number;
}

interface UseEstratificadoReturn {
  data: ResumenEstratificadoResponse | null;
  loading: boolean;
  error: string | null;
  lastUpdate: Date | null;
  refresh: () => Promise<void>;
}

export function useEstratificado({ confianza, topN }: UseEstratificadoOptions): UseEstratificadoReturn {
  const [data, setData] = useState<ResumenEstratificadoResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const json = await fetchEstratificado(confianza, topN);
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
