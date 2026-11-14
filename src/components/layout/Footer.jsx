import { Link } from "react-router-dom";
import { Github, Instagram, Linkedin, Mail } from "lucide-react";
import { profile, socials } from "../../data/profile";

const ICONS = { github: Github, instagram: Instagram, linkedin: Linkedin, mail: Mail };

const QUICK_LINKS = [
  { label: "About", href: "/#about" },
  { label: "Projects", href: "/#projects" },
  { label: "Experience", href: "/#experience" },
  { label: "Certificates", href: "/#certificates" },
  { label: "Contact", href: "/#contact" },
];

export default function Footer() {
  return (
    <footer className="relative mt-24 border-t border-line">
      <div className="section-shell py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <Link to="/" className="text-lg font-semibold text-heading">
              {profile.name}
              <span className="text-accent">.</span>
            </Link>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
              {profile.tagline}
            </p>

            <div className="mt-5 flex gap-2">
              {socials.map((social) => {
                const Icon = ICONS[social.icon] ?? Mail;
                return (
                  <a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={social.label}
                    className="grid size-9 place-items-center rounded-full border border-line text-muted transition-all hover:-translate-y-0.5 hover:border-accent/60 hover:text-accent"
                  >
                    <Icon size={16} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-heading">
              Navigate
            </h3>
            <ul className="mt-4 space-y-2.5">
              {QUICK_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted transition-colors hover:text-accent"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <Link
                  to="/blog"
                  className="text-sm text-muted transition-colors hover:text-accent"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-heading">
              Get in touch
            </h3>
            <a
              href={`mailto:${profile.email}`}
              className="mt-4 block break-all text-sm text-muted transition-colors hover:text-accent"
            >
              {profile.email}
            </a>
            <p className="mt-2 text-sm text-muted">{profile.location}</p>
            <a
              href="/documents/cv.pdf"
              download
              className="mt-4 inline-flex rounded-full border border-accent/40 px-4 py-2 text-sm font-medium text-accent transition-colors hover:bg-accent-soft"
            >
              Download CV
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-line pt-6 text-xs text-muted sm:flex-row">
          <p>
            © {new Date().getFullYear()} {profile.name}. All rights reserved.
          </p>
          <p className="font-mono">
            Built with React · Tailwind v4 · Motion
          </p>
        </div>
      </div>
    </footer>
  );
}