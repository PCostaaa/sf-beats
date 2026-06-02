import { useState, useEffect } from "react";
import { Link } from "react-scroll";
import { Mail, Menu, X } from "lucide-react";

const navLinks = ["home", "about", "beats", "contact"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-dark-base/95 backdrop-blur border-b border-dark-border"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <span className="font-display text-2xl tracking-widest text-gold">
          SF BEATS
        </span>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link}>
              <Link
                to={link}
                smooth
                duration={500}
                offset={-64}
                className="text-sm uppercase tracking-widest text-gray-400 hover:text-gold transition-colors cursor-pointer"
              >
                {link}
              </Link>
            </li>
          ))}
        </ul>

        <Link
          to="contact"
          smooth
          duration={500}
          offset={-64}
          className="hidden md:inline-flex items-center gap-2 border border-gold text-gold text-xs uppercase tracking-widest px-4 py-2 hover:bg-gold hover:text-black transition-all duration-200 cursor-pointer"
        >
          <Mail className="w-3 h-3" />
          Hire Me
        </Link>

        <button
          className="md:hidden text-gold"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-dark-base border-t border-dark-border px-6 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link}
              to={link}
              smooth
              duration={500}
              offset={-64}
              className="text-sm uppercase tracking-widest text-gray-400 hover:text-gold transition-colors cursor-pointer"
              onClick={() => setMenuOpen(false)}
            >
              {link}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
