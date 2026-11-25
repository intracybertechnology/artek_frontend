import { LogoLoop } from "@/components/common/LogoLoop";

const BRANDS = [
  { name: "Cisco",       file: "cisco.jpg" },
  { name: "Fortinet",    file: "fortinet.jpg" },
  { name: "Ubiquiti",    file: "ubiquiti.jpg" },
  { name: "Aruba",       file: "aruba.jpg" },
  { name: "Dell",        file: "dell.jpg" },
  // { name: "HP",          file: "hp.jpg" },
  { name: "Microsoft",   file: "microsoft.jpg" },
  { name: "APC",         file: "apc.jpg" },
  { name: "Huawei",      file: "huawei.jpg" },
  { name: "Grandstream", file: "grandstream.jpg" },
  { name: "Linksys",     file: "linksys.jpg" },
];

const logos = BRANDS.map(({ name, file }) => ({
  src: `/images/brand-logos/${file}`,
  alt: name,
  title: name,
}));

export function PartnersCarousel() {
  return (
    <section
      className="relative isolate overflow-hidden bg-surface-2 py-14 sm:py-16"
      aria-labelledby="partners-heading"
    >
      {/* Soft light behind the strip so the band reads as its own panel. */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_70%_120%_at_50%_50%,rgba(52,120,246,0.14),transparent_70%)]"
        aria-hidden="true"
      />
      <div className="container-page mb-9">
        <h2
          id="partners-heading"
          className="text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-text-muted"
        >
          Technology brands we supply &amp; support
        </h2>
      </div>

      <LogoLoop
        logos={logos}
        speed={60}
        logoHeight={64}
        gap={80}
        hoverSpeed={0}
        fadeOut
        fadeOutWidth={0.1}
        muted={0.4}
        ariaLabel="Technology brands supplied and supported by ARTEK"
      />
    </section>
  );
}
