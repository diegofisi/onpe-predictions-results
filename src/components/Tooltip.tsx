import { useState, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';

interface Props {
  text: string;
}

export default function Tooltip({ text }: Props) {
  const [show, setShow] = useState(false);
  const [pos, setPos] = useState({ top: 0, left: 0 });
  const iconRef = useRef<HTMLSpanElement>(null);

  const updatePos = useCallback(() => {
    if (!iconRef.current) return;
    const rect = iconRef.current.getBoundingClientRect();
    let left = rect.left + rect.width / 2 - 140;
    if (left < 8) left = 8;
    if (left + 280 > window.innerWidth - 8) left = window.innerWidth - 288;
    setPos({ top: rect.top - 8, left });
  }, []);

  const handleEnter = () => {
    updatePos();
    setShow(true);
  };

  return (
    <span className="tooltip-wrapper">
      <span
        ref={iconRef}
        className="tooltip-icon"
        onClick={() => { if (show) { setShow(false); } else { handleEnter(); } }}
        onMouseEnter={handleEnter}
        onMouseLeave={() => setShow(false)}
      >
        ?
      </span>
      {show && createPortal(
        <div
          className="tooltip-box"
          style={{
            position: 'fixed',
            top: pos.top,
            left: pos.left,
            transform: 'translateY(-100%)',
          }}
        >
          {text}
        </div>,
        document.body
      )}
    </span>
  );
}
