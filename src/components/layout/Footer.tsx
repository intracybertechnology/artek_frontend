import { Link } from "react-router-dom";
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Twitter } from "lucide-react";
import { company } from "@/data/company";
import { coreServices } from "@/data/services";
import { MAP_SHARE_URL } from "@/lib/maps";
import { Logo } from "@/components/layout/Logo";

function PinterestIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
    </svg>
  );
}

const SOCIAL_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  LinkedIn: Linkedin,
  Facebook: Facebook,
  Instagram: Instagram,
  "X (Twitter)": Twitter,
  Pinterest: PinterestIcon,
};

const companyLinks = [
  { label: "About Us", to: "/about" },
  { label: "Industries", to: "/industries" },
  { label: "Service Locations", to: "/locations" },
  { label: "Contact Us", to: "/contact" },
  { label: "Insights", to: "/blog" },
];

/**
 * Site footer. Contact details render only verified information — the
 * email/address lines stay hidden until populated in data/company.ts.
 * Uses the same page field as the body: the footer is part of the page, not
 * a separate darker block, so the hairline is the only separation.
 */
export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-surface">
      <div className="container-page grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:gap-10 lg:py-16">
        <div className="space-y-5">
          <Logo />
          <p className="max-w-xs text-sm leading-relaxed text-text-muted">
            {company.heroDescription}
          </p>
        </div>

        <nav aria-label="IT Solutions">
          <h2 className="mb-4 text-[11px] font-bold uppercase tracking-[0.18em] text-text">
            IT Solutions
          </h2>
          <ul className="space-y-2.5 text-sm">
            {coreServices.map((s) => (
              <li key={s.slug}>
                <Link to={`/solutions/${s.slug}`} className="text-text-muted transition-colors hover:text-text">
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Company">
          <h2 className="mb-4 text-[11px] font-bold uppercase tracking-[0.18em] text-text">Company</h2>
          <ul className="space-y-2.5 text-sm">
            {companyLinks.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="text-text-muted transition-colors hover:text-text">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="mb-4 text-[11px] font-bold uppercase tracking-[0.18em] text-text">Contact</h2>
          <ul className="space-y-3 text-sm">
            <li>
              <a href={company.phoneHref} className="flex items-center gap-2.5 text-text transition-colors hover:text-text-muted">
                <Phone className="size-4 shrink-0 text-text-muted" aria-hidden="true" />
                {company.phoneDisplay}
              </a>
            </li>
            {company.email && (
              <li className="flex items-start gap-2.5">
                <Mail className="mt-0.5 size-4 shrink-0 text-text-muted" aria-hidden="true" />
                <span className="flex flex-col">
                  <a href={`mailto:${company.email}`} className="text-text-muted transition-colors hover:text-text">
                    {company.email}
                  </a>
                  {company.salesEmail && company.salesEmail !== company.email && (
                    <a
                      href={`mailto:${company.salesEmail}`}
                      className="text-text-muted transition-colors hover:text-text"
                    >
                      {company.salesEmail}
                    </a>
                  )}
                </span>
              </li>
            )}
            <li>
              <a
                href={MAP_SHARE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2.5 text-text-muted transition-colors hover:text-text"
              >
                <MapPin className="mt-0.5 size-4 shrink-0 text-text-muted" aria-hidden="true" />
                <span>{company.address ?? "Dubai, United Arab Emirates"}</span>
                <span className="sr-only"> (opens the place in Google Maps, new tab)</span>
              </a>
            </li>
          </ul>
          {company.socials.length > 0 && (
            <ul className="mt-5 flex gap-4">
              {company.socials.map((s) => {
                const Icon = SOCIAL_ICONS[s.label];
                return (
                  <li key={s.url}>
                    <a
                      href={s.url}
                      aria-label={s.label}
                      className="flex size-9 items-center justify-center rounded-full border border-white/10 text-text-muted transition-colors hover:border-white/30 hover:text-text"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      {Icon ? <Icon className="size-4" /> : <span className="text-xs">{s.label}</span>}
                    </a>
                  </li>
                );
              })}
            </ul>
          )}
          {company.businessHours && (
            <p className="mt-5 text-xs text-text-muted">{company.businessHours}</p>
          )}
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col items-center justify-between gap-3 py-5 text-xs text-text-muted sm:flex-row">
          <p>© {new Date().getFullYear()} {company.legalName}. All rights reserved.</p>
          <div className="flex gap-5">
            <Link to="/privacy-policy" className="transition-colors hover:text-text">Privacy Policy</Link>
            <Link to="/terms-and-conditions" className="transition-colors hover:text-text">Terms &amp; Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
