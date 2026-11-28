import { ArrowRight, Building2, Headset, MapPin, Phone } from "lucide-react";
import { SpecularButton } from "@/components/common/SpecularButton";
import { HeroPicture } from "@/components/home/HeroCarousel";
import { company } from "@/data/company";
import "./HomeHero.css";

// Capability cues only. Certification, volume, and SLA claims are unverified.
const serviceChips = [
  { label: "Dubai-based team", icon: MapPin },
  { label: "Homes & businesses", icon: Building2 },
  { label: "Installation & support", icon: Headset },
] as const;

export function HeroSection() {
  return (
    <section className="home-hero" aria-labelledby="hero-heading">
      <HeroPicture />
      <div className="container-page home-hero__inner">
        <div className="home-hero__copy">
          <p className="home-hero__eyebrow">IT, CCTV &amp; networking in Dubai</p>
          <h1 id="hero-heading" className="home-hero__headline">
            One partner.<br />
            Every system <span>covered.</span>
          </h1>
          <p className="home-hero__description">
            Security, networking and IT for homes and businesses across the UAE —
            surveyed, installed and supported by one team.
          </p>
          <div className="home-hero__actions">
            <SpecularButton to="/contact?intent=survey">
              Get a free site survey
              <ArrowRight size={18} aria-hidden="true" />
            </SpecularButton>
            <a href={company.phoneHref} className="home-hero__cta home-hero__cta--phone">
              <Phone size={16} aria-hidden="true" />
              Call {company.phoneDisplay}
            </a>
          </div>
          <ul className="home-hero__chips" aria-label="Service highlights">
            {serviceChips.map(({ label, icon: Icon }) => (
              <li key={label}><Icon size={11} aria-hidden="true" />{label}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
