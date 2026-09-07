import LogRow from "./LogRow";

export default function SignalLog({ entries, onClear }) {
  return (
    <section className="signal-log">
      <div className="signal-log__header">
        <h2 className="signal-log__title">Signal log</h2>
        <div className="signal-log__meta">
          <span>{entries.length} {entries.length === 1 ? "link" : "links"}</span>
          {entries.length > 0 && (
            <button type="button" className="btn-text" onClick={onClear}>
              Clear
            </button>
          )}
        </div>
      </div>

      {entries.length === 0 ? (
        <div className="empty-state">
          <span className="empty-state__rings" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
          <p>No signals yet. Shorten your first link above and it'll show up here.</p>
        </div>
      ) : (
        <ul className="log-list">
          {entries.map((entry) => (
            <LogRow key={entry.id} entry={entry} />
          ))}
        </ul>
      )}
    </section>
  );
}
