import { useEffect, useRef, useState } from 'react';
import Icon from './Icon';

// Screenshot gallery with a keyboard-accessible lightbox (native <dialog>).
export default function Gallery({ shots, title }) {
  const [index, setIndex] = useState(null);
  const ref = useRef(null);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (index !== null && !d.open) d.showModal();
    if (index === null && d.open) d.close();
  }, [index]);

  useEffect(() => {
    if (index === null) return;
    const onKey = (e) => {
      if (e.key === 'ArrowRight') setIndex((i) => (i + 1) % shots.length);
      if (e.key === 'ArrowLeft') setIndex((i) => (i - 1 + shots.length) % shots.length);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [index, shots.length]);

  if (!shots?.length) return null;
  const current = index !== null ? shots[index] : null;

  return (
    <>
      <div className="gallery">
        {shots.map((s, i) => (
          <figure key={s.src} className={i === 0 ? 'wide' : ''}>
            <button onClick={() => setIndex(i)} aria-label={`Enlarge screenshot: ${s.caption || title}`}>
              <img src={s.src} alt={s.caption ? `${title}: ${s.caption}` : title} width="1440" height="900" loading={i ? 'lazy' : 'eager'} />
            </button>
            {s.caption && <figcaption>{s.caption}</figcaption>}
          </figure>
        ))}
      </div>
      <dialog ref={ref} className="lightbox" onClose={() => setIndex(null)} onClick={(e) => e.target === ref.current && setIndex(null)}>
        {current && (
          <>
            <img src={current.src} alt={current.caption || title} />
            <div className="lightbox-bar">
              <span>{current.caption} · {index + 1} / {shots.length}</span>
              <div>
                <button onClick={() => setIndex((index - 1 + shots.length) % shots.length)} aria-label="Previous screenshot"><Icon name="arrow" className="flip" /></button>
                <button onClick={() => setIndex((index + 1) % shots.length)} aria-label="Next screenshot"><Icon name="arrow" /></button>
                <button onClick={() => setIndex(null)} aria-label="Close"><Icon name="close" /></button>
              </div>
            </div>
          </>
        )}
      </dialog>
    </>
  );
}
