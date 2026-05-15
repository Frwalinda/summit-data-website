export const company = {
  name: "Summit Data Ltd",
  email: "admin@summitdataltd.com",
  emailUrl: "mailto:admin@summitdataltd.com",
  phone: "+44 7904 186025 (WhatsApp)",
  whatsappUrl: "https://wa.me/447904186025",
  kenyaPhone: "+254 700 047545",
  website: "www.summitdataltd.com",
  address: "29 Mayward House, Peckham Road, London SE5 7NA",
  location: "UK registered company with operations in Kenya, Uganda, and across East Africa"
};

export const navItems = [
  { label: "Home", href: "index.html", id: "home" },
  { label: "About", href: "about.html", id: "about" },
  { label: "Services", href: "services.html", id: "services" },
  { label: "Projects", href: "projects.html", id: "projects" },
  { label: "Industries", href: "industries.html", id: "industries" },
  { label: "Approach", href: "approach.html", id: "approach" },
  { label: "Contact", href: "contact.html", id: "contact" }
];

export const services = [
  {
    title: "Sales Force Automation",
    icon: "SFA",
    description:
      "Digital tools for sales teams, distributors, supervisors, and management to track activity, orders, territories, performance, and field execution."
  },
  {
    title: "Asset Tracking & Geo-Mapping",
    icon: "GPS",
    description:
      "QR, barcode, GPS, and geo-mapping systems for tracking physical assets, outlets, equipment, and field locations."
  },
  {
    title: "Dashboards & Data Reporting",
    icon: "KPI",
    description:
      "Management dashboards that turn field data into actionable insights, KPIs, performance views, and decision-support reports."
  },
  {
    title: "Workflow Automation",
    icon: "OPS",
    description:
      "Custom workflows for approvals, task tracking, issue escalation, documentation, repairs, onboarding, and operational controls."
  },
  {
    title: "Field Implementation & Support",
    icon: "FLD",
    description:
      "Support for field rollout, user onboarding, training, feedback loops, issue resolution, and adoption monitoring."
  },
  {
    title: "Documentation & Governance Systems",
    icon: "DOC",
    description:
      "Structured documentation repositories and governance modules for project records, compliance files, operating procedures, and audit trails."
  },
  {
    title: "ERPNext Customization",
    icon: "ERP",
    description:
      "Practical ERPNext configuration and extensions for business workflows, reporting structures, master data, and operational controls."
  },
  {
    title: "Data Protection & Operational Controls",
    icon: "CTL",
    description:
      "Data handling structures, user roles, audit trails, and operating controls that help teams work with clearer accountability."
  }
];

export const featuredServices = services.slice(0, 6);

export const credibilitySignals = [
  {
    title: "Field-first implementation",
    description: "Systems are shaped around outlet visits, route work, supervisors, distributors, and real adoption conditions."
  },
  {
    title: "Data visibility for leadership",
    description: "Dashboards and reports are designed to help managers see activity, assets, exceptions, and performance clearly."
  },
  {
    title: "Operational governance",
    description: "Rollouts include user roles, evidence trails, documentation, controls, and structured reporting habits."
  },
  {
    title: "East Africa operating context",
    description: "Solutions consider mobile teams, network gaps, distributor realities, and practical support requirements."
  }
];

export const operatingRealities = [
  {
    title: "From field capture to management action",
    description:
      "Summit Data connects field forms, QR scans, GPS points, outlet records, and supervisor reviews into usable dashboards and reports."
  },
  {
    title: "Designed for rollout, not just launch",
    description:
      "The work includes onboarding, feedback loops, issue resolution, and practical training so teams can use the system consistently."
  },
  {
    title: "Structured enough to govern, flexible enough to operate",
    description:
      "Workflows, permissions, documentation, and data models are kept clear so operations can adapt without losing accountability."
  }
];

export const projects = [
  {
    title: "SBC Kenya / PepsiCo - Sales Force Automation & Cooler Asset Visibility",
    shortTitle: "SBC Kenya / PepsiCo SFA & Cooler Tracking",
    description:
      "A field-focused Sales Force Automation and cooler asset visibility platform supporting distributor onboarding, ASR activity tracking, cooler tagging, geo-mapping, territory visibility, dashboards, and management reporting.",
    body:
      "Summit Data Ltd supported the design and implementation of a practical Sales Force Automation and cooler tracking platform for SBC Kenya's field operations. The solution supports cooler tagging, outlet mapping, distributor onboarding, ASR activity tracking, management dashboards, and operational visibility across territories.",
    tags: ["FMCG", "SFA", "Asset Visibility"],
    focus: "Field sales, distributor onboarding, cooler visibility, and management reporting.",
    value:
      "Helped structure how field activity, outlet locations, tagged coolers, and territory information could be captured and reviewed.",
    image: {
      src: "page-images/case-sfa-coolers.jpg",
      alt: "Field team tagging coolers and reviewing mapped outlet visibility on mobile dashboards",
      caption: "Cooler tagging, outlet mapping, and field sales visibility in one operating view."
    },
    points: [
      "Cooler tagging and QR-based asset identification",
      "Geo-location and outlet mapping",
      "Distributor and ASR onboarding",
      "Dashboard visibility for management",
      "Support for territory control and field accountability",
      "Documentation and governance support"
    ],
    detailedPoints: [
      "QR-based cooler tagging",
      "Geo-mapped outlets and assets",
      "Distributor and ASR onboarding",
      "Management dashboards",
      "Territory and field visibility",
      "Asset movement and accountability support",
      "Reporting structures for leadership",
      "Documentation and governance module concept"
    ]
  },
  {
    title: "Chillies & Bevs Ltd - Distribution Operations Support",
    shortTitle: "Chillies & Bevs Ltd Operations Support",
    description:
      "Operational support for a PepsiCo distribution business in Embu, including sales tracking, stock movement visibility, performance reporting, and structured operational planning.",
    body:
      "Summit Data Ltd supported operational structuring for Chillies & Bevs Ltd, a PepsiCo distribution business in Embu. The work focused on improving visibility over sales activity, stock movement, retailer development, reporting, and performance management.",
    tags: ["Distribution", "Reporting", "Operations"],
    focus: "Sales tracking, stock visibility, retailer development, and distributor performance support.",
    value:
      "Helped the business organise operational information for clearer planning, reporting, and day-to-day control.",
    image: {
      src: "page-images/case-distribution-reporting.jpg",
      alt: "Distribution team coordinating stock movement, route planning, and reporting from a warehouse",
      caption: "Distribution data turns sales, stock and route activity into clearer control."
    },
    points: [
      "Sales and stock reporting",
      "Distributor performance tracking",
      "Route and retailer development support",
      "Operational process improvement"
    ],
    detailedPoints: [
      "Sales tracking support",
      "Stock and reorder visibility",
      "Retailer development planning",
      "Performance reporting",
      "Operational process guidance"
    ]
  },
  {
    title: "Documentation & Governance Module Concepts",
    shortTitle: "Documentation & Governance Systems",
    description:
      "Structured systems for project records, operating procedures, audit trails, evidence files, approvals, and internal accountability workflows.",
    body:
      "Summit Data designs documentation and governance modules that help organisations organise project records, operating procedures, approvals, evidence files, and accountability workflows in a controlled digital environment.",
    tags: ["Governance", "Documentation", "Controls"],
    focus: "Structured records, workflow controls, approvals, evidence files, and operational accountability.",
    value:
      "Supports clearer internal controls by giving teams a practical way to manage documentation, decisions, approvals, and review trails.",
    image: {
      src: "page-images/case-governance-workflows.jpg",
      alt: "Digital document repositories and approval workflow dashboards used for governance controls",
      caption: "Structured records and approval workflows make evidence easier to manage."
    },
    points: [
      "Project records and operating procedures",
      "Evidence and document capture",
      "Approval and review workflows",
      "Audit trails and accountability logs"
    ],
    detailedPoints: [
      "Structured documentation repositories",
      "Evidence and file capture",
      "Approval and review workflows",
      "Audit trails and accountability logs",
      "Compliance support records",
      "Operational governance modules"
    ]
  },
  {
    title: "BigBoxAfrica / Umeme Reference - Tamper-Proofing & Geo-Mapping",
    shortTitle: "BigBoxAfrica / Umeme Reference",
    description:
      "Implementation experience around tamper-proofing, field verification, geo-mapping, and visibility structures for distributed assets and operational locations.",
    body:
      "Summit Data's experience includes solution work around field verification, geo-mapping, tamper-proofing concepts, and asset visibility structures for operational environments with distributed infrastructure.",
    tags: ["Utilities", "Geo-Mapping", "Asset Control"],
    focus: "Tamper-proofing concepts, field verification, geo-mapping, and asset visibility structures.",
    value:
      "Supports practical thinking around how distributed assets can be identified, mapped, verified, and reviewed by operations teams.",
    image: {
      src: "page-images/case-utility-verification.jpg",
      alt: "Field technician verifying utility infrastructure with mobile geo-mapping and asset tags",
      caption: "Field verification links distributed assets to location evidence and review trails."
    },
    points: [
      "Tamper-proofing solution experience",
      "Geo-mapped field locations",
      "Field verification support",
      "Asset visibility structures"
    ],
    detailedPoints: [
      "Location verification concepts",
      "Geo-mapped operational assets",
      "Tamper-proofing support structures",
      "Field evidence and reporting flows"
    ]
  }
];

export const whySummit = [
  "Practical implementation experience across real field operations",
  "Understanding of African distributor networks and mobile teams",
  "Software design combined with rollout, onboarding, and support",
  "Management visibility through structured data and dashboards",
  "Governance, accountability, and documentation built into workflows",
  "Clear feedback loops between field users, supervisors, and leadership"
];

export const industries = [
  "FMCG and distribution",
  "Field sales operations",
  "Asset-heavy businesses",
  "Logistics and route-based operations",
  "Utilities and infrastructure",
  "Financial technology and trust systems",
  "SMEs requiring operational visibility"
];

export const approach = [
  {
    title: "Understand the Operation",
    description:
      "We study the real workflow, users, field realities, data gaps, and management reporting needs."
  },
  {
    title: "Design the System",
    description:
      "We translate business requirements into practical software architecture, workflows, dashboards, and data models."
  },
  {
    title: "Build and Test",
    description:
      "We develop, test, refine, and validate the platform with real users and operational scenarios."
  },
  {
    title: "Roll Out in the Field",
    description:
      "We support onboarding, training, adoption, feedback collection, and issue resolution."
  },
  {
    title: "Improve with Data",
    description:
      "We use dashboards, reports, and operational feedback to improve control, performance, and decision-making."
  }
];

export const capabilities = [
  "Business analysis",
  "Software design",
  "Field implementation",
  "Data management",
  "User onboarding",
  "Reporting and governance"
];
