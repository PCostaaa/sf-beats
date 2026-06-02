import { Link } from "react-scroll";
import { AudioWaveform, Play, Send, ChevronDown } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center bg-dark-base relative overflow-hidden"
    >
      {/* Background grid texture */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "linear-gradient(#c9a84c 1px, transparent 1px), linear-gradient(90deg, #c9a84c 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Gold glow top-right */}
      <div className="absolute top-0 right-0 w-150 h-150 rounded-full bg-gold/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 pt-24 pb-16 grid md:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left — text */}
        <div>
          <p className="text-gold text-xs uppercase tracking-[0.3em] mb-4 flex items-center gap-2">
            <AudioWaveform className="w-3 h-3" />
            Producer Portugal
          </p>
          <h1 className="font-display text-6xl md:text-8xl leading-none text-white mb-6">
            BEATS THAT HIT DIFFERENT
          </h1>
          <p className="text-gray-400 text-base leading-relaxed max-w-md mb-8">
            Custom-crafted instrumentals — trap, boom bap, lo-fi, drill. Built
            to make your vision real. Free beats available on YouTube.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              to="beats"
              smooth
              duration={500}
              offset={-64}
              className="bg-gold text-black text-xs uppercase tracking-widest px-6 py-3 font-medium hover:bg-gold/light transition-colors inline-flex items-center gap-2 cursor-pointer"
            >
              <Play className="w-3 h-3" />
              Listen Now
            </Link>
            <Link
              to="contact"
              smooth
              duration={500}
              offset={-64}
              className="border border-dark-border text-gray-300 text-xs uppercase tracking-widest px-6 py-3 hover:border-gold hover:text-gold transition-colors inline-flex items-center gap-2 cursor-pointer"
            >
              <Send className="w-3 h-3" />
              Get a Custom Beat
            </Link>
          </div>

          {/* Stats row */}
          <div className="mt-12 flex gap-8 border-t border-dark-border pt-8">
            {[
              { label: "Beats Made", value: "50+" },
              { label: "Free on YT", value: "100%" },
              { label: "Genres", value: "4+" },
            ].map(({ label, value }) => (
              <div key={label}>
                <p className="text-gold font-display text-3xl">{value}</p>
                <p className="text-gray-500 text-xs uppercase tracking-wider mt-1">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right — disc visual */}
        <div className="hidden md:flex justify-center items-center">
          <div className="relative w-80 h-80">
            {/* Outer ring (with a notch so the rotation reads) */}
            <div
              className="absolute inset-0 rounded-full border border-gold/20 animate-spin"
              style={{ animationDuration: "20s" }}
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-gold" />
            </div>
            {/* Inner ring (dashed so the rotation reads) */}
            <div
              className="absolute inset-4 rounded-full border-2 border-dashed border-gold/20 animate-spin"
              style={{
                animationDuration: "30s",
                animationDirection: "reverse",
              }}
            />
            {/* Disc */}
            <div className="absolute inset-8 rounded-full bg-dark-base border border-dark-border flex items-center justify-center shadow-2xl">
              <div className="w-28 h-28 rounded-full bg-dark-base border-2 border-gold/30 flex items-center justify-center overflow-hidden">
                <img
                  src="/LOGO_SF.jpg"
                  alt=""
                  aria-hidden="true"
                  className="w-full h-full object-cover"
                  style={{ filter: "invert(1)" }}
                />
              </div>
            </div>
            {/* Gold dot accents */}
            {[0, 60, 120, 180, 240, 300].map((deg) => (
              <div
                key={deg}
                className="absolute w-2 h-2 rounded-full bg-gold"
                style={{
                  top: "50%",
                  left: "50%",
                  transform: `rotate(${deg}deg) translateY(-140px) translate(-50%, -50%)`,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <span className="text-xs uppercase tracking-widest text-gray-500">
          Scroll
        </span>
        <ChevronDown className="w-3 h-3 text-gold animate-bounce" />
      </div>
    </section>
  );
}
