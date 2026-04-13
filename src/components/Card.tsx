import { useState, type ReactNode } from 'react';

interface Props {
  title: string;
  info?: string;
  color?: string;
  defaultOpen?: boolean;
  children: ReactNode;
}

export default function Card({ title, info, color = '#3b82f6', defaultOpen = true, children }: Props) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="card">
      <div className="card-header" onClick={() => setOpen(!open)} style={{ borderLeftColor: color }}>
        <h3>{title}</h3>
        <span className={`card-arrow ${open ? 'open' : ''}`}>&#9660;</span>
      </div>
      {info && <div className="card-info"><p>{info}</p></div>}
      {open && <div className="card-body">{children}</div>}
    </div>
  );
}
