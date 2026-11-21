export default function SectionTitle({ eyebrow, title, intro, align = 'left', as: H = 'h2' }) {
  return (
    <div className={`section-title ${align === 'center' ? 'center' : ''}`}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <H>{title}</H>
      {intro && <p className="lead">{intro}</p>}
    </div>
  );
}
