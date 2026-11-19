import { company } from "./company.ts";

/**
 * Product catalogue (/products, /products/<group>) and brand lists (/brands).
 * Names only: no descriptions, prices, specifications or invented claims.
 * Category photos live in public/images/products/<slug>.webp.
 */

export type ProductGroup = {
  slug: string;
  title: string;
  intro: string;
  image: string;
  /** slug of the related service page in data/services.ts */
  relatedSolution?: string;
  brandGroupTitle: string;
  items: readonly string[];
};

export type BrandGroup = {
  title: string;
  brands: readonly string[];
};

/** "MPO & MTP Patch Cords" → "mpo-mtp-patch-cords". Keep stable: used for anchors and card ids. */
export function slugify(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export const productGroups: readonly ProductGroup[] = [
  {
    slug: "copper-cabling",
    title: "Copper cabling",
    intro: "Copper network cabling for offices, buildings and data rooms, from Cat6 to Cat8, with patch cords and patch panels.",
    image: "/images/products/copper-cabling.webp",
    relatedSolution: "network-solutions-dubai",
    brandGroupTitle: "Copper and fiber cabling",
    items: [
      "Cat6 Cable",
      "Cat6 Outdoor Cable",
      "Cat6A Cable",
      "Cat7 Cable",
      "Cat8 Cable",
      "Network Cable",
      "Copper Patch Cord",
      "Copper Patch Panel",
    ],
  },
  {
    slug: "fiber-optic",
    title: "Fiber optic",
    intro: "Fiber optic cable, patch cords, panels, splitters and accessories for backbone and access networks.",
    image: "/images/products/fiber-optic.webp",
    relatedSolution: "network-solutions-dubai",
    brandGroupTitle: "Copper and fiber cabling",
    items: [
      "Fiber Adaptor",
      "Fiber Optic Cable",
      "Fiber Optic Patch Cord",
      "Fiber Optic Patch Panels",
      "Fiber Optic Pigtails",
      "Fiber Optic Splitter",
      "FO Distribution Box",
      "FTTH Drop Cable",
      "MPO & MTP Patch Cords",
      "Media Converter",
      "PLC Splitter",
      "Transceiver",
    ],
  },
  {
    slug: "specialty-cables",
    title: "Specialty and ELV cables",
    intro: "Cables for CCTV, audio, fire alarm, control, building automation and other ELV systems.",
    image: "/images/products/specialty-cables.webp",
    relatedSolution: "elv-access-control-uae",
    brandGroupTitle: "ELV and security",
    items: [
      "Audio Cable",
      "CCTV Cable",
      "Control Cable",
      "EIB BUS Cable",
      "Fire Alarm Cable",
      "HDMI Cable",
      "Instrumentation Cable",
      "Lift Cable",
      "RG59 Cable",
      "RG6 Cable",
      "Speaker Cable",
    ],
  },
  {
    slug: "cabinets-power",
    title: "Cabinets and power",
    intro: "Network cabinets, power distribution and UPS for server rooms and equipment rooms.",
    image: "/images/products/cabinets-power.webp",
    relatedSolution: "network-solutions-dubai",
    brandGroupTitle: "Power and cooling",
    items: ["Network Cabinet", "Patch Free Cabinet", "PDU", "UPS"],
  },
  {
    slug: "networking",
    title: "Networking",
    intro: "Routers and switches for offices, warehouses and industrial sites.",
    image: "/images/products/networking.webp",
    relatedSolution: "network-solutions-dubai",
    brandGroupTitle: "Networking and IT infrastructure",
    items: ["Network Router", "Network Switches", "Industrial Switches"],
  },
  {
    slug: "computers",
    title: "Computers",
    intro: "Desktops, laptops and gaming PCs for business and personal use.",
    image: "/images/products/computers.webp",
    relatedSolution: "computer-systems-dubai",
    brandGroupTitle: "Computers, storage and peripherals",
    items: ["Desktops", "Gaming PC", "Laptops"],
  },
  {
    slug: "telephony-displays",
    title: "Telephony and displays",
    intro: "IP PBX systems, IP phones and interactive screens for meeting rooms and offices.",
    image: "/images/products/telephony-displays.webp",
    relatedSolution: "voice-telephony-dubai",
    brandGroupTitle: "Networking and IT infrastructure",
    items: ["IP PBX", "IP Phone", "Interactive Screen"],
  },
];

export const brandGroups: readonly BrandGroup[] = [
  {
    title: "Copper and fiber cabling",
    brands: ["Belden", "Panduit", "ExTell", "Corning", "3M", "Opterna", "Norden", "Dconnect", "Molex", "Kuwes", "Techlogiks"],
  },
  {
    title: "Networking and IT infrastructure",
    brands: ["Cisco", "Fortinet", "SonicWall", "Ubiquiti", "Aruba", "Ruckus", "D-Link", "Linksys", "TP-Link", "MikroTik", "Grandstream", "EnGenius"],
  },
  {
    title: "ELV and security",
    brands: ["Hikvision", "Dahua", "Axis", "Toten"],
  },
  {
    title: "Power and cooling",
    brands: ["APC", "Eaton", "Schneider"],
  },
  {
    title: "Computers, storage and peripherals",
    brands: [
      "Dell",
      "HP",
      "Lenovo",
      "Apple",
      "Acer",
      "ASUS",
      "Samsung",
      "Synology",
      "QNAP",
      "WD",
      "Seagate",
      "Epson",
      "Brother",
      "Logitech",
      "Microsoft",
      "Kaspersky",
      "Symantec",
    ],
  },
];

export const getProductGroup = (slug: string) => productGroups.find((g) => g.slug === slug);

/** WhatsApp link with a pre-filled message, using the company's WhatsApp number. */
export const whatsappLink = (text: string): string | null =>
  company.whatsappNumber ? `https://wa.me/${company.whatsappNumber}?text=${encodeURIComponent(text)}` : null;
