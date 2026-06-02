import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { YoutubeIcon, BeatStarsIcon } from "./BrandIcons";
import { beats, BEATSTARS_ROOT } from "../data/beats";
import BeatCard from "./BeatCard";
import BeatModal from "./BeatModal";

const genres = ["All", "Boom Bap", "Lo-Fi", "Old School", "Chill", "Freestyle"];

export default function Beats() {
  const [active, setActive] = useState("All");
  const [activeBeat, setActiveBeat] = useState(null);

  const filtered =
    active === "All" ? beats : beats.filter((b) => b.genre.includes(active));

  return (
    <section id="beats" className="bg-dark-base py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <p className="text-gold text-xs uppercase tracking-[0.3em] mb-3">
              Catalogue
            </p>
            <h2 className="font-display text-5xl text-white">THE BEATS</h2>
          </div>
          <a
            href="https://www.youtube.com/@sfbeats236"
            target="_blank"
            rel="noopener noreferrer"
            className="self-start md:self-auto inline-flex items-center gap-2 text-xs uppercase tracking-widest text-gray-500 border border-dark-border px-4 py-2 hover:border-gold hover:text-gold transition-all"
          >
            <YoutubeIcon className="w-3.5 h-3.5" />
            Full Channel
          </a>
        </div>

        {/* Genre filter */}
        <div className="flex flex-wrap gap-2 mb-10">
          {genres.map((g) => (
            <button
              key={g}
              onClick={() => setActive(g)}
              className={`text-xs uppercase tracking-widest px-4 py-2 border transition-all duration-200 ${
                active === g
                  ? "bg-gold text-black border-gold"
                  : "border-dark-border text-gray-500 hover:border-gold/40 hover:text-gold"
              }`}
            >
              {g}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((beat) => (
            <BeatCard key={beat.id} beat={beat} onPlay={setActiveBeat} />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-gray-600 py-16 uppercase tracking-widest text-sm">
            No beats in this genre yet.
          </p>
        )}

        {/* Storefront CTA */}
        <div className="flex justify-center mt-12">
          <a
            href={BEATSTARS_ROOT}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 bg-gold text-black text-xs uppercase tracking-widest px-8 py-3 font-medium hover:bg-gold-light transition-colors"
          >
            <BeatStarsIcon className="w-4 h-4" />
            Check the full repertoire
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>

      {activeBeat && (
        <BeatModal beat={activeBeat} onClose={() => setActiveBeat(null)} />
      )}
    </section>
  );
}
