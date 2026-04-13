const COLORES_PARTIDO: Record<string, string> = {
  'RENOVACION POPULAR': '#1e3a8a',
  'FUERZA POPULAR': '#f97316',
  'ALIANZA PARA EL PROGRESO': '#14b8a6',
  'PARTIDO DEMOCRATICO SOMOS PERU': '#ef4444',
  'JUNTOS POR EL PERU': '#a855f7',
  'ACCION POPULAR': '#facc15',
  'AVANZA PAIS': '#22d3ee',
  'PERU LIBRE': '#dc2626',
  'PODEMOS PERU': '#ec4899',
  'PARTIDO MORADO': '#7c3aed',
};

const COLORES_DEFAULT = [
  '#3b82f6', '#ef4444', '#f59e0b', '#10b981', '#8b5cf6',
  '#ec4899', '#06b6d4', '#f97316', '#84cc16', '#6366f1',
];

export function getColor(partido: string | undefined, index: number): string {
  return COLORES_PARTIDO[partido?.toUpperCase() ?? ''] || COLORES_DEFAULT[index % COLORES_DEFAULT.length];
}
