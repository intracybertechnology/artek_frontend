import { company } from "./company.ts";
import { BRAND_LOGO_FILES } from "./brandLogos.generated.ts";

/**
 * Product catalogue (/products, /products/<group>, /products/<group>/<product>)
 * and brand lists (/brands).
 * Names only: no descriptions, prices, specifications or invented claims.
 * Category photos live in public/images/products/<slug>.webp.
 * Product photos live in public/images/products/<group-slug>/<product-slug>.webp.
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
  {
    slug: "cctv-cameras",
    title: "CCTV cameras",
    intro: "CCTV cameras for offices, shops, warehouses and sites, from dome and bullet to PTZ and IP models.",
    image: "/images/products/specialty-cables.webp",
    relatedSolution: "elv-access-control-uae",
    brandGroupTitle: "ELV and security",
    items: ["IP Camera", "Dome Camera", "Bullet Camera", "PTZ Camera"],
  },
  {
    slug: "computer-peripherals",
    title: "Computer peripherals",
    intro: "Hard disks, mice, keyboards, webcams and printers for offices and meeting rooms.",
    image: "/images/products/computers.webp",
    relatedSolution: "computer-systems-dubai",
    brandGroupTitle: "Computers, storage and peripherals",
    items: ["Mouse", "Keyboard", "Webcam", "Conference Webcam", "Printer", "Hard Disk"],
  },
  /* ── NEW categories added 2026 ────────────────────────────────── */
  {
    slug: "servers-storage",
    title: "Servers & storage",
    intro: "Rack, tower and storage hardware, supplied and configured.",
    image: "/images/products/computers.webp",
    brandGroupTitle: "Servers and storage",
    items: [],
  },
  {
    slug: "firewalls-security",
    title: "Firewalls & security",
    intro: "Appliances and licences for edge and endpoint protection.",
    image: "/images/products/networking.webp",
    brandGroupTitle: "Firewalls and security",
    items: [],
  },
  {
    slug: "backup-data-protection",
    title: "Backup & data protection",
    intro: "Software and media for backup and archive.",
    image: "/images/products/computers.webp",
    brandGroupTitle: "Backup and data protection",
    items: [],
  },
];

/** Navbar mega-menu group order, as productGroups slugs. A group missing
 *  from this list sorts after the listed ones. productGroups itself keeps
 *  its order — other pages depend on it. */
export const menuGroupOrder: readonly string[] = [
  "computers",
  "computer-peripherals",
  "networking",
  "cctv-cameras",
  "cabinets-power",
  "fiber-optic",
  "copper-cabling",
  "specialty-cables",
  "telephony-displays",
  "servers-storage",
  "firewalls-security",
  "backup-data-protection",
];

export const brandGroupOrder: readonly string[] = [
  "Computers, storage and peripherals",
  "Networking and IT infrastructure",
  "ELV and security",
  "Power and cooling",
  "Copper and fiber cabling",
];

export const brandGroups: readonly BrandGroup[] = [
  {
    title: "Copper and fiber cabling",
    brands: ["Belden", "ExTell", "Opterna", "Norden", "Kuwes", "Techlogiks"],
  },
  {
    title: "Networking and IT infrastructure",
    brands: ["Cisco", "Fortinet", "SonicWall", "Ubiquiti", "Aruba", "Ruckus", "D-Link", "Linksys", "TP-Link", "MikroTik", "Grandstream", "EnGenius", "Ruijie", "DrayTek", "Tenda", "IP-COM", "Huawei", "Yeastar", "Jabra"],
  },
  {
    title: "ELV and security",
    brands: ["Hikvision", "Dahua", "Axis", "Toten", "UNV", "ZKTeco", "EZVIZ", "Imou", "Tapo"],
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
      "Ugreen",
      "Anker",
      "Rapoo",
      "NVIDIA",
      "Intel",
    ],
  },
  /* ── Brand groups for the 3 new categories ───────────────────── */
  {
    title: "Servers and storage",
    brands: ["Dell EMC", "HP", "Lenovo", "Synology", "QNAP"],
  },
  {
    title: "Firewalls and security",
    brands: ["Fortinet", "Sophos", "Cisco", "Acronis"],
  },
  {
    title: "Backup and data protection",
    brands: ["Veeam", "Acronis", "LTO Tape"],
  },
];

export const getProductGroup = (slug: string) => productGroups.find((g) => g.slug === slug);

/** Brand names featured in the navbar mega menu. Must exist in brandGroups. */
export const topBrands: readonly string[] = [
  "Hikvision", "D-Link", "HP", "Logitech", "Seagate",
  "Dell", "Epson", "Lenovo", "Dahua", "TP-Link",
];

/** Brand logo file map — generated by scripts/gen-brand-logos.mjs. */

/** Returns the public logo path for a brand name, or undefined if no file exists. */
export const brandLogo = (name: string): string | undefined => {
  const file = BRAND_LOGO_FILES[slugify(name)];
  return file ? `/images/brand-logos/${file}` : undefined;
};

/** Optional extras for a single product. Key = slugify(product name). */
export type ProductDetail = { description?: string };
export const productDetails: Record<string, ProductDetail> = {
  "cat6-cable": { description: "Cat6 cable connects computers, phones and network equipment in office LANs. It is a common choice for office cabling and data rooms. Artek Computers LLC supplies it to customers across Dubai and the UAE — request a quote and we will help with your requirements." },
  "cat6-outdoor-cable": { description: "Outdoor Cat6 cable runs between buildings, across compounds and out to external network points. It is made for campus and perimeter network links. Artek Computers LLC supplies it in Dubai and the UAE; send us your lengths for a quote." },
  "cat6a-cable": { description: "A higher-category copper cable, Cat6A is chosen for busy office and data room networks. It is often installed where extra headroom is wanted for future growth. Artek Computers LLC supplies Cat6A cable in Dubai and the UAE — request a quote for your project." },
  "cat7-cable": { description: "Cat7 cable is used in data centres, server rooms and enterprise networks that call for a high-category copper connection. Its shielded construction suits demanding environments. Artek Computers LLC supplies it in Dubai and the UAE; contact our team for a quote." },
  "cat8-cable": { description: "The newest common copper category, Cat8 cable serves short, high-demand links between switches, servers and storage in server rooms. Artek Computers LLC supplies Cat8 cable in Dubai and the UAE. Ask us for a quote and we will match it to your setup." },
  "network-cable": { description: "Network cable is the everyday copper wiring that links computers, phones, cameras and other devices to a network. The right type depends on the devices and the site. Artek Computers LLC supplies network cable in Dubai and the UAE — request a quote and we will advise." },
  "copper-patch-cord": { description: "Patch cords connect computers, phones, patch panels and switches at the desk or in the rack. They come ready-terminated in set lengths for quick moves and changes. Artek Computers LLC supplies copper patch cords in Dubai and the UAE; ask us for a quote." },
  "copper-patch-panel": { description: "A patch panel terminates network cables at the rack so each outlet can be patched to a switch. It keeps server rooms and data cabinets tidy and easy to maintain. Artek Computers LLC supplies copper patch panels in Dubai and the UAE — request a quote." },

  "fiber-adaptor": { description: "Fiber adaptors mount in patch panels, wall boxes and distribution frames to join two fiber connectors back to back. They are used at patch points in data rooms and telecom cabinets. Artek Computers LLC supplies them in Dubai and the UAE; ask us for a quote." },
  "fiber-optic-cable": { description: "Fiber optic cable carries network traffic as light over longer runs between buildings, floors and data rooms. It forms the backbone of many campus, building and office networks. Artek Computers LLC supplies fiber optic cable in Dubai and the UAE — request a quote for your project." },
  "fiber-optic-patch-cord": { description: "Fiber patch cords link equipment to patch panels, splitters and transceivers at fiber distribution points. You will find them in data rooms, telecom rooms and server racks. Artek Computers LLC supplies fiber optic patch cords in Dubai and the UAE; contact us for a quote." },
  "fiber-optic-patch-panels": { description: "These panels terminate and organise fiber cables at distribution points in data rooms and telecom cabinets. They house splices and adaptors while keeping patching tidy. Artek Computers LLC supplies fiber optic patch panels in Dubai and the UAE — ask our team for a quote." },
  "fiber-optic-pigtails": { description: "Pigtails are short fiber lengths with a connector at one end, spliced onto cables so they can be finished in panels and boxes. They are a standard part of fiber installation work. Artek Computers LLC supplies fiber pigtails in Dubai and the UAE; request a quote." },
  "fiber-optic-splitter": { description: "Fiber splitters divide one optical signal across several fiber paths. They sit at distribution points in fiber distribution and FTTH-type networks, usually inside boxes or panels. Artek Computers LLC supplies them across Dubai and the UAE — ask us for a quote." },
  "fo-distribution-box": { description: "A fiber distribution box protects splices, splitters and adaptors at fiber distribution points. You will see them at building entries, in risers and in street cabinets. Artek Computers LLC supplies FO distribution boxes in Dubai and the UAE; request a quote for your project." },
  "ftth-drop-cable": { description: "Drop cable is the fiber run that enters a home or office from the distribution network in fiber-to-the-premises installations. It terminates at the building entry. Artek Computers LLC supplies FTTH drop cable in Dubai and the UAE — contact us for a quote." },
  "mpo-mtp-patch-cords": { description: "MPO and MTP patch cords carry multiple fibers through a single connector pair, used for high-density cabling between racks in data rooms. They simplify links that need many fibers at once. Artek Computers LLC supplies MPO and MTP patch cords in Dubai and the UAE; ask us for a quote." },
  "media-converter": { description: "Media converters join fiber and copper network segments by converting between the two media. They are used where a fiber link must connect to standard network equipment. Artek Computers LLC supplies media converters in Dubai and the UAE — request a quote for your setup." },
  "plc-splitter": { description: "PLC splitters divide optical signals across multiple outputs in a compact planar format. They are common in FTTH and fiber distribution networks, usually mounted in boxes or panels. Artek Computers LLC supplies PLC splitters in Dubai and the UAE; contact us for a quote." },
  "transceiver": { description: "Transceivers plug into switches, routers and media converters to send and receive optical signals over fiber links. They are used throughout data rooms and network backbones. Artek Computers LLC supplies fiber transceivers in Dubai and the UAE — ask our team for a quote." },

  "audio-cable": { description: "Audio cable connects microphones, speakers and audio equipment in meeting rooms, halls and public address systems. Installers run it during new builds and fit-outs. Artek Computers LLC supplies audio cable in Dubai and the UAE; request a quote with your lengths." },
  "cctv-cable": { description: "Used for CCTV installations, this cable carries camera video and power back to recorders and monitors. It runs between cameras, DVRs and NVRs in buildings and on sites. Artek Computers LLC supplies CCTV cable in Dubai and the UAE — ask us for a quote." },
  "control-cable": { description: "Control cable links sensors, drives and control equipment in building and industrial systems. It is widely used in automation panels and plant rooms. Artek Computers LLC supplies control cable in Dubai and the UAE; request a quote and we will help you choose." },
  "eib-bus-cable": { description: "Bus cable links the devices in building automation systems, such as lighting and HVAC controls. It runs between field devices and control panels on site. Artek Computers LLC supplies EIB bus cable in Dubai and the UAE — contact us for a quote." },
  "fire-alarm-cable": { description: "Fire alarm cable connects detectors, call points, sounders and panels in fire detection systems. It is installed during building fit-outs and system upgrades. Artek Computers LLC supplies fire alarm cable in Dubai and the UAE; ask us for a quote for your project." },
  "hdmi-cable": { description: "An HDMI cable carries video and audio between computers, screens, projectors and conferencing equipment. It is common in offices, meeting rooms and display setups. Artek Computers LLC supplies HDMI cables in Dubai and the UAE — request a quote in the lengths you need." },
  "instrumentation-cable": { description: "Instrumentation cable runs between measurement devices and control systems in industrial plants and utilities. The right construction depends on the instruments on site. Artek Computers LLC supplies instrumentation cable in Dubai and the UAE; contact us for a quote and we will advise." },
  "lift-cable": { description: "Lift cable serves the controls, signals and fittings inside elevators, moving with the car as it travels. It is supplied for lift installations and modernisation work. Artek Computers LLC supplies lift cable in Dubai and the UAE — request a quote for your requirements." },
  "rg59-cable": { description: "A widely used CCTV coax, RG59 connects analogue cameras to recorders and monitors. It also serves basic video and RF feeds. Artek Computers LLC supplies RG59 cable in Dubai and the UAE; ask us for a quote." },
  "rg6-cable": { description: "RG6 coax carries TV, satellite and video signals to screens and set-top equipment in homes and commercial buildings. It is the usual choice for antenna and satellite runs. Artek Computers LLC supplies RG6 cable in Dubai and the UAE — request a quote." },
  "speaker-cable": { description: "Speaker wiring connects amplifiers to ceiling and wall speakers in meeting rooms, halls and background music systems. It is laid during fit-outs alongside other ELV cabling. Artek Computers LLC supplies speaker cable in Dubai and the UAE; ask us for a quote." },

  "network-cabinet": { description: "Network cabinets house switches, patch panels and servers in offices and equipment rooms. They keep cabling organised and equipment secure. Artek Computers LLC supplies network cabinets in Dubai and the UAE; request a quote for your rack build." },
  "patch-free-cabinet": { description: "Patch-free cabinets are equipment housings used in ELV and low-voltage installations. They give installers a simple place to mount devices and their wiring. Artek Computers LLC supplies patch-free cabinets in Dubai and the UAE — request a quote for your installation." },
  "pdu": { description: "A PDU distributes power to equipment inside server racks and network cabinets. It feeds servers, switches and other rack gear from the room's supply. Artek Computers LLC supplies PDUs in Dubai and the UAE; ask us for a quote for your racks." },
  "ups": { description: "A UPS keeps IT and network equipment running on battery when mains power fails or dips. It protects servers, switches and workstations in server rooms and offices. Artek Computers LLC supplies UPS units in Dubai and the UAE — request a quote for your load." },

  "network-router": { description: "Routers connect office networks to the internet and move traffic between networks. They sit at the edge of the LAN in offices and branch sites. Artek Computers LLC supplies network routers in Dubai and the UAE; ask us for a quote for your site." },
  "network-switches": { description: "Network switches link computers, phones, cameras and access points into one LAN. They are the central hardware of office and data room networks. Artek Computers LLC supplies network switches in Dubai and the UAE — contact our team for a quote." },
  "industrial-switches": { description: "Built for factories and plant floors, industrial network switches connect equipment in automation settings and outdoor cabinets. They join plant gear with standard office networks. Artek Computers LLC supplies industrial switches in Dubai and the UAE; request a quote for your site." },

  "desktops": { description: "Desktop computers serve office workstations, reception desks and home setups alike. They handle everyday office applications and multitasking. Artek Computers LLC supplies desktops in Dubai and the UAE; request a quote and tell us what you need." },
  "gaming-pc": { description: "A gaming PC is built for playing modern games, with headroom for streaming and content creation as well. Many customers also use them for demanding design work. Artek Computers LLC supplies gaming PCs in Dubai and the UAE — ask us for a quote." },
  "laptops": { description: "Laptops give offices and remote staff portable computers for working on the move. They are used across businesses for everyday productivity. Artek Computers LLC supplies laptops in Dubai and the UAE; contact us for a quote for one or a whole fleet." },

  "interactive-screen": { description: "Interactive screens are large touch displays used for meetings, training and classrooms. Teams present, annotate and collaborate directly on the screen. Artek Computers LLC supplies interactive screens in Dubai and the UAE — contact us for a quote." },

  "ip-camera": { description: "An IP camera sends video over the network so it can be recorded and viewed from anywhere on the site. It is the standard choice for modern office and retail CCTV. Artek Computers LLC supplies IP cameras in Dubai and the UAE — request a quote and we will help you plan the coverage." },
  "dome-camera": { description: "A dome camera sits in a low-profile ceiling mount, common in shops, offices and corridors where a discreet look is wanted. The housing protects the camera and blends into the ceiling. Artek Computers LLC supplies dome cameras in Dubai and the UAE; ask us for a quote for your premises." },
  "bullet-camera": { description: "A bullet camera is a wall- or ceiling-mounted CCTV camera with a visible cylindrical body, often used at entrances, car parks and building perimeters. Its shape acts as a clear visual deterrent. Artek Computers LLC supplies bullet cameras in Dubai and the UAE — request a quote for your site." },
  "ptz-camera": { description: "A PTZ camera can be panned, tilted and zoomed to follow activity across wide areas such as yards, warehouses and large halls. Operators move it live or through preset tours. Artek Computers LLC supplies PTZ cameras in Dubai and the UAE; contact us for a quote." },

  "mouse": { description: "A mouse is the everyday pointing device at office desks, reception counters and meeting rooms. Both wired and wireless types are common depending on the setup. Artek Computers LLC supplies computer mice in Dubai and the UAE — request a quote for single units or whole offices." },
  "keyboard": { description: "Keyboards are the standard input device at every workstation, from office desks to reception and meeting rooms. Wired and wireless versions suit different desk layouts. Artek Computers LLC supplies keyboards in Dubai and the UAE; ask us for a quote for your team." },
  "webcam": { description: "A webcam sits on a desk or monitor for video calls, online meetings and interviews. It is now a standard part of every office workstation. Artek Computers LLC supplies webcams in Dubai and the UAE — request a quote and tell us how many desks you need covered." },
  "conference-webcam": { description: "A conference webcam covers the whole meeting room so remote participants can see everyone at the table. It is used in meeting rooms and boardrooms of all sizes. Artek Computers LLC supplies conference webcams in Dubai and the UAE; contact our team for a quote." },
  "printer": { description: "A printer produces documents at the desk or in the office print area. It is used across businesses for invoices, reports and everyday paperwork. Artek Computers LLC supplies printers in Dubai and the UAE — request a quote and we will match one to your office." },
  "hard-disk": { description: "A hard disk is the storage device that holds files on computers, servers, network storage and CCTV recorders. Businesses use it to store documents and footage and to keep backups of important data. Artek Computers LLC supplies hard disks in Dubai and the UAE — request a quote." },
};

/** Resolve a product page (/products/<group>/<product>) to its group, display name and details. */
export const getProduct = (groupSlug: string, productSlug: string) => {
  const group = getProductGroup(groupSlug);
  const name = group?.items.find((item) => slugify(item) === productSlug);
  if (!group || !name) return undefined;
  return { group, name, detail: productDetails[productSlug] ?? {} };
};

/** Optional extras for a single brand. Key = slugify(brand name). Filled in gradually. */
export type BrandModel = { code: string; type: string; image?: string; imageAlt?: string };

export type BrandDetail = {
  description?: string;
  /** Exact product names (as in productGroups[].items) this brand shows. If missing, fall back to the products of the product groups whose brandGroupTitle matches the brand's group. */
  products?: readonly string[];
  models?: readonly BrandModel[];
  /** Optional brand accent colour (hex) sampled from the brand's logo — used sparingly for decoration on the brand page. */
  accent?: string;
};
/** Hikvision red — the most saturated non-white pixel of the logo (public/images/brand-logos/hikvision.png). */
const HIKVISION_ACCENT = "#c91718";
export const brandDetails: Record<string, BrandDetail> = {
  belden: { description: "", products: ["Copper Patch Cord"] },
  extell: { description: "", products: ["Cat6 Cable"] },
  opterna: { description: "", products: ["Fiber Optic Splitter"] },
  norden: { description: "", products: ["Cat8 Cable", "Copper Patch Panel"] },
  kuwes: { description: "", products: ["Cat6 Cable", "Copper Patch Cord", "PDU"] },
  techlogiks: { description: "", products: ["Cat6 Cable", "Cat6 Outdoor Cable", "Copper Patch Cord", "Copper Patch Panel", "Fiber Adaptor", "Fiber Optic Cable", "Fiber Optic Patch Cord", "Fiber Optic Patch Panels", "Fiber Optic Pigtails", "FO Distribution Box", "PDU"] },
  cisco: { description: "" },
  fortinet: { description: "" },
  sonicwall: { description: "" },
  ubiquiti: { description: "" },
  aruba: { description: "" },
  ruckus: { description: "" },
  "d-link": { description: "", products: ["Network Router", "Network Switches"] },
  linksys: { description: "" },
  "tp-link": { description: "", products: ["Network Router", "Network Switches"] },
  mikrotik: { description: "" },
  grandstream: { description: "" },
  engenius: { description: "" },
  ruijie: { description: "" },
  draytek: { description: "" },
  tenda: { description: "" },
  "ip-com": { description: "" },
  huawei: { description: "" },
  yeastar: { description: "" },
  jabra: { description: "" },
  hikvision: { description: "", products: ["IP Camera", "Dome Camera", "Bullet Camera", "PTZ Camera"], models: [
    { code: "DS-2CD1043G0-I",        type: "Camera" },
    { code: "DS-2CD1043G2-LIU",      type: "Bullet camera" },
    { code: "DS-2CD1143G2-LIU",      type: "Camera" },
    { code: "DS-2CD1643G0-IZ",       type: "Camera" },
    { code: "DS-2CD2543G2-IS",       type: "Dome camera" },
    { code: "iDS-2CD7A45G2-IZHSY",   type: "Bullet camera" },
  ], accent: HIKVISION_ACCENT },
  dahua: { description: "", products: ["IP Camera", "Dome Camera", "Bullet Camera", "PTZ Camera"] },
  axis: { description: "" },
  toten: { description: "" },
  unv: { description: "" },
  zkteco: { description: "" },
  ezviz: { description: "" },
  imou: { description: "" },
  tapo: { description: "" },
  apc: { description: "" },
  eaton: { description: "" },
  schneider: { description: "" },
  dell: { description: "", products: ["Desktops", "Laptops"] },
  hp: { description: "", products: ["Desktops", "Laptops"] },
  lenovo: { description: "", products: ["Desktops", "Laptops"] },
  apple: { description: "" },
  acer: { description: "" },
  asus: { description: "" },
  samsung: { description: "" },
  synology: { description: "" },
  qnap: { description: "" },
  wd: { description: "" },
  "seagate": { description: "", products: ["Hard Disk"] },
  epson: { description: "", products: ["Printer"] },
  brother: { description: "" },
  logitech: { description: "", products: ["Mouse", "Keyboard", "Webcam", "Conference Webcam"] },
  microsoft: { description: "" },
  kaspersky: { description: "" },
  symantec: { description: "" },
  ugreen: { description: "" },
  anker: { description: "" },
  rapoo: { description: "" },
  nvidia: { description: "" },
  intel: { description: "" },
  /* ── New brands for Servers & storage, Firewalls & security, Backup ── */
  "dell-emc": { description: "" },
  sophos: { description: "" },
  acronis: { description: "" },
  veeam: { description: "" },
  "lto-tape": { description: "" },
};

/** Resolve a brand page (/brands/<brand>) to its name, brand group and details. */
export const getBrand = (brandSlug: string) => {
  for (const bg of brandGroups) {
    const name = bg.brands.find((b) => slugify(b) === brandSlug);
    if (name) return { name, group: bg, detail: brandDetails[brandSlug] ?? {} };
  }
  return undefined;
};

/** Products a brand page lists: detail.products if set, else every item of the product groups tied to the brand's group. */
export const getBrandProducts = (brandSlug: string) => {
  const brand = getBrand(brandSlug);
  if (!brand) return [];
  const names = brand.detail.products
    ?? productGroups.filter((g) => g.brandGroupTitle === brand.group.title).flatMap((g) => [...g.items]);
  return names.flatMap((name) => {
    const group = productGroups.find((g) => g.items.includes(name));
    return group ? [{ groupSlug: group.slug, groupTitle: group.title, name }] : [];
  });
};

/** WhatsApp link with a pre-filled message, using the company's WhatsApp number. */
export const whatsappLink = (text: string): string | null =>
  company.whatsappNumber ? `https://wa.me/${company.whatsappNumber}?text=${encodeURIComponent(text)}` : null;
