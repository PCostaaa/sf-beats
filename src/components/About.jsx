import { ArrowRight } from "lucide-react";
import { YoutubeIcon } from "./BrandIcons";

export default function About() {
  return (
    <section id="about" className="bg-[#111] py-24 relative overflow-hidden">
      {/* Gold accent line */}
      <div className="absolute left-0 top-0 h-full w-px bg-linear-to-b from-transparent via-gold/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        {/* Left — logo */}
        <div className="relative">
          <div className="w-full aspect-square max-w-md mx-auto bg-white border border-gold/30 flex items-center justify-center relative overflow-hidden">
            <img
              src="/LOGO_SF.jpg"
              alt="SF Beats logo"
              className="w-full h-full object-contain p-6"
              loading="lazy"
            />
          </div>
          {/* Gold border accent */}
          <div className="absolute -bottom-4 -right-4 w-full h-full border border-gold/20 max-w-md mx-auto pointer-events-none" />
        </div>

        {/* Right — text */}
        <div>
          <p className="text-gold text-xs uppercase tracking-[0.3em] mb-4">
            About
          </p>
          <h2 className="font-display text-5xl text-white mb-6 leading-tight">
            THE PRODUCER BEHIND THE SOUND
          </h2>
          <p className="text-gray-400 leading-relaxed mb-4">
            SF Beats is an independent music producer from Portugal, crafting
            instrumentals that blend modern trap energy with soulful, cinematic
            textures.
          </p>
          <p className="text-gray-400 leading-relaxed mb-8">
            Every beat is built from creativity, a DAW and the passion for sound
            design. The YouTube channel is home to free beats for artists,
            rappers, and content creators worldwide.
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {["Trap", "Boom Bap", "Lo-Fi", "Drill", "Ableton Live"].map(
              (tag) => (
                <span
                  key={tag}
                  className="border border-gold/30 text-gold text-xs uppercase tracking-widest px-3 py-1"
                >
                  {tag}
                </span>
              ),
            )}
          </div>

          <a
            href="https://www.youtube.com/@sfbeats236"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-gold text-sm uppercase tracking-widest hover:gap-4 transition-all"
          >
            <YoutubeIcon className="w-4 h-4" />
            Watch on YouTube
            <ArrowRight className="w-3 h-3" />
          </a>
        </div>
      </div>
    </section>
  );
}
