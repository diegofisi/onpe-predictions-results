import type { Region } from '../types/onpe.types';
import Card from './Card';
import Stat from './Stat';
import ProgressBar from './ProgressBar';
import { getColor } from '../utils/colors';
import { useState } from 'react';

interface Props {
  region: Region;
  index: number;
}

export default function RegionCard({ region, index }: Props) {
  const [showAll, setShowAll] = useState(false);
  const totalActas = region.totalActas || 0;
  const contadas = region.actasContabilizadas || 0;
  const pctConteo = totalActas > 0 ? (contadas / totalActas) * 100 : 0;

  const candidatos = [...(region.candidatos || [])].sort(
    (a, b) => (b.porcentajeVotosValidos ?? 0) - (a.porcentajeVotosValidos ?? 0)
  );
  const top3 = candidatos.slice(0, 3);

  const color = pctConteo > 50 ? '#22c55e' : pctConteo > 25 ? '#f59e0b' : '#ef4444';

  return (
    <Card
      title={region.departamento || `Region ${index + 1}`}
      color={color}
      defaultOpen={false}
      info={`Actas: ${contadas.toLocaleString()} de ${totalActas.toLocaleString()} (${pctConteo.toFixed(1)}%)`}
    >
      <div className="stat-row">
        <Stat label="Actas contadas" value={`${pctConteo.toFixed(1)}%`} sub={`${contadas.toLocaleString()} / ${totalActas.toLocaleString()}`} />
        <Stat label="Electores habiles" value={(region.electoresHabiles || 0).toLocaleString('es-PE')} />
      </div>

      {top3.length > 0 && (
        <div className="region-top">
          <h4 className="section-subtitle">Top 3 en esta region:</h4>
          {top3.map((c, i) => (
            <ProgressBar
              key={i}
              porcentaje={c.porcentajeVotosValidos ?? 0}
              color={getColor(c.organizacionPolitica, i)}
              label={c.nombre || 'N/A'}
            />
          ))}
        </div>
      )}

      {candidatos.length > 3 && (
        <div className="region-all">
          <button className="btn-link" onClick={() => setShowAll(!showAll)}>
            {showAll ? 'Ocultar' : `Ver todos (${candidatos.length})`}
          </button>
          {showAll && candidatos.map((c, i) => (
            <ProgressBar
              key={i}
              porcentaje={c.porcentajeVotosValidos ?? 0}
              color={getColor(c.organizacionPolitica, i)}
              label={`${c.nombre} (${(c.porcentajeVotosValidos ?? 0).toFixed(2)}%)`}
            />
          ))}
        </div>
      )}
    </Card>
  );
}
