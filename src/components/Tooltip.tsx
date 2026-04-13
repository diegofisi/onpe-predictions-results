import { useState, useRef, useEffect } from 'react';

interface Props {
  text: string;
}

export default function Tooltip({ text }: Props) {
  const [show, setShow] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (show && boxRef.current) {
      const rect = boxRef.current.getBoundingClientRect();
      if (rect.left < 8) {
        boxRef.current.style.left = `${-rect.left + 8}px`;
      }
      if (rect.right > window.innerWidth - 8) {
        boxRef.current.style.left = `${parseFloat(boxRef.current.style.left || '-100') - (rect.right - window.innerWidth + 8)}px`;
      }
    }
  }, [show]);

  return (
    <span className="tooltip-wrapper">
      <span
        className="tooltip-icon"
        onClick={() => setShow(!show)}
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
      >
        ?
      </span>
      {show && <div ref={boxRef} className="tooltip-box">{text}</div>}
    </span>
  );
}
