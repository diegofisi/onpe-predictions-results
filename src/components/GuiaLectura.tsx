import Card from './Card';

export default function GuiaLectura() {
  return (
    <Card title="Como leer estos resultados" color="#8b5cf6" defaultOpen={false}
      info="Haz clic para expandir la guia completa de interpretacion">
      <div className="guia">

        <div className="guia-section">
          <h4 className="guia-title" style={{ color: '#8b5cf6' }}>1. Conteo Nacional</h4>
          <p><strong>% Actas Contadas:</strong> Que porcentaje del total de actas ya se proceso. A mayor %, mas confiable la prediccion.</p>
          <p><strong>Total Actas:</strong> Numero total de actas electorales en todo el pais (N en la formula FPC).</p>
          <p><strong>Actas Contabilizadas:</strong> Cuantas ya se procesaron (n en la formula FPC).</p>
        </div>

        <div className="guia-section">
          <h4 className="guia-title" style={{ color: '#3b82f6' }}>2. % Actual vs Prediccion</h4>
          <p><strong>% Actual (porcentajeVotosValidosNacional):</strong> El porcentaje REAL con las actas contadas hasta ahora. Es un dato concreto, no estimacion.</p>
          <p><strong>Votos Extrapolados (votosExtrapolados):</strong> Proyeccion de cuantos votos tendra al 100%. Se calcula: votos x (totalActas / actasContadas). Es la PREDICCION de votos totales.</p>
        </div>

        <div className="guia-section">
          <h4 className="guia-title" style={{ color: '#22c55e' }}>3. Margen de Error y Confianza</h4>
          <p><strong>Margen de Error (+-X%):</strong> Usa el Factor de Correccion de Poblacion Finita (FPC). Ejemplo: si un candidato tiene 25% +- 1.2%, su resultado final estara entre 23.8% y 26.2%.</p>
          <p><strong>Intervalo de Confianza (Min — Max):</strong> El rango donde caera el % final con la probabilidad elegida. <em>ES LA PREDICCION PRINCIPAL.</em></p>
          <div className="guia-highlight">
            <strong>Colores del margen:</strong> Verde (&lt;1%) = muy preciso | Amarillo (1-2%) = aceptable | Rojo (&gt;2%) = mucha incertidumbre
          </div>
        </div>

        <div className="guia-section">
          <h4 className="guia-title" style={{ color: '#f59e0b' }}>4. Grafico de Barras</h4>
          <p><strong>Barra solida:</strong> El porcentaje actual real del candidato.</p>
          <p><strong>Area clara (transparente):</strong> El intervalo de confianza. Si dos candidatos tienen areas que se superponen, NO se puede declarar un ganador con certeza.</p>
        </div>

        <div className="guia-section">
          <h4 className="guia-title" style={{ color: '#ef4444' }}>5. Formula FPC</h4>
          <code className="formula">ME = z x sqrt(p(1-p) / n) x sqrt((N-n) / (N-1))</code>
          <p>Donde: z=1.96 (95% confianza), p=proporcion observada, n=actas contadas, N=total actas</p>
          <p className="text-muted">El factor sqrt((N-n)/(N-1)) reduce el error conforme mas actas se cuentan. Al 100%, el margen es 0.</p>
        </div>

        <div className="guia-section">
          <h4 className="guia-title" style={{ color: '#06b6d4' }}>6. Como saber quien gana?</h4>
          <p>Mira el <strong>Intervalo de Confianza</strong> de los dos primeros candidatos. Si los rangos NO se superponen, el primero es el ganador proyectado con el nivel de confianza elegido.</p>
          <p>Ejemplo: Candidato A tiene intervalo 28.5% — 30.1% y Candidato B tiene 24.2% — 25.8%. Como no se cruzan, Candidato A gana la proyeccion.</p>
          <p>Pero si A tiene 27.0% — 29.5% y B tiene 28.1% — 30.0%, los rangos se cruzan y no se puede declarar ganador aun.</p>
        </div>

      </div>
    </Card>
  );
}
