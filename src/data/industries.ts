import type { Industry, PartnerGroup, ProductCategory } from "@/types";

/** Industries page — swap `visual: "gradient"` for project photography when supplied. */
export const industries: readonly Industry[] = [
  {
    slug: "corporate-offices",
    name: "Corporate Offices",
    icon: "building-2",
    description:
      "Complete office IT environments — workstations, networking, telephony and server rooms, plus discreet CCTV coverage.",
    visual: "gradient",
    relatedServices: ["computer-systems", "network", "microsoft", "cctv"],
    points: [
      "Workstations, servers and peripherals provisioned per department",
      "Structured cabling and Wi-Fi for offices of any size",
      "Business telephony and Microsoft Teams deployment",
    ],
    seo: {
      title: "IT Solutions for Corporate Offices in Dubai | ARTEK",
      description:
        "IT infrastructure, networking, telephony and CCTV for corporate offices in Dubai — supplied, installed and supported by ARTEK Computers.",
      ogType: "website",
    },
  },
  {
    slug: "retail-shopping",
    name: "Retail & Shopping",
    icon: "store",
    description:
      "Surveillance and POS-ready IT for shops and shopping centres — protect stock, staff and transactions.",
    visual: "gradient",
    relatedServices: ["cctv", "computer-systems", "network"],
    points: [
      "CCTV at entrances, aisles and cash zones",
      "Reliable POS hardware and connectivity",
      "Multi-store viewing from a single dashboard",
    ],
    seo: {
      title: "Retail IT & CCTV Solutions in Dubai | ARTEK Computers",
      description:
        "POS hardware, networking and CCTV for retail businesses in Dubai — keep stock, staff and transactions protected with ARTEK.",
      ogType: "website",
    },
  },
  {
    slug: "residential-properties",
    name: "Residential Properties",
    icon: "home",
    description:
      "Home security cameras and smart network setups for villas and apartments across Dubai.",
    visual: "gradient",
    relatedServices: ["cctv", "network"],
    points: [
      "Entrance, boundary and garden camera coverage",
      "Whole-home Wi-Fi that reaches every room",
      "Viewing and alerts on your phone",
    ],
    seo: {
      title: "Home CCTV & Networking in Dubai | ARTEK Computers",
      description:
        "Home CCTV installation and networking for Dubai villas and apartments — entrance and boundary coverage with mobile viewing, by ARTEK.",
      ogType: "website",
    },
  },
  {
    slug: "warehouses-logistics",
    name: "Warehouses & Logistics",
    icon: "warehouse",
    description:
      "Camera coverage and resilient networking for warehouses — long aisles, loading bays and storage yards.",
    visual: "gradient",
    relatedServices: ["cctv", "network", "server-relocation"],
    points: [
      "Long-range and low-light cameras for aisles and yards",
      "Docking and inventory area coverage",
      "Industrial-grade Wi-Fi for scanners and tablets",
    ],
    seo: {
      title: "Warehouse CCTV & Networking in Dubai | ARTEK Computers",
      description:
        "CCTV and industrial networking for warehouses and logistics facilities in Dubai — aisle, dock and yard coverage by ARTEK.",
      ogType: "website",
    },
  },
  {
    slug: "hospitality",
    name: "Hospitality",
    icon: "concierge-bell",
    description:
      "Guest-safe surveillance, back-office IT and reliable connectivity for hotels and restaurants.",
    visual: "gradient",
    relatedServices: ["cctv", "network", "microsoft"],
    points: [
      "Public-area and back-of-house surveillance",
      "Guest and staff network separation",
      "Back-office systems and POS connectivity",
    ],
    seo: {
      title: "Hospitality IT & CCTV Solutions in Dubai | ARTEK",
      description:
        "Hotel and restaurant CCTV, networking and IT systems in Dubai — guest-safe surveillance and back-office IT by ARTEK.",
      ogType: "website",
    },
  },
  {
    slug: "industrial-facilities",
    name: "Industrial Facilities",
    icon: "factory",
    description:
      "Rugged surveillance and network infrastructure for factories and heavy-duty environments.",
    visual: "gradient",
    relatedServices: ["cctv", "network", "cybersecurity"],
    points: [
      "Harsh-environment cameras for production floors",
      "Segmented industrial networks",
      "Perimeter surveillance and monitoring",
    ],
    seo: {
      title: "Industrial CCTV & Networking in Dubai | ARTEK Computers",
      description:
        "Surveillance and industrial networking for factories and facilities in Dubai — rugged CCTV and segmented networks from ARTEK.",
      ogType: "website",
    },
  },
];

export const getIndustryBySlug = (slug: string) =>
  industries.find((i) => i.slug === slug);

/**
 * ── Partner brand groups (small-chip marquee) ──
 * Brand list supplied in the client brief; nothing here is confirmed — every
 * entry is a text wordmark placeholder pending real logo assets in
 * /public/logos AND verified partner status. Keep flags above the fold of
 * production review (see README "Claims to verify").
 */
export const partnerGroups: readonly PartnerGroup[] = [
  {
    label: "Cabling & Connectivity",
    brands: ["Belden", "Panduit", "ExTell", "Corning", "3M", "Opterna", "Norden", "Dconnect", "Molex", "Kuwes", "Techlogiks"],
  },
  {
    label: "Networking & IT Infrastructure",
    brands: ["Cisco", "Fortinet", "SonicWall", "Ubiquiti", "Aruba", "Ruckus", "D-Link", "Linksys", "TP-Link", "MikroTik", "Grandstream", "EnGenius"],
  },
  {
    label: "ELV & Security",
    brands: ["Hikvision", "Dahua", "Axis", "Toten"],
  },
  {
    label: "Power & Cooling",
    brands: ["APC", "Eaton", "Schneider"],
  },
  {
    label: "Computers, Storage & Peripherals",
    brands: ["Dell", "HP", "Lenovo", "Apple", "Acer", "ASUS", "Samsung", "Synology", "QNAP", "WD", "Seagate", "Epson", "Brother", "Logitech", "Microsoft", "Kaspersky", "Symantec"],
  },
];

/** PRODUCT URL categories — descriptions only, no invented specs or SKUs. */
export const productCategories: readonly ProductCategory[] = [
  {
    slug: "networking-solutions",
    name: "Networking Solutions",
    icon: "network",
    description:
      "Complete network infrastructure setup including routers, switches, WiFi systems, and structured cabling for reliable business connectivity across Dubai and UAE.",
    items: ["Managed switches", "Wireless access points", "Routers & firewalls", "Cabling & racks"],
    serviceSlug: "network-solutions-dubai",
  },
  {
    slug: "server-data-center",
    name: "Server & Data Center Solutions",
    icon: "server",
    description:
      "Enterprise-grade server solutions, data center setup, virtualization, and storage systems to power your business operations with reliability and scalability.",
    items: ["Rack servers", "Tower servers", "NAS & storage", "UPS & power protection"],
    serviceSlug: "server-relocation-dubai",
  },
  {
    slug: "desktop-workstation",
    name: "Desktop & Workstation Solutions",
    icon: "monitor",
    description:
      "High-performance desktop computers and professional workstations tailored for business needs, from basic office PCs to advanced engineering workstations.",
    items: ["Business laptops", "Desktop PCs", "All-in-one systems", "Workstations"],
    serviceSlug: "computer-systems-dubai",
  },
  {
    slug: "laptop-computer-services",
    name: "Laptop & Computer Services",
    icon: "laptop",
    description:
      "Complete laptop solutions including sales, repairs, upgrades, and maintenance services for all major brands. Expert support for business and personal laptops.",
    serviceSlug: "computer-systems-dubai",
  },
  {
    slug: "network-infrastructure",
    name: "Network Infrastructure",
    icon: "network",
    description:
      "Structured cabling, fiber optic networks, network security, and complete IT infrastructure design and implementation for businesses of all sizes.",
    serviceSlug: "network-solutions-dubai",
  },
  {
    slug: "printers-cartridges",
    name: "Printers & Cartridge",
    icon: "printer",
    description:
      "Wide range of printers, scanners, and genuine cartridges from leading brands. Sales, rental, and maintenance services for all your printing needs.",
    items: ["Printers & scanners", "Monitors", "Docks & cables", "Keyboards & mice"],
  },
  {
    slug: "smart-phones",
    name: "Smart Phone",
    icon: "smartphone",
    description:
      "Business smartphones, mobile device management, repairs, and enterprise mobility solutions to keep your team connected and productive.",
  },
  {
    slug: "tablets-mobile-devices",
    name: "Tablet & Mobile Devices",
    icon: "tablet",
    description:
      "Tablets, iPads, and mobile computing devices for business use. Complete setup, configuration, and mobile device management services.",
  },
  {
    slug: "cybersecurity",
    name: "Cybersecurity Solutions",
    icon: "shield",
    description:
      "Comprehensive cybersecurity services including firewall setup, antivirus solutions, threat detection, and security audits to protect your business data.",
    serviceSlug: "cybersecurity-dubai",
  },
  {
    slug: "it-support-maintenance",
    name: "IT Support & Maintenance",
    icon: "wrench",
    description:
      "24/7 technical support, system maintenance, troubleshooting, and managed IT services to keep your technology running smoothly and efficiently.",
    serviceSlug: "it-services-dubai",
  },
  {
    slug: "audio-visual",
    name: "Audio Visual Systems",
    icon: "video",
    description:
      "Professional AV solutions including video conferencing, presentation systems, digital signage, and meeting room technology for modern businesses.",
  },
  {
    slug: "cloud-computing",
    name: "Cloud Computing Solutions",
    icon: "cloud",
    description:
      "Cloud migration, cloud storage, backup solutions, and Software-as-a-Service (SaaS) implementations to modernize your business infrastructure.",
    serviceSlug: "cloud-computing-dubai",
  },
  {
    slug: "cctv-security",
    name: "CCTV & Security",
    icon: "cctv",
    description:
      "Surveillance cameras, recorders and accessories for installations from single-camera to large multi-site systems.",
    items: ["IP cameras", "NVR / DVR recorders", "PTZ cameras", "Monitors"],
    serviceSlug: "cctv-security-dubai",
  },
  {
    slug: "telephony",
    name: "Telephony",
    icon: "phone",
    description:
      "IP phones, headsets and telephony hardware for modern business communication systems.",
    items: ["IP desk phones", "Conference devices", "Headsets"],
    serviceSlug: "voice-telephony-dubai",
  },
];
