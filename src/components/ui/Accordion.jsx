import { useId, useState } from 'react';
import Icon from './Icon';

export default function Accordion({ items }) {
  const [open, setOpen] = useState(0);
  const base = useId();
  return (
    <div className="accordion">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div className={`acc-item ${isOpen ? 'open' : ''}`} key={item.q}>
            <h3>
              <button
                aria-expanded={isOpen}
                aria-controls={`${base}-${i}`}
                onClick={() => setOpen(isOpen ? -1 : i)}
              >
                {item.q}
                <Icon name="plus" size={18} className="acc-icon" />
              </button>
            </h3>
            <div id={`${base}-${i}`} className="acc-panel" hidden={!isOpen}>
              <p>{item.a}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
