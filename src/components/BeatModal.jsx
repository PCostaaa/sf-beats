import { useEffect, useRef } from "react";
import { X, ShoppingCart, Zap } from "lucide-react";
import { YoutubeIcon } from "./BrandIcons";
import { BEATSTARS_ROOT } from "../data/beats";

export default function BeatModal({ beat, onClose }) {
  const closeBtnRef = useRef(null);

  const isFree = !beat.price || beat.price === 0;
  const embedUrl = `https://www.youtube.com/embed/${beat.youtubeId}?autoplay=1&rel=0`;
  const ctaUrl = isFree
    ? `https://www.youtube.com/watch?v=${beat.youtubeId}`
    : (beat.purchaseUrl ?? BEATSTARS_ROOT);
  const ctaLabel = isFree ? "Watch on YouTube" : `Buy on BeatStars — $${beat.price}`;
  const CtaIcon = isFree ? YoutubeIcon : ShoppingCart;

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    // Lock background scroll while the modal is open.
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    // Move focus to the close button so keyboard users can dismiss immediately.
    closeBtnRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="beat-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
    >
      <div className="bg-[#1a1a1a] border border-[#c9a84c]/20 w-full max-w-3xl shadow-2xl">
        {/* Header */}
        <div className="p-6 flex items-start justify-between gap-4 border-b border-[#2a2a2a]">
          <div className="min-w-0">
            <h3
              id="beat-modal-title"
              className="font-display text-3xl text-white tracking-wide truncate"
            >
              {beat.title}
            </h3>
            <p className="text-xs text-gray-500 uppercase tracking-widest mt-1 flex items-center gap-3 flex-wrap">
              <span>{beat.genre.join(" · ")}</span>
              <span className="text-[#c9a84c]/60 flex items-center gap-1">
                <Zap className="w-2.5 h-2.5" />
                {beat.bpm} BPM
              </span>
            </p>
          </div>
          <button
            ref={closeBtnRef}
            onClick={onClose}
            aria-label="Close preview"
            className="text-gray-400 hover:text-[#c9a84c] transition-colors shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video */}
        <div className="aspect-video bg-black">
          <iframe
            src={embedUrl}
            title={`${beat.title} — YouTube preview`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="w-full h-full"
          />
        </div>

        {/* Footer CTA */}
        <div className="p-6 flex items-center justify-between gap-4 flex-wrap">
          <span
            className={`text-[10px] font-medium uppercase tracking-widest px-2 py-0.5 ${
              isFree ? "bg-emerald-500 text-black" : "bg-[#c9a84c] text-black"
            }`}
          >
            {isFree ? "FREE" : `$${beat.price}`}
          </span>
          <a
            href={ctaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#c9a84c] text-black text-xs uppercase tracking-widest px-6 py-3 font-medium hover:bg-[#e2c270] transition-colors"
          >
            <CtaIcon className="w-4 h-4" />
            {ctaLabel}
          </a>
        </div>
      </div>
    </div>
  );
}
