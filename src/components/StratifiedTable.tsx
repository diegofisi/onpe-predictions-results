import type { CandidatoEstratificado } from '../types/onpe.types';
import Tooltip from './Tooltip';
import { getColor } from '../utils/colors';

interface Props {
  candidatos: CandidatoEstratificado[];
}

export default function StratifiedTable({ candidatos }: Props) {
  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th className="text-left">Candidato</th>
            <th>
              % Actual
              <Tooltip text="Porcentaje real observado con las actas contadas hasta ahora. Es el mismo dato que en el metodo simple." />
            </th>
            <th>
              % Estratificado
              <Tooltip text="Porcentaje ponderado por region. Cada region aporta segun su peso (actas totales). Si una region rural tiene pocos votos contados pero muchas actas, su peso es mayor en la proyeccion." />
            </th>
            <th>
              ME Estratificado
              <Tooltip text="Margen de error calculado combinando las varianzas de cada region por separado. Regiones con poco conteo aportan mas incertidumbre. Es mas realista que el simple." />
            </th>
            <th>
              Intervalo Estratificado
              <Tooltip text="LA PREDICCION CON CORRECCION DE SESGO. Este rango es mas amplio pero mas honesto que el simple, porque captura la incertidumbre de regiones que aun tienen poco conteo." />
            </th>
            <th>
              ME Simple
              <Tooltip text="Margen de error del metodo simple (sin estratificar). Se calcula asumiendo muestreo aleatorio sobre el total nacional." />
            </th>
            <th>
              Diferencia
              <Tooltip text="Cuanto mas grande es el margen estratificado vs el simple. Un valor positivo significa que el metodo simple esta SUBESTIMANDO la incertidumbre real." />
            </th>
          </tr>
        </thead>
        <tbody>
          {candidatos.map((c, i) => {
            const color = getColor(c.nombreAgrupacionPolitica, i);
            const meEst = c.margenErrorEstratificado ?? 0;
            const meSimple = c.margenErrorSimple ?? 0;
            const diff = c.diferenciaMargen ?? 0;
            const meClass = meEst < 1 ? 'me-low' : meEst < 2 ? 'me-mid' : 'me-high';

            return (
              <tr key={i}>
                <td className="text-center" style={{ color, fontWeight: 700 }}>{c.posicion}</td>
                <td className="text-left">
                  <div className="candidate-name">{c.nombreCandidato}</div>
                  <div className="candidate-party">{c.nombreAgrupacionPolitica}</div>
                </td>
                <td className="text-center">
                  <span className="pct-badge" style={{ color }}>
                    {(c.porcentajeVotosValidosNacional ?? 0).toFixed(2)}%
                  </span>
                </td>
                <td className="text-center">
                  <span style={{ fontWeight: 700, fontSize: 15, color: '#22c55e' }}>
                    {(c.porcentajeEstratificado ?? 0).toFixed(2)}%
                  </span>
                </td>
                <td className="text-center">
                  <span className={`me-badge ${meClass}`}>&plusmn;{meEst.toFixed(2)}%</span>
                </td>
                <td className="text-center">
                  <span className="ci-badge">
                    {(c.porcentajeEstratificadoMin ?? 0).toFixed(2)}% &mdash; {(c.porcentajeEstratificadoMax ?? 0).toFixed(2)}%
                  </span>
                </td>
                <td className="text-center">
                  <span style={{ color: '#94a3b8' }}>&plusmn;{meSimple.toFixed(2)}%</span>
                </td>
                <td className="text-center">
                  <span style={{
                    color: diff > 0.1 ? '#f59e0b' : diff > 0 ? '#94a3b8' : '#22c55e',
                    fontWeight: 600,
                  }}>
                    {diff > 0 ? '+' : ''}{diff.toFixed(2)}%
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
