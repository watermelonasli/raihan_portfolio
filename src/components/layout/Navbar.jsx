import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Sun, Moon, ArrowUpRight } from "lucide-react";

const SECTION_LINKS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "certificates", label: "Certificates" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "dark",
  );

  const location = useLocation();
  const navigate = useNavigate();
  const onHome = location.pathname === "/";

  /* ---- Theme ---- */
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  /* ---- Elevate navbar on scroll ---- */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ---- Active section tracking ---- */
  useEffect(() => {
    if (!onHome) return;

    const nodes = SECTION_LINKS.map((l) =>
      document.getElementById(l.id),
    ).filter(Boolean);
    if (!nodes.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const top = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (top) setActive(top.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.25, 0.6, 1] },
    );

    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, [onHome, location.pathname]);

  /* ---- Anchor navigation (works from /blog too) ---- */
  const goToSection = (id) => (event) => {
    event.preventDefault();
    setOpen(false);

    if (!onHome) {
      navigate("/");
      window.setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 90);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const linkClass = (id) =>
    `relative rounded-full px-3 py-2 text-sm font-medium transition-colors duration-200
     ${
       onHome && active === id ? "text-accent" : "text-muted hover:text-heading"
     }`;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "py-2" : "py-4"
      }`}
    >
      <div className="section-shell">
        <nav
          className={`flex items-center justify-between gap-4 rounded-full px-4 py-2.5 transition-all duration-300 sm:px-5
          ${scrolled ? "glass shadow-lg" : "border border-transparent"}`}
        >
          {/* Logo */}
          <Link
            to="/"
            className="group flex items-center gap-2 font-semibold text-heading"
          >
            <span className="grid size-8 place-items-center rounded-lg bg-accent-soft text-lg ring-1 ring-accent/30">
              🍉
            </span>
            {/* <span className="hidden text-sm tracking-tight sm:block">
              rai<span className="text-accent">.dev</span>
            </span> */}
          </Link>

          {/* Desktop links */}
          <ul className="hidden items-center gap-0.5 lg:flex">
            {SECTION_LINKS.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  onClick={goToSection(link.id)}
                  className={linkClass(link.id)}
                >
                  {link.label}
                  {onHome && active === link.id && (
                    <span className="absolute inset-x-3 -bottom-0.5 h-px bg-accent" />
                  )}
                </a>
              </li>
            ))}
            <li>
              <Link
                to="/blog"
                className={`relative rounded-full px-3 py-2 text-sm font-medium transition-colors
                  ${!onHome ? "text-accent" : "text-muted hover:text-heading"}`}
              >
                Blog
                {!onHome && (
                  <span className="absolute inset-x-3 -bottom-0.5 h-px bg-accent" />
                )}
              </Link>
            </li>
          </ul>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              className="grid size-9 place-items-center rounded-full border border-line text-muted transition-colors hover:border-accent/50 hover:text-accent"
            >
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            <a
              href="#contact"
              onClick={goToSection("contact")}
              className="hidden items-center gap-1.5 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-accent-contrast transition-transform hover:scale-105 sm:inline-flex"
            >
              Hire Me <ArrowUpRight size={14} />
            </a>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle navigation menu"
              aria-expanded={open}
              className="grid size-9 place-items-center rounded-full border border-line text-heading lg:hidden"
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>

        {/* Mobile drawer */}
        <div
          className={`overflow-hidden transition-all duration-300 lg:hidden ${
            open ? "mt-2 max-h-128 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <ul className="glass flex flex-col gap-1 rounded-3xl p-3">
            {SECTION_LINKS.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  onClick={goToSection(link.id)}
                  className="block rounded-xl px-4 py-2.5 text-sm font-medium text-body transition-colors hover:bg-accent-soft hover:text-accent"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <Link
                to="/blog"
                onClick={() => setOpen(false)}
                className="block rounded-xl px-4 py-2.5 text-sm font-medium text-body transition-colors hover:bg-accent-soft hover:text-accent"
              >
                Blog
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
