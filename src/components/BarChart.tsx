import type { CandidatoNacional } from '../types/onpe.types';
import { getColor } from '../utils/colors';

interface Props {
  candidatos: CandidatoNacional[];
  maxShow?: number;
}

export default function BarChart({ candidatos, maxShow = 10 }: Props) {
  const top = candidatos.slice(0, maxShow);
  const maxPct = Math.max(
    ...top.map(c => c.porcentajeExtrapoladoMax || c.porcentajeVotosValidosNacional || 0),
    1
  );

  return (
    <div className="bar-chart">
      {top.map((c, i) => {
        const pct = c.porcentajeVotosValidosNacional ?? 0;
        const pMin = c.porcentajeExtrapoladoMin ?? pct;
        const pMax = c.porcentajeExtrapoladoMax ?? pct;
        const color = getColor(c.organizacionPolitica, i);

        return (
          <div key={i} className="bar-item">
            <div className="bar-header">
              <span className="bar-name">{i + 1}. {c.nombreCandidato}</span>
              <span className="bar-range">{pMin.toFixed(1)}% &mdash; {pMax.toFixed(1)}%</span>
            </div>
            <div className="bar-track">
              {/* Confidence interval range */}
              <div
                className="bar-ci"
                style={{
                  left: `${(pMin / maxPct) * 100}%`,
                  width: `${((pMax - pMin) / maxPct) * 100}%`,
                  background: color,
                }}
              />
              {/* Current actual value */}
              <div
                className="bar-fill"
                style={{ width: `${(pct / maxPct) * 100}%`, background: color }}
              >
                <span className="bar-pct">{pct.toFixed(2)}%</span>
              </div>
            </div>
          </div>
        );
      })}
      <div className="bar-legend">
        <span>&#9632; Barra solida = % actual</span>
        <span>&#9618; Area clara = intervalo de confianza</span>
      </div>
    </div>
  );
}
