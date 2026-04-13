interface Props {
  porcentaje: number;
  color?: string;
  label?: string;
  height?: number;
}

export default function ProgressBar({ porcentaje, color = '#3b82f6', label, height = 28 }: Props) {
  const pct = Math.min(Math.max(porcentaje, 0), 100);

  return (
    <div className="progress-row">
      {label && <span className="progress-label">{label}</span>}
      <div className="progress-track" style={{ height }}>
        <div
          className="progress-fill"
          style={{ width: `${pct}%`, background: color, minWidth: pct > 0 ? 2 : 0 }}
        />
        <span className="progress-text">{pct.toFixed(2)}%</span>
      </div>
    </div>
  );
}
