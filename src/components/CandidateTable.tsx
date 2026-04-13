import type { CandidatoNacional } from '../types/onpe.types';
import Tooltip from './Tooltip';
import { getColor } from '../utils/colors';

interface Props {
  candidatos: CandidatoNacional[];
}

export default function CandidateTable({ candidatos }: Props) {
  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th className="text-left">Candidato</th>
            <th>
              % Actual
              <Tooltip text="Porcentaje real con las actas contadas hasta ahora. NO es estimacion, es el dato concreto del momento." />
            </th>
            <th>
              Votos Extrapolados
              <Tooltip text="Proyeccion de votos totales al 100% de actas. Formula: votos x (totalActas / actasContadas). Es cuantos votos TENDRIA si la tendencia se mantiene." />
            </th>
            <th>
              Margen Error
              <Tooltip text="Calculado con Factor de Correccion de Poblacion Finita (FPC). Verde (<1%) = muy preciso. Amarillo (1-2%) = aceptable. Rojo (>2%) = mucha incertidumbre." />
            </th>
            <th>
              Intervalo Confianza
              <Tooltip text="ES LA PREDICCION PRINCIPAL. El porcentaje final del candidato caera dentro de este rango con la probabilidad elegida (90/95/99%)." />
            </th>
          </tr>
        </thead>
        <tbody>
          {candidatos.map((c, i) => {
            const pct = c.porcentajeVotosValidosNacional ?? 0;
            const me = c.margenError ?? 0;
            const color = getColor(c.organizacionPolitica, i);
            const meClass = me < 1 ? 'me-low' : me < 2 ? 'me-mid' : 'me-high';

            return (
              <tr key={i}>
                <td className="text-center" style={{ color, fontWeight: 700 }}>{i + 1}</td>
                <td className="text-left">
                  <div className="candidate-name">{c.nombreCandidato}</div>
                  <div className="candidate-party">{c.organizacionPolitica}</div>
                </td>
                <td className="text-center">
                  <span className="pct-badge" style={{ color }}>{pct.toFixed(2)}%</span>
                </td>
                <td className="text-center">{(c.votosExtrapolados ?? 0).toLocaleString('es-PE')}</td>
                <td className="text-center">
                  <span className={`me-badge ${meClass}`}>&plusmn;{me.toFixed(2)}%</span>
                </td>
                <td className="text-center">
                  <span className="ci-badge">
                    {(c.porcentajeExtrapoladoMin ?? 0).toFixed(2)}% &mdash; {(c.porcentajeExtrapoladoMax ?? 0).toFixed(2)}%
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
