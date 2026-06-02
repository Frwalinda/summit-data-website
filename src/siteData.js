export const company = {
  name: "Summit Data Ltd",
  email: "admin@summitdataltd.com",
  emailUrl: "mailto:admin@summitdataltd.com",
  phone: "+44 7904 186025 (WhatsApp)",
  whatsappUrl: "https://wa.me/447904186025",
  kenyaPhone: "+254 700 047545",
  website: "www.summitdataltd.com",
  address: "29 Mayward House, Peckham Road, London SE5 7NA",
  location: "UK-based company with implementation experience across Kenya, Uganda, and East Africa"
};

export const navItems = [
  { label: "Home", href: "index.html", id: "home" },
  { label: "Solutions", href: "solutions.html", id: "solutions" },
  { label: "Case Studies", href: "case-studies.html", id: "case-studies" },
  { label: "Industries", href: "industries.html", id: "industries" },
  { label: "About", href: "about.html", id: "about" },
  { label: "Contact", href: "contact.html", id: "contact" }
];

export const proofPoints = [
  "Sales Force Automation rollout",
  "QR and GPS asset verification",
  "Distributor and ASR onboarding",
  "Management dashboards and reporting"
];

export const operatingLayers = [
  {
    label: "Field users",
    detail: "Sales reps, technicians, distributors, supervisors, and regional teams capture activity where work happens."
  },
  {
    label: "Verified data",
    detail: "QR scans, GPS capture, outlet records, routes, forms, and evidence files create a more reliable operating picture."
  },
  {
    label: "Management action",
    detail: "Dashboards and reports help leaders review activity, assets, exceptions, territories, and rollout progress."
  }
];

export const solutions = [
  {
    title: "Sales Force Automation",
    icon: "SFA",
    description:
      "Mobile-first tools for sales activity, outlet visits, distributor workflows, ASR usage, territory visibility, and daily management reporting.",
    outcomes: ["Route and visit visibility", "Distributor onboarding", "Daily sales activity reporting"]
  },
  {
    title: "Asset and Cooler Tracking",
    icon: "QR",
    description:
      "QR-based asset records, mobile scanning, GPS capture, outlet verification, movement history, maintenance workflows, and dashboard reporting.",
    outcomes: ["Cooler and asset registers", "Scan-based verification", "Repair and movement workflows"]
  },
  {
    title: "Geo-Mapping and Field Verification",
    icon: "GPS",
    description:
      "Location-aware systems that connect outlets, territories, teams, assets, and field evidence into map-based operating views.",
    outcomes: ["Outlet geo-mapping", "GPS evidence capture", "Territory and region visibility"]
  },
  {
    title: "Field Data Collection",
    icon: "DATA",
    description:
      "Structured mobile forms and workflows for inspections, onboarding, surveys, audits, stock checks, photos, signatures, and operational records.",
    outcomes: ["Cleaner field records", "Mobile evidence trails", "Offline-aware workflow design"]
  },
  {
    title: "Business Dashboards",
    icon: "KPI",
    description:
      "Leadership dashboards that turn field data into practical performance views, exception tracking, rollout monitoring, and decision support.",
    outcomes: ["Operational KPIs", "Regional performance views", "Management-ready reporting"]
  },
  {
    title: "Workflow Automation",
    icon: "OPS",
    description:
      "Digital workflows for approvals, task follow-up, issue escalation, repairs, documentation, governance, and operating controls.",
    outcomes: ["Approval flows", "Issue and task tracking", "Governance and audit records"]
  }
];

export const featuredSolutions = solutions.slice(0, 4);

export const caseStudies = [
  {
    title: "SBC Kenya / PepsiCo Kenya Sales Force Automation Rollout",
    shortTitle: "SBC Kenya / PepsiCo Kenya SFA Rollout",
    description:
      "A field-tested Sales Force Automation and cooler visibility rollout supporting sales teams, distributors, ASRs, management reporting, QR tagging, and geo-mapped operating data.",
    body:
      "Summit Data Ltd supported a practical SFA rollout for SBC Kenya / PepsiCo Kenya field operations. The work connected outlet activity, distributor and ASR onboarding, QR-based cooler tracking, GPS capture, and daily reporting visibility for management.",
    tags: ["FMCG", "SFA", "Cooler Tracking"],
    focus: "Sales activity, cooler visibility, distributor onboarding, ASR usage, GPS capture, and management reporting.",
    value:
      "Helped turn field activity and asset information into a clearer operating view for sales teams, regional teams, and management.",
    image: {
      src: "page-images/case-sfa-coolers.jpg",
      alt: "Field team using mobile tools to verify outlets, QR-tagged coolers, and mapped sales activity",
      caption: "A practical rollout connecting ASR activity, distributor onboarding, cooler tracking, and management visibility."
    },
    highlights: [
      "Digital Sales Force Automation rollout",
      "Cooler and asset tracking module",
      "QR tagging and geo-mapping",
      "GPS and location-based verification",
      "Distributor and ASR onboarding",
      "Daily reporting visibility for management",
      "Nairobi rollout and Central/Mountain region onboarding",
      "Coastal region planned as the next rollout phase",
      "System stabilisation and continuous enhancement"
    ]
  },
  {
    title: "Cooler Tracking and Field Asset Management",
    shortTitle: "QR Cooler Tracking and Asset Management",
    description:
      "Asset visibility structures for coolers and physical field assets, using QR codes, mobile scanning, outlet verification, GPS capture, maintenance workflows, and dashboards.",
    body:
      "Summit Data designs asset tracking workflows that help teams identify, verify, maintain, and review distributed physical assets. The approach is especially useful where assets move across outlets, territories, and field teams.",
    tags: ["Assets", "QR", "GPS"],
    focus: "QR codes, mobile scans, GPS capture, outlet verification, maintenance records, and dashboard reporting.",
    value:
      "Gives operations teams a clearer view of where assets are, who verified them, what condition they are in, and what action is needed next.",
    image: {
      src: "page-images/projects-cooler-visibility.jpg",
      alt: "QR-tagged coolers and field assets displayed with GPS map points and dashboard records",
      caption: "QR, GPS and mobile verification create a stronger asset evidence trail."
    },
    highlights: [
      "QR and barcode-based asset identification",
      "Mobile scan verification",
      "GPS and outlet location capture",
      "Geo-fencing and exception logic",
      "Maintenance and repair workflows",
      "Asset movement history",
      "Management dashboard reporting"
    ]
  },
  {
    title: "Distribution Operations and Reporting Support",
    shortTitle: "Distribution Operations Support",
    description:
      "Operational support for distribution teams that need clearer visibility over sales activity, stock movement, retailer development, route work, and performance reporting.",
    body:
      "Summit Data has supported distribution operations by structuring how sales activity, stock movement, route work, retailer development, and performance information are captured and reviewed.",
    tags: ["Distribution", "Reporting", "Operations"],
    focus: "Sales tracking, stock visibility, retailer development, route support, and distributor performance reporting.",
    value:
      "Helps distributors and managers organise operational information for planning, accountability, and day-to-day control.",
    image: {
      src: "page-images/case-distribution-reporting.jpg",
      alt: "Distribution team coordinating stock movement, outlet visits, route planning, and performance reporting",
      caption: "Distribution visibility improves when field activity, stock movement, and route execution are connected."
    },
    highlights: [
      "Sales and stock reporting",
      "Distributor performance tracking",
      "Route and retailer development support",
      "Operational process improvement",
      "Regional activity review",
      "Head office reporting support"
    ]
  },
  {
    title: "Geo-Mapping and Utility Field Verification Reference",
    shortTitle: "Geo-Mapping and Field Verification",
    description:
      "Implementation experience around tamper-proofing concepts, field verification, location evidence, geo-mapping, and asset visibility structures for distributed operations.",
    body:
      "Summit Data's experience includes field verification, geo-mapping, tamper-proofing concepts, and practical asset visibility structures for environments where assets and operating locations are spread across the field.",
    tags: ["Utilities", "Geo-Mapping", "Verification"],
    focus: "Location verification, geo-mapped assets, tamper-proofing support, and field evidence workflows.",
    value:
      "Supports organisations that need to identify, map, verify, and review assets or operating locations with better field evidence.",
    image: {
      src: "page-images/case-utility-verification.jpg",
      alt: "Technician verifying distributed infrastructure with a mobile geo-mapping and asset verification workflow",
      caption: "Field verification connects distributed assets to location evidence and review trails."
    },
    highlights: [
      "Location verification concepts",
      "Geo-mapped operational assets",
      "Tamper-proofing support structures",
      "Field evidence and reporting flows",
      "Mobile verification routines"
    ]
  }
];

export const industries = [
  {
    title: "FMCG",
    description:
      "Sales force automation, distributor visibility, cooler tracking, outlet verification, route control, and daily performance reporting."
  },
  {
    title: "Distribution",
    description:
      "Systems for stock movement, route execution, retailer development, sales teams, distributor onboarding, and management reporting."
  },
  {
    title: "Utilities",
    description:
      "Geo-mapping, field verification, tamper-proofing support, distributed asset records, inspections, and evidence-based reporting."
  },
  {
    title: "Logistics",
    description:
      "Route visibility, field task tracking, delivery evidence, vehicle or asset checks, issue escalation, and operational dashboards."
  },
  {
    title: "Retail",
    description:
      "Outlet records, merchandising checks, field audits, retailer onboarding, store execution visibility, and regional performance reviews."
  },
  {
    title: "Field Service Operations",
    description:
      "Technician workflows, job records, repair tracking, maintenance evidence, service dashboards, and accountable follow-up."
  }
];

export const credibilitySignals = [
  {
    title: "Field-tested implementation",
    description:
      "Summit Data focuses on systems that can be adopted by real teams working across outlets, regions, assets, and network conditions."
  },
  {
    title: "Corporate-ready reporting",
    description:
      "Dashboards and reporting structures are shaped for managers, directors, board conversations, and investor-facing visibility."
  },
  {
    title: "Mobile-first workflows",
    description:
      "QR, GPS, forms, photos, outlet records, and scan-based verification are designed around practical field use."
  },
  {
    title: "Africa operating context",
    description:
      "Delivery reflects the realities of African distributor networks, regional teams, field support, onboarding, and phased rollout."
  }
];

export const deliverySteps = [
  {
    title: "Understand the operation",
    description:
      "Map users, routes, assets, forms, reporting needs, data gaps, approvals, and the field realities that will affect adoption."
  },
  {
    title: "Design the operating system",
    description:
      "Translate requirements into workflows, mobile screens, data structures, dashboards, user roles, and rollout priorities."
  },
  {
    title: "Build, test, and stabilise",
    description:
      "Develop the system, validate it with real scenarios, refine the workflow, and stabilise the platform for field use."
  },
  {
    title: "Roll out with users",
    description:
      "Support onboarding, training, feedback loops, issue resolution, regional expansion, and day-to-day adoption."
  },
  {
    title: "Improve with data",
    description:
      "Use dashboards, exception reports, field feedback, and management reviews to keep improving control and performance."
  }
];

export const capabilities = [
  "Business analysis",
  "Software design",
  "Mobile workflows",
  "Field implementation",
  "Dashboard reporting",
  "Data governance",
  "ERPNext configuration",
  "User onboarding"
];
