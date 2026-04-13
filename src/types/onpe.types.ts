/* ─── Tipos del JSON que devuelve GET /resultados/resumen ─── */

export interface ConteoNacional {
  totalActas: number;
  actasContabilizadas: number;
  porcentajeConteo: number;
}

export interface CandidatoRegion {
  nombre: string;
  organizacionPolitica: string;
  votos: number;
  porcentajeVotosValidos: number;
  votosExtrapolados: number;
  margenError: number;
  porcentajeExtrapoladoMin: number;
  porcentajeExtrapoladoMax: number;
}

export interface Region {
  departamento: string;
  ubigeo: string;
  totalActas: number;
  actasContabilizadas: number;
  electoresHabiles: number;
  candidatos: CandidatoRegion[];
}

export interface CandidatoNacional {
  nombreCandidato: string;
  organizacionPolitica: string;
  votosTotalNacional: number;
  porcentajeVotosValidosNacional: number;
  votosExtrapolados: number;
  margenError: number;
  porcentajeExtrapoladoMin: number;
  porcentajeExtrapoladoMax: number;
}

export interface ResumenResponse {
  conteoNacional: ConteoNacional;
  regiones: Region[];
  topCandidatos: CandidatoNacional[];
  todosCandidatos: CandidatoNacional[];
}

export type NivelConfianza = 90 | 95 | 99;
