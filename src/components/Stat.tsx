import Tooltip from './Tooltip';

interface Props {
  label: string;
  value: string | number;
  sub?: string;
  tooltip?: string;
}

export default function Stat({ label, value, sub, tooltip }: Props) {
  return (
    <div className="stat-box">
      <div className="stat-label">
        {label}
        {tooltip && <Tooltip text={tooltip} />}
      </div>
      <div className="stat-value">{value}</div>
      {sub && <div className="stat-sub">{sub}</div>}
    </div>
  );
}
