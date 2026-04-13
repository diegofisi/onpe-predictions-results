/* ─── Tipos del JSON que devuelve GET /resultados/resumen ─── */

export interface ConteoNacional {
  actasContabilizadasTotal: number;
  totalActasNacional: number;
  porcentajeConteoNacional: number;
  totalVotosValidosContados: number;
  totalVotosEmitidosContados: number;
  factorCorreccionPoblacionFinita: number;
}

export interface VotosPorRegion {
  ubigeo: string;
  nombre: string;
  votos: number;
  porcentaje: number;
}

export interface CandidatoNacional {
  posicion: number;
  nombreAgrupacionPolitica: string;
  nombreCandidato: string;
  totalVotosValidosNacional: number;
  porcentajeVotosValidosNacional: number;
  votosPorRegion: VotosPorRegion[];
  votosExtrapolados: number;
  porcentajeExtrapoladoMin: number;
  porcentajeExtrapoladoMax: number;
  margenError: number;
  margenErrorRelativo: number;
}

export interface Region {
  ubigeo: string;
  nombre: string;
  porcentajeConteo: number;
  actasContabilizadas: number;
  totalActas: number;
  totalVotosValidos: number;
  totalVotosEmitidos: number;
}

export interface ResumenResponse {
  fechaCalculo: string;
  nivelConfianza: number;
  zScore: number;
  conteoNacional: ConteoNacional;
  regiones: Region[];
  topCandidatos: CandidatoNacional[];
  todosCandidatos: CandidatoNacional[];
}

export type NivelConfianza = 90 | 95 | 99;
