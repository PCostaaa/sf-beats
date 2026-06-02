import { useState } from "react";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { Mail, Lock, Send, ArrowRight } from "lucide-react";
import {
  SoundCloudIcon,
  BeatStarsIcon,
  YoutubeIcon,
  InstagramIcon,
} from "./BrandIcons";

const STORAGE_KEY = "sfbeats:user";

const contacts = [
  {
    icon: <Mail className="w-5 h-5 text-gold" />,
    label: "Email",
    value: "sfbeatsss@gmail.com",
    href: "mailto:sfbeatsss@gmail.com",
    gated: true,
  },
  {
    icon: <InstagramIcon className="w-5 h-5 text-gold" />,
    label: "Instagram",
    value: "@sfbeats",
    href: "https://instagram.com/sfbeats",
    gated: true,
  },
  {
    icon: <YoutubeIcon className="w-5 h-5 text-gold" />,
    label: "YouTube",
    value: "@sfbeats236",
    href: "https://www.youtube.com/@sfbeats236",
    gated: false,
  },
  {
    icon: <SoundCloudIcon className="w-6 h-6 text-gold" />,
    label: "SoundCloud",
    value: "sf236",
    href: "https://soundcloud.com/sf236",
    gated: false,
  },
  {
    icon: <BeatStarsIcon className="w-5 h-5 text-gold" />,
    label: "BeatStars",
    value: "sfbeatss",
    href: "https://www.beatstars.com/sfbeatss",
    gated: false,
  },
];

export default function Contact() {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return null;
    try {
      return JSON.parse(saved);
    } catch {
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }
  });
  const clientIdMissing = !import.meta.env.VITE_GOOGLE_CLIENT_ID;

  const handleLoginSuccess = (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    const u = {
      name: decoded.name,
      email: decoded.email,
      picture: decoded.picture,
    };
    setUser(u);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
  };

  const handleSignOut = () => {
    googleLogout();
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <section id="contact" className="bg-[#111] py-24 relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-125 h-125 rounded-full bg-gold/4 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="max-w-2xl mx-auto text-center mb-14">
          <p className="text-gold text-xs uppercase tracking-[0.3em] mb-4">
            Contact
          </p>
          <h2 className="font-display text-5xl text-white mb-4">
            WORK WITH SF BEATS
          </h2>
          <p className="text-gray-400">
            Looking for a custom beat, licensing, or just want to connect? Reach
            out through any of the channels below.
          </p>
        </div>

        {/* Auth status bar */}
        {user ? (
          <div className="max-w-2xl mx-auto mb-8 border border-gold/20 bg-gold/5 px-4 py-3 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              {user.picture && (
                <img
                  src={user.picture}
                  alt=""
                  referrerPolicy="no-referrer"
                  className="w-8 h-8 rounded-full border border-gold/40 shrink-0"
                />
              )}
              <span className="text-sm text-gray-300 truncate">
                Signed in as <strong className="text-white">{user.name}</strong>
              </span>
            </div>
            <button
              onClick={handleSignOut}
              className="text-xs uppercase tracking-widest text-gold hover:text-gold/light transition-colors shrink-0"
            >
              Sign out
            </button>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto mb-8 border border-gold/20 bg-gold/5 p-5 text-center">
            <p className="text-gray-300 text-sm mb-4 flex items-center justify-center gap-2">
              <Lock className="w-4 h-4 text-gold" />
              Sign in with Google to reveal email & Instagram.
            </p>
            {clientIdMissing ? (
              <p className="text-xs text-red-400">
                ⚠ <code>VITE_GOOGLE_CLIENT_ID</code> is not set. See{" "}
                <code>.env.example</code>.
              </p>
            ) : (
              <div className="flex justify-center">
                <GoogleLogin
                  onSuccess={handleLoginSuccess}
                  onError={() => console.error("Google sign-in failed")}
                  theme="filled_black"
                  shape="rectangular"
                  text="signin_with"
                />
              </div>
            )}
          </div>
        )}

        {/* Contact cards */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 mb-12">
          {contacts.map(({ icon, label, value, href, gated }) => {
            const locked = gated && !user;
            const cardClass =
              "group bg-[#1a1a1a] border border-[#2a2a2a] p-6 flex flex-col gap-3 transition-all duration-300";

            if (locked) {
              return (
                <div
                  key={label}
                  aria-disabled="true"
                  className={`${cardClass} opacity-60 cursor-not-allowed`}
                >
                  {icon}
                  <div>
                    <p className="text-xs uppercase tracking-widest text-gray-500 mb-1">
                      {label}
                    </p>
                    <p className="text-gray-500 text-sm italic">
                      Sign in to reveal
                    </p>
                  </div>
                  <Lock className="w-3 h-3 text-gray-600 mt-auto" />
                </div>
              );
            }

            return (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={`${cardClass} hover:border-gold/40`}
              >
                {icon}
                <div>
                  <p className="text-xs uppercase tracking-widest text-gray-500 mb-1">
                    {label}
                  </p>
                  <p className="text-white text-sm group-hover:text-gold transition-colors break-all">
                    {value}
                  </p>
                </div>
                <ArrowRight className="w-3 h-3 text-gray-600 group-hover:text-gold group-hover:translate-x-1 transition-all mt-auto" />
              </a>
            );
          })}
        </div>

        {/* CTA block */}
        <div className="border border-gold/20 bg-gold/5 p-8 md:p-12 text-center">
          <p className="font-display text-3xl text-white mb-3">
            READY TO MAKE SOMETHING?
          </p>
          <p className="text-gray-400 text-sm mb-6">
            Custom beats delivered, all moods.
          </p>
          {user ? (
            <a
              href="mailto:sfbeatsss@gmail.com"
              className="inline-flex items-center gap-2 bg-gold text-black text-xs uppercase tracking-widest px-8 py-3 font-medium hover:bg-gold/light transition-colors"
            >
              <Send className="w-3 h-3" />
              Send a Message
            </a>
          ) : (
            <p className="text-xs text-gray-500 uppercase tracking-widest inline-flex items-center gap-2">
              <Lock className="w-3 h-3" />
              Sign in above to send a message
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
