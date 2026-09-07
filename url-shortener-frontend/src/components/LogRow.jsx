import { useEffect, useState } from "react";
import { ExternalLink, RefreshCw } from "lucide-react";
import CopyButton from "./CopyButton";
import { getAnalytics, shortLinkFor } from "../api";

export default function LogRow({ entry }) {
  const [clicks, setClicks] = useState(null);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  const shortLink = shortLinkFor(entry.shortCode);

  async function fetchClicks() {
    setLoading(true);
    setFailed(false);
    try {
      const data = await getAnalytics(entry.shortCode);
      setClicks(data.totalClicks);
    } catch {
      setFailed(true);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchClicks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entry.shortCode]);

  return (
    <li className="log-row">
      <span className="beacon-dot" aria-hidden="true" />

      <div className="log-row__main">
        <div className="log-row__top">
          <span className="log-row__code">{entry.shortCode}</span>
          <span className="log-row__clicks" title="Total clicks recorded">
            {failed ? "—" : loading ? "…" : clicks}
            <span className="log-row__clicks-label">{clicks === 1 ? "click" : "clicks"}</span>
          </span>
        </div>
        <p className="log-row__source" title={entry.actualUrl}>
          {entry.actualUrl}
        </p>
      </div>

      <div className="log-row__actions">
        <button
          type="button"
          className="btn-icon"
          onClick={fetchClicks}
          aria-label="Refresh click count"
          disabled={loading}
        >
          <RefreshCw size={14} strokeWidth={2.25} className={loading ? "spin" : ""} />
        </button>
        <CopyButton value={shortLink} label="Copy" />
        <a className="btn-icon" href={shortLink} target="_blank" rel="noreferrer" aria-label="Visit link">
          <ExternalLink size={14} strokeWidth={2.25} />
        </a>
      </div>
    </li>
  );
}
