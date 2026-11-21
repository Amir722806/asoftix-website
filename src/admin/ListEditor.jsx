import { useState } from 'react';
import Icon from '../components/ui/Icon';
import { FieldGrid } from './fields';

// Generic list editor: pick an item on the left, edit it on the right.
// Items can be added, removed and reordered. Changes go into the admin draft.
export default function ListEditor({ items = [], onChange, fields, titleKey = 'title', subtitle, newItem, noun = 'item', thumb }) {
  const [sel, setSel] = useState(items.length ? 0 : -1);
  const current = items[sel];

  const setItem = (v) => onChange(items.map((x, i) => (i === sel ? v : x)));
  const add = () => {
    onChange([...items, newItem()]);
    setSel(items.length);
  };
  const remove = () => {
    if (!window.confirm(`Delete this ${noun}? You can still discard before saving.`)) return;
    onChange(items.filter((_, i) => i !== sel));
    setSel(Math.max(0, sel - 1));
  };
  const move = (d) => {
    const next = [...items];
    const [x] = next.splice(sel, 1);
    next.splice(sel + d, 0, x);
    onChange(next);
    setSel(sel + d);
  };

  return (
    <div className="list-editor">
      <div className="le-list">
        <ul>
          {items.map((it, i) => (
            <li key={i}>
              <button className={i === sel ? 'active' : ''} onClick={() => setSel(i)}>
                {thumb && thumb(it)}
                <span>
                  <strong>{it[titleKey] || `Untitled ${noun}`}</strong>
                  {subtitle && <small>{subtitle(it)}</small>}
                </span>
              </button>
            </li>
          ))}
        </ul>
        <button className="btn btn-ghost btn-sm le-add" onClick={add}><Icon name="plus" size={16} /> Add {noun}</button>
      </div>
      <div className="le-form card">
        {current ? (
          <>
            <div className="le-toolbar">
              <h2 className="h3">{current[titleKey] || `New ${noun}`}</h2>
              <div className="row-tools">
                <button onClick={() => move(-1)} disabled={sel === 0} aria-label="Move up" title="Move up">↑</button>
                <button onClick={() => move(1)} disabled={sel === items.length - 1} aria-label="Move down" title="Move down">↓</button>
                <button className="danger" onClick={remove}>Delete</button>
              </div>
            </div>
            <FieldGrid key={sel} fields={fields} value={current} onChange={setItem} />
          </>
        ) : (
          <p className="muted">No {noun}s yet. Click “Add {noun}”.</p>
        )}
      </div>
    </div>
  );
}
