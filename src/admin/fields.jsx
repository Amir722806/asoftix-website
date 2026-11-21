import { useId, useState } from 'react';
import Icon from '../components/ui/Icon';
import { imageToDataUrl } from './api';

/*
  Schema-driven form fields. Each field: { key, label, type, help?, options?, rows? }
  Types: text, url, email, textarea, checkbox, select, color,
         lines      string[]           one item per line
         paragraphs string[]           separated by a blank line
         pairs      [{[a]:..,[b]:..}]  "left | right" per line (keys from field.keys)
         groups     [{title, items}]   "Title: a, b, c" per line
         image      string             upload or URL
         images     [{src, caption}]   list with upload
*/

const toText = {
  lines: (v) => (v || []).join('\n'),
  paragraphs: (v) => (v || []).join('\n\n'),
  pairs: (v, f) => (v || []).map((o) => `${o[f.keys[0]] ?? ''} | ${o[f.keys[1]] ?? ''}`).join('\n'),
  groups: (v) => (v || []).map((g) => `${g.title}: ${(g.items || []).join(', ')}`).join('\n'),
};
const fromText = {
  lines: (t) => t.split('\n').map((s) => s.trim()).filter(Boolean),
  paragraphs: (t) => t.split(/\n\s*\n/).map((s) => s.trim()).filter(Boolean),
  pairs: (t, f) => fromText.lines(t).map((l) => {
    const [a, ...rest] = l.split('|');
    return { [f.keys[0]]: a.trim(), [f.keys[1]]: rest.join('|').trim() };
  }),
  groups: (t) => fromText.lines(t).map((l) => {
    const i = l.indexOf(':');
    return i < 0
      ? { title: l, items: [] }
      : { title: l.slice(0, i).trim(), items: l.slice(i + 1).split(',').map((s) => s.trim()).filter(Boolean) };
  }),
};

// Text areas for structured values keep their own text while typing, so blank lines are not lost.
function StructuredText({ field, value, onChange, id }) {
  const [text, setText] = useState(() => toText[field.type](value, field));
  return (
    <textarea
      id={id}
      rows={field.rows || 5}
      value={text}
      onChange={(e) => { setText(e.target.value); onChange(fromText[field.type](e.target.value, field)); }}
    />
  );
}

function ImageInput({ value, onChange, maxSize, id }) {
  const [err, setErr] = useState('');
  const upload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try { setErr(''); onChange(await imageToDataUrl(file, maxSize)); } catch (x) { setErr(x.message); }
    e.target.value = '';
  };
  return (
    <div className="img-input">
      {value ? <img src={value} alt="" /> : <div className="img-empty"><Icon name="user" /></div>}
      <div className="img-actions">
        <label className="btn btn-ghost btn-sm">
          Upload image
          <input type="file" accept="image/*" onChange={upload} hidden />
        </label>
        {value && <button type="button" className="btn btn-ghost btn-sm" onClick={() => onChange('')}>Remove</button>}
        <input id={id} type="text" placeholder="…or paste an image URL" value={value?.startsWith('data:') ? '' : value || ''} onChange={(e) => onChange(e.target.value)} />
        {err && <p className="field-error">{err}</p>}
      </div>
    </div>
  );
}

function ImagesInput({ value = [], onChange }) {
  const [err, setErr] = useState('');
  const set = (i, patch) => onChange(value.map((s, j) => (j === i ? { ...s, ...patch } : s)));
  const move = (i, d) => {
    const next = [...value];
    const [x] = next.splice(i, 1);
    next.splice(i + d, 0, x);
    onChange(next);
  };
  const add = async (e) => {
    const files = [...(e.target.files || [])];
    try {
      setErr('');
      const added = [];
      for (const f of files) added.push({ src: await imageToDataUrl(f, 1600, 0.8), caption: '' });
      onChange([...value, ...added]);
    } catch (x) { setErr(x.message); }
    e.target.value = '';
  };
  return (
    <div className="imgs-input">
      {value.map((s, i) => (
        <div className="imgs-row" key={i}>
          <img src={s.src} alt="" />
          <input type="text" placeholder="Caption" value={s.caption || ''} onChange={(e) => set(i, { caption: e.target.value })} aria-label={`Caption for screenshot ${i + 1}`} />
          <div className="row-tools">
            <button type="button" onClick={() => move(i, -1)} disabled={i === 0} aria-label="Move up">↑</button>
            <button type="button" onClick={() => move(i, 1)} disabled={i === value.length - 1} aria-label="Move down">↓</button>
            <button type="button" onClick={() => onChange(value.filter((_, j) => j !== i))} aria-label="Remove screenshot"><Icon name="close" size={16} /></button>
          </div>
        </div>
      ))}
      <label className="btn btn-ghost btn-sm">
        <Icon name="plus" size={16} /> Add screenshots
        <input type="file" accept="image/*" multiple onChange={add} hidden />
      </label>
      <p className="hint">The first screenshot is used as the project card cover.</p>
      {err && <p className="field-error">{err}</p>}
    </div>
  );
}

export function Field({ field, value, onChange }) {
  const id = useId();
  const { type = 'text', label, help } = field;

  let input;
  if (type === 'textarea') input = <textarea id={id} rows={field.rows || 3} value={value || ''} onChange={(e) => onChange(e.target.value)} />;
  else if (type === 'checkbox') input = <input id={id} type="checkbox" checked={Boolean(value)} onChange={(e) => onChange(e.target.checked)} />;
  else if (type === 'select') {
    input = (
      <select id={id} value={value ?? ''} onChange={(e) => onChange(e.target.value)}>
        {field.options.map((o) => {
          const [v, l] = Array.isArray(o) ? o : [o, o];
          return <option key={v} value={v}>{l}</option>;
        })}
      </select>
    );
  } else if (type === 'color') {
    input = (
      <div className="color-input">
        <input id={id} type="color" value={value || '#000000'} onChange={(e) => onChange(e.target.value)} />
        <input type="text" value={value || ''} onChange={(e) => onChange(e.target.value)} aria-label={`${label} hex value`} />
      </div>
    );
  } else if (toText[type]) input = <StructuredText id={id} field={field} value={value} onChange={onChange} />;
  else if (type === 'image') input = <ImageInput id={id} value={value} onChange={onChange} maxSize={field.maxSize || 800} />;
  else if (type === 'images') input = <ImagesInput value={value} onChange={onChange} />;
  else input = <input id={id} type={type} value={value ?? ''} onChange={(e) => onChange(e.target.value)} />;

  return (
    <div className={`a-field ${type === 'checkbox' ? 'a-check' : ''} ${field.wide ? 'wide' : ''}`}>
      <label htmlFor={id}>{label}</label>
      {input}
      {help && <p className="hint">{help}</p>}
    </div>
  );
}

export function FieldGrid({ fields, value, onChange }) {
  return (
    <div className="a-grid">
      {fields.map((f) => (
        <Field key={f.key} field={f} value={value?.[f.key]} onChange={(v) => onChange({ ...value, [f.key]: v })} />
      ))}
    </div>
  );
}
