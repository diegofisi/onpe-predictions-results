import type { Region, CandidatoNacional } from '../types/onpe.types';
import Card from './Card';
import Stat from './Stat';
import ProgressBar from './ProgressBar';
import { getColor } from '../utils/colors';

interface CandidatoRegional {
  nombre: string;
  partido: string;
  porcentaje: number;
}

interface Props {
  region: Region;
  index: number;
  todosCandidatos: CandidatoNacional[];
}

function getTopCandidatosRegion(region: Region, candidatos: CandidatoNacional[]): CandidatoRegional[] {
  const result: CandidatoRegional[] = [];
  for (const c of candidatos) {
    const vr = c.votosPorRegion?.find(v => v.ubigeo === region.ubigeo);
    if (vr && vr.votos > 0) {
      result.push({
        nombre: c.nombreCandidato,
        partido: c.nombreAgrupacionPolitica,
        porcentaje: vr.porcentaje,
      });
    }
  }
  return result.sort((a, b) => b.porcentaje - a.porcentaje).slice(0, 5);
}

export default function RegionCard({ region, index, todosCandidatos }: Props) {
  const totalActas = region.totalActas || 0;
  const contadas = region.actasContabilizadas || 0;
  const pctConteo = region.porcentajeConteo ?? (totalActas > 0 ? (contadas / totalActas) * 100 : 0);

  const color = pctConteo > 50 ? '#22c55e' : pctConteo > 25 ? '#f59e0b' : '#ef4444';
  const top5 = getTopCandidatosRegion(region, todosCandidatos);

  return (
    <Card
      title={region.nombre || `Region ${index + 1}`}
      color={color}
      defaultOpen={false}
      info={`Actas: ${contadas.toLocaleString()} de ${totalActas.toLocaleString()} (${pctConteo.toFixed(1)}%)`}
    >
      <div className="stat-row">
        <Stat label="Avance conteo" value={`${pctConteo.toFixed(1)}%`} sub={`${contadas.toLocaleString()} / ${totalActas.toLocaleString()}`} />
        <Stat label="Votos validos" value={(region.totalVotosValidos || 0).toLocaleString('es-PE')} />
        <Stat label="Votos emitidos" value={(region.totalVotosEmitidos || 0).toLocaleString('es-PE')} />
      </div>

      <ProgressBar porcentaje={pctConteo} color={color} label="Progreso regional" />

      {top5.length > 0 && (
        <div style={{ marginTop: 12 }}>
          <h4 className="section-subtitle">Top 5 candidatos en esta region:</h4>
          {top5.map((c, i) => (
            <ProgressBar
              key={i}
              porcentaje={c.porcentaje}
              color={getColor(c.partido, i)}
              label={c.nombre}
            />
          ))}
        </div>
      )}
    </Card>
  );
}
