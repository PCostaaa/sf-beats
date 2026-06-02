import { Mail } from "lucide-react";
import {
  SoundCloudIcon,
  BeatStarsIcon,
  YoutubeIcon,
  InstagramIcon,
} from "./BrandIcons";

const socials = [
  {
    Icon: YoutubeIcon,
    href: "https://www.youtube.com/@sfbeats236",
    label: "YouTube",
  },
  {
    Icon: SoundCloudIcon,
    href: "https://soundcloud.com/sf236",
    label: "SoundCloud",
  },
  {
    Icon: BeatStarsIcon,
    href: "https://www.beatstars.com/sfbeatss",
    label: "BeatStars",
  },
  {
    Icon: InstagramIcon,
    href: "https://www.instagram.com/sfbeatss/",
    label: "Instagram",
  },
  {
    Icon: Mail,
    href: "mailto:sfbeatsss@gmail.com",
    label: "Email",
  },
];

export default function Footer() {
  return (
    <footer className="bg-dark-base border-t border-dark-border py-8">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="font-display text-xl tracking-widest text-gold">
          SF BEATS
        </span>

        <div className="flex items-center gap-4">
          {socials.map(({ Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="w-8 h-8 border border-dark-border flex items-center justify-center text-gray-500 hover:border-gold hover:text-gold transition-all"
            >
              <Icon className="w-3.5 h-3.5" />
            </a>
          ))}
        </div>

        <p className="text-xs text-gray-600 uppercase tracking-widest">
          © {new Date().getFullYear()} SF Beats · Portugal
        </p>
      </div>
    </footer>
  );
}
