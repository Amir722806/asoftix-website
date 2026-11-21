// Stylised UI illustration used until real project screenshots are added.
// Purely decorative, so hidden from screen readers.
export default function ProjectVisual({ kind }) {
  return (
    <div className={`pv pv-${kind}`} aria-hidden="true">
      <div className="pv-bar"><i /><i /><i /><span /></div>
      <div className="pv-body">
        {kind === 'site' && (
          <>
            <div className="pv-hero"><b /><s /><s className="short" /><em /></div>
            <div className="pv-row3"><u /><u /><u /></div>
          </>
        )}
        {kind === 'shop' && (
          <div className="pv-grid4">
            {Array.from({ length: 8 }).map((_, i) => <div key={i} className="pv-prod"><u /><s /><s className="short" /></div>)}
          </div>
        )}
        {kind === 'dash' && (
          <div className="pv-dash">
            <div className="pv-side">{Array.from({ length: 6 }).map((_, i) => <s key={i} />)}</div>
            <div className="pv-main">
              <div className="pv-kpis"><u /><u /><u /></div>
              <div className="pv-chart">
                {[40, 65, 50, 80, 58, 90, 72].map((h, i) => <span key={i} style={{ height: `${h}%` }} />)}
              </div>
              <div className="pv-table">{Array.from({ length: 4 }).map((_, i) => <s key={i} />)}</div>
            </div>
          </div>
        )}
        {kind === 'mobile' && (
          <div className="pv-phone">
            <div className="pv-ring" />
            <s /><s className="short" /><s />
          </div>
        )}
      </div>
    </div>
  );
}
