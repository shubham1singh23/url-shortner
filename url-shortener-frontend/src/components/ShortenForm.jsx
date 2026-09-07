import { useState } from "react";
import { shortenUrl } from "../api";

function looksLikeUrl(value) {
  const trimmed = value.trim();
  if (!trimmed) return false;
  // The backend accepts bare domains too (it prepends https://), so just
  // check for something resembling a host with a dot, no spaces.
  return /^(https?:\/\/)?[^\s]+\.[^\s]{2,}$/i.test(trimmed);
}

export default function ShortenForm({ onCreated }) {
  const [value, setValue] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | error
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    if (!looksLikeUrl(value)) {
      setStatus("error");
      setError("That doesn't look like a link yet — add the address you want to shorten.");
      return;
    }

    setStatus("loading");
    setError("");

    try {
      const { actualUrl, shortCode } = await shortenUrl(value.trim());
      onCreated({ actualUrl, shortCode });
      setValue("");
      setStatus("idle");
    } catch (err) {
      setStatus("error");
      setError(err.message || "Something went wrong saving that link.");
    }
  }

  return (
    <section className="hero">
      <div className="hero__mark">
        <span className="beacon-dot" aria-hidden="true" />
        <span className="hero__mark-label">Beacon</span>
      </div>

      <h1 className="hero__headline">
        Give a long link
        <br />a short signal.
      </h1>

      <p className="hero__subhead">
        Paste the address below. Anyone with the short one can still reach it —
        and you'll see every time they do.
      </p>

      <form className="shorten-form" onSubmit={handleSubmit} noValidate>
        <div className="shorten-form__field">
          <input
            type="text"
            inputMode="url"
            autoComplete="off"
            spellCheck="false"
            placeholder="https://example.com/a/very/long/path"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              if (status === "error") setStatus("idle");
            }}
            aria-invalid={status === "error"}
            aria-describedby={status === "error" ? "shorten-error" : undefined}
          />
        </div>
        <button type="submit" className="btn-primary" disabled={status === "loading"}>
          {status === "loading" ? "Shortening…" : "Shorten"}
        </button>
      </form>

      {status === "error" && (
        <p id="shorten-error" className="form-message form-message--error">
          {error}
        </p>
      )}
    </section>
  );
}
