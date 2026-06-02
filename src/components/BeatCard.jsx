import { Play, Zap, ShoppingCart } from "lucide-react";
import { YoutubeIcon } from "./BrandIcons";

export default function BeatCard({ beat, onPlay }) {
  const isFree = !beat.price || beat.price === 0;
  const thumbUrl = `https://img.youtube.com/vi/${beat.youtubeId}/mqdefault.jpg`;

  const footerLabel = isFree ? "Preview & watch" : "Preview & buy";
  const FooterIcon = isFree ? YoutubeIcon : ShoppingCart;

  const badgeText = isFree ? "FREE" : `$${beat.price}`;
  const badgeClass = isFree
    ? "bg-emerald-500 text-black"
    : "bg-[#c9a84c] text-black";

  return (
    <button
      type="button"
      onClick={() => onPlay?.(beat)}
      aria-label={`Play preview of ${beat.title}`}
      className="group w-full text-left bg-[#1a1a1a] border border-[#2a2a2a] hover:border-[#c9a84c]/40 transition-all duration-300 block relative overflow-hidden cursor-pointer"
    >
      {/* Tag badge */}
      <span
        className={`absolute top-3 right-3 z-10 text-[10px] font-medium uppercase tracking-widest px-2 py-0.5 ${badgeClass}`}
      >
        {badgeText}
      </span>

      {/* Thumbnail */}
      <div className="relative overflow-hidden aspect-video bg-[#0d0d0d]">
        <img
          src={thumbUrl}
          alt={beat.title}
          loading="lazy"
          className="w-full h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500"
        />
        {/* Play overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-12 h-12 rounded-full bg-[#c9a84c] flex items-center justify-center shadow-lg">
            <Play className="w-4 h-4 text-black fill-black ml-0.5" />
          </div>
        </div>
        {/* Bottom gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[#1a1a1a] to-transparent" />
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="font-display text-xl text-white tracking-wide group-hover:text-[#c9a84c] transition-colors">
          {beat.title}
        </h3>
        <div className="flex items-center justify-between mt-2">
          <span className="text-xs text-gray-500 uppercase tracking-widest">
            {beat.genre.join(" · ")}
          </span>
          <span className="text-xs text-[#c9a84c]/60 flex items-center gap-1">
            <Zap className="w-2.5 h-2.5" />
            {beat.bpm} BPM
          </span>
        </div>
        <div className="mt-3 pt-3 border-t border-[#2a2a2a] flex items-center gap-1 text-xs text-gray-600 group-hover:text-[#c9a84c]/50 transition-colors">
          <FooterIcon className="w-3 h-3" />
          <span className="uppercase tracking-widest">{footerLabel}</span>
        </div>
      </div>
    </button>
  );
}
