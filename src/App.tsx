import { useState } from 'react';
import type { NivelConfianza } from './types/onpe.types';
import { useResumen } from './hooks/useResumen';
import { getApiUrl } from './services/api';
import Controls from './components/Controls';
import GuiaLectura from './components/GuiaLectura';
import Card from './components/Card';
import Stat from './components/Stat';
import ProgressBar from './components/ProgressBar';
import BarChart from './components/BarChart';
import CandidateTable from './components/CandidateTable';
import RegionCard from './components/RegionCard';
import './App.css';

export default function App() {
  const [confianza, setConfianza] = useState<NivelConfianza>(95);
  const [topN, setTopN] = useState(10);

  const { data, loading, error, lastUpdate, refresh } = useResumen({
    confianza,
    topN,
  });

  const conteo = data?.conteoNacional;
  const regiones = data?.regiones ?? [];
  const topCandidatos = data?.topCandidatos ?? [];
  const todosCandidatos = data?.todosCandidatos ?? [];
  const pctConteo = conteo && conteo.totalActas > 0
    ? (conteo.actasContabilizadas / conteo.totalActas) * 100
    : 0;

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <h1 className="title">ONPE Extrapolador</h1>
        <p className="subtitle">Prediccion de resultados electorales con Factor de Correccion de Poblacion Finita</p>
        {lastUpdate && (
          <p className="last-update">Ultima actualizacion: {lastUpdate.toLocaleTimeString('es-PE')}</p>
        )}
      </header>

      {/* Controles */}
      <Controls
        confianza={confianza} setConfianza={setConfianza}
        topN={topN} setTopN={setTopN}
        loading={loading} onRefresh={refresh}
      />

      {/* Error */}
      {error && (
        <div className="error-box">
          <strong>Error:</strong> {error}
          <p>Verifica que el servidor este corriendo en {getApiUrl()}</p>
        </div>
      )}

      {data && (
        <>
          {/* Guia */}
          <GuiaLectura />

          {/* Conteo Nacional */}
          <Card title="Conteo Nacional" color="#3b82f6"
            info="Avance general del conteo de actas a nivel nacional. Mientras mas actas se cuenten, mas precisa es la prediccion.">
            <div className="stat-row">
              <Stat
                label="Avance del conteo"
                value={`${pctConteo.toFixed(2)}%`}
                tooltip="Porcentaje de actas procesadas del total. A mayor %, menos margen de error."
              />
              <Stat
                label="Total actas"
                value={(conteo?.totalActas ?? 0).toLocaleString('es-PE')}
                tooltip="Numero total de actas electorales en todo el pais (N en la formula FPC)."
              />
              <Stat
                label="Actas contadas"
                value={(conteo?.actasContabilizadas ?? 0).toLocaleString('es-PE')}
                tooltip="Actas ya procesadas y digitadas (n en la formula FPC)."
              />
              <Stat
                label="Regiones activas"
                value={regiones.length}
                sub="de 25 departamentos"
                tooltip="Regiones que devolvieron datos validos de la API de ONPE."
              />
            </div>
            <ProgressBar porcentaje={pctConteo} color="#3b82f6" label="Progreso nacional" height={32} />
          </Card>

          {/* Grafico Top Candidatos */}
          <Card title="Prediccion Nacional — Top Candidatos" color="#22c55e"
            info="La barra solida es el % actual real. El area clara muestra el intervalo de confianza. Si dos candidatos se solapan, no se puede declarar ganador con certeza.">
            <BarChart candidatos={topCandidatos} maxShow={topN} />
          </Card>

          {/* Tabla detallada */}
          <Card title="Tabla Detallada — Top Candidatos" color="#f59e0b"
            info="Cada fila muestra: % actual, votos proyectados al 100%, margen de error, e intervalo de confianza. El intervalo Min—Max es LA PREDICCION.">
            <CandidateTable candidatos={topCandidatos} />
          </Card>

          {/* Todos los candidatos */}
          <Card title="Todos los Candidatos (Nacional)" color="#64748b" defaultOpen={false}
            info="Lista completa de todos los candidatos con sus datos extrapolados.">
            <CandidateTable candidatos={todosCandidatos} />
          </Card>

          {/* Regiones */}
          <Card title={`Resultados por Region (${regiones.length} departamentos)`} color="#8b5cf6" defaultOpen={false}
            info="Cada region muestra su avance de conteo y los candidatos mas votados. Haz clic en cada region para ver detalles.">
            {regiones.map((r, i) => (
              <RegionCard key={r.ubigeo || i} region={r} index={i} />
            ))}
          </Card>

          {/* JSON crudo */}
          <Card title="JSON Crudo (Debug)" color="#475569" defaultOpen={false}
            info="El JSON completo tal cual lo devuelve la API. Util para desarrolladores.">
            <pre className="json-raw">{JSON.stringify(data, null, 2)}</pre>
          </Card>
        </>
      )}

      {/* Footer */}
      <footer className="footer">
        ONPE Extrapolador — Prediccion con FPC (Factor de Correccion de Poblacion Finita)
        <br />Datos de: ONPE resultadoelectoral.onpe.gob.pe — Solo con fines informativos
      </footer>
    </div>
  );
}
