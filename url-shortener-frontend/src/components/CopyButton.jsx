import { useState } from "react";
import { Copy, Check } from "lucide-react";

export default function CopyButton({ value, label = "Copy", className = "" }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      // Clipboard API unavailable (e.g. insecure context) — fall back silently
      const el = document.createElement("textarea");
      el.value = value;
      el.style.position = "fixed";
      el.style.opacity = "0";
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  }

  return (
    <button
      type="button"
      className={`btn-icon ${copied ? "btn-icon--confirmed" : ""} ${className}`}
      onClick={handleCopy}
      aria-label={copied ? "Copied" : label}
    >
      {copied ? <Check size={15} strokeWidth={2.25} /> : <Copy size={15} strokeWidth={2.25} />}
      <span>{copied ? "Copied" : label}</span>
    </button>
  );
}
