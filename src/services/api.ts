import type { ResumenResponse, NivelConfianza } from '../types/onpe.types';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export async function fetchResumen(
  confianza: NivelConfianza = 95,
  topN: number = 10,
): Promise<ResumenResponse> {
  const url = `${BASE_URL}/resultados/resumen?confianza=${confianza}&top=${topN}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
  return res.json();
}

export function getApiUrl(): string {
  return BASE_URL;
}
