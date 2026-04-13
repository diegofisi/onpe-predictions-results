import type { NivelConfianza } from '../types/onpe.types';
import Tooltip from './Tooltip';

interface Props {
  confianza: NivelConfianza;
  setConfianza: (v: NivelConfianza) => void;
  topN: number;
  setTopN: (v: number) => void;
  loading: boolean;
  onRefresh: () => void;
}

export default function Controls({
  confianza, setConfianza,
  topN, setTopN,
  loading, onRefresh,
}: Props) {
  return (
    <div className="controls">
      <div className="control-group">
        <label>Nivel de confianza:</label>
        <select
          value={confianza}
          onChange={e => setConfianza(Number(e.target.value) as NivelConfianza)}
          className="input"
        >
          <option value={90}>90%</option>
          <option value={95}>95%</option>
          <option value={99}>99%</option>
        </select>
        <Tooltip text="Que tan seguro quieres estar de la prediccion. 90% = rango mas estrecho pero menos seguro. 95% = lo estandar en estadistica. 99% = muy seguro pero el rango se hace mas amplio." />
      </div>

      <div className="control-group">
        <label>Mostrar top:</label>
        <input
          type="number"
          value={topN}
          onChange={e => setTopN(Number(e.target.value))}
          min={1}
          max={40}
          className="input"
          style={{ width: 60 }}
        />
        <Tooltip text="Cuantos candidatos mostrar en el ranking. Si pones 5, solo veras los 5 primeros. Si pones 10, los 10 primeros." />
      </div>

      <button onClick={onRefresh} disabled={loading} className="btn-primary">
        {loading ? 'Cargando...' : 'Consultar resultados'}
      </button>
    </div>
  );
}
