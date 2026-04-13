import type { Region } from '../types/onpe.types';
import Card from './Card';
import Stat from './Stat';
import ProgressBar from './ProgressBar';

interface Props {
  region: Region;
  index: number;
}

export default function RegionCard({ region, index }: Props) {
  const totalActas = region.totalActas || 0;
  const contadas = region.actasContabilizadas || 0;
  const pctConteo = region.porcentajeConteo ?? (totalActas > 0 ? (contadas / totalActas) * 100 : 0);

  const color = pctConteo > 50 ? '#22c55e' : pctConteo > 25 ? '#f59e0b' : '#ef4444';

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
    </Card>
  );
}
