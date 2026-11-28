/**
 * Article-style copy for selected brand pages (/brands/<brand>).
 * Key = slugify(brand name) — the same key space as brandDetails.
 * The `intro` is the hero line under the H1; keep it 40–60 words.
 * Plain original text only: no brand facts or history, no model or series
 * names, no specifications, claims, prices or promises.
 * Brands without an entry render as before.
 */

export type BrandContent = {
  intro: string;
  howWeHelp: string;
  faqs: { question: string; answer: string }[];
};

export const brandContent: Record<string, BrandContent> = {
  hikvision: {
    intro:
      "Artek Computers LLC supplies Hikvision security cameras to customers in Dubai and across the UAE. On this site we list Hikvision IP cameras, dome cameras, bullet cameras and PTZ cameras for offices, shops, warehouses and residential buildings, ready to quote for your project.",
    howWeHelp:
      "Tell us which camera types you need, how many of each, and where they will be installed. Artek Computers LLC will reply with a clear quote for your Hikvision order in Dubai or anywhere in the UAE.",
    faqs: [
      {
        question: "How do I get a quote for Hikvision products?",
        answer:
          "Send an enquiry through the site or call our office in Dubai. List the products, models and quantities you need, and our team will reply with clear pricing.",
      },
      {
        question: "Which Hikvision products do you supply?",
        answer:
          "We list Hikvision IP, dome, bullet and PTZ cameras. If you are looking for a specific model, send us its details and we will check what we can offer.",
      },
    ],
  },
  dahua: {
    intro:
      "Artek Computers LLC keeps Dahua cameras among the security brands we supply in Dubai and the UAE. Our listing covers Dahua IP cameras, dome cameras, bullet cameras and PTZ cameras, serving CCTV projects for retail units, offices, compounds and residential towers around the country.",
    howWeHelp:
      "Share your camera list with us — the types, the counts and the site they are for — and Artek Computers LLC will answer with a clear quotation for Dahua equipment anywhere in the UAE.",
    faqs: [
      {
        question: "How do I get a quote for Dahua products?",
        answer:
          "Use our enquiry form or call the office. Tell us the products, models and quantities on your list, and we will get back to you with pricing.",
      },
      {
        question: "Which Dahua products do you supply?",
        answer:
          "Dahua IP, dome, bullet and PTZ cameras are what we list today. Ask us about a particular model and we will tell you what we can supply.",
      },
    ],
  },
  "d-link": {
    intro:
      "D-Link networking gear is part of the Artek Computers LLC catalogue in Dubai and the wider UAE. We list D-Link network routers and network switches — the two pieces most offices need to connect their people and their internet line — for both small offices and growing company networks.",
    howWeHelp:
      "Send Artek Computers LLC the routers and switches your network needs, with quantities, and we will return a clear quote for the D-Link equipment your Dubai or UAE site needs.",
    faqs: [
      {
        question: "How do I get a quote for D-Link products?",
        answer:
          "Enquire online or by phone. Share the products, models and quantities you need, and we will send you a quote.",
      },
      {
        question: "Which D-Link products do you supply?",
        answer:
          "Our D-Link listing covers network routers and network switches. Tell us the model you have in mind and we will confirm what we can quote.",
      },
    ],
  },
  "tp-link": {
    intro:
      "Artek Computers LLC supplies TP-Link networking equipment to businesses in Dubai and throughout the UAE. Our TP-Link pages cover network routers and network switches, the kit that links an office LAN to the internet and ties its wired devices together, from a single floor to a multi-storey building.",
    howWeHelp:
      "Tell Artek Computers LLC which TP-Link routers and switches your project calls for and how many of each; we will reply with a clear quote for supply in Dubai or anywhere in the UAE.",
    faqs: [
      {
        question: "How do I get a quote for TP-Link products?",
        answer:
          "Reach us by enquiry form or call. Let us know the products, models and quantities, and our team will quote for you.",
      },
      {
        question: "Which TP-Link products do you supply?",
        answer:
          "We list TP-Link network routers and network switches. Send us the details of any specific model and we will check it for you.",
      },
    ],
  },
  hp: {
    intro:
      "HP computers are among the brands Artek Computers LLC supplies in Dubai and the UAE. Our HP listing covers desktops and laptops — the two workhorses of office IT — so whether you are fitting out a new floor or replacing worn machines, we can quote the HP hardware your team uses daily.",
    howWeHelp:
      "Tell Artek Computers LLC how many HP desktops and laptops you need and who they are for, and we will come back with a clear quote for your Dubai or UAE office.",
    faqs: [
      {
        question: "How do I get a quote for HP products?",
        answer:
          "Send us an enquiry or call the office with the products, models and quantities you need. We will reply with a quote.",
      },
      {
        question: "Which HP products do you supply?",
        answer:
          "Our HP pages list desktops and laptops. If a certain model matters to you, tell us which one and we will see what we can do.",
      },
    ],
  },
  dell: {
    intro:
      "Artek Computers LLC supplies Dell computers to organisations in Dubai and across the UAE. Our Dell catalogue pages list desktops and laptops for everyday business computing, covering everything from a single replacement workstation to a full department refresh quoted in one go.",
    howWeHelp:
      "Send Artek Computers LLC your Dell requirement — which desktops or laptops, how many, and for which teams — and we will reply with a clear quote for your site in Dubai or the wider UAE.",
    faqs: [
      {
        question: "How do I get a quote for Dell products?",
        answer:
          "Write to us by enquiry or call. Include the products, models and quantities, and we will send clear pricing back.",
      },
      {
        question: "Which Dell products do you supply?",
        answer:
          "Dell desktops and laptops are what our listing covers. Name the model you use and we will check supply for you.",
      },
    ],
  },
  lenovo: {
    intro:
      "Lenovo machines round out the computer brands Artek Computers LLC offers in Dubai and the UAE. On this site you will find Lenovo desktops and laptops listed for business buyers, ready to quote whether you are kitting a startup office or adding machines to an established workplace.",
    howWeHelp:
      "Let Artek Computers LLC know the Lenovo desktops or laptops you want, the counts and where they are going; we will answer with a clear quote for Dubai or UAE supply.",
    faqs: [
      {
        question: "How do I get a quote for Lenovo products?",
        answer:
          "Submit an enquiry or call our team. List the products, models and quantities, and we will come back to you with a quote.",
      },
      {
        question: "Which Lenovo products do you supply?",
        answer:
          "We list Lenovo desktops and laptops. Ask about a specific model and we will tell you if we can source it.",
      },
    ],
  },
  logitech: {
    intro:
      "Artek Computers LLC supplies Logitech peripherals to workplaces in Dubai and the UAE. Our Logitech listing includes mice, keyboards, webcams and conference webcams — the everyday desk equipment and meeting-room cameras that keep staff working and remote calls running across the office.",
    howWeHelp:
      "Tell Artek Computers LLC which Logitech mice, keyboards or webcams you need and how many of each, and we will reply with a clear quote for your office in Dubai or the UAE.",
    faqs: [
      {
        question: "How do I get a quote for Logitech products?",
        answer:
          "Enquire by form or phone. Give us the products, models and quantities, and we will quote for you.",
      },
      {
        question: "Which Logitech products do you supply?",
        answer:
          "Mice, keyboards, webcams and conference webcams make up our Logitech listing. Send us the model you want and we will check it.",
      },
    ],
  },
  epson: {
    intro:
      "Epson printers are supplied by Artek Computers LLC to offices and shops in Dubai and the wider UAE. Our Epson listing covers printers for the documents a business produces each day — invoices, reports, letters and labels — whether the machine sits at one desk or serves a whole floor.",
    howWeHelp:
      "Tell Artek Computers LLC how many Epson printers you need and the printing they will do, and we will send you a clear quote in Dubai or anywhere in the UAE.",
    faqs: [
      {
        question: "How do I get a quote for Epson products?",
        answer:
          "Call the office or send an enquiry listing the products, models and quantities. We will reply with pricing.",
      },
      {
        question: "Which Epson products do you supply?",
        answer:
          "Printers are the Epson line we list. Tell us the model you have in mind and we will confirm what we can quote.",
      },
    ],
  },
  seagate: {
    intro:
      "Artek Computers LLC supplies Seagate hard disks to buyers in Dubai and across the UAE. Our Seagate listing covers the hard disks that store and back up files on computers, servers, network storage and CCTV recorders — the quiet part of every system that everything else depends on.",
    howWeHelp:
      "Tell Artek Computers LLC the number of Seagate hard disks you need and what they will go into, and we will reply with a clear quote for your Dubai or UAE site.",
    faqs: [
      {
        question: "How do I get a quote for Seagate products?",
        answer:
          "Send an enquiry or call us with the products, models and quantities you need, and we will get back to you with a quote.",
      },
      {
        question: "Which Seagate products do you supply?",
        answer:
          "We list Seagate hard disks. Ask us about a particular model and we will tell you what we can supply.",
      },
    ],
  },
};
