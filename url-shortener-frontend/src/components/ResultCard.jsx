import { ExternalLink } from "lucide-react";
import CopyButton from "./CopyButton";
import { shortLinkFor } from "../api";

export default function ResultCard({ result }) {
  if (!result) return null;

  const shortLink = shortLinkFor(result.shortCode);

  return (
    <div className="result-card" key={result.shortCode}>
      <div className="result-card__row">
        <span className="beacon-dot beacon-dot--live" aria-hidden="true" />
        <a className="result-card__link" href={shortLink} target="_blank" rel="noreferrer">
          {shortLink.replace(/^https?:\/\//, "")}
        </a>
        <div className="result-card__actions">
          <CopyButton value={shortLink} />
          <a className="btn-icon" href={shortLink} target="_blank" rel="noreferrer" aria-label="Visit link">
            <ExternalLink size={15} strokeWidth={2.25} />
            <span>Visit</span>
          </a>
        </div>
      </div>
      <p className="result-card__source">
        shortened from <span title={result.actualUrl}>{truncate(result.actualUrl, 64)}</span>
      </p>
      <p className="result-card__note">
        Visits are capped at 2 per minute per visitor while testing, so give it a moment between clicks.
      </p>
    </div>
  );
}

function truncate(str, max) {
  if (str.length <= max) return str;
  return `${str.slice(0, max - 1)}…`;
}
