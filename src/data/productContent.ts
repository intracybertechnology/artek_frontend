/**
 * Article-style copy for selected product pages (/products/<group>/<product>).
 * Key = slugify(product name) — the same key space as productDetails.
 * Plain original text only: no specifications, numbers, standards, brand
 * names, prices or promises. Products without an entry render as before.
 */

export type ProductContent = {
  whatIs: string;
  whereUsed: string;
  howWeHelp: string;
  /** Plural product names (e.g. "Fiber Optic Pigtails") get "What are … / Where are … used?" headings. */
  plural?: boolean;
  faqs: { question: string; answer: string }[];
};

export const productContent: Record<string, ProductContent> = {
  "cat6-cable": {
    whatIs:
      "Cat6 cable is a type of copper network cable used to connect computers, printers, cameras and other devices to a network. It carries data through twisted pairs of copper wire inside a single outer jacket, and it is run inside walls, ceilings and floor spaces during cabling work.",
    whereUsed:
      "You will find this cable in offices, schools, shops and small data rooms across Dubai. It links desks to server racks, joins network switches together, feeds wireless access points and carries signals for CCTV cameras that use a wired connection.",
    howWeHelp:
      "Artek Computers LLC supplies Cat6 cable to businesses in Dubai and the wider UAE. Tell us how much cable you need, the lengths you want and a few details about your site, and our team will come back to you with a clear quote.",
    faqs: [
      {
        question: "How do I get a quote for Cat6 Cable?",
        answer:
          "Send us an enquiry or call. Share the quantity you need and your site details, and we will reply with pricing.",
      },
      {
        question: "Which Cat6 cable should I choose?",
        answer:
          "Tell us the site, the lengths you need and whether the run is indoors or outdoors, and our team will help you choose.",
      },
    ],
  },
  "cat6-outdoor-cable": {
    whatIs:
      "A Cat6 outdoor cable is a copper network cable built with a tougher outer layer so it can be laid outside a building. It moves data between network points the way indoor cabling does, while coping with sun, heat and damp on exposed runs.",
    whereUsed:
      "This cable suits runs between buildings, links to outbuildings and car parks, garden offices and rooftop equipment. Installers in the UAE use it for camera feeds at gates, wireless links on masts and any network route that leaves the protection of a building.",
    howWeHelp:
      "Artek Computers LLC supplies outdoor Cat6 cable across Dubai and the UAE. Let us know the route you plan, the total length and how much spare you want, and we will send you a straightforward quote.",
    faqs: [
      {
        question: "How do I get a quote for Cat6 Outdoor Cable?",
        answer:
          "Reach us by enquiry form or phone. Give us the length you need and some site details, and we will share a quote.",
      },
      {
        question: "Which outdoor cable should I choose?",
        answer:
          "Describe the site and the run lengths, and tell us where the cable will sit. Our team will guide you to a fitting choice.",
      },
    ],
  },
  "cat6a-cable": {
    whatIs:
      "Cat6A cable is a copper cabling type used for structured wiring that joins network devices. Like other category cables it is a sheathed bundle of twisted copper pairs, and it moves data between wall outlets, switches and equipment on busy company networks.",
    whereUsed:
      "Typical homes for this cable are large offices, tower blocks, warehouses and data rooms where many devices talk at once. It carries connections to desks, joins cabinets on different floors, feeds access points and supports camera systems in buildings that need plenty of wired points.",
    howWeHelp:
      "Artek Computers LLC supplies Cat6A cable in Dubai and across the UAE. Tell us how much you need and in what lengths, plus a little about the site, and we will answer with a clear quote.",
    faqs: [
      {
        question: "How do I get a quote for Cat6A Cable?",
        answer:
          "Call us or send an enquiry with the quantity and your site details. We will get back to you with a quote.",
      },
      {
        question: "Which Cat6A cable should I choose?",
        answer:
          "Share your site plan, the lengths involved and whether runs stay indoors. Our team will then suggest a suitable cable.",
      },
    ],
  },
  "cat7-cable": {
    whatIs:
      "Cat7 cable is a shielded copper network cable used in structured cabling systems. Each twisted pair sits inside its own screening, and the whole bundle is wrapped in a further shield, so the cable resists outside electrical noise while carrying data between network points.",
    whereUsed:
      "Because of that screening, this cable often appears in factories, plant rooms and medical or industrial sites where motors and machines create electrical interference. It is also run in data rooms, between network cabinets and along backbone links inside large buildings.",
    howWeHelp:
      "Artek Computers LLC supplies Cat7 cable to projects in Dubai and the UAE. Send us the quantity, the lengths and what the site is like, and we will reply with a clear quotation.",
    faqs: [
      {
        question: "How do I get a quote for Cat7 Cable?",
        answer:
          "Use our enquiry form or call the office. Tell us how much cable you need and a few site details, and we will send pricing.",
      },
      {
        question: "Which Cat7 cable should I choose?",
        answer:
          "Tell us about the site, the run lengths and whether the cable stays inside. Our team will help you settle on a suitable option.",
      },
    ],
  },
  "cat8-cable": {
    whatIs:
      "Cat8 cable is a category of copper network cable made mainly for links inside equipment racks rather than across whole buildings. Its tightly twisted, shielded pairs help keep signals steady, and it joins servers, switches and patch panels within a rack or between neighbouring racks.",
    whereUsed:
      "You will mostly see this cable in data rooms and server rooms, linking equipment inside cabinets. It suits trading floors, media studios and busy offices with their own on-site server spaces — anywhere rack-to-rack wiring needs to stay tidy and dependable.",
    howWeHelp:
      "Artek Computers LLC supplies Cat8 cable in Dubai and the UAE. Tell us how many links you are wiring, the lengths involved and a few site details, and we will come back with a clear quote.",
    faqs: [
      {
        question: "How do I get a quote for Cat8 Cable?",
        answer:
          "Send an enquiry or call us with the quantity you need and some details of the site. We will reply with a quote.",
      },
      {
        question: "Which Cat8 cable should I choose?",
        answer:
          "Let us know the site, the lengths and whether the cable stays indoors. Our team will point you to a suitable choice.",
      },
    ],
  },
  "network-cable": {
    whatIs:
      "Network cable is the general term for the copper wiring that carries data between devices on a local network. It runs from a central switch or patch panel out to sockets at desks and ceilings, giving phones, computers, cameras and wireless points a wired path to talk over.",
    whereUsed:
      "Almost every wired building depends on this cabling: offices, clinics, schools, hotels, warehouses and retail floors across the UAE. It connects user points to server rooms, carries camera and access-point feeds, and links cabinets together between floors and across a site.",
    howWeHelp:
      "Artek Computers LLC supplies network cable in Dubai and throughout the UAE. Share your drawings or a simple list of runs with lengths, and we will price the supply clearly.",
    faqs: [
      {
        question: "How do I get a quote for Network Cable?",
        answer:
          "Send us an enquiry or call with the quantity and your site details. We will reply with clear pricing.",
      },
      {
        question: "Which network cable should I choose?",
        answer:
          "Tell us the site, the lengths and whether runs go indoors or out. Our team will help you decide.",
      },
    ],
  },
  "copper-patch-cord": {
    whatIs:
      "A copper patch cord is a short, flexible cable with a plug moulded on each end. Installers use these cords for the last link in a channel — joining a computer or phone to a wall socket, or connecting switches and patch panels inside a cabinet — and they can be swapped in moments.",
    whereUsed:
      "Look inside any communications cabinet and you will see rows of these cords colour-coded by use. They sit in data rooms and floor boxes across Dubai, connecting desks, cameras, wireless access points and printers to the fixed cabling behind them.",
    howWeHelp:
      "Artek Computers LLC supplies copper patch cords in Dubai and the UAE in assorted lengths and colours. Tell us how many you need and for which equipment, and we will reply with a simple quote.",
    faqs: [
      {
        question: "How do I get a quote for Copper Patch Cord?",
        answer:
          "Enquire by form or phone with the quantity you need and your site details, and we will send you a quote.",
      },
      {
        question: "Which patch cord should I choose?",
        answer:
          "Tell us the equipment, the lengths between devices and whether use is indoors. Our team will suggest a matching cord.",
      },
    ],
  },
  "copper-patch-panel": {
    whatIs:
      "A copper patch panel is a flat panel with rows of jacks mounted in a rack or cabinet. The fixed cabling from around a building terminates on the back, while short cords plug into the front, giving installers one tidy place to label, test and rearrange every network connection.",
    whereUsed:
      "These panels live in the communications cabinets of offices, data rooms and plant spaces throughout Dubai. They bring desk, camera and access-point cabling back to a single point, keep switch ports organised, and make moves and changes easy when teams shift desks.",
    howWeHelp:
      "Artek Computers LLC supplies copper patch panels in Dubai and the wider UAE. Tell us how many cable runs each panel must serve and your rack details, and we will reply with a clear quote.",
    faqs: [
      {
        question: "How do I get a quote for Copper Patch Panel?",
        answer:
          "Send an enquiry or call our team with the quantity and your site details, and we will share a quote.",
      },
      {
        question: "Which patch panel should I choose?",
        answer:
          "Tell us the site, the number of cable runs and where the panel will mount. Our team will help you choose.",
      },
    ],
  },
  "fiber-adaptor": {
    whatIs:
      "A fiber adaptor is a small coupling that joins fiber optic connectors together inside a patch panel, outlet or piece of equipment. It aligns the plugs precisely so light passes from one to the other, and it mounts in standard cut-outs to keep fiber terminations tidy.",
    whereUsed:
      "Adaptors sit at the face of fiber patch panels, wall outlets and telecom cabinets, linking patch cords to the fixed plant behind them. They are used in data rooms, building risers and head-end racks wherever a fiber link must pass from one cable or device to another.",
    howWeHelp:
      "Artek Computers LLC supplies fiber adaptors in Dubai and across the UAE. Tell us which connector styles your panels use, how many positions you need and your site details, and we will reply with a clear quote.",
    faqs: [
      {
        question: "How do I get a quote for Fiber Adaptor?",
        answer:
          "Write to us by enquiry form or call the office. Share the quantity, the connector styles and your site details, and we will send a quote.",
      },
      {
        question: "Which fiber adaptor should I choose?",
        answer:
          "Tell us the panels or equipment it will fit, and the cords it needs to meet. Our team will help you pick the matching adaptor.",
      },
    ],
  },
  "fiber-optic-cable": {
    whatIs:
      "Fiber optic cable carries data as pulses of light along thin strands of glass, instead of through copper wire. The strands sit inside protective layers that guard them against moisture, pulling and knocks, and the cable joins buildings, floors and equipment into one network.",
    whereUsed:
      "This cabling forms the backbone of most large sites in Dubai: runs between buildings, riser links up tower blocks, links from server rooms to floor cabinets, and outside plant routes to gates and remote buildings. It also carries campus links for CCTV and wireless networks.",
    howWeHelp:
      "Artek Computers LLC supplies fiber optic cable in Dubai and the wider UAE. Send us the lengths you need, the total quantity and a few site details, and we will come back with a clear quote.",
    faqs: [
      {
        question: "How do I get a quote for Fiber Optic Cable?",
        answer:
          "Send an enquiry or call with the quantity, the lengths and your site details. We will reply with pricing.",
      },
      {
        question: "Which fiber optic cable should I choose?",
        answer:
          "Share the site, the route lengths and the equipment at each end. Our team will help you settle on the right cable.",
      },
    ],
  },
  "fiber-optic-patch-cord": {
    whatIs:
      "A fiber optic patch cord is a short length of fiber cable with a connector fitted to each end. It provides the flexible final link between a patch panel and a switch, router or server, letting equipment be moved or replaced without disturbing the fixed cabling.",
    whereUsed:
      "These cords live at both ends of a fiber route: in data rooms linking panels to switches, in telecom cabinets joining equipment to the building backbone, and at desks or roof plant connecting devices that need a fiber connection, such as cameras and wireless units.",
    howWeHelp:
      "Artek Computers LLC supplies fiber optic patch cords across Dubai and the UAE. Tell us how many cords you need, the lengths and the equipment they will join, and we will send a clear quotation.",
    faqs: [
      {
        question: "How do I get a quote for Fiber Optic Patch Cord?",
        answer:
          "Enquire online or by phone. Let us know the quantity and your site details, and we will get back to you with a quote.",
      },
      {
        question: "Which fiber patch cord should I choose?",
        answer:
          "Describe the equipment it will connect and the lengths involved, plus the site. Our team will point you to a suitable cord.",
      },
    ],
  },
  "fiber-optic-patch-panels": {
    plural: true,
    whatIs:
      "A fiber optic patch panel is a rack-mount frame where the fiber cables of a network end. Incoming fibers are spliced or connected at the rear, adaptors sit on the front face, and the panel keeps every termination protected, ordered and ready for patch cords to plug in.",
    whereUsed:
      "You will meet these panels in data rooms, building risers and street cabinets across the UAE, at the point where outside fiber meets indoor equipment. They give installers a fixed place to test links, reroute connections and label each fiber run.",
    howWeHelp:
      "Artek Computers LLC supplies fiber optic patch panels in Dubai and the UAE. Tell us the panel count, where they will mount and the site details, and we will answer with a clear quote.",
    faqs: [
      {
        question: "How do I get a quote for Fiber Optic Patch Panels?",
        answer:
          "Send us an enquiry or call with the quantity and your site details. We will reply with a quote.",
      },
      {
        question: "Which fiber patch panel should I choose?",
        answer:
          "Tell us where the panel will sit, the cables it will terminate and the equipment beyond it. Our team will guide your choice.",
      },
    ],
  },
  "fiber-optic-pigtails": {
    plural: true,
    whatIs:
      "A fiber pigtail is a short piece of fiber with a connector on one end only. The bare end is spliced onto a fixed fiber inside a panel or closure, which turns the plant into a point a patch cord can plug into, while the factory-fitted end keeps the connection consistent.",
    whereUsed:
      "Pigtails appear wherever permanent fiber is terminated: at patch panels in data rooms, inside distribution boxes at building entries, and in street or riser cabinets on UAE telecom jobs. Installers splice them in, then label and store the joints in the panel's splice tray.",
    howWeHelp:
      "Artek Computers LLC supplies fiber pigtails in Dubai and throughout the UAE. Let us know how many terminations you are making and the site details, and we will return a clear quote.",
    faqs: [
      {
        question: "How do I get a quote for Fiber Optic Pigtails?",
        answer:
          "Call or send an enquiry with the quantity you need and your site details, and we will come back with pricing.",
      },
      {
        question: "Which fiber pigtail should I choose?",
        answer:
          "Tell us the panels or boxes being terminated and the equipment at the far end. Our team will help you choose.",
      },
    ],
  },
  "fiber-optic-splitter": {
    whatIs:
      "A fiber optic splitter is a passive part with no electronics inside. Light entering on one fiber leaves through the splitter's outgoing ports, so a single feed can serve more than one destination; light can also travel in and combine onto a shared path.",
    whereUsed:
      "Splitters sit at the heart of neighborhood and building fiber networks in the UAE, sharing one incoming feed among floor boxes, apartments or roadside cabinets. They are also used in data rooms to tap links for monitoring and to spread connections across racks.",
    howWeHelp:
      "Artek Computers LLC supplies fiber optic splitters to installers and businesses in Dubai and the UAE. Tell us the split arrangement you plan, the quantity and the site details, and we will reply with a clear quote.",
    faqs: [
      {
        question: "How do I get a quote for Fiber Optic Splitter?",
        answer:
          "Use the enquiry form or call us with the quantity and your site details. We will send back a quote.",
      },
      {
        question: "Which fiber optic splitter should I choose?",
        answer:
          "Describe the network layout, the lengths involved and the equipment on each side. Our team will help you pick.",
      },
    ],
  },
  "fo-distribution-box": {
    whatIs:
      "A fiber distribution box is a small enclosure that protects the points where an outside fiber cable is opened up and divided. Splices, splitters and connector joints sit safely inside on trays, with cable entries sealed against water and dust, and drop cables leave through its ports.",
    whereUsed:
      "These boxes hang on walls, stand in risers or mount in street cabinets across UAE fiber builds. You see them at building entries where the main cable arrives, on floors feeding individual units, and at roadside points in neighborhood networks.",
    howWeHelp:
      "Artek Computers LLC supplies FO distribution boxes in Dubai and the UAE. Tell us how many boxes the job needs, where they will go and the site details, and we will quote clearly.",
    faqs: [
      {
        question: "How do I get a quote for FO Distribution Box?",
        answer:
          "Send an enquiry or call with the quantity and your site details, and we will reply with clear pricing.",
      },
      {
        question: "Which distribution box should I choose?",
        answer:
          "Tell us where it will be mounted, the cables entering it and the equipment beyond. Our team will suggest a fitting box.",
      },
    ],
  },
  "ftth-drop-cable": {
    whatIs:
      "FTTH drop cable is the slender fiber cable run from a street pole, duct or distribution point to a customer's home or office. It is built to survive outside yet stay easy to handle indoors, forming the final leg of a fiber-to-the-premises connection.",
    whereUsed:
      "Telecom crews lay this cable on final drops across the UAE: from roadside cabinets up to villas, along balcony walls to apartments, and into shops and small offices. It carries the broadband, television and voice services that arrive over the fiber network.",
    howWeHelp:
      "Artek Computers LLC supplies FTTH drop cable in Dubai and the UAE. Tell us the number of drops, the average length and the site details, and we will reply with a clear quote.",
    faqs: [
      {
        question: "How do I get a quote for FTTH Drop Cable?",
        answer:
          "Reach our team by enquiry or phone call. Give the quantity, the lengths and your site details, and we will quote.",
      },
      {
        question: "Which drop cable should I choose?",
        answer:
          "Describe the route from the street to the premises, and the equipment at each end. Our team will help you choose.",
      },
    ],
  },
  "mpo-mtp-patch-cords": {
    plural: true,
    whatIs:
      "An MPO & MTP patch cord is a fiber jumper fitted with a multi-fiber plug, so one connector carries a group of fibers at once. This packs many links into little rack space and speeds up cabling between high-density switches, servers and panels.",
    whereUsed:
      "You find these cords in data rooms and server farms, linking rows of equipment through trunk systems instead of single-fiber jumpers. They suit backbone cabling between cabinets, top-of-rack wiring and any Dubai installation where panel space is tight and links are many.",
    howWeHelp:
      "Artek Computers LLC supplies MPO & MTP patch cords in Dubai and the UAE. Tell us the quantity, the lengths and the rack layout, and our team will reply with a clear quote.",
    faqs: [
      {
        question: "How do I get a quote for MPO & MTP Patch Cords?",
        answer:
          "Send us an enquiry or call with the quantity and your site details. We will come back with a quote.",
      },
      {
        question: "Which MPO & MTP patch cord should I choose?",
        answer:
          "Tell us the equipment at both ends, the lengths and the site. Our team will help you find the right cord.",
      },
    ],
  },
  "media-converter": {
    whatIs:
      "A media converter is a small box that joins two cable types on one network link, most often copper wiring on one side and fiber on the other. It changes the signal between the two forms as it passes through, letting equipment speak across cable types it was not built for.",
    whereUsed:
      "Converters sit in telecom cabinets and data rooms where a fiber backbone must reach switches, cameras or computers that only have copper ports. They extend links to outbuildings, car parks and remote gates on UAE sites, and are also used between floors in large buildings.",
    howWeHelp:
      "Artek Computers LLC supplies media converters in Dubai and the UAE. Tell us how many links you are converting, the equipment involved and the site details, and we will send a clear quote.",
    faqs: [
      {
        question: "How do I get a quote for Media Converter?",
        answer:
          "Enquire by form or phone with the quantity and your site details, and we will get back to you with pricing.",
      },
      {
        question: "Which media converter should I choose?",
        answer:
          "Tell us the equipment on each side and the cable runs involved. Our team will help you choose the right converter.",
      },
    ],
  },
  "plc-splitter": {
    whatIs:
      "A PLC splitter is a fiber splitter whose splitting element is a tiny optical circuit laid out on a small chip. The chip sits inside a protective block with fiber pigtails or connectors attached, dividing the incoming light among the output fibers.",
    whereUsed:
      "Installers choose these splitters for FTTH builds in the UAE, placing them in distribution boxes, wall cabinets and splitter modules at the point where one feed splits toward homes. They also appear in data rooms sharing fiber links across racks of equipment.",
    howWeHelp:
      "Artek Computers LLC supplies PLC splitters in Dubai and the UAE. Let us have the quantity, the enclosure they will sit in and the site details, and we will reply with a clear quotation.",
    faqs: [
      {
        question: "How do I get a quote for PLC Splitter?",
        answer:
          "Send an enquiry or call our office with the quantity and your site details. We will share clear pricing.",
      },
      {
        question: "Which PLC splitter should I choose?",
        answer:
          "Tell us the network plan, the enclosure it will live in and the lengths involved. Our team will suggest a suitable splitter.",
      },
    ],
  },
  "transceiver": {
    whatIs:
      "A transceiver is a small pluggable module that slides into a switch, router or media converter and turns it into a fiber-connected device. It both sends and receives light through the port behind it, so one piece of equipment can be matched to whatever cable type the site runs.",
    whereUsed:
      "These modules fill the ports of network equipment in data rooms, riser cabinets and rooftop or gate-side enclosures across Dubai. Wherever a switch or camera needs to join a fiber link, a transceiver in the port provides the optical connection.",
    howWeHelp:
      "Artek Computers LLC supplies transceivers in Dubai and the UAE. Tell us the equipment they will plug into, how many you need and the site details, and we will come back with a clear quote.",
    faqs: [
      {
        question: "How do I get a quote for Transceiver?",
        answer:
          "Call us or send an enquiry. Let us know the quantity and your site details, and we will reply with a quote.",
      },
      {
        question: "Which transceiver should I choose?",
        answer:
          "Tell us the switch or device it will sit in, the cable plant beyond it and the lengths. Our team will help you choose.",
      },
    ],
  },
  "network-cabinet": {
    whatIs:
      "A network cabinet is an enclosed rack that holds network and IT equipment in one place. Shelves, rails and cable management inside keep everything arranged, lockable doors control access, and air moves through the enclosure so equipment does not overheat.",
    whereUsed:
      "These cabinets stand in office IT rooms, comms cupboards, reception areas and small data spaces across Dubai. They house switches, patch panels, servers and other gear, keeping cabling off the floor and giving technicians a single, tidy place to work on the network.",
    howWeHelp:
      "Artek Computers LLC supplies network cabinets in Dubai and the UAE. Tell us what equipment each cabinet will hold, how many you need and the room it stands in, and we will reply with a clear quote.",
    faqs: [
      {
        question: "How do I get a quote for Network Cabinet?",
        answer:
          "Submit an enquiry or call our office. Share the quantity and your site details, and we will send you a quote.",
      },
      {
        question: "Which network cabinet should I choose?",
        answer:
          "Describe the room it will sit in and the equipment it will serve. Our team will help you pick a suitable cabinet.",
      },
    ],
  },
  "patch-free-cabinet": {
    whatIs:
      "A patch free cabinet is an equipment housing used in ELV and low-voltage installations. It gives installers a plain, enclosed space to mount devices and route their wiring, and it keeps loose equipment organised and out of sight once a system is commissioned.",
    whereUsed:
      "Contractors fit these housings wherever ELV systems come together: alongside entry panels, in plant and riser rooms, and in service cupboards of buildings across the UAE. They collect the mountable parts of security, intercom and building-control installations in one tidy spot.",
    howWeHelp:
      "Artek Computers LLC supplies patch free cabinets in Dubai and the UAE. Tell us the quantity, what will be mounted inside and the site details, and we will come back with clear pricing.",
    faqs: [
      {
        question: "How do I get a quote for Patch Free Cabinet?",
        answer:
          "Send an enquiry or give us a call with the quantity and your site details. We will reply with a quote.",
      },
      {
        question: "Which patch free cabinet should I choose?",
        answer:
          "Tell us the site and the equipment it will serve. Our team will help you choose a suitable housing.",
      },
    ],
  },
  "pdu": {
    whatIs:
      "A PDU is a power distribution unit — a bar or block of sockets mounted inside a rack that feeds the equipment stacked there. Plugged into the room's supply, it spreads that power across servers, switches and other devices so each one draws from a single organised source.",
    whereUsed:
      "PDUs live in every populated rack: in office comms rooms, data rooms and site cabinets around the UAE. They sit at the back or front of the frame, taking in one feed and handing it out to the servers, switches and accessories mounted alongside.",
    howWeHelp:
      "Artek Computers LLC supplies PDUs in Dubai and the UAE. Tell us how many racks you are fitting, the gear each will carry and the site details, and we will reply with a clear quote.",
    faqs: [
      {
        question: "How do I get a quote for PDU?",
        answer:
          "Write to us by enquiry or call the office with the quantity and your site details, and we will quote for you.",
      },
      {
        question: "Which PDU should I choose?",
        answer:
          "Tell us the rack it will live in and the equipment it will feed. Our team will guide you to a suitable unit.",
      },
    ],
  },
  "ups": {
    whatIs:
      "A UPS is an uninterruptible power supply — a box that sits between the mains and your IT equipment. It passes power through in normal running and switches to its internal batteries when the incoming supply fails or dips, bridging the gap until power returns or equipment shuts down safely.",
    whereUsed:
      "UPS units sit beside servers, network racks, CCTV recorders and tills wherever work must continue through a power cut. In Dubai they are found in data rooms, back offices, guard houses and retail backrooms, quietly feeding the equipment plugged into them.",
    howWeHelp:
      "Artek Computers LLC supplies UPS units in Dubai and the UAE. Tell us the equipment each unit will support, how many you need and the site details, and we will reply with a clear quote.",
    faqs: [
      {
        question: "How do I get a quote for UPS?",
        answer:
          "Send us an enquiry or call with the quantity and your site details. We will come back with a quote.",
      },
      {
        question: "Which UPS should I choose?",
        answer:
          "Tell us the site and the equipment it will serve. Our team will help you choose a fitting unit.",
      },
    ],
  },
  "network-router": {
    whatIs:
      "A network router is the device that connects your local network to the internet and steers traffic between networks. It decides where incoming and outgoing data should go, hands out addresses to devices on the LAN, and stands guard at the edge with basic filtering rules.",
    whereUsed:
      "Routers sit at the edge of networks in offices, shops, warehouses and branch sites across the UAE. They link the whole site to the ISP line, join separate office networks together, and carry the traffic that flows to and from the internet all day.",
    howWeHelp:
      "Artek Computers LLC supplies network routers in Dubai and the UAE. Tell us the site, how many users the router will carry and the line it connects to, and we will reply with a clear quote.",
    faqs: [
      {
        question: "How do I get a quote for Network Router?",
        answer:
          "Enquire online or by phone. Tell us the quantity and your site details, and we will get back to you with a quote.",
      },
      {
        question: "Which network router should I choose?",
        answer:
          "Describe the site and the equipment it will serve. Our team will help you pick a suitable router.",
      },
    ],
  },
  "network-switches": {
    plural: true,
    whatIs:
      "Network switches are the boxes that tie a local area network together. Every wired device plugs into a port, and the switch passes traffic between them so computers, phones, cameras and access points can talk without each one needing its own direct link to the rest.",
    whereUsed:
      "Switches sit at the heart of the network in offices, data rooms and comms cabinets across Dubai. They gather desk connections, feed wireless access points, carry camera traffic to recorders and link floors together, forming the meeting point of the wired network.",
    howWeHelp:
      "Artek Computers LLC supplies network switches in Dubai and the UAE. Tell us the equipment they will serve, how many you need and the site details, and we will send a clear quote.",
    faqs: [
      {
        question: "How do I get a quote for Network Switches?",
        answer:
          "Send an enquiry or call our team with the quantity and your site details, and we will share a quote.",
      },
      {
        question: "Which network switch should I choose?",
        answer:
          "Tell us the site layout and the equipment it will serve. Our team will help you choose the right switch.",
      },
    ],
  },
  "industrial-switches": {
    plural: true,
    whatIs:
      "Industrial switches are network switches made for factories, utilities and plant areas rather than offices. Their housings and mounting methods suit fitting on machines, walls and inside control panels, letting plant equipment join the same network as the office side of the business.",
    whereUsed:
      "You will find them across UAE industrial sites: on production lines, in automation panels, substations, water and energy plants, and in roadside or gate cabinets. They carry traffic from controllers, sensors and cameras back to the systems that monitor them.",
    howWeHelp:
      "Artek Computers LLC supplies industrial switches in Dubai and the UAE. Tell us the plant they will serve, the quantity and the site details, and our team will reply with a clear quote.",
    faqs: [
      {
        question: "How do I get a quote for Industrial Switches?",
        answer:
          "Call us or send an enquiry with the quantity and your site details, and we will come back to you with pricing.",
      },
      {
        question: "Which industrial switch should I choose?",
        answer:
          "Describe the plant environment and the equipment it will connect. Our team will help you settle on a suitable switch.",
      },
    ],
  },
  "ip-pbx": {
    whatIs:
      "An IP PBX is the telephone system that runs voice calls over the office network instead of old phone wiring. It registers the company's handsets and extensions, routes calls between them and to outside lines, and hosts features like voicemail, recorded greetings and call forwarding.",
    whereUsed:
      "These systems run in offices, hotels, clinics and warehouses across the UAE, handling reception lines, department extensions and calls between rooms. They suit any business that wants its desk and department phones managed from one place rather than handled one by one.",
    howWeHelp:
      "Artek Computers LLC supplies IP PBX systems in Dubai and the UAE. Tell us how many extensions you need, the site details and the equipment involved, and we will reply with a clear quote.",
    faqs: [
      {
        question: "How do I get a quote for IP PBX?",
        answer:
          "Send us an enquiry or call with the quantity of extensions and your site details. We will reply with a quote.",
      },
      {
        question: "Which IP PBX should I choose?",
        answer:
          "Tell us the site and the phones it will serve. Our team will help you choose a suitable system.",
      },
    ],
  },
  "ip-phone": {
    whatIs:
      "An IP phone is a desk telephone that plugs into the computer network rather than a traditional phone line. It registers with the office phone system, then carries calls as data over the LAN, usually sharing the same cabling and switch as the computer beside it.",
    whereUsed:
      "These handsets sit on desks in offices, clinics, hotels and warehouses throughout Dubai — at reception, in departments and in meeting rooms. They give each person a direct extension and access to the features of the company's phone system, such as transfers and directories.",
    howWeHelp:
      "Artek Computers LLC supplies IP phones in Dubai and the UAE. Tell us the number of handsets, the system they will register with and the site details, and we will send a clear quote.",
    faqs: [
      {
        question: "How do I get a quote for IP Phone?",
        answer:
          "Reach us by enquiry form or phone call with the quantity and your site details, and we will quote for the handsets.",
      },
      {
        question: "Which IP phone should I choose?",
        answer:
          "Tell us the desk or room it will sit at and the system it will serve. Our team will suggest a suitable handset.",
      },
    ],
  },
  "interactive-screen": {
    whatIs:
      "An interactive screen is a large touch display that doubles as a computer screen and a writing surface. Teams open files on it, mark them up with a finger or stylus, run video calls, and save the notes afterwards — replacing the projector-and-whiteboard pairing in one device.",
    whereUsed:
      "You will meet these screens in meeting rooms and boardrooms across Dubai, in classrooms and training centres, and at reception desks showing information to visitors. Anywhere a group needs to look at the same material together and act on it, a screen like this earns its place.",
    howWeHelp:
      "Artek Computers LLC supplies interactive screens in Dubai and the UAE. Tell us the rooms they will serve, how many you need and the site details, and we will reply with a clear quote.",
    faqs: [
      {
        question: "How do I get a quote for Interactive Screen?",
        answer:
          "Send an enquiry or call our office with the quantity and your site details. We will come back with a quote.",
      },
      {
        question: "Which interactive screen should I choose?",
        answer:
          "Describe the room it will live in and how the team will use it. Our team will help you choose a suitable screen.",
      },
    ],
  },
  "audio-cable": {
    whatIs:
      "Audio cable carries sound signals between equipment — from microphones and instruments to mixers, amplifiers and speakers. Inside its jacket are conductors arranged to keep the signal clean along the run, with shielding against electrical noise picked up in busy equipment rooms.",
    whereUsed:
      "This wiring runs through venues and buildings across the UAE: meeting rooms with speech systems, halls and mosques with public address, gyms and cafés with background music, and stages needing microphone drops back to a mixing desk, and announcement systems in schools and clinics.",
    howWeHelp:
      "Artek Computers LLC supplies audio cable in Dubai and the UAE. Tell us the runs you are wiring, the total length needed and the site details, and we will reply with a clear quote.",
    faqs: [
      {
        question: "How do I get a quote for Audio Cable?",
        answer:
          "Send an enquiry or call the office. Let us know the quantity and your site details, and we will send pricing.",
      },
      {
        question: "Which audio cable should I choose?",
        answer:
          "Tell us the equipment it connects, the run lengths and the room it serves. Our team will help you pick.",
      },
    ],
  },
  "cctv-cable": {
    whatIs:
      "CCTV cable is the wiring that links surveillance cameras to their recorders and power. It combines the signal path and the power feed in one sheath on many installs, so a single pull between camera and head end carries both the picture and the current that runs the camera.",
    whereUsed:
      "Installers pull this cable on camera jobs throughout Dubai and the UAE — up walls and masts, across ceilings, through car parks and along fences. It feeds dome and bullet cameras at gates, corridors, yards and lobbies, bringing each view back to the recorder.",
    howWeHelp:
      "Artek Computers LLC supplies CCTV cable in Dubai and the UAE. Tell us the number of cameras, the lengths to cover and the site details, and we will come back with a clear quote.",
    faqs: [
      {
        question: "How do I get a quote for CCTV Cable?",
        answer:
          "Use our enquiry form or call with the quantity and your site details. We will reply with a quote.",
      },
      {
        question: "Which CCTV cable should I choose?",
        answer:
          "Describe the site, the distances involved and the cameras it will connect. Our team will help you choose.",
      },
    ],
  },
  "control-cable": {
    whatIs:
      "Control cable connects the devices that operate machines and building systems — sensors, buttons, drives and actuators — back to the panels that command them. Its conductors travel together in one outer cover, carrying the small signalling currents that start, stop and adjust equipment.",
    whereUsed:
      "This cable threads through plants and properties across the UAE: between control panels and motors on factory floors, from pump rooms to roof plant, inside automation skids, and out to gates and barriers that open on command, and to lifts and shutters in busy buildings.",
    howWeHelp:
      "Artek Computers LLC supplies control cable in Dubai and the UAE. Tell us the quantity, the route lengths and the site details, and we will answer with a clear quote.",
    faqs: [
      {
        question: "How do I get a quote for Control Cable?",
        answer:
          "Enquire by form or phone call. Share the quantity and your site details, and we will quote for the job.",
      },
      {
        question: "Which control cable should I choose?",
        answer:
          "Tell us the equipment it connects, the run lengths and the panel it lands on. Our team will suggest a suitable cable.",
      },
    ],
  },
  "eib-bus-cable": {
    whatIs:
      "EIB bus cable is the wiring that links the devices of a building automation system together. Control panels, switches and sensors exchange their messages over these shared runs, letting one installation coordinate lighting, shading and climate across a floor or a whole building.",
    whereUsed:
      "This cable is pulled during fit-outs and villa builds across the UAE, running beside mains wiring to backboxes, ceiling sensors and distribution cupboards. It appears in offices, hotels and apartment towers wherever lighting and climate are controlled from one system.",
    howWeHelp:
      "Artek Computers LLC supplies EIB bus cable in Dubai and the UAE. Tell us the quantity, the lengths and the site details, and our team will reply with a clear quote.",
    faqs: [
      {
        question: "How do I get a quote for EIB BUS Cable?",
        answer:
          "Send an enquiry or call us with the quantity and your site details. We will get back to you with a quote.",
      },
      {
        question: "Which EIB bus cable should I choose?",
        answer:
          "Tell us the site, the run lengths and the automation equipment it connects. Our team will help you choose.",
      },
    ],
  },
  "fire-alarm-cable": {
    whatIs:
      "Fire alarm cable is the dedicated wiring that joins detectors, call points, sounders and control panels in a fire detection system. It carries the signals and power that keep those devices talking to the panel, running through the building on routes planned as part of the system design.",
    whereUsed:
      "This cable is installed during new builds and fit-outs across the UAE, linking ceiling detectors on each floor, wall call points at exits and sounders throughout corridors back to the panel, usually in risers and ceiling voids, and to interfaces that pass alarms onward.",
    howWeHelp:
      "Artek Computers LLC supplies fire alarm cable in Dubai and the UAE. Tell us the project scope, the lengths needed and the site details, and we will reply with a clear quote.",
    faqs: [
      {
        question: "How do I get a quote for Fire Alarm Cable?",
        answer:
          "Write to us by enquiry or call the office with the quantity and your site details, and we will send a quote.",
      },
      {
        question: "Which fire alarm cable should I choose?",
        answer:
          "Tell us the site, the run lengths and the devices it will connect. Our team will help you choose.",
      },
    ],
  },
  "hdmi-cable": {
    whatIs:
      "An HDMI cable carries picture and sound together between audio-visual equipment — computers to screens, players to displays, laptops to projectors. One connector at each end handles the whole link, which is why it has become the everyday cord behind office and home displays.",
    whereUsed:
      "These cords link screens in Dubai offices, meeting rooms and reception displays, video walls in retail, projectors in classrooms and training rooms, and digital signage in lifts and lobbies. Anywhere a screen shows content from a separate source, one is usually in the mix.",
    howWeHelp:
      "Artek Computers LLC supplies HDMI cables in Dubai and the UAE. Tell us how many you need, the lengths and where they will run, and we will reply with a clear quote.",
    faqs: [
      {
        question: "How do I get a quote for HDMI Cable?",
        answer:
          "Send us an enquiry or call with the quantity and your site details. We will share a quote.",
      },
      {
        question: "Which HDMI cable should I choose?",
        answer:
          "Tell us the equipment at each end and the distance between them. Our team will point you to a suitable cord.",
      },
    ],
  },
  "instrumentation-cable": {
    whatIs:
      "Instrumentation cable connects measuring and control devices — the instruments that read levels, flows and conditions — to the systems that record and act on them. It is laid as the signal wiring of process and utility installations, linking field devices back to control rooms.",
    whereUsed:
      "On UAE industrial and utility sites this cable runs from field instruments at tanks, pipelines and plant skids to marshalling cabinets and control rooms. It is installed in energy, water and processing plants wherever readings must travel from the point of measurement to the people watching them.",
    howWeHelp:
      "Artek Computers LLC supplies instrumentation cable in Dubai and the UAE. Tell us the quantity, the route lengths and the site details, and we will send you a clear, itemised quote.",
    faqs: [
      {
        question: "How do I get a quote for Instrumentation Cable?",
        answer:
          "Reach our team by enquiry or phone. Give us the quantity and your site details, and we will quote.",
      },
      {
        question: "Which instrumentation cable should I choose?",
        answer:
          "Describe the site, the run lengths and the instruments it connects. Our team will help you choose.",
      },
    ],
  },
  "lift-cable": {
    whatIs:
      "Lift cable serves the moving parts of an elevator, travelling with the car as it rises and falls. It feeds the lighting, controls and fittings inside the cabin and connects them to the equipment at the shaft top and landings, flexing through every trip.",
    whereUsed:
      "This wiring goes into elevator installations and modernisation projects in towers across Dubai and the UAE, running up the shaft alongside the car. It is supplied to lift contractors fitting out new buildings and refurbishing cabins in older ones, from basements to rooftops.",
    howWeHelp:
      "Artek Computers LLC supplies lift cable in Dubai and the UAE. Tell us the project, the lengths involved and the site details, and we will reply with a clear quote.",
    faqs: [
      {
        question: "How do I get a quote for Lift Cable?",
        answer:
          "Send an enquiry or call with the quantity and your site details, and we will come back with a quote.",
      },
      {
        question: "Which lift cable should I choose?",
        answer:
          "Tell us the site, the shaft details and the equipment it connects. Our team will help you choose.",
      },
    ],
  },
  "rg59-cable": {
    whatIs:
      "RG59 is a coaxial cable — a single central conductor wrapped in shielding — long used for video feeds. Signals travel along its core with the shield keeping interference out, and screw or twist connectors at each end join it to the equipment.",
    whereUsed:
      "In Dubai and the UAE this cable still serves analogue camera systems in shops, warehouses and residential blocks, carrying pictures from wall and ceiling cameras to recorders and monitors in the back room or guard desk, alongside basic video and aerial-style feeds.",
    howWeHelp:
      "Artek Computers LLC supplies RG59 cable in Dubai and the UAE. Tell us the camera count, the lengths needed and the site details, and we will reply with a clear quote.",
    faqs: [
      {
        question: "How do I get a quote for RG59 Cable?",
        answer:
          "Call the office or send an enquiry with the quantity and your site details. We will reply with pricing.",
      },
      {
        question: "Which RG59 cable should I choose?",
        answer:
          "Tell us the equipment it connects, the lengths and the site. Our team will guide you to a suitable pick.",
      },
    ],
  },
  "rg6-cable": {
    whatIs:
      "RG6 is a coaxial cable built for TV and satellite distribution. A centre conductor, dielectric and outer shielding carry radio-frequency signals from aerials, dishes and head-ends to receivers, feeding channels to set-top boxes, tuners and distribution equipment along building cable networks.",
    whereUsed:
      "This cable runs in villas, hotels and apartment buildings across the UAE, from rooftop dishes and antennas down risers to floor outlets behind televisions. It also links satellite heads to splitters and amplifiers in shared aerial systems serving many units at once.",
    howWeHelp:
      "Artek Computers LLC supplies RG6 cable in Dubai and the UAE. Tell us the outlets you are feeding, the total length and the site details, and we will come back with a clear quote.",
    faqs: [
      {
        question: "How do I get a quote for RG6 Cable?",
        answer:
          "Submit an enquiry or call our team with the quantity and your site details, and we will send you a quote.",
      },
      {
        question: "Which RG6 cable should I choose?",
        answer:
          "Describe the site, the distances and the equipment it connects. Our team will help you choose a suitable cable.",
      },
    ],
  },
  "speaker-cable": {
    whatIs:
      "Speaker cable carries the output of an amplifier to the loudspeakers connected to it. Just conductors and insulation, its job is to pass audio power along the run so drivers in ceiling, wall and cabinet speakers can reproduce the sound sent to them.",
    whereUsed:
      "This wiring feeds sound systems throughout Dubai: ceiling speakers in offices, restaurants and clinics, wall units in corridors and prayer rooms, and floor-standing cabinets in halls and ballrooms, all looping back to amplifiers in a rack or plant cupboard or behind the stage.",
    howWeHelp:
      "Artek Computers LLC supplies speaker cable in Dubai and the UAE. Tell us the number of speakers, the lengths and the site details, and we will reply with a clear quote.",
    faqs: [
      {
        question: "How do I get a quote for Speaker Cable?",
        answer:
          "Send an enquiry or give our office a call with the quantity and your site details. We will quote for the supply.",
      },
      {
        question: "Which speaker cable should I choose?",
        answer:
          "Tell us the amplifiers and speakers involved, the run lengths and the room. Our team will help you choose.",
      },
    ],
  },
  "desktops": {
    plural: true,
    whatIs:
      "Desktops are the tower-and-screen computers that sit on or under a desk as a fixed workstation. The separate box holds the working parts while the screen, keyboard and mouse attach outside, giving offices a settled machine for everyday work that stays where it is put.",
    whereUsed:
      "These machines run at desks in every kind of UAE workplace: open-plan offices, reception counters, accounts departments, design studios and school computer rooms. Staff use them for documents, email, business applications and shared files, with each machine assigned to one desk.",
    howWeHelp:
      "Artek Computers LLC supplies desktop computers in Dubai and the UAE. Tell us how many workstations you need, the work they will do and the site details, and we will reply with a clear quote.",
    faqs: [
      {
        question: "How do I get a quote for Desktops?",
        answer:
          "Send an enquiry or call our office. Tell us the quantity and your requirements, and we will send you a quote.",
      },
      {
        question: "Which desktop computer should I choose?",
        answer:
          "Tell us how and where it will be used, and the software it runs. Our team will help you choose.",
      },
    ],
  },
  "gaming-pc": {
    whatIs:
      "A gaming PC is a desktop computer put together with demanding games and graphics-heavy work in mind. The same build also suits design, editing and rendering tasks, so many buyers use one machine for evening games and daytime creative work alike.",
    whereUsed:
      "These machines sit in homes and dorms across Dubai and in studios doing content work. Owners run modern games after hours, stream to an audience, or edit video and renders during the day — one box doing duty as both entertainment and a working tool.",
    howWeHelp:
      "Artek Computers LLC supplies gaming PCs in Dubai and the UAE. Tell us the quantity, the games or software you run and the site details, and we will reply with a clear quote.",
    faqs: [
      {
        question: "How do I get a quote for Gaming PC?",
        answer:
          "Write to us by enquiry or call the office. Share the quantity and your requirements, and we will quote.",
      },
      {
        question: "Which gaming PC should I choose?",
        answer:
          "Tell us how you will use it — the games, the streaming, the creative work. Our team will help you pick.",
      },
    ],
  },
  "laptops": {
    plural: true,
    whatIs:
      "Laptops are the portable computers that fold screen to keyboard and travel in a bag. Everything a workstation needs is packed into the one unit, so staff can carry their machine between office, home and site, working wherever the day takes them.",
    whereUsed:
      "They ride in bags across Dubai and beyond: to meeting rooms and client sites, on flights, to home offices and hot desks. Companies issue them to field and remote staff, sales teams carry them on visits, and they suit anyone whose work moves with them.",
    howWeHelp:
      "Artek Computers LLC supplies laptops in Dubai and the UAE. Tell us how many you need, who will use them and for what, and we will reply with a clear quote.",
    faqs: [
      {
        question: "How do I get a quote for Laptops?",
        answer:
          "Enquire online or by phone. Let us know the quantity and your requirements, and we will get back to you with a quote.",
      },
      {
        question: "Which laptop should I choose?",
        answer:
          "Tell us how and where it will be used — desk, travel or home. Our team will help you choose.",
      },
    ],
  },
  "mouse": {
    whatIs:
      "A mouse is the hand-held pointer that sits beside a keyboard and moves the cursor on screen. Rolling it across the pad shifts the pointer; its buttons select, open and drag; and the wheel scrolls through pages — the everyday tool for steering desktop work.",
    whereUsed:
      "Mice sit at every workstation in UAE offices, from open-plan desks to reception and trading rooms. Staff pair them with docked laptops too, and home offices keep one spare; they also serve point-of-sale stations in shops and front desks in clinics.",
    howWeHelp:
      "Artek Computers LLC supplies computer mice in Dubai and the UAE. Tell us the quantity, how they will be used and the site details, and we will reply with a clear quote.",
    faqs: [
      {
        question: "How do I get a quote for Mouse?",
        answer:
          "Send us an enquiry or call with the quantity and your requirements. We will come back with a quote.",
      },
      {
        question: "Which mouse should I choose?",
        answer:
          "Tell us how and where it will be used — desk work, travel or presentations. Our team will suggest a fitting option.",
      },
    ],
  },
  "keyboard": {
    whatIs:
      "A keyboard is the typing device that turns presses of its key rows into text and commands on the computer. Letters, numbers and function keys sit in the familiar layout, letting staff write emails, fill forms and drive the software that runs their work.",
    whereUsed:
      "Keyboards sit in front of every screen in Dubai offices, at reception desks, in server nooks and at home workstations. They pair with desktops and docked laptops alike, and spare units wait in IT cupboards for quick swaps when a desk's typing fails.",
    howWeHelp:
      "Artek Computers LLC supplies keyboards in Dubai and the UAE. Tell us the quantity, the kind of desks they serve and the site details, and we will reply with a clear quote.",
    faqs: [
      {
        question: "How do I get a quote for Keyboard?",
        answer:
          "Reach us by enquiry form or phone call with the quantity and your requirements, and we will quote.",
      },
      {
        question: "Which keyboard should I choose?",
        answer:
          "Tell us how and where it will be used, and by whom. Our team will help you choose a suitable keyboard.",
      },
    ],
  },
  "webcam": {
    whatIs:
      "A webcam is a small camera that clips to a monitor or stands on the desk and feeds live pictures to the computer. Calls, recorded clips and online meetings all draw on it, with its built-in microphone often carrying the voice alongside the video.",
    whereUsed:
      "Webcams perch on monitors at desks and meeting-room screens across Dubai now that remote meetings are part of ordinary work. They serve home offices, reception points, training rooms and interview desks, joining whoever sits in front of them to the call.",
    howWeHelp:
      "Artek Computers LLC supplies webcams in Dubai and the UAE. Tell us the quantity, the desks or rooms they serve and the site details, and we will reply with a clear quote.",
    faqs: [
      {
        question: "How do I get a quote for Webcam?",
        answer:
          "Send an enquiry or call the office. Tell us the quantity and your requirements, and we will send a quote.",
      },
      {
        question: "Which webcam should I choose?",
        answer:
          "Tell us where it will be used — one desk or a meeting room. Our team will help you pick.",
      },
    ],
  },
  "conference-webcam": {
    whatIs:
      "A conference webcam is the camera a meeting room uses so far-end participants can see everyone seated around the table. It mounts above or below the shared screen, faces the whole room, and sends its picture to the meeting platform running on the room system.",
    whereUsed:
      "These cameras hang in the meeting rooms and boardrooms of Dubai offices, in training rooms and huddle spaces, and in clinics consulting remotely. Any room where several people must appear on one call at once puts one at the screen.",
    howWeHelp:
      "Artek Computers LLC supplies conference webcams in Dubai and the UAE. Tell us the room size they will serve, the quantity and the site details, and we will reply with a clear quote.",
    faqs: [
      {
        question: "How do I get a quote for Conference Webcam?",
        answer:
          "Submit an enquiry or call our team. Tell us the quantity and your requirements, and we will send pricing.",
      },
      {
        question: "Which conference webcam should I choose?",
        answer:
          "Tell us the room it will serve and how meetings run there. Our team will suggest a suitable camera.",
      },
    ],
  },
  "printer": {
    whatIs:
      "A printer turns files on the computer into paper at the desk or in the office print corner. Documents, invoices, reports and labels come out on demand, with most office machines also copying and scanning, making one device the paper hub of the floor.",
    whereUsed:
      "Printers sit in Dubai offices beside desks and in shared print areas, at clinic receptions printing patient material, in shops issuing receipts and in schools preparing handouts. Workgroups share one machine; managers keep another close; some desks have their own.",
    howWeHelp:
      "Artek Computers LLC supplies printers in Dubai and the UAE. Tell us the quantity, the printing your team does and the site details, and we will reply with a clear quote.",
    faqs: [
      {
        question: "How do I get a quote for Printer?",
        answer:
          "Call us or send an enquiry. Let us know the quantity and your requirements, and we will reply with a quote.",
      },
      {
        question: "Which printer should I choose?",
        answer:
          "Tell us how and where it will be used, and what gets printed. Our team will help you choose.",
      },
    ],
  },
  "ip-camera": {
    whatIs:
      "An IP camera is a surveillance camera that connects over the computer network rather than by a dedicated video cable. Once on the LAN it sends its picture to a recorder or viewing software, and it becomes another addressable device the security team can reach from anywhere on site.",
    whereUsed:
      "These cameras watch entrances and lobbies, corridors and stairwells, car parks, yards, shop floors and warehouses across Dubai and the UAE. They hang from ceilings or mount on walls and poles, each one reporting back over the network to the recorder.",
    howWeHelp:
      "Artek Computers LLC supplies IP cameras in Dubai and the UAE. Tell us the areas you want covered, the quantity and the site details, and we will reply with a clear quote.",
    faqs: [
      {
        question: "How do I get a quote for IP Camera?",
        answer:
          "Send an enquiry or call with the quantity and your requirements. We will come back with a quote.",
      },
      {
        question: "Which IP camera should I choose?",
        answer:
          "Tell us where each camera will sit and what it must watch. Our team will help you choose.",
      },
    ],
  },
  "dome-camera": {
    whatIs:
      "A dome camera is a surveillance camera housed in a small rounded ceiling bubble. The covering hides which way the lens points, the low shape tucks close to the ceiling, and it connects over the network to a recorder or viewing software.",
    whereUsed:
      "Domes sit above reception desks and shop doorways, in hotel lobbies and clinic waiting areas, along office corridors and above supermarket aisles across the UAE — anywhere indoors where a camera should blend in rather than stand out on a bracket.",
    howWeHelp:
      "Artek Computers LLC supplies dome cameras in Dubai and the UAE. Tell us the indoor areas to cover, the quantity and the site details, and we will reply with a clear quote.",
    faqs: [
      {
        question: "How do I get a quote for Dome Camera?",
        answer:
          "Use the enquiry form or call our office with the quantity and your requirements, and we will share a quote.",
      },
      {
        question: "Which dome camera should I choose?",
        answer:
          "Tell us the room or corridor it will watch and the ceiling it mounts on. Our team will help you choose.",
      },
    ],
  },
  "bullet-camera": {
    whatIs:
      "A bullet camera is a surveillance camera shaped like a slim cylinder on a mounting arm, clearly visible once fitted. That presence is part of its job at doors and boundaries, and it links back over the network to the recorder or viewing software.",
    whereUsed:
      "Bullet cameras guard building entrances and exits, perimeter walls and fences, car park lanes, loading bays and site gates across Dubai and the UAE. The wall or pole bracket aims them along the approach they watch, out in the open where people pass.",
    howWeHelp:
      "Artek Computers LLC supplies bullet cameras in Dubai and the UAE. Tell us the outdoor points to cover, the quantity and the site details, and we will reply with a clear quote.",
    faqs: [
      {
        question: "How do I get a quote for Bullet Camera?",
        answer:
          "Send us an enquiry or call the office with the quantity and your requirements. We will reply with a quote.",
      },
      {
        question: "Which bullet camera should I choose?",
        answer:
          "Tell us where it will hang and what approach it must watch. Our team will help you pick.",
      },
    ],
  },
  "ptz-camera": {
    whatIs:
      "A PTZ camera is a surveillance camera an operator can steer: pan across a scene, tilt up and down, and zoom in on points of interest — the letters of its name spell those three moves. It connects over the network like other cameras and can be driven live or set to follow preset tours.",
    whereUsed:
      "PTZ units watch wide, open ground: warehouse floors, stadium and yard areas, hotel forecourts, car parks and compound perimeters across the UAE. From a high mount they follow moving activity, steering to wherever it goes under an operator's hand or between saved positions.",
    howWeHelp:
      "Artek Computers LLC supplies PTZ cameras in Dubai and the UAE. Tell us the open areas they will watch, the quantity and the site details, and we will reply with a clear quote.",
    faqs: [
      {
        question: "How do I get a quote for PTZ Camera?",
        answer:
          "Enquire by form or phone. Tell us the quantity and your requirements, and we will get back to you with a quote.",
      },
      {
        question: "Which PTZ camera should I choose?",
        answer:
          "Tell us the area it will watch and how it will be operated. Our team will help you choose.",
      },
    ],
  },
};
