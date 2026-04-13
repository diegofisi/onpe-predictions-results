import { useState } from 'react';

interface Props {
  text: string;
}

export default function Tooltip({ text }: Props) {
  const [show, setShow] = useState(false);

  return (
    <span className="tooltip-wrapper">
      <span
        className="tooltip-icon"
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
      >
        ?
      </span>
      {show && <div className="tooltip-box">{text}</div>}
    </span>
  );
}
