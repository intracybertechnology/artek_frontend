import type { Service } from "@/types";

/**
 * All solution content lives here. Adding a service = adding an entry.
 * `context: "core"` entries appear on the homepage grid and main listings;
 * `context: "seo"` entries are additional SEO landing pages (e.g. CCTV
 * keyword pages) built from the same template.
 *
 * Images: the URLs below are the client-supplied originals. Before
 * production, optimize AVIF/WebP derivatives into /public/images/services/
 * and point `image` at the local optimized file.
 */

export const services: readonly Service[] = [
  {
    id: "microsoft",
    slug: "microsoft-solutions-uae",
    title: "Microsoft Solutions",
    name: "Microsoft Solutions",
    shortDescription:
      "Microsoft 365, Azure cloud, Teams deployment, and enterprise licensing for businesses across the UAE.",
    image: "/images/services/microsoft.jpg",
    imageAlt: "IT consultant deploying Microsoft 365 and Azure solutions for a UAE business",
    icon: "cloud",
    context: "core",
    seoTargetPhrase: "Microsoft Solutions Provider UAE",
    seo: {
      title: "Microsoft Solutions Provider in UAE | Microsoft 365 & Azure | ARTEK",
      description:
        "ARTEK helps UAE businesses adopt Microsoft 365, Azure cloud, Teams and enterprise licensing — deployed, migrated and supported by one local team.",
      ogType: "website",
    },
    h1: "Microsoft Solutions for UAE Businesses",
    sections: [
      {
        heading: "Microsoft Solutions in Dubai for Every Business Need",
        intro: [
          "Artek Computers LLC is a leading Microsoft solutions provider in Dubai, delivering comprehensive Microsoft 365, Azure cloud, and enterprise software services tailored for UAE businesses.  As an authorized Microsoft partner, we provide genuine licenses, expert implementation, and ongoing support.",
          "Whether you’re a startup looking for cost-effective licensing, a growing business needing scalable solutions, or an enterprise requiring advanced deployment strategies, our experienced team guides you through every phase—from licensing consultation to deployment and beyond.",
        ],
        items: [
          {
            title: "Cost-Efficiency",
            description:
              "OEM licenses provide significant savings compared to retail versions, making them ideal for businesses deploying multiple new systems simultaneously.",
          },
          {
            title: "Ready-to-Use Pre-Installation",
            description:
              "We pre-install and configure Microsoft software on your new hardware, ensuring your devices are operational from day one with zero downtime.",
          },
          {
            title: "Compliance and Support",
            description:
              "All OEM licenses are genuine Microsoft products that adhere strictly to licensing terms. We ensure full compliance and provide complete documentation.",
          },
          {
            title: "Hardware Integration",
            description:
              "Seamlessly integrated with new hardware purchases, ensuring optimal compatibility and performance from the moment you power on your systems.",
          },
          {
            title: "Flexibility and Scalability",
            description:
              "Businesses seeking flexibility, scalability, and access to the latest Microsoft technologies benefit from our Open License Program (OLP) services, including Volume Licensing options.",
          },
          {
            title: "Volume Discounts",
            description:
              "Acquire multiple licenses at discounted rates. The more licenses you purchase, the greater your savings—ideal for medium to large organizations.",
          },
          {
            title: "Software Assurance Benefits",
            description:
              "Optional Software Assurance provides access to latest version upgrades at no additional cost, training vouchers and technical resources, 24/7 support from Microsoft, and deployment planning services.",
          },
          {
            title: "Simplified Management",
            description:
              "Manage all your Microsoft software under a single agreement with centralized license tracking, making audits and compliance straightforward.",
          },
        ],
      },
      {
        intro: [
          "Your trusted Microsoft Solutions provider in Dubai with 15+ years of experience.",
          "If you’re looking for unmatched computer systems expertise, choose Artek Computers",
        ],
        items: [
          {
            title: "Authorized Partner",
            description:
              "As an authorized Microsoft partner, we have the expertise and authorization to provide genuine Microsoft software and support.",
          },
          {
            title: "Expert Guidance",
            description:
              "Our knowledgeable team helps you navigate through the complexities of Microsoft licensing, ensuring you get the best solution for your business needs.",
          },
          {
            title: "End-to-End Support",
            description:
              "We provide comprehensive services to guarantee the effective implementation and maintenance of your Microsoft solutions, from initial consultation and licensing to deployment and ongoing support.",
          },
        ],
        outro: [
          "Equip your business with the best Microsoft solutions available. Contact Artek Computers LLC today to discuss your licensing needs and discover how we can help you optimize your software investments.",
        ],
      },
    ],
    overview:
      "ARTEK plans, deploys and supports Microsoft technologies for businesses across the UAE — from Microsoft 365 tenancy setup and Teams rollout to Azure cloud workloads and enterprise licensing. We handle assessment, migration, configuration and ongoing management so your staff get a secure, modern working environment without disruption.",
    benefits: [
      "One partner for licensing, deployment and support — no fragmented vendors",
      "Migration from on-premise mail and file servers to Microsoft 365 without downtime",
      "Team collaboration with Microsoft Teams, SharePoint and OneDrive",
      "Licensing plans matched to how your business actually works",
    ],
    features: [
      {
        title: "Microsoft 365 Deployment",
        description:
          "Tenant setup, Exchange Online migration, mailbox configuration and user onboarding for companies of every size.",
      },
      {
        title: "Azure Cloud Services",
        description:
          "Cloud storage, virtual machines and identity management configured to complement your existing infrastructure.",
      },
      {
        title: "Microsoft Teams Rollout",
        description:
          "Teams deployment for chat, meetings and calling, including hardware selection and user training.",
      },
      {
        title: "Enterprise Licensing",
        description:
          "Microsoft licensing consultation and procurement so you pay for what you use at the right tier.",
      },
    ],
    faqs: [
      {
        question: "Can you migrate our existing email to Microsoft 365?",
        answer:
          "Yes. We assess your current mail environment, plan the migration in stages and move mailboxes to Exchange Online with minimal disruption, then configure Teams, SharePoint and OneDrive on top.",
      },
      {
        question: "Do you supply Microsoft 365 licenses?",
        answer:
          "Yes. We advise on the right Microsoft 365 plan mix for your users and handle procurement, so licensing and support come from a single provider.",
      },
    ],
    related: ["computer-systems", "network", "cybersecurity"],
  },
  {
    id: "computer-systems",
    slug: "computer-systems-dubai",
    title: "Computer Systems",
    name: "Computer Systems & Hardware",
    shortDescription:
      "Desktops, laptops, servers, and enterprise hardware — supplied, configured, and supported by our team.",
    image: "/images/services/computer-systems.jpg",
    imageAlt: "Desktop computers, laptops and servers supplied by ARTEK Computers in Dubai",
    icon: "monitor",
    context: "core",
    seoTargetPhrase: "Computer Suppliers Dubai",
    seo: {
      title: "Computer Suppliers in Dubai | Desktops, Laptops & Servers | ARTEK",
      description:
        "A trusted computer supplier in Dubai for desktops, laptops, workstations and servers — supplied, configured and supported for residential, commercial and corporate customers.",
      ogType: "website",
    },
    h1: "Computer Suppliers in Dubai",
    stats: [
      { value: "500+", label: "Systems Maintained" },
      { value: "20+", label: "Years Experience" },
      { value: "99.9%", label: "Uptime Guaranteed" },
      { value: "24/7", label: "Support Available" },
    ],
    sections: [
      {
        heading: "Transform Your Business Infrastructure with Enterprise-Grade Computer Systems",
        intro: [
          "Artek Computers LLC specializes in delivering end-to-end IT solutions—from high-performance workstations and enterprise computer systems  servers to custom-configured systems tailored to your industry. We don’t just supply hardware; we build scalable, secure, and future-ready infrastructures that drive business growth across the UAE.",
        ],
      },
      {
        stats: [
          { value: "500+", label: "Businesses Served" },
          { value: "99.8%", label: "System Uptime" },
          { value: "24/7", label: "Technical Support" },
          { value: "15+", label: "Years of experience" },
        ],
      },
      {
        heading: "Enterprise Computer Systems: Hardware & Software Excellence for UAE Businesses",
        intro: [
          "We design our offerings to ensure your operations run smoothly, efficiently, and securely. From individual workstations to complete data center solutions, we deliver technology that works as hard as you do.",
        ],
      },
      {
        heading: "Enterprise-Grade Computer Systems Tailored to Your Business Needs",
        intro: [
          "From global leaders like HP, Dell, Lenovo, and ASUS, we provide comprehensive hardware solutions that power businesses of all sizes:",
        ],
        items: [
          {
            title: "Workstations & Desktops",
            bullets: [
              "High-performance business desktops for office productivity",
              "Professional workstations for CAD, design, and engineering applications",
              "All-in-one systems for space-efficient deployments",
              "Thin clients for virtualized environments",
            ],
          },
          {
            title: "Servers & Infrastructure",
            bullets: [
              "Rack-mounted, tower, and blade server configurations",
              "Storage solutions (NAS, SAN, DAS)",
              "Backup and disaster recovery systems",
              "Virtualization-ready platforms",
            ],
          },
          {
            title: "Mobile Computing",
            bullets: [
              "Business laptops with enterprise security features",
              "Mobile workstations for professionals on the go",
              "Tablets and 2-in-1 devices",
              "Rugged devices for field operations",
            ],
          },
          {
            title: "Peripherals & Components",
            bullets: [
              "Professional-grade monitors (up to 8K resolution)",
              "Keyboards, mice, and input devices",
              "Docking stations and port replicators",
              "UPS systems and power management",
              "Memory, storage upgrades, and components",
            ],
          },
        ],
      },
      {
        heading: "Computer Systems : Hardware & Software",
        intro: [
          "We design our offerings to make sure your operations run smoothly and efficiently.",
        ],
        items: [
          {
            title: "Hardware Solutions",
            description:
              "Our portfolio includes high performance desktops, laptops, servers, and peripherals, all targeted to meet your organizational needs.",
          },
          {
            title: "Software Solutions",
            description:
              "We provide cutting-edge software applications, from operating systems to productivity tools and specialized programs, that elevate your operational capabilities.",
          },
          {
            title: "Custom Configurations",
            description:
              "We tailor hardware and software setups designed explicitly around your peculiar needs and budget constraints.",
          },
        ],
      },
      {
        heading: "Why Choose Our Enterprise Computer Systems in UAE?",
        intro: ["If you’re looking for unmatched computer systems expertise, choose Artek Computers"],
        items: [
          {
            title: "Expertise and Experience",
            description:
              "Our team—seasoned in crafting perspicacious IT solutions tailors cutting-edge strategies to meet business-specific requirements without fail; they wield vast expertise and extensive experience.",
          },
          {
            title: "Quality Products",
            description:
              "We partner exclusively with well respected manufacturers, ensuring our products never falter in quality or dependability.",
          },
          {
            title: "Customized Solutions",
            description:
              "If personalized solutions capture your imagination, look no further! Together, we explore business objectives and find the perfect aligning technology solutions for you.",
          },
          {
            title: "Comprehensive Support",
            description:
              "We wrap every solution we craft with comprehensive support, from the initial consultation to procurement, installation, and ongoing support, ensuring long lasting success.",
          },
        ],
        outro: [
          "Artek Computers LLC is here to help you prepare your business with top-notch computers and services. Reach out now—to discuss how we can empower your IT infrastructure into something extraordinarily robust (and) invariably efficient.",
        ],
      },
    ],
    overview:
      "As computer suppliers based in Dubai, ARTEK sources, builds and configures complete hardware environments: office desktops and laptops, workstations, and servers for business-critical workloads. Every system we supply can be imaged, configured and deployed by our own engineers, then backed by our support team.",
    benefits: [
      "Hardware recommendations based on your workload, not on showroom stock",
      "Systems delivered configured and ready for users",
      "Competitive Dubai pricing with transparent quotations",
      "Local warranty and repair support from the same team that supplied you",
    ],
    features: [
      {
        title: "Desktops & Laptops",
        description:
          "Business-grade computing for offices, retail counters and home offices, specified to your budget.",
      },
      {
        title: "Servers & Storage",
        description:
          "File, application and virtualization servers with suitable RAID and backup configuration.",
      },
      {
        title: "Workstations",
        description:
          "High-performance systems for design, engineering and media workloads.",
      },
      {
        title: "Repairs & Upgrades",
        description:
          "Diagnostics, component replacement, RAM and storage upgrades performed by our technicians.",
      },
    ],
    faqs: [
      {
        question: "Do you supply bulk computer orders for offices?",
        answer:
          "Yes. We supply and configure bulk desktop and laptop orders for offices across Dubai and the wider UAE, including staging, asset tagging and installation.",
      },
      {
        question: "Do you repair computers as well as supply them?",
        answer:
          "Yes. Our technicians handle diagnostics, component replacement and upgrades for the systems we supply and most major brands you may already own.",
      },
    ],
    related: ["it-services", "network", "server-relocation"],
  },
  {
    id: "network",
    slug: "network-solutions-dubai",
    title: "Network Solutions",
    name: "Network Solutions",
    shortDescription:
      "Structured cabling, Wi-Fi, switching, and firewall setup for offices, warehouses, and commercial buildings.",
    image: "/images/services/network.jpg",
    imageAlt: "Network engineer installing structured cabling and networking equipment in Dubai",
    icon: "network",
    context: "core",
    seoTargetPhrase: "Network Solutions Dubai",
    seo: {
      title: "Network Solutions in Dubai | Structured Cabling, Wi-Fi & Firewalls | ARTEK",
      description:
        "Network solutions in Dubai: structured cabling, Wi-Fi, switching and firewall setup for offices, warehouses and commercial buildings — designed and installed by ARTEK.",
      ogType: "website",
    },
    h1: "Network Solutions in Dubai",
    sections: [
      {
        heading: "Build a Robust Network Infrastructure for Your Business",
        intro: [
          "Enterprise-grade networking solutions designed for reliability, security, and scalability",
        ],
      },
      {
        heading: "Comprehensive Network Solutions",
        intro: [
          "Artek Computers LLC is one of the leading computer networking companies in Dubai, delivering enterprise-grade network infrastructure, structured cabling, and connectivity solutions for businesses across the UAE. Our experienced team tailors each service to match your unique network needs, from design and installation to ongoing maintenance and support.",
        ],
        items: [
          {
            title: "Network Design and Implementation",
            description:
              "We undertake the complete design and implementation of local (LAN) and wide-area (WAN) networks that cater to your business needs.",
          },
          {
            title: "Switches And Routers",
            description:
              "We install and configure reliable switches and routers to ensure a consistent and efficient data flow.",
          },
          {
            title: "Network Security",
            description:
              "We enforce advanced security protocols to shield your network against any threats or unauthorized access.",
          },
        ],
      },
      {
        heading: "Structured Cabling Solutions",
        intro: [
          "A robust and future-ready cabling infrastructure is essential for reliable network performance in today’s digital landscape. Here’s what we provide in structured cabling:",
        ],
        items: [
          {
            title: "Design and Installation",
            description:
              "We design and deploy advanced structured cabling systems supporting Cat6A, Cat7, Cat8, and fiber optic (OM3/OM4/OM5) infrastructure, ensuring seamless connectivity for high-speed 10G, 40G, and 100G networks that meet your current and future business demands.",
          },
          {
            title: "Certification and Testing",
            description:
              "Every installation undergoes rigorous testing and certification to comply with international standards including TIA/EIA-568, ISO/IEC 11801, and BICSI guidelines, guaranteeing optimal performance, minimal downtime, and long-term reliability.",
          },
        ],
      },
      {
        heading: "Integrated Security and Communication Services",
        items: [
          { title: "Surveillance Systems", description: "Top-of-the-line CCTV cameras and monitoring systems ensure maximum safety and security on your premises." },
          { title: "Access Control Systems", description: "Advanced solutions such as biometric scanners, keycard systems, and electronic locks help manage and monitor access efficiently." },
          { title: "Integrated Security Solutions", description: "We offer inclusive security setups that combine surveillance with access control and alarm systems, ensuring comprehensive protection." },
          { title: "24/7 Monitoring", description: "Continuous oversight identifies and mitigates issues before they affect operations." },
          { title: "Automated Alerts", description: "You receive instant alerts on anomalies, allowing speedy issue resolution." },
          { title: "Performance Reporting", description: "Regular updates keep you informed on network health, allowing better IT decisions." },
          { title: "Voice and Data Integration", description: "Streamlined voice and data communication systems help cut costs and boost efficiency." },
          { title: "VoIP Solutions", description: "To improve communication capabilities and reduce telephony expenses, companies implement VoIP systems." },
          { title: "Telecom Infrastructure", description: "A comprehensive infrastructure setup supports all communication requirements." },
        ],
      },
      {
        heading: "Intelligent Cabling Solutions",
        intro: ["Take advantage of our intelligent cabling systems to ensure future readiness."],
        items: [
          {
            title: "Smart Cabling Solutions",
            description: "Advanced cables support rapid data transfer and adjustability with technological advancements.",
          },
          {
            title: "Integrated Systems",
            description: "Seamless integration with existing IT setups improves operations.",
          },
          {
            title: "Scalability",
            description: "Our adaptable cabling designs promise growth compatibility, securing long term investments.",
          },
        ],
      },
      {
        heading: "Why Choose Artek Among Computer Networking Companies in Dubai?",
        intro: [
          "As one of the most trusted computer networking companies in Dubai, we elevate your business connectivity with top-tier network solutions tailored just for you.",
        ],
      },
    ],
    overview:
      "ARTEK designs and installs business network infrastructure across Dubai: structured cabling, wireless coverage, switching and perimeter security. From small offices needing a clean cabling job to multi-floor buildings and warehouses requiring engineered Wi-Fi coverage, we plan the topology, install the hardware and document the result.",
    benefits: [
      "Structured cabling installed neatly, labelled and tested",
      "Wi-Fi designed from an actual coverage plan, not guesswork",
      "Network security firewalls configured and maintained",
      "Scalable design that grows with your office or facility",
    ],
    features: [
      {
        title: "Structured Cabling",
        description:
          "Cat6/Cat6A cabling, patch panels and racks installed to a tested, labelled standard.",
      },
      {
        title: "Business Wi-Fi",
        description:
          "Access point placement, mesh and controller-based systems for reliable whole-site coverage.",
      },
      {
        title: "Switching & Routing",
        description:
          "Managed switches, VLAN segmentation and routing for secure, organised traffic flow.",
      },
      {
        title: "Firewall Setup",
        description:
          "Perimeter firewall installation, policy configuration and ongoing rule management.",
      },
    ],
    faqs: [
      {
        question: "Do you install network cabling for existing offices?",
        answer:
          "Yes. We install and re-terminate structured cabling in occupied offices, working around your schedule to limit disruption to the business.",
      },
      {
        question: "Can you fix slow or patchy office Wi-Fi?",
        answer:
          "Yes. We survey your site, identify coverage and configuration problems, and install properly placed access points to resolve dead zones and congestion.",
      },
    ],
    related: ["cctv", "it-services", "voice-telephony"],
  },
  {
    id: "voice-telephony",
    slug: "voice-telephony-dubai",
    title: "Voice & Telephony Solutions",
    name: "Voice & Telephony Solutions",
    shortDescription:
      "Business communication systems, IP telephony, VoIP solutions, telephone systems, and communication infrastructure.",
    image: "/images/services/voice-telephony.jpg",
    imageAlt: "Business IP telephony and VoIP phone system installed for a Dubai office",
    icon: "phone",
    context: "core",
    seoTargetPhrase: "Business Telephone Systems Dubai",
    seo: {
      title: "Business Telephone Systems in Dubai | IP & VoIP | ARTEK Computers",
      description:
        "Business telephone systems in Dubai: IP telephony, VoIP solutions and communication infrastructure supplied, installed and supported by ARTEK Computers LLC.",
      ogType: "website",
    },
    h1: "Business Telephone Systems in Dubai",
    stats: [
      { value: "500+", label: "Systems Maintained" },
      { value: "20+", label: "Years Experience" },
      { value: "99.9%", label: "Uptime Guaranteed" },
      { value: "24/7", label: "Support Available" },
    ],
    sections: [
      {
        heading: "Voice & Telephony Solutions Dubai",
        intro: [
          "Transform your business communications with cutting-edge VoIP systems, unified communications, and contact center solutions from Artek Computers LLC",
        ],
      },
      {
        heading: "Voice & Telephony Solutions",
        intro: [
          "Looking for professional voice telephony solutions in Dubai? At Artek Computers LLC, we provide cutting-edge voice telephony solutions that transform business communications. Our reliable VoIP systems, unified communications, and contact center solutions empower your team, delight your customers, and scale with your growth across the UAE.",
        ],
      },
      {
        heading: "Communication & Contact Center Solutions",
        intro: [
          "Transform your business communications with our comprehensive telephony and contact center solutions",
        ],
        items: [
          {
            title: "VoIP Systems",
            description:
              "Use our Voice over IP (VoIP) systems for clear voice chats over the internet—they reduce costs and increase flexibility!",
          },
          {
            title: "Unified Communications",
            description:
              "Unifies all your tools—voice, video, yep, even instant messaging and email—into a single, slick platform. It’s all about making teamwork simple and increasing productivity.",
          },
          {
            title: "Scalable Solutions",
            description: "No worries about size here—small startup or huge company, our solutions grow with you, no growing pains here!",
          },
          {
            title: "Advanced Features",
            description:
              "Get cool extras like voicemail-to-email, auto-attendant, and call forwarding—yeah, these are going to streamline how you chat.",
          },
          {
            title: "Intelligent Call Routing",
            description:
              "Calls go right where they need to based on agent skills and who’s free; it means solving things faster for customers.",
          },
          {
            title: "Analytics and Reporting",
            description:
              "Peek into how things are rolling with advanced tools that track performance & spot trends so you can make smart moves.",
          },
          {
            title: "Integration with CRM",
            description:
              "Combine this with your Customer Relationship Management (CRM) system to get a real-time peek at customer information—all so personalized.",
          },
          {
            title: "Workforce Management",
            description:
              "Get scheduling down to an art form, predict busy times, plan out staff shifts perfectly, and check that everyone’s sticking to schedules.",
          },
        ],
        outro: [
          "Ready to kick up your communication gear? Swing by Artek Computers LLC for voice and telephony solutions that will not just meet but exceed your expectations. Drop us a line today! Let’s chat about pushing your business communication boundaries further & bumping up customer happiness levels sky high.",
        ],
      },
    ],
    overview:
      "ARTEK supplies, installs and supports business communication systems in Dubai — IP telephony, VoIP solutions and the underlying cabling that keeps them running. From compact office phone systems to multi-department setups with reception consoles, we design telephony around how your team communicates.",
    benefits: [
      "Modern IP phone systems without aging PBX hardware",
      "Extensions across offices, warehouses and remote desks",
      "Voicemail, transfer, IVR and call-routing configured for you",
      "Telephony and data cabling handled by the same team",
    ],
    features: [
      {
        title: "IP/PBX Phone Systems",
        description:
          "Business phone system supply and installation with extensions, voicemail and call routing.",
      },
      {
        title: "VoIP Deployment",
        description:
          "Voice-over-IP configuration over your LAN, including quality-of-service settings.",
      },
      {
        title: "Reception & IVR",
        description:
          "Auto-attendant, departments and hunt groups so every call reaches the right person.",
      },
      {
        title: "Telephony Cabling",
        description:
          "Voice cabling and patching integrated with your structured data cabling.",
      },
    ],
    faqs: [
      {
        question: "Can you replace our old PBX with a VoIP system?",
        answer:
          "Yes. We assess your existing lines and cabling, propose a suitable IP telephony system and migrate extensions so your business doesn't miss calls during the changeover.",
      },
      {
        question: "Do you support multi-branch telephony?",
        answer:
          "Yes. IP telephony lets us link extensions across multiple locations, using configuration appropriate to each site's connectivity.",
      },
    ],
    related: ["network", "computer-systems", "it-services"],
  },
  {
    id: "cloud-computing",
    slug: "cloud-computing-dubai",
    title: "Cloud Computing",
    name: "Cloud Computing Solutions",
    shortDescription:
      "Public, private and hybrid cloud infrastructure designed around your business objectives across the UAE.",
    image: "/images/services/cloud-computing.jpg",
    imageAlt: "Cloud computing infrastructure planning for a business in Dubai",
    icon: "cloud",
    context: "core",
    seoTargetPhrase: "Cloud Computing Dubai",
    seo: {
      title: "Cloud Computing in Dubai | Public, Private & Hybrid Cloud | ARTEK",
      description:
        "Cloud computing in Dubai from ARTEK Computers — public, private and hybrid cloud infrastructure designed, migrated and supported for businesses across the UAE.",
      ogType: "website",
    },
    h1: "Cloud Computing in Dubai",
    sections: [
      {
        heading: "Cloud Computing Dubai | Enterprise Cloud Solutions | Artek Computers",
        intro: [
          "Our cloud computing services integrate seamlessly with our IT infrastructure solutions and network solutions in Dubai",
          "Artek Computers delivers comprehensive cloud computing in Dubai, providing enterprise-grade cloud solutions designed to transform modern businesses across the UAE. Our cloud computing services in Dubai include public cloud infrastructure, private cloud environments, and hybrid cloud architectures. As a leading cloud computing provider in Dubai with over 15 years of experience, we deliver tailored cloud computing solutions that align with your business objectives and drive digital transformation.",
        ],
      },
      {
        heading: "Public Cloud Computing Solutions",
        intro: [
          "Harness the power of scalable, on-demand cloud infrastructure without the capital expense of physical hardware.",
        ],
        items: [
          {
            title: "Dynamic Scalability",
            description:
              "Automatically adjust computing resources to match fluctuating business demands, ensuring optimal performance during peak periods",
          },
          {
            title: "Cost Optimization",
            description:
              "Pay-as-you-go pricing model eliminates upfront infrastructure investments and reduces operational overhead",
          },
          {
            title: "Global Accessibility",
            description:
              "Access your applications and data from anywhere, enabling remote work and global collaboration",
          },
          {
            title: "Rapid Deployment",
            description: "Launch new services and applications in minutes rather than weeks",
          },
          {
            title: "Automatic Updates",
            description: "Benefit from the latest features and security patches without manual intervention",
          },
        ],
      },
      {
        heading: "Private Cloud Computing Infrastructure Dubai",
        intro: [
          "For organizations requiring maximum control and security, our private cloud solutions deliver dedicated infrastructure tailored to your exact specifications.",
        ],
        items: [
          {
            title: "Enhanced Security & Compliance",
            description: "Meet strict regulatory requirements with dedicated resources and customized security protocols",
          },
          {
            title: "Complete Customization",
            description: "Configure every aspect of your cloud environment to match specific business needs and performance requirements",
          },
          {
            title: "Predictable Performance",
            description: "Enjoy consistent, high-performance computing without resource contention from other users",
          },
          {
            title: "Data Sovereignty",
            description: "Maintain complete control over data location and governance",
          },
        ],
      },
      {
        heading: "Business Process Outsourcing Dubai",
        intro: [
          "Transform your operations with our comprehensive BPO services, powered by cutting-edge cloud technology to maximize efficiency and reduce costs.",
        ],
        items: [
          {
            title: "Process Optimization",
            description: "Leverage cloud-based automation and AI to streamline repetitive tasks and improve accuracy",
          },
          {
            title: "Significant Cost Reduction",
            description:
              "Reduce operational expenses by up to 40% through specialized expertise and cloud efficiencies",
          },
          {
            title: "Scalable Resources",
            description: "Quickly adjust service levels to match seasonal demands or business growth",
          },
          {
            title: "Focus on Core Business",
            description:
              "Free your internal teams to concentrate on strategic initiatives while we handle operational tasks",
          },
        ],
      },
      {
        heading: "Hybrid Cloud Computing Architecture Dubai",
        intro: [
          "Achieve the perfect balance between security, performance, and flexibility with our integrated hybrid cloud solutions that combine the best of public and private infrastructure.",
        ],
        items: [
          {
            title: "Flexible Workload Distribution",
            description:
              "Run sensitive applications on private infrastructure while leveraging public cloud for scalable workloads",
          },
          {
            title: "Cost-Effective Scalability",
            description:
              "Scale into public cloud during peak demand without over-provisioning private infrastructure",
          },
          {
            title: "Business Continuity",
            description: "Implement robust disaster recovery with cloud-based backup and failover capabilities",
          },
          {
            title: "Gradual Cloud Migration",
            description: "Transition to cloud at your own pace while maintaining critical on-premise systems",
          },
        ],
      },
      {
        heading: "Ready to Transform Your Dubai Business?",
        intro: [
          "Partner with Artek Computers LLC to design and implement a cloud strategy that drives innovation, reduces costs, and positions your business for future growth. Our certified cloud architects are ready to assess your needs and recommend the optimal solution.",
        ],
      },
    ],
    overview:
      "ARTEK provides enterprise cloud computing for businesses across the UAE, including public cloud infrastructure, private cloud environments and hybrid architectures. We integrate cloud services with your existing IT infrastructure and network, so you can scale, modernise and protect your business without a disruptive all-at-once move.",
    benefits: [
      "Scale computing resources up or down as demand changes",
      "Pay-as-you-go pricing instead of large upfront hardware spend",
      "Access applications and data securely from anywhere",
      "Gradual migration that keeps critical on-premise systems running",
    ],
    features: [
      {
        title: "Public Cloud",
        description:
          "On-demand, scalable cloud infrastructure with automatic updates and no physical hardware to buy or maintain.",
      },
      {
        title: "Private Cloud",
        description:
          "Dedicated cloud environments with customised security, compliance controls and predictable performance.",
      },
      {
        title: "Hybrid Cloud",
        description:
          "Sensitive workloads kept on private infrastructure while scalable workloads run in the public cloud, with cloud-based backup and failover.",
      },
      {
        title: "Cloud Migration & Strategy",
        description:
          "Cloud readiness assessment, migration planning and a roadmap that matches your budget and business goals.",
      },
    ],
    faqs: [
      {
        question: "Can we move to the cloud gradually?",
        answer:
          "Yes. A hybrid approach lets you migrate workloads in stages while critical systems stay on-premise until they are ready to move.",
      },
      {
        question: "Do you support private cloud as well as public cloud?",
        answer:
          "Yes. We design public, private and hybrid cloud environments and recommend the option that fits your security, compliance and performance requirements.",
      },
    ],
    related: ["microsoft", "network", "it-services"],
  },
  {
    id: "cctv",
    slug: "cctv-security-dubai",
    title: "CCTV & Security Systems",
    name: "CCTV & Security Systems",
    shortDescription:
      "CCTV installation, surveillance maintenance, and security system solutions for homes and businesses, designed with SIRA requirements in mind.",
    image: "/images/services/cctv.jpg",
    imageAlt: "Professional CCTV security camera installation in Dubai by ARTEK",
    icon: "cctv",
    context: "core",
    seoTargetPhrase: "SIRA CCTV Installation Dubai",
    seo: {
      title: "SIRA CCTV Installation in Dubai | Security Systems | ARTEK Computers",
      description:
        "CCTV installation in Dubai for homes and businesses — surveillance system design, installation and maintenance by ARTEK Computers LLC, with SIRA requirements considered.",
      ogType: "website",
    },
    h1: "CCTV Installation in Dubai",
    overview:
      "ARTEK designs, installs and maintains CCTV surveillance systems for homes, offices, retail, warehouses and industrial facilities across Dubai. From camera selection and viewfinder planning to recorder configuration and remote viewing on your phone, our engineers deliver complete security camera systems — and keep them running with planned maintenance.",
    benefits: [
      "Cameras positioned from a site survey, not a one-size-fits-all package",
      "Recording, storage and retention configured by the engineers who install it",
      "Remote viewing on mobile and desktop, set up and handed over properly",
      "Ongoing maintenance and AMC options for long-term operation",
    ],
    features: [
      {
        title: "CCTV System Design",
        description:
          "Camera planning from an on-site survey: coverage, blind spots, lighting conditions and field of view.",
      },
      {
        title: "Surveillance Cameras",
        description:
          "Supply and installation of suitable security cameras for indoor, outdoor and demanding environments.",
      },
      {
        title: "Recording & Storage",
        description:
          "NVR/DVR setup, storage sizing and retention configured to your requirements.",
      },
      {
        title: "Maintenance & Support",
        description:
          "Periodic servicing, firmware updates, storage checks and fault repair — optionally under an AMC.",
      },
    ],
    faqs: [
      {
        question: "What CCTV installation services does ARTEK provide?",
        answer:
          "Site survey and camera planning, supply of cameras and recorders, professional installation, cabling, configuration of recording and remote viewing, plus ongoing maintenance and AMC support.",
      },
      {
        question: "Do you install CCTV for homes as well as businesses?",
        answer:
          "Yes. We install surveillance systems for residential properties, offices, retail shops, warehouses and industrial facilities.",
      },
    ],
    related: ["network", "cybersecurity", "it-services"],
  },
  {
    id: "it-services",
    slug: "it-services-dubai",
    title: "IT Services",
    name: "IT Services & Managed Support",
    shortDescription:
      "Managed IT support, helpdesk, on-site maintenance, and annual maintenance contracts tailored to your business needs.",
    image: "/images/services/it-services.jpg",
    imageAlt: "ARTEK technician providing managed IT support to a business in Dubai",
    icon: "wrench",
    context: "core",
    seoTargetPhrase: "IT Support Company Dubai",
    seo: {
      title: "IT Support Company in Dubai | Managed IT Services | ARTEK",
      description:
        "IT support company in Dubai offering managed IT services, helpdesk, on-site maintenance and annual maintenance contracts (AMC) for businesses.",
      ogType: "website",
    },
    h1: "IT Support Company in Dubai",
    sections: [
      {
        heading: "IT Service Provider in Dubai | Artek Computers LLC",
        intro: [
          "In Dubai’s fast-paced digital economy, reliable IT infrastructure is essential for business success. Artek Computers LLC delivers comprehensive IT solutions that keep your business secure, efficient, and competitive. From startups to enterprises across the UAE, we provide the technology support and strategic guidance that drives growth and innovation.",
          "Our role as your technology partner is not only to solve issues, we also actively avoid them. Our staff of professionals offers end-to- end technology advice, infrastructure design, cloud migration, complete managed IT support, and strong cybersecurity. We customize every solution to fit your objectives, team, and sector since we know that Dubai companies have particular difficulties ranging from fast expansion to regulatory compliance.",
          "Select Artek Computers as your IT service provider in Dubai and you have a long-term partner dedicated to your success.",
        ],
      },
      {
        heading: "Why Choose Artek as Your IT Service Provider in Dubai?",
        intro: [
          "Dubai’s competitive business environment demands world-class IT infrastructure. Technology failures mean lost revenue, compromised security, and missed opportunities. Partnering with Artek Computers transforms IT from a potential risk into a strategic advantage.",
          "Our local expertise combined with international standards delivers IT solutions that protect your operations, ensure compliance with UAE regulations, and provide the competitive edge needed to thrive in the Middle East’s most dynamic market.",
        ],
        bullets: [
          "Maximum system uptime and reliability",
          "Enhanced cybersecurity protection",
          "Predictable IT costs with fixed monthly fees",
          "Access to certified IT specialists",
          "Scalable infrastructure that grows with your business",
          "Rapid issue resolution",
          "UAE regulatory compliance",
        ],
      },
      {
        heading: "Managed IT Services",
        intro: ["Complete IT infrastructure management freeing your team to focus on core business activities."],
        bullets: [
          "24/7 proactive system monitoring",
          "Preventive maintenance and updates",
          "Performance optimization",
          "Vendor and asset management",
          "Complete IT environment documentation",
        ],
      },
      {
        heading: "IT Support & Helpdesk",
        intro: ["Round-the-clock technical assistance when you need it most."],
        bullets: [
          "24/7/365 availability",
          "Multi-channel access (phone, email, chat, portal)",
          "Remote and on-site support across Dubai",
          "Average response: 15 minutes for critical issues",
          "Comprehensive ticket tracking",
        ],
      },
      {
        heading: "IT Consulting & Strategy",
        intro: ["Expert guidance aligning technology with business objectives."],
        bullets: [
          "IT strategy and roadmap development",
          "Digital transformation planning",
          "Technology assessments",
          "UAE compliance consulting",
          "Cloud readiness evaluation",
        ],
      },
      {
        heading: "Network Infrastructure",
        intro: ["Reliable, secure, high-performance network solutions."],
        bullets: [
          "Network design and implementation",
          "Secure WiFi deployment",
          "Firewall and VPN configuration",
          "SD-WAN solutions",
          "Network monitoring and optimization",
        ],
      },
      {
        heading: "Cloud Solutions",
        intro: ["Seamless cloud adoption for scalability and cost efficiency."],
        bullets: [
          "Cloud migration and strategy",
          "Microsoft 365 and Google Workspace deployment",
          "Cloud backup and recovery",
          "Multi-cloud management",
          "Cloud security implementation",
          "Cost optimization",
        ],
      },
      {
        heading: "Cybersecurity Services",
        intro: ["Comprehensive protection against evolving cyber threats."],
        bullets: [
          "Security assessments and audits",
          "Firewall and endpoint protection",
          "Email security and filtering",
          "Security awareness training",
          "24/7 threat monitoring",
          "Incident response",
        ],
      },
      {
        heading: "Data Backup & Disaster Recovery",
        intro: ["Bulletproof data protection and business continuity."],
        bullets: [
          "Automated encrypted backups",
          "On-site and cloud storage",
          "Rapid recovery procedures",
          "Ransomware protection",
          "Regular testing and validation",
          "Compliance-ready retention policies",
        ],
      },
      {
        heading: "Hardware & Software Procurement",
        intro: ["Streamlined technology purchasing with expert guidance."],
        bullets: [
          "Servers, workstations, and networking equipment",
          "Software licensing management",
          "Vendor coordination",
          "Warranty and support management",
          "Asset tracking",
        ],
      },
      {
        heading: "IT Service Provider in Dubai for Every Business Sector",
        intro: [
          "Being a reputable  IT service provider in Dubai, we are aware that no two businesses run the same manner. Every business sector has operational procedures, performance standards, and a unique set of compliance guidelines. Artek Computers thus offers customised IT solutions for many different industries.",
          "We gladly serve:",
        ],
        bullets: [
          "Real estate firms implementing cloud-based document management systems",
          "Doctors needing HIPAA-compliant data security",
          "Teachers seeking safe e-learning spaces",
          "Financial companies needing sophisticated remote access and advanced encryption",
          "Retail and hospitality companies with an eye toward inventory control and POS integration",
          "Logistics businesses seeking ERP systems and GPS tracking",
        ],
        outro: [
          "We are the preferred IT service provider in Dubai for companies of all kinds and shapes since we can fit particular business models.",
        ],
      },
      {
        heading: "Why is Artek Computers LLC a Premier Choice for IT Service Provider in Dubai?",
        items: [
          { title: "Local Expertise", description: "Deep understanding of Dubai’s business environment and UAE regulations" },
          { title: "Rapid Response", description: "Quick on-site support across Dubai and the UAE" },
          { title: "Certified Professionals", description: "Microsoft, Cisco, VMware, AWS certified engineers" },
          { title: "Proactive Approach", description: "Identify and resolve issues before they impact your business" },
          { title: "Customized Solutions", description: "Tailored strategies for your specific needs and budget" },
          { title: "Transparent Service", description: "Clear communication, regular reporting, no hidden fees" },
          { title: "Comprehensive Offering", description: "Single provider for all IT needs" },
          { title: "Long-Term Partnership", description: "Strategic technology advisor invested in your success" },
        ],
      },
      {
        heading: "Trusted IT Service Provider Supporting Dubai's Business Growth",
        intro: ["We help businesses across Dubai:"],
        bullets: [
          "Implement secure remote work solutions",
          "Deploy cloud collaboration tools",
          "Ensure UAE regulatory compliance",
          "Reduce IT operational costs",
          "Protect against cybersecurity threats",
          "Scale technology with business growth",
        ],
        outro: [
          "From Business Bay to Dubai Silicon Oasis, from DIFC to Jebel Ali, we deliver enterprise-grade IT services with personalized attention.",
        ],
      },
      {
        heading: "Transform Your Business with Expert IT Support",
        intro: [
          "Technology drives modern business success. Artek Computers delivers strategic IT partnership that leverages technology to achieve your business objectives—improving efficiency, enhancing security, and enabling growth.",
          "Let our certified IT consultants assess your environment and recommend solutions tailored to your needs.",
        ],
      },
      {
        heading: "Ready to Transform Your Business with IT Services?",
        intro: [
          "Partner with Artek Computers LLC to design and implement a cloud strategy that drives innovation, reduces costs, and positions your business for future growth. Our certified cloud architects are ready to assess your needs and recommend the optimal solution.",
        ],
      },
    ],
    overview:
      "ARTEK provides managed IT support for businesses across Dubai. Our engineers handle helpdesk support, on-site maintenance, network and server upkeep, and planned lifecycle management — arranged as an annual maintenance contract (AMC) or on-demand. We become your outsourced IT department so your staff stay productive.",
    benefits: [
      "A single point of contact for all IT issues",
      "On-site response for faults that can't be fixed remotely",
      "Annual maintenance contracts with predictable costs",
      "Proactive maintenance that prevents problems, not just reacts to them",
    ],
    features: [
      {
        title: "Helpdesk Support",
        description:
          "A reachable support channel for day-to-day user and system issues.",
      },
      {
        title: "On-Site Maintenance",
        description:
          "Scheduled visits and rapid response for faults requiring hands-on work.",
      },
      {
        title: "AMC Contracts",
        description:
          "Annual maintenance contracts tailored to the systems and coverage your business needs.",
      },
      {
        title: "Lifecycle Management",
        description:
          "Asset tracking, refresh planning and disposal coordination for your IT estate.",
      },
    ],
    faqs: [
      {
        question: "Does ARTEK offer annual maintenance contracts (AMC)?",
        answer:
          "Yes. We offer AMCs covering preventive maintenance visits, support response and repairs, scoped to your infrastructure — from a small office to multi-site environments.",
      },
      {
        question: "Do you provide IT support for small businesses?",
        answer:
          "Yes. Our support plans are designed for small and medium businesses that don't have in-house IT staff, as well as larger teams that need extra coverage.",
      },
    ],
    related: ["computer-systems", "network", "cctv"],
  },
  {
    id: "server-relocation",
    slug: "server-relocation-dubai",
    title: "Data Center & Server Relocation",
    name: "Data Center & Server Relocation",
    shortDescription:
      "Secure migration of servers, racks, and data center equipment with careful infrastructure planning across the UAE.",
    image: "/images/services/server-relocation.jpg",
    imageAlt: "Server rack being professionally relocated by ARTEK engineers in the UAE",
    icon: "server",
    context: "core",
    seoTargetPhrase: "Server Relocation Services Dubai",
    seo: {
      title: "Server Relocation Services in Dubai | Data Center Migration | ARTEK",
      description:
        "Server relocation and data center migration services in Dubai — careful decommissioning, transport and recommissioning of servers, racks and network equipment across the UAE.",
      ogType: "website",
    },
    h1: "Server Relocation Services in Dubai",
    sections: [
      {
        heading: "Professional Data Center Relocation Services in UAE",
        intro: [
          "Artek Computers LLC specializes in seamless data center relocation UAE businesses trust for critical infrastructure moves. Whether you’re relocating servers, migrating entire data centers, or moving IT equipment across Dubai and the UAE, our expert team ensures zero downtime, data integrity, and complete security throughout the relocation process. With 15+ years of experience in server migration and infrastructure relocation, we deliver precision moves that keep your business running.",
        ],
      },
      {
        heading: "Expert Data Center Relocation UAE: Comprehensive Server Migration Services",
        intro: [
          "Relocating data centers or server infrastructure requires meticulous planning, precision execution, and zero room for error. Artek Computers LLC delivers comprehensive data center and server relocation services designed to minimize downtime and ensure seamless transitions. Our experienced team manages every aspect of your move, safeguarding the security and integrity of your critical data and equipment throughout the entire process.",
          "Our data center relocation UAE methodology combines meticulous planning with expert execution. From comprehensive backup solutions to disaster recovery planning, we handle everything from equipment decommissioning to installation at your new facility. Whether you’re upgrading facilities, consolidating locations, or expanding operations across Dubai and the UAE, we deliver professional server migration that protects your infrastructure investments.",
          "Our relocation services integrate seamlessly with our enterprise computer systems and structured cabling solutions for complete IT infrastructure setup.",
        ],
      },
      {
        heading: "Data Backup & Disaster Recovery (DR) Solutions",
        intro: [
          "We prioritize your data security during every phase of the data center relocation process, ensuring complete protection and recoverability.",
        ],
        items: [
          {
            title: "Data Backup",
            description:
              "Comprehensive backup solutions ensuring all data is secure and recoverable before, during, and after the move.",
          },
          {
            title: "Disaster Recovery",
            description:
              "Robust DR plans designed to quickly restore systems in case of unexpected incidents during relocation, minimizing business disruption.",
          },
        ],
        outro: [
          "Learn more about data protection best practices from Veeam Data Protection and Veritas Disaster Recovery Solutions.",
        ],
      },
      {
        heading: "Enhance IT Operations Through Virtualization",
        intro: [
          "Leverage virtualization to optimize your infrastructure during and after server relocation projects across Dubai and UAE.",
        ],
        items: [
          {
            title: "Server Virtualization",
            description:
              "Consolidate physical servers into virtual environments, reducing hardware requirements and boosting operational efficiency.",
          },
          {
            title: "Desktop Virtualization",
            description:
              "Streamline desktop management, providing users seamless access to applications and data from anywhere during the transition period.",
          },
        ],
        outro: [
          "Virtualization plays a critical role in modern data center relocation strategies. Explore advanced technologies from VMware Solutions that complement our migration services.",
        ],
      },
      {
        heading: "Value-Added IT Services",
        intro: [
          "Comprehensive IT Solutions Beyond Relocation",
          "Enhance your IT capabilities with specialized services tailored to your business needs during and after server relocation UAE projects.",
        ],
        items: [
          {
            title: "Custom IT Solutions",
            description:
              "Develop tailored solutions addressing your unique business requirements and operational challenges.",
          },
          {
            title: "IT Consultation",
            description:
              "Expert advice on optimizing IT infrastructure, procedures, and long-term technology strategies for maximum efficiency.",
          },
        ],
      },
      {
        heading: "Business Intelligence and Consulting",
        intro: [
          "Make informed decisions using our intelligence and consulting services for successful data center migration projects.",
        ],
        items: [
          {
            title: "Data Analysis",
            description:
              "Leverage data analytics to gain actionable insights into business operations and performance metrics before and after relocation.",
          },
          {
            title: "IT Strategy Consulting",
            description:
              "Develop and execute IT strategies aligned with your company’s growth objectives and industry requirements for optimal infrastructure performance.",
          },
        ],
      },
      {
        heading: "Why Choose Artek Computers LLC",
        intro: [
          "If you’re looking for unmatched data center relocation and server migration expertise in Dubai and across the UAE, choose Artek Computers LLC for professional, reliable, and secure infrastructure moves.",
        ],
        items: [
          {
            title: "Expertise",
            description:
              "Our experienced team possesses the skills and knowledge to handle complex relocations with precision and minimal disruption.",
          },
          {
            title: "Comprehensive Solutions",
            description:
              "End-to-end services from planning and execution to ongoing support, ensuring complete project success.",
          },
          {
            title: "Customer-Centric Approach",
            description:
              "Tailored server relocation services meeting your specific needs while ensuring minimal disruption to daily business operations.",
          },
        ],
      },
      {
        heading: "Ready to Transform Your Business with Server Relocation Services?",
        intro: [
          "Partner with Artek Computers LLC to design and implement a cloud strategy that drives innovation, reduces costs, and positions your business for future growth. Our certified cloud architects are ready to assess your needs and recommend the optimal solution.",
        ],
        bullets: ["Schedule a Free Consultation", "Download Our Cloud Solutions Guide", "Request a Custom Quote"],
      },
    ],
    overview:
      "Moving servers is unforgiving: downtime, cabling errors and transport damage all have real costs. ARTEK manages server relocation and data center moves across the UAE end-to-end — inventory and documentation, structured decommissioning, secure transport, and full recommissioning and testing at the destination so services come back online in a planned sequence.",
    benefits: [
      "A documented migration plan instead of an improvisation",
      "Clean rebuild of cabling with labelled runs, so the new site is documented from day one",
      "Downtime window agreed in advance and worked to",
      "Post-move verification of every system before handover",
    ],
    features: [
      {
        title: "Migration Planning",
        description:
          "Inventory, dependency mapping and a scheduled downtime window agreed with your team.",
      },
      {
        title: "Decommissioning",
        description:
          "Systematic shutdown, labelling and removal of servers, storage and network hardware.",
      },
      {
        title: "Secure Transport",
        description:
          "Packed and moved with appropriate protection for sensitive IT equipment.",
      },
      {
        title: "Recommissioning",
        description:
          "Rack installation, cabling, power-up sequence, testing and service verification at the new site.",
      },
    ],
    faqs: [
      {
        question: "How long does a server relocation take?",
        answer:
          "It depends on the size of the environment. We plan the move around an agreed downtime window — many office relocations complete within a day, larger data center moves are phased.",
      },
      {
        question: "Can you relocate servers to another emirate?",
        answer:
          "Yes. We handle relocations across the UAE, including moves to and from hosted data centers.",
      },
    ],
    related: ["network", "it-services", "computer-systems"],
  },
  {
    id: "cybersecurity",
    slug: "cybersecurity-dubai",
    title: "Cybersecurity Solutions",
    name: "Cybersecurity Solutions",
    shortDescription:
      "Firewalls, SSL, endpoint protection, and threat monitoring to help keep your business data secure.",
    image: "/images/services/cybersecurity.jpg",
    imageAlt: "Cybersecurity specialist monitoring threats for a UAE business",
    icon: "shield",
    context: "core",
    seoTargetPhrase: "Cybersecurity Solutions UAE",
    seo: {
      title: "Cybersecurity Solutions in UAE | Firewalls & Endpoint Security | ARTEK",
      description:
        "Cybersecurity solutions for UAE businesses — firewalls, SSL certificates, endpoint protection and threat monitoring, deployed and supported by ARTEK Computers LLC.",
      ogType: "website",
    },
    h1: "Cybersecurity Solutions in the UAE",
    stats: [
      { value: "500+", label: "Systems Maintained" },
      { value: "20+", label: "Years Experience" },
      { value: "99.9%", label: "Uptime Guaranteed" },
      { value: "24/7", label: "Support Available" },
    ],
    sections: [
      {
        heading: "Protect Your Business with Enterprise Cybersecurity Solutions in UAE",
        intro: [
          "Cyber threats are evolving rapidly, and businesses across Dubai and the UAE face increasing risks from ransomware, data breaches, phishing attacks, and advanced persistent threats. Our cybersecurity solutions UAE provide multi-layered protection designed to defend against today’s sophisticated attacks while ensuring business continuity.",
          "At Artek Computers LLC, we understand that every organization has unique security requirements. Whether you’re protecting sensitive customer data, intellectual property, or critical infrastructure, our comprehensive cybersecurity services deliver the protection you need with the expertise you deserve.",
        ],
        items: [
          {
            title: "Network Security",
            description:
              "Advanced firewall protection, intrusion detection and prevention systems (IDS/IPS), and secure network architecture designed to protect your infrastructure from external and internal threats.",
          },
          {
            title: "Threat Detection & Response",
            description:
              "24/7 security monitoring with real-time threat intelligence, automated incident response, and advanced analytics to identify and neutralize threats before they impact your business.",
          },
          {
            title: "Data Encryption & Protection",
            description:
              "End-to-end data encryption for data at rest and in transit, secure backup solutions, and compliance-ready data protection strategies to safeguard your most valuable assets.",
          },
          {
            title: "Endpoint Security",
            description:
              "Comprehensive protection for all devices including workstations, laptops, mobile devices, and servers with advanced malware protection, device control, and application whitelisting.",
          },
          {
            title: "Cloud Security",
            description:
              "Secure cloud architecture, identity and access management (IAM), cloud workload protection, and continuous compliance monitoring for your cloud infrastructure. Learn more about our enterprise cloud computing solutions.",
          },
          {
            title: "Security Audits & Compliance",
            description:
              "Comprehensive security assessments, vulnerability testing, penetration testing, and compliance audits to ensure your systems meet industry standards and regulatory requirements.",
          },
        ],
      },
      {
        heading: "Advanced Cybersecurity Solutions UAE: Cutting-Edge Protection Technologies",
        intro: [
          "Our cybersecurity solutions UAE leverage cutting-edge technologies to protect businesses across Dubai and the UAE from sophisticated cyber threats. From biometric authentication to AI-powered threat detection, we deploy enterprise-grade security measures that safeguard your critical infrastructure and sensitive data.",
        ],
        bullets: [
          "Biometric Authentication: Fingerprint and facial recognition for secure access control",
          "End-to-End Encryption: Military-grade data protection at rest and in transit",
          "AI-Powered Threat Detection: Machine learning identifies attacks in real-time",
          "Zero Trust Architecture: Never trust, always verify security model",
          "Multi-Factor Authentication (MFA): Enhanced identity verification layers",
          "24/7 Security Monitoring: Round-the-clock threat surveillance and response",
          "Next-Gen Firewalls (NGFW): Advanced threat prevention with deep packet inspection",
        ],
      },
      {
        heading: "Industry Standards & Compliance",
        intro: [
          "Our cybersecurity solutions align with internationally recognized security frameworks including NIST Cybersecurity Framework, ISO 27001, and UAE regulatory requirements.",
          "Stay informed about the latest threats with guidance from CISA Cybersecurity and ENISA.",
        ],
      },
      {
        heading: "Comprehensive Cybersecurity Solutions UAE: Protecting Against Modern Threats",
        intro: [
          "Cybersecurity solutions UAE businesses trust are essential in today’s digital landscape. Organizations across Dubai and the UAE face an increasingly sophisticated threat landscape including ransomware, phishing, data breaches, malware, DDoS attacks, and insider threats. Our enterprise cybersecurity solutions provide advanced multi-layered security technologies designed to protect your critical infrastructure.",
          "From biometric authentication to advanced encryption, we deploy cutting-edge security measures that safeguard your critical data and infrastructure against evolving cyber threats. Our security framework aligns with NIST Cybersecurity Framework and ISO 27001 standards.",
        ],
        items: [
          { title: "Ransomware Attacks", description: "Encryption-based extortion attempts" },
          { title: "Phishing & Social Engineering", description: "Deceptive tactics targeting employees" },
          { title: "Data Breaches", description: "Unauthorized access to sensitive information" },
          { title: "Malware & Viruses", description: "Malicious software infections" },
          { title: "DDoS Attacks", description: "Distributed denial of service disruptions" },
          { title: "Insider Threats", description: "Risks from internal actors" },
        ],
        outro: ["Learn more about enterprise security best practices from CISA Cybersecurity Resources."],
      },
    ],
    overview:
      "ARTEK builds layered, practical security for UAE businesses: next-generation firewalls at the perimeter, managed SSL certificates, endpoint protection on every device and monitoring that watches for trouble between audits. We focus on controls small and medium businesses can actually operate and maintain.",
    benefits: [
      "Security sized to your business, not an enterprise sprawl of tools",
      "Firewall and endpoint setup handled by the engineers who know your network",
      "SSL/TLS certificates installed and renewed before they expire",
      "Practical hardening of the everyday systems your staff use",
    ],
    features: [
      {
        title: "Firewall Management",
        description:
          "Next-generation firewall selection, installation, policy configuration and rule upkeep.",
      },
      {
        title: "Endpoint Protection",
        description:
          "Managed antivirus and device protection across desktops, laptops and servers.",
      },
      {
        title: "SSL & Certificates",
        description:
          "Certificate sourcing, installation and renewals for websites, mail and internal services.",
      },
      {
        title: "Threat Monitoring",
        description:
          "Ongoing monitoring of security events so incidents are caught early.",
      },
    ],
    faqs: [
      {
        question: "Do you provide security for small businesses?",
        answer:
          "Yes. We size firewall, endpoint and monitoring solutions to the business — you get meaningful protection without enterprise tooling your team can't operate.",
      },
      {
        question: "Can you secure both our network and our CCTV?",
        answer:
          "Yes. We configure CCTV and network infrastructure side by side, so surveillance devices are segmented and hardened like any other part of your environment.",
      },
    ],
    related: ["network", "cctv", "microsoft", "vapt"],
  },
  {
    id: "vapt",
    slug: "vapt-services-dubai",
    title: "VAPT Services",
    name: "VAPT Services (Vulnerability Assessment & Penetration Testing)",
    shortDescription:
      "Vulnerability assessment and penetration testing for networks, web applications, mobile apps and cloud systems across the UAE.",
    image: "/images/services/vapt.jpg",
    imageAlt: "Security specialist running vulnerability assessment and penetration testing in Dubai",
    icon: "shield",
    context: "core",
    seoTargetPhrase: "VAPT Services Dubai",
    seo: {
      title: "VAPT Services in Dubai & UAE | Penetration Testing | ARTEK Computers",
      description:
        "VAPT services in Dubai and the UAE from ARTEK Computers — vulnerability assessment and penetration testing for networks, web apps, mobile apps and cloud systems.",
      ogType: "website",
    },
    h1: "VAPT Services in Dubai & UAE",
    stats: [
      { value: "500+", label: "Businesses Protected" },
      { value: "20+", label: "Years Experience" },
      { value: "100%", label: "Confidential Reports" },
      { value: "24/7", label: "Security Support" },
    ],
    sections: [
      {
        heading: "Protect Your Business with Expert VAPT Services in Dubai",
        intro: [
          "Artek Computers LLC is your trusted cybersecurity partner in Dubai and across the UAE. Our VAPT services combine deep technical expertise with real-world attack simulations to uncover vulnerabilities in your IT infrastructure — networks, web applications, mobile apps, cloud systems, and more. We don’t just find problems; we help you fix them.",
          "Artek Computers LLC specializes in comprehensive VAPT (Vulnerability Assessment & Penetration Testing) — identifying and addressing security weaknesses in your IT environment before they become costly breaches. Our certified ethical hackers simulate real-world cyberattacks to expose hidden risks in your network, servers, web applications, and cloud infrastructure. From initial scoping to final remediation reporting, we deliver actionable insights that strengthen your security posture across Dubai and the UAE.",
        ],
        stats: [
          { value: "500+", label: "Businesses Served" },
          { value: "99.8%", label: "Threat Detection Rate" },
          { value: "24/7", label: "Technical Support" },
          { value: "15+", label: "Years of Experience" },
        ],
      },
      {
        heading: "Our VAPT Services in Dubai & UAE",
        intro: [
          "We offer a full range of vulnerability assessment and penetration testing services tailored to businesses of all sizes across Dubai, Abu Dhabi, and the wider UAE.",
        ],
        items: [
          {
            title: "Network Penetration Testing",
            bullets: [
              "Internal and external network vulnerability scans",
              "Firewall and router configuration review",
              "Wi-Fi security and rogue access point detection",
              "Exploitation of identified network weaknesses",
            ],
          },
          {
            title: "Web Application VAPT",
            bullets: [
              "OWASP Top 10 vulnerability assessment",
              "SQL injection, XSS, CSRF testing",
              "Authentication and session management testing",
              "API security testing and validation",
            ],
          },
          {
            title: "Mobile Application Testing",
            bullets: [
              "Android and iOS application security testing",
              "Insecure data storage and transmission checks",
              "Reverse engineering and binary analysis",
              "Third-party SDK vulnerability assessment",
            ],
          },
          {
            title: "Cloud Security Assessment",
            bullets: [
              "AWS, Azure, and Google Cloud configuration review",
              "Identity and access management (IAM) audit",
              "Misconfiguration and data exposure checks",
              "Cloud workload protection assessment",
            ],
          },
          {
            title: "Social Engineering Testing",
            bullets: [
              "Phishing simulation campaigns",
              "Vishing (voice phishing) tests",
              "Physical security assessment",
              "Employee security awareness evaluation",
            ],
          },
          {
            title: "Compliance-Based VAPT",
            bullets: [
              "PCI-DSS penetration testing",
              "ISO 27001 security assessment",
              "UAE NESA compliance testing",
              "GDPR and data protection reviews",
            ],
          },
        ],
      },
      {
        heading: "What is VAPT & Why Does Your Business Need It?",
        intro: [
          "Vulnerability Assessment (VA) is a systematic process of identifying and classifying security vulnerabilities in your IT systems, networks, and applications — giving you a clear picture of your exposure to cyber threats.",
          "Penetration Testing (PT) goes a step further by actively exploiting identified vulnerabilities — just as a real attacker would — to determine the actual impact and risk to your business.",
          "Together, VAPT gives your business a comprehensive, real-world view of your security posture. With cyberattacks rising across Dubai and the UAE, VAPT is no longer optional — it’s essential for any business that handles sensitive data, customer information, or critical operations.",
        ],
      },
      {
        heading: "Our VAPT Process",
        intro: ["A structured, transparent approach — from scoping to final remediation report."],
        items: [
          { title: "1. Scoping & Planning", description: "Define the scope, objectives, and rules of engagement for the assessment." },
          { title: "2. Reconnaissance", description: "Gather intelligence on your systems, networks, and infrastructure." },
          { title: "3. Vulnerability Scanning", description: "Use advanced tools to identify all security weaknesses and misconfigurations." },
          { title: "4. Exploitation", description: "Safely exploit vulnerabilities to determine real-world impact and risk." },
          { title: "5. Reporting", description: "Deliver a detailed report with findings, risk ratings, and fix recommendations." },
          { title: "6. Remediation Support", description: "We support your team in fixing identified vulnerabilities and re-testing." },
        ],
      },
      {
        heading: "Why Choose Artek Computers for VAPT in UAE?",
        intro: ["If you’re looking for unmatched cybersecurity expertise in Dubai and the UAE, choose Artek Computers LLC."],
        items: [
          {
            title: "Certified Security Experts",
            description: "Our team holds globally recognized certifications including CEH, OSCP, CISSP, and more.",
          },
          {
            title: "Proven Track Record",
            description: "Trusted by 500+ businesses across Dubai and the UAE for cybersecurity assessments.",
          },
          {
            title: "Customized Solutions",
            description: "We tailor every VAPT engagement to your specific business environment and risk profile.",
          },
          {
            title: "Detailed Reporting",
            description: "Clear, actionable reports for both technical teams and executive management.",
          },
          {
            title: "100% Confidential",
            description: "All findings and client data are handled with strict confidentiality and NDA protection.",
          },
          {
            title: "Fast Turnaround",
            description: "Efficient testing methodology with rapid delivery of reports and remediation guidance.",
          },
          {
            title: "Dubai-Based Team",
            description: "Local presence in Bur Dubai with on-site assessment capability across the UAE.",
          },
          {
            title: "Comprehensive Support",
            description: "From initial assessment to remediation and re-testing — we’re with you every step.",
          },
        ],
      },
      {
        heading: "Industries We Serve",
        intro: [
          "Our VAPT services in Dubai cater to a wide range of industries with unique security requirements.",
        ],
        bullets: [
          "Banking & Finance",
          "Healthcare",
          "Retail & E-Commerce",
          "Real Estate",
          "Government",
          "Aviation & Travel",
          "Education",
          "Manufacturing",
          "Telecom & Media",
          "Energy & Utilities",
        ],
      },
      {
        heading: "Ready to Secure Your Business? Get a Free VAPT Consultation",
        intro: [
          "Contact our cybersecurity experts today — based in Bur Dubai, serving businesses across the UAE.",
          "Call +971 50 5513139 · Email Us",
        ],
      },
    ],
    overview:
      "ARTEK Computers LLC delivers Vulnerability Assessment and Penetration Testing (VAPT) across Dubai and the UAE. We identify security gaps in your networks, applications and systems before attackers do. Vulnerability assessment classifies weaknesses across your IT estate; penetration testing then safely exploits them, as a real attacker would, to show the actual business risk. You receive a detailed report with fix recommendations, and we support remediation and re-testing.",
    benefits: [
      "Real-world attack simulation, not just automated scans",
      "Risk-rated findings with clear fix recommendations",
      "Confidential handling of findings under NDA",
      "Support through remediation and re-testing",
      "Certified ethical hackers holding CEH, OSCP and CISSP credentials",
    ],
    features: [
      {
        title: "Network Penetration Testing",
        description:
          "Internal and external vulnerability scans, firewall and router configuration review, and Wi-Fi security checks.",
      },
      {
        title: "Web Application VAPT",
        description:
          "OWASP Top 10 assessment, SQL injection, XSS and CSRF testing, authentication and session management, and API security testing.",
      },
      {
        title: "Mobile Application Testing",
        description:
          "Android and iOS security testing covering insecure data storage, data transmission and third-party SDK risks.",
      },
      {
        title: "Cloud Security Assessment",
        description:
          "Review of AWS, Azure and Google Cloud configuration, identity and access management, and data exposure checks.",
      },
    ],
    faqs: [
      {
        question: "What is the difference between vulnerability assessment and penetration testing?",
        answer:
          "A vulnerability assessment identifies and classifies weaknesses in your systems. Penetration testing goes further by actively exploiting them to show the real impact and risk to your business. VAPT combines both.",
      },
      {
        question: "Will the testing disrupt our business?",
        answer:
          "We agree the scope, objectives and rules of engagement before testing starts, so the work is planned around your operations.",
      },
    ],
    related: ["cybersecurity", "network", "it-services"],
  },
  {
    id: "elv-access-control",
    slug: "elv-access-control-uae",
    title: "ELV & Access Control",
    name: "ELV, AV & Access Control Solutions",
    shortDescription:
      "Access control systems, ELV infrastructure and AV solutions for businesses across Dubai and the UAE.",
    image: "/images/services/elv-access-control.jpg",
    imageAlt: "Access control and ELV systems installed for a business in Dubai",
    icon: "shield",
    context: "core",
    seoTargetPhrase: "Access Control Systems UAE",
    seo: {
      title: "ELV, AV & Access Control Solutions in UAE | ARTEK Computers",
      description:
        "ELV, AV and access control solutions in Dubai and the UAE from ARTEK Computers LLC — biometric and card access, structured ELV cabling, public address and AV systems.",
      ogType: "website",
    },
    h1: "Complete ELV, AV and Access Control Solutions in UAE",
    overview:
      "Artek Computers LLC specializes in delivering comprehensive access control systems UAE businesses trust, along with advanced ELV (Extra Low Voltage) and AV (Audio Visual) solutions tailored to address the various needs of today’s modern enterprises across Dubai and the UAE. Our offerings focus on enhancing security measures with intelligent access control, facilitating seamless communication through professional AV systems, and efficiently managing your facilities with integrated ELV infrastructure.",
    benefits: [
      "Access control that goes beyond traditional locks",
      "Integrated ELV infrastructure for reliable, high-speed communication",
      "Professional AV systems for meetings, presentations and signage",
      "Genuine solutions from an authorized partner, with 24/7 technical support",
    ],
    features: [],
    faqs: [
      {
        question: "Which access control systems do you supply?",
        answer:
          "Our access control solutions offer biometric authentication, card-based access, mobile credentials, and centralized management for complete facility security across Dubai and the UAE.",
      },
      {
        question: "Can access control be integrated with CCTV and alarms?",
        answer:
          "Yes. We integrate access control with CCTV, alarms, and building management systems for comprehensive security.",
      },
    ],
    related: ["cctv", "network", "cybersecurity"],
    sections: [
      {
        heading: "Why Choose Artek for Access Control Systems in UAE?",
        intro: [
          "Our ELV systems encompass a diverse range of essential technologies crucial for operating in any business environment across Dubai and UAE. These integrated systems consist of:",
        ],
        items: [
          {
            title: "Structured Cabling for ELV Infrastructure",
            description:
              "We create and install robust cabling infrastructure to support all your communication requirements, ensuring reliable and high-speed data transmission for modern ELV systems UAE.",
          },
          {
            title: "Integrated Security Systems and Access Control",
            description:
              "Safeguard your premises using our advanced security solutions, such as CCTV surveillance, intrusion detection, and fire alarm systems, all fully integrated for maximum effectiveness.",
          },
          {
            title: "Public Address and Voice Alarm Systems",
            description:
              "Enable efficient communication and emergency response through our cutting-edge public address systems designed for commercial and industrial facilities across the UAE.",
          },
        ],
      },
      {
        heading: "Our Access Control Systems Solutions Across UAE",
        intro: [
          "Our AV solutions revolutionize your organization’s communication and collaboration methods across Dubai and UAE. We provide:",
        ],
        items: [
          {
            title: "Video Conferencing and AV Solutions",
            description:
              "Elevate your meetings with high-definition video conferencing systems that facilitate remote collaboration and reduce travel expenses.",
          },
          {
            title: "Digital Signage and Display Systems",
            description:
              "Capture your audience’s attention with dynamic digital displays that can be tailored to show information, advertisements, or critical announcements.",
          },
          {
            title: "Interactive Displays",
            description:
              "Enhance productivity and interactivity in meetings and presentations using our advanced touch-screen displays and projectors for AV systems Dubai.",
          },
        ],
        outro: ["Learn more about professional AV standards from AVIXA (Audiovisual and Integrated Experience Association)."],
      },
      {
        heading: "Advanced Access Control Systems UAE: Biometric Security Solutions",
        intro: [
          "Modern access control systems UAE provide intelligent security solutions that go beyond traditional locks. Our comprehensive access control solutions offer biometric authentication, card-based access, mobile credentials, and centralized management for complete facility security across Dubai and the UAE.",
        ],
        items: [
          {
            title: "Biometric Access Control",
            description:
              "Fingerprint, facial recognition, and iris scanning provide the highest level of secure authentication for restricted areas.",
          },
          {
            title: "Card-Based Systems",
            description:
              "RFID proximity cards and smart cards with encrypted credentials for convenient and secure facility access.",
          },
          {
            title: "Mobile Access Solutions",
            description:
              "Smartphone-based entry using Bluetooth and NFC technology for touchless and convenient access control.",
          },
          {
            title: "Time Attendance Integration",
            description:
              "Automated employee tracking and workforce management integrated with your access control systems.",
          },
          {
            title: "Visitor Management",
            description:
              "Automated check-in, badge printing, and temporary access credentials for visitors and contractors.",
          },
          {
            title: "System Integration",
            description:
              "Seamless integration with CCTV, alarms, and building management systems for comprehensive security.",
          },
        ],
        outro: [
          "Our access control solutions comply with international security standards. Learn more from ASSA ABLOY Global Solutions and Security Industry Association.",
        ],
      },
      {
        heading: "Why Opt for Artek Computers LLC?",
        items: [
          {
            title: "Authorized Partner",
            description:
              "As an authorized partner with leading access control and AV system manufacturers, we have the expertise and authorization to provide genuine solutions and comprehensive support across UAE.",
          },
          {
            title: "Expert Guidance",
            description:
              "Our knowledgeable team helps you navigate through the complexities of ELV systems, access control, and AV solutions, ensuring you get the best solution for your business needs in Dubai and UAE.",
          },
          {
            title: "End-to-End Support",
            description:
              "We provide comprehensive services to guarantee the effective implementation and maintenance of your ELV, AV, and access control systems, from initial consultation and installation to ongoing 24/7 technical support.",
          },
        ],
        outro: [
          "Enhance your security measures, enrich communication channels, and optimize access control with Artek Computers LLC‘s ELV, AV, and Access Control solutions. Reach out to us today to  discover how we can assist you in securing and refining your business operations.",
        ],
      },
    ],
  },

  /* ── Additional CCTV SEO landing pages ─────────────────────────────── */
  {
    id: "cctv-installation",
    slug: "cctv-installation-dubai",
    title: "CCTV Installation Dubai",
    name: "CCTV Installation in Dubai",
    shortDescription:
      "Complete CCTV installation in Dubai — camera planning, supply, mounting, cabling and configuration.",
    image: "/images/services/cctv.jpg",
    imageAlt: "CCTV camera being installed at a commercial property in Dubai",
    icon: "cctv",
    context: "seo",
    seoTargetPhrase: "CCTV Installation Dubai",
    seo: {
      title: "CCTV Installation in Dubai | Security Camera Installers | ARTEK",
      description:
        "CCTV installation in Dubai by ARTEK Computers — site survey, camera supply, professional mounting, cabling, recorder setup and remote viewing configuration.",
      ogType: "website",
    },
    h1: "CCTV Installation in Dubai",
    overview:
      "ARTEK installs CCTV systems across Dubai for homes, shops, offices and industrial sites. Every installation starts with a site survey so cameras are positioned for real coverage — entrances, blind spots and lighting accounted for — followed by clean cabling, recorder configuration and handover with remote viewing set up on your devices.",
    benefits: [
      "Camera placement planned on-site, not from a catalogue",
      "Tidy, concealed cabling by experienced installers",
      "Recording and retention configured to your needs",
      "Remote viewing on your phone demonstrated at handover",
    ],
    features: [
      {
        title: "Site Survey",
        description: "On-site assessment of coverage areas, blind spots and mounting points.",
      },
      {
        title: "Camera Supply & Mounting",
        description: "Suitable cameras fitted indoors and outdoors, in the right locations.",
      },
      {
        title: "Cabling & Recorder Setup",
        description: "Structured cabling to NVR/DVR with storage and retention configured.",
      },
      {
        title: "Handover & Training",
        description: "Remote viewing configured and a walkthrough for your team or family.",
      },
    ],
    faqs: [
      {
        question: "How long does a CCTV installation take?",
        answer:
          "Most residential and small commercial installations are completed within a day; larger sites with many cameras or challenging cabling routes take longer. We confirm the schedule after the survey.",
      },
      {
        question: "What is included in an ARTEK CCTV installation?",
        answer:
          "Site survey, camera supply and mounting, cabling, recorder installation and configuration, remote viewing setup and a handover walkthrough.",
      },
    ],
    related: ["cctv", "network"],
  },
  {
    id: "sira-cctv",
    slug: "sira-approved-cctv-dubai",
    title: "SIRA Approved CCTV Dubai",
    name: "SIRA-Compliant CCTV in Dubai",
    shortDescription:
      "CCTV systems for premises subject to SIRA requirements in Dubai.",
    image: "/images/services/cctv.jpg",
    imageAlt: "SIRA-compliant CCTV surveillance system in a Dubai commercial building",
    icon: "badge-check",
    context: "seo",
    seoTargetPhrase: "SIRA Approved CCTV Dubai",
    seo: {
      title: "SIRA Approved CCTV in Dubai | ARTEK Computers LLC",
      description:
        "CCTV solutions for Dubai premises subject to SIRA requirements — system design, installation and documentation support by ARTEK Computers LLC.",
      ogType: "website",
    },
    h1: "SIRA-Compliant CCTV in Dubai",
    overview:
      "Some premises in Dubai must meet SIRA (Security Industry Regulatory Agency) requirements for their surveillance systems. ARTEK builds CCTV systems with these requirements in mind — covering camera placement, recording quality, retention and documentation — and supports business owners through the inspection process.",
    benefits: [
      "System design aware of SIRA surveillance requirements",
      "Recording quality and retention planned to specification",
      "Documentation support for inspections",
      "Engineers experienced with regulated Dubai installations",
    ],
    features: [
      {
        title: "Regulated System Design",
        description: "Camera coverage and recording specifications planned to SIRA requirements.",
      },
      {
        title: "Quality & Retention",
        description: "Storage sizing and retention configured to applicable standards.",
      },
      {
        title: "Inspection Support",
        description: "Help preparing documentation for authority inspections.",
      },
      {
        title: "Upgrades",
        description: "Existing CCTV upgraded where systems no longer meet requirements.",
      },
    ],
    faqs: [
      {
        question: "What is SIRA approval for CCTV?",
        answer:
          "SIRA is Dubai's Security Industry Regulatory Agency. Premises in certain categories must have surveillance systems meeting SIRA technical standards, and security installers and technicians involved in regulated installations hold relevant approvals.",
      },
      {
        question: "Can you upgrade an existing CCTV system to meet SIRA requirements?",
        answer:
          "Often, yes. We assess the existing cameras, cabling and recording hardware and either upgrade components or replace the system, depending on what it takes to meet the required standard.",
      },
    ],
    related: ["cctv", "network"],
  },
  {
    id: "cctv-maintenance",
    slug: "cctv-maintenance-dubai",
    title: "CCTV Maintenance Dubai",
    name: "CCTV Maintenance in Dubai",
    shortDescription:
      "Scheduled CCTV servicing, fault-finding and repairs to keep surveillance running.",
    image: "/images/services/cctv.jpg",
    imageAlt: "Technician performing CCTV maintenance on a surveillance system in Dubai",
    icon: "wrench",
    context: "seo",
    seoTargetPhrase: "CCTV Maintenance Dubai",
    seo: {
      title: "CCTV Maintenance in Dubai | Surveillance Servicing | ARTEK",
      description:
        "CCTV maintenance in Dubai — scheduled servicing, camera cleaning, storage checks, firmware updates and fault repair by ARTEK Computers LLC.",
      ogType: "website",
    },
    h1: "CCTV Maintenance in Dubai",
    overview:
      "A CCTV system that isn't maintained fails quietly. ARTEK's CCTV maintenance covers scheduled servicing — lens and housing cleaning, storage health checks, recording verification, firmware updates and cable/connectivity inspection — plus responsive fault-finding when something stops working.",
    benefits: [
      "Recording failures found before you need the footage",
      "Image quality restored with proper cleaning and adjustment",
      "Firmware kept current for stability and security",
      "Priority response for maintenance contract customers",
    ],
    features: [
      {
        title: "Scheduled Servicing",
        description: "Periodic visits covering cameras, recorder, storage and power supplies.",
      },
      {
        title: "Recording Verification",
        description: "Confirming scheduled and motion recording work on every channel.",
      },
      {
        title: "Firmware & Updates",
        description: "Keeping devices updated for reliability and security.",
      },
      {
        title: "Fault Repair",
        description: "Diagnosis and repair of failed cameras, storage, PSUs or cabling.",
      },
    ],
    faqs: [
      {
        question: "How often should CCTV be serviced?",
        answer:
          "For most business premises we recommend servicing at least twice a year, with higher-usage or regulated sites on more frequent schedules.",
      },
      {
        question: "Do you offer CCTV maintenance contracts (AMC)?",
        answer:
          "Yes. Annual maintenance contracts bundle scheduled visits and support response into a predictable yearly agreement.",
      },
    ],
    related: ["cctv", "it-services"],
  },
  {
    id: "cctv-repair",
    slug: "cctv-camera-repair-dubai",
    title: "CCTV Camera Repair Dubai",
    name: "CCTV Camera Repair in Dubai",
    shortDescription:
      "Fast diagnosis and repair of failed CCTV cameras, recorders and power supplies.",
    image: "/images/services/cctv.jpg",
    imageAlt: "CCTV camera being repaired by an ARTEK technician in Dubai",
    icon: "monitor",
    context: "seo",
    seoTargetPhrase: "CCTV Camera Repair Dubai",
    seo: {
      title: "CCTV Camera Repair in Dubai | ARTEK Computers",
      description:
        "CCTV camera repair in Dubai — diagnosis and repair of failed cameras, NVR/DVR units, power supplies and cabling by ARTEK's engineers.",
      ogType: "website",
    },
    h1: "CCTV Camera Repair in Dubai",
    overview:
      "When cameras drop off your recorder or footage stops saving, ARTEK finds the cause fast — failed camera, power supply, storage drive, cable or connector — and repairs or replaces the faulty component. We repair and support most common CCTV brands and setups.",
    benefits: [
      "Correct fault diagnosis instead of blind part replacement",
      "Repairs across camera, recorder, power and cabling layers",
      "Replacement cameras matched to your existing system",
      "Support for most common brands and configurations",
    ],
    features: [
      {
        title: "Fault Diagnosis",
        description: "Systematic testing from camera firmware through cabling to recorder.",
      },
      {
        title: "Camera Repair & Replacement",
        description: "Component-level repair or matched replacement where repair isn't viable.",
      },
      {
        title: "Recorder & Storage",
        description: "NVR/DVR troubleshooting and storage drive replacement or upgrade.",
      },
      {
        title: "PSU & Cabling Fixes",
        description: "Power supply repairs and re-termination of damaged cable runs.",
      },
    ],
    faqs: [
      {
        question: "My camera shows 'no signal' — can you fix it?",
        answer:
          "Usually, yes. 'No signal' is typically a cabling, connector or power problem rather than a dead camera. Our engineers trace the run and repair the actual fault.",
      },
      {
        question: "Do you repair all CCTV brands?",
        answer:
          "We repair and support most major CCTV brands commonly used in the UAE. For discontinued hardware we suggest a suitable replacement that works with your existing recordings.",
      },
    ],
    related: ["cctv", "it-services"],
  },
  {
    id: "commercial-cctv",
    slug: "commercial-cctv-installation-dubai",
    title: "Commercial CCTV Installation Dubai",
    name: "Commercial CCTV Installation in Dubai",
    shortDescription:
      "Multi-camera surveillance for offices, retail, warehouses and industrial sites.",
    image: "/images/services/cctv.jpg",
    imageAlt: "Commercial CCTV installation covering an office floor in Dubai",
    icon: "building",
    context: "seo",
    seoTargetPhrase: "Commercial CCTV Installation Dubai",
    seo: {
      title: "Commercial CCTV Installation in Dubai | ARTEK Computers",
      description:
        "Commercial CCTV installation in Dubai — multi-camera surveillance systems for offices, retail, warehouses and industrial facilities, designed and installed by ARTEK.",
      ogType: "website",
    },
    h1: "Commercial CCTV Installation in Dubai",
    overview:
      "Commercial CCTV is a different discipline from a home kit: more cameras, longer runs, mixed lighting, per-camera requirements and staff access management. ARTEK designs commercial surveillance for offices, retail, warehouses and industrial facilities across Dubai, using business-grade recorders, network separation and storage sized to retention needs.",
    benefits: [
      "Coverage engineered for entrances, aisles, loading areas and cash zones",
      "Business-grade recording with storage sized for retention",
      "Network segmentation keeping surveillance traffic separate",
      "Scales from a single shop to multi-room facilities",
    ],
    features: [
      {
        title: "Multi-Camera Design",
        description: "Camera plans covering entrances, work areas, stock and high-value zones.",
      },
      {
        title: "Business Recorders",
        description: "NVR/DVR selection with RAID and retention configured for compliance.",
      },
      {
        title: "Network Segmentation",
        description: "Isolated surveillance VLANs so CCTV doesn't expose the office LAN.",
      },
      {
        title: "Multi-Site Viewing",
        description: "Central monitoring of multiple locations where required.",
      },
    ],
    faqs: [
      {
        question: "How many cameras do we need for our shop/office?",
        answer:
          "It depends on layout, not a rule of thumb. Our survey maps your entrances, blind spots and high-value areas and recommends the minimum camera count that gives real coverage.",
      },
      {
        question: "Can our CCTV be viewed from head office?",
        answer:
          "Yes. We configure secure remote viewing so authorized staff can check single or multiple sites from anywhere.",
      },
    ],
    related: ["cctv", "network", "cybersecurity"],
  },
  {
    id: "residential-cctv",
    slug: "residential-cctv-installation-dubai",
    title: "Residential CCTV Installation Dubai",
    name: "Residential CCTV Installation in Dubai",
    shortDescription:
      "Discreet home CCTV — entrance, boundary and garden coverage with mobile viewing.",
    image: "/images/services/cctv.jpg",
    imageAlt: "Residential CCTV camera installed at a villa in Dubai",
    icon: "home",
    context: "seo",
    seoTargetPhrase: "Residential CCTV Installation Dubai",
    seo: {
      title: "Residential CCTV Installation in Dubai | Home Security Cameras | ARTEK",
      description:
        "Home CCTV installation in Dubai — villa and apartment surveillance with entrance, boundary and garden coverage, plus easy mobile viewing. By ARTEK Computers.",
      ogType: "website",
    },
    h1: "Residential CCTV Installation in Dubai",
    overview:
      "ARTEK installs home CCTV in Dubai's villas and apartments: entrances, door access, gardens and parking areas covered by discreet cameras, with recording configured and mobile viewing set up so you can check your home from anywhere.",
    benefits: [
      "Coverage of entrances, boundaries and outdoor areas",
      "Discreet designs that suit the property",
      "Motion alerts on your phone",
      "Recordings kept locally, privately",
    ],
    features: [
      {
        title: "Entrance & Access Coverage",
        description: "Main door, gate and driveway cameras positioned for identification.",
      },
      {
        title: "Outdoor Cameras",
        description: "Weatherproof cameras for gardens, parking and boundary lines.",
      },
      {
        title: "Mobile Viewing",
        description: "Phone and tablet access configured and demonstrated at handover.",
      },
      {
        title: "Motion Alerts",
        description: "Alerting configured so you hear about activity that matters.",
      },
    ],
    faqs: [
      {
        question: "Will home CCTV work without internet?",
        answer:
          "Yes, recording and playback work locally without internet. Internet is only needed to view cameras remotely while you're away.",
      },
      {
        question: "How many cameras does a typical villa need?",
        answer:
          "Most villas we install in Dubai need between 4 and 8 cameras to cover entrance, gate, parking and rear areas — confirmed at survey rather than guessed.",
      },
    ],
    related: ["cctv", "network"],
  },
  {
    id: "ip-camera",
    slug: "ip-camera-installation-dubai",
    title: "IP Camera Installation Dubai",
    name: "IP Camera Installation in Dubai",
    shortDescription:
      "Network IP camera systems with PoE, high resolution and remote access.",
    image: "/images/services/cctv.jpg",
    imageAlt: "IP surveillance camera installed on a network by ARTEK in Dubai",
    icon: "wifi",
    context: "seo",
    seoTargetPhrase: "IP Camera Installation Dubai",
    seo: {
      title: "IP Camera Installation in Dubai | Network CCTV | ARTEK Computers",
      description:
        "IP camera installation in Dubai — PoE network CCTV with high resolution recording and secure remote access, designed and installed by ARTEK.",
      ogType: "website",
    },
    h1: "IP Camera Installation in Dubai",
    overview:
      "IP cameras give modern surveillance real advantages: higher resolutions, power over a single cable, per-camera firmware and better integration with your network. ARTEK designs IP camera systems in Dubai with proper PoE switching, VLAN separation of surveillance traffic and recorders that make full use of network capabilities.",
    benefits: [
      "Single-cable PoE installation: power and data in one run",
      "High-resolution identification-quality footage",
      "CCTV traffic kept on a separate VLAN for security",
      "Recording resolution matched to your retention needs",
    ],
    features: [
      {
        title: "PoE Infrastructure",
        description: "PoE switches and structured cabling sized for your camera count.",
      },
      {
        title: "High-Resolution Recording",
        description: "NVRs configured to record at each camera's full capability.",
      },
      {
        title: "Secure Remote Access",
        description: "Encrypted remote viewing without exposing the camera network.",
      },
      {
        title: "Integration",
        description: "Cameras and network managed by the same team for coherent operation.",
      },
    ],
    faqs: [
      {
        question: "Do IP cameras need a separate power supply?",
        answer:
          "Most don't — with Power over Ethernet (PoE) a single network cable provides both data and power. We install PoE switching as part of the system.",
      },
      {
        question: "Can IP cameras use existing network cabling?",
        answer:
          "Sometimes. We test the existing runs' condition and distance; where suitable they're used, and where not we install new structured cabling.",
      },
    ],
    related: ["cctv", "network"],
  },
  {
    id: "cctv-amc",
    slug: "cctv-amc-dubai",
    title: "CCTV AMC Dubai",
    name: "CCTV Annual Maintenance Contracts in Dubai",
    shortDescription:
      "Structured Annual Maintenance Contracts for CCTV surveillance systems.",
    image: "/images/services/cctv.jpg",
    imageAlt: "ARTEK engineer performing scheduled CCTV AMC servicing in Dubai",
    icon: "clock",
    context: "seo",
    seoTargetPhrase: "CCTV AMC Dubai",
    seo: {
      title: "CCTV AMC in Dubai | Annual Maintenance Contracts | ARTEK",
      description:
        "CCTV Annual Maintenance Contracts (AMC) in Dubai from ARTEK — scheduled servicing, support response and repair coverage for business surveillance systems.",
      ogType: "website",
    },
    h1: "CCTV AMC in Dubai",
    overview:
      "An annual maintenance contract makes surveillance upkeep predictable: scheduled visits, defined response times and repair coverage for your CCTV system — arranged with ARTEK under a single agreement so your security coverage never quietly lapses.",
    benefits: [
      "Scheduled preventive maintenance visits included",
      "Defined support and response commitments",
      "Repair coverage terms agreed up front",
      "System health reports after each visit",
    ],
    features: [
      {
        title: "Scheduled Visits",
        description: "Planned servicing at agreed intervals covering all components.",
      },
      {
        title: "Response Commitments",
        description: "Agreed support response for faults reported between visits.",
      },
      {
        title: "Repair Coverage",
        description: "Transparent terms for parts and repairs under the contract.",
      },
      {
        title: "Health Reporting",
        description: "Written system status after each maintenance visit.",
      },
    ],
    faqs: [
      {
        question: "What does a CCTV AMC cover?",
        answer:
          "Typically: scheduled maintenance visits, health checks of cameras, recorders and storage, firmware updates, and repair or replacement support defined in the contract terms.",
      },
      {
        question: "Is an AMC worth it for a small CCTV system?",
        answer:
          "If continuous recording matters to you, yes — most surveillance failures are silent until footage is needed. An AMC makes inspections happen on a schedule instead of after a loss.",
      },
    ],
    related: ["cctv", "it-services"],
  },
];

/** Core services shown on homepage/listings */
export const coreServices = services.filter((s) => s.context === "core");

/** Lookup helpers */
export const getServiceBySlug = (slug: string): Service | undefined =>
  services.find((s) => s.slug === slug);
