import fs from "node:fs";
import path from "node:path";
import {
  capabilities,
  caseStudies,
  company,
  credibilitySignals,
  deliverySteps,
  featuredSolutions,
  industries,
  navItems,
  operatingLayers,
  proofPoints,
  solutions
} from "../src/siteData.js";

const root = process.cwd();
const distDir = path.join(root, "dist");
const assetsDir = path.join(distDir, "assets");

const pages = [
  {
    id: "home",
    file: "index.html",
    title: "Summit Data Ltd | Field Systems, SFA, Asset Tracking & Dashboards",
    description:
      "Summit Data Ltd designs and implements field-based business systems for sales force automation, asset tracking, geo-mapping, dashboards, and operational data visibility.",
    body: renderHome()
  },
  {
    id: "solutions",
    file: "solutions.html",
    title: "Solutions | Summit Data Ltd",
    description:
      "Sales Force Automation, asset and cooler tracking, geo-mapping, field data collection, dashboards, and workflow automation for distributed operations.",
    body: renderSolutions()
  },
  {
    id: "case-studies",
    file: "case-studies.html",
    title: "Case Studies | Summit Data Ltd",
    description:
      "Field-tested digital systems for sales visibility, asset control, and operational reporting across East Africa.",
    body: renderCaseStudies()
  },
  {
    id: "industries",
    file: "industries.html",
    title: "Industries | Summit Data Ltd",
    description:
      "Digital field systems for FMCG, distribution, utilities, logistics, retail, and field service operations across African markets.",
    body: renderIndustries()
  },
  {
    id: "about",
    file: "about.html",
    title: "About Summit Data Ltd",
    description:
      "Summit Data Ltd is a UK-based practical digital transformation and implementation partner with Africa field operations experience.",
    body: renderAbout()
  },
  {
    id: "contact",
    file: "contact.html",
    title: "Contact Summit Data Ltd",
    description:
      "Contact Summit Data Ltd about Sales Force Automation, asset tracking, geo-mapping, dashboards, workflow automation, and field implementation support.",
    body: renderContact()
  },
  {
    id: "request-demo",
    file: "request-demo.html",
    title: "Request a Demo or Consultation | Summit Data Ltd",
    description:
      "Request a Summit Data Ltd demo or consultation for Sales Force Automation, asset tracking, geo-mapping, dashboards, ERPNext, workflow automation, and field rollout support.",
    body: renderRequestDemo()
  }
];

const legacyPages = [
  { file: "services.html", destination: "solutions.html", title: "Solutions | Summit Data Ltd" },
  { file: "projects.html", destination: "case-studies.html", title: "Case Studies | Summit Data Ltd" }
];

fs.rmSync(distDir, { recursive: true, force: true });
fs.mkdirSync(assetsDir, { recursive: true });

for (const page of pages) {
  fs.writeFileSync(path.join(distDir, page.file), renderPage(page), "utf8");
}

for (const page of legacyPages) {
  fs.writeFileSync(path.join(distDir, page.file), renderRedirect(page), "utf8");
}

fs.copyFileSync(path.join(root, "src", "styles.css"), path.join(assetsDir, "styles.css"));
fs.copyFileSync(path.join(root, "src", "main.js"), path.join(assetsDir, "main.js"));
fs.copyFileSync(path.join(root, "src", "assets", "hero-field-ops.png"), path.join(assetsDir, "hero-field-ops.png"));
fs.cpSync(path.join(root, "src", "assets", "page-images"), path.join(assetsDir, "page-images"), { recursive: true });
fs.writeFileSync(path.join(distDir, "robots.txt"), "User-agent: *\nAllow: /\nSitemap: /sitemap.xml\n", "utf8");
fs.writeFileSync(path.join(distDir, "sitemap.xml"), renderSitemap(), "utf8");

console.log(`Built ${pages.length} pages and ${legacyPages.length} legacy redirects in dist/`);

function renderPage(page) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${escapeHtml(page.title)}</title>
    <meta name="description" content="${escapeHtml(page.description)}">
    <meta name="theme-color" content="#10233f">
    <meta property="og:title" content="${escapeHtml(page.title)}">
    <meta property="og:description" content="${escapeHtml(page.description)}">
    <meta property="og:type" content="website">
    <link rel="canonical" href="${page.file}">
    <link rel="stylesheet" href="assets/styles.css">
  </head>
  <body>
    <a class="skip-link" href="#main">Skip to content</a>
    ${renderHeader(page.id)}
    <main id="main">
      ${page.body}
    </main>
    ${renderFooter()}
    <script src="assets/main.js" defer></script>
  </body>
</html>`;
}

function renderRedirect(page) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${escapeHtml(page.title)}</title>
    <meta name="description" content="This page has moved.">
    <meta http-equiv="refresh" content="0; url=${page.destination}">
    <link rel="canonical" href="${page.destination}">
  </head>
  <body>
    <main id="main">
      <p>This page has moved to <a href="${page.destination}">${page.destination}</a>.</p>
    </main>
  </body>
</html>`;
}

function renderHeader(activeId) {
  return `<header class="site-header">
  <div class="container nav-shell">
    <a class="brand" href="index.html" aria-label="Summit Data Ltd home">
      <span class="brand-mark">SD</span>
      <span>
        <strong>Summit Data Ltd</strong>
        <small>Field systems and implementation</small>
      </span>
    </a>
    <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="site-nav">
      <span></span><span></span><span></span>
      <span class="sr-only">Toggle navigation</span>
    </button>
    <nav id="site-nav" class="site-nav" aria-label="Primary navigation">
      ${navItems
        .map((item) => `<a href="${item.href}" ${item.id === activeId ? 'aria-current="page"' : ""}>${item.label}</a>`)
        .join("")}
      <a class="nav-cta" href="request-demo.html" ${activeId === "request-demo" ? 'aria-current="page"' : ""}>Request Demo</a>
    </nav>
  </div>
</header>`;
}

function renderFooter() {
  return `<footer class="site-footer">
  <div class="container footer-grid">
    <div>
      <a class="brand footer-brand" href="index.html">
        <span class="brand-mark">SD</span>
        <span>
          <strong>Summit Data Ltd</strong>
          <small>Practical digital transformation partner</small>
        </span>
      </a>
      <p>Field-tested digital systems for sales teams, assets, routes, dashboards, workflows, and management reporting.</p>
    </div>
    <div>
      <h2>Explore</h2>
      <ul>
        ${navItems
          .filter((item) => item.id !== "home")
          .map((item) => `<li><a href="${item.href}">${item.label}</a></li>`)
          .join("")}
      </ul>
    </div>
    <div>
      <h2>Contact</h2>
      <p>${company.email}<br>${company.phone}<br>Kenya: ${company.kenyaPhone}<br>${company.location}</p>
    </div>
    <div>
      <h2>Actions</h2>
      <ul>
        <li><a href="request-demo.html">Request Demo</a></li>
        <li><a href="contact.html">Contact Summit Data</a></li>
        <li><a href="${company.whatsappUrl}">WhatsApp Summit Data</a></li>
      </ul>
    </div>
  </div>
  <div class="container footer-bottom">
    <span>© ${new Date().getFullYear()} Summit Data Ltd. All rights reserved.</span>
  </div>
</footer>`;
}

function renderHome() {
  return `${renderHero()}
${renderOperatingLayers()}
${renderSolutionPreview()}
${renderCaseSpotlight()}
${renderCredibility()}
${renderIndustryPreview()}
${renderCta()}`;
}

function renderHero() {
  return `<section class="hero section">
  <div class="container hero-grid">
    <div class="hero-copy">
      <p class="eyebrow">Digital transformation for field operations</p>
      <h1>Field-tested systems for sales, assets, routes and operational data.</h1>
      <p class="hero-subtitle">Summit Data Ltd designs, deploys and supports practical business systems that help African operations see what is happening in the field, verify assets and outlets, and report with confidence.</p>
      <div class="button-row">
        <a class="button button-primary" href="request-demo.html">Request Demo</a>
        <a class="button button-secondary" href="case-studies.html">View Case Studies</a>
        <a class="button button-secondary" href="solutions.html">Explore Solutions</a>
      </div>
      <div class="hero-proof" aria-label="Summit Data implementation strengths">
        ${proofPoints.map((point) => `<span>${point}</span>`).join("")}
      </div>
    </div>
    ${renderOperationsVisual()}
  </div>
</section>`;
}

function renderOperationsVisual() {
  return `<figure class="hero-image-card" aria-label="Field operations, route visibility, asset tracking, and dashboard reporting visual">
  <img src="assets/hero-field-ops.png" alt="Digital field operations map with route lines, dashboard panels, QR-tagged asset, and mobile GPS verification">
  <figcaption>
    <span>QR, GPS and dashboards</span>
    <strong>Field data becomes an operating view management can act on.</strong>
  </figcaption>
</figure>`;
}

function renderOperatingLayers() {
  return `<section class="section section-tight">
  <div class="container">
    ${renderSectionIntro(
      "How Summit Data Helps",
      "Connect the field, verify the data, and give leaders a clearer operating picture."
    )}
    <div class="layer-grid">
      ${operatingLayers
        .map(
          (layer, index) => `<article class="layer-card">
        <span>${String(index + 1).padStart(2, "0")}</span>
        <h3>${layer.label}</h3>
        <p>${layer.detail}</p>
      </article>`
        )
        .join("")}
    </div>
  </div>
</section>`;
}

function renderSolutionPreview() {
  return `<section class="section section-muted">
  <div class="container">
    ${renderSectionIntro(
      "Core Solutions",
      "Practical systems for field teams, assets, territories, dashboards and workflows."
    )}
    <div class="card-grid four">
      ${featuredSolutions.map(renderSolutionCard).join("")}
    </div>
    <div class="section-action">
      <a class="button button-primary" href="solutions.html">See All Solutions</a>
    </div>
  </div>
</section>`;
}

function renderCaseSpotlight() {
  const caseStudy = caseStudies[0];
  return `<section class="section">
  <div class="container spotlight">
    <div>
      <p class="eyebrow">Featured Case Study</p>
      <h2>${caseStudy.shortTitle}</h2>
      <p>${caseStudy.description}</p>
      <div class="tag-row">${caseStudy.tags.map((tag) => `<span>${tag}</span>`).join("")}</div>
      <div class="button-row">
        <a class="button button-primary" href="case-studies.html">Read the Case Study</a>
        <a class="button button-quiet" href="contact.html">Discuss a Rollout</a>
      </div>
    </div>
    <div class="spotlight-panel">
      <h3>Rollout signals</h3>
      <ul class="feature-list">
        ${caseStudy.highlights.slice(0, 7).map((point) => `<li>${point}</li>`).join("")}
      </ul>
    </div>
  </div>
</section>`;
}

function renderCredibility() {
  return `<section class="section section-dark">
  <div class="container credibility-layout">
    <div>
      <p class="eyebrow">Why Summit Data</p>
      <h2>Implementation discipline, not generic IT language.</h2>
      <p>Summit Data works where software meets real operations: mobile users, distributors, field assets, outlet records, route visibility, governance, and board-level reporting needs.</p>
    </div>
    <div class="credibility-grid">
      ${credibilitySignals
        .map(
          (signal) => `<article>
        <h3>${signal.title}</h3>
        <p>${signal.description}</p>
      </article>`
        )
        .join("")}
    </div>
  </div>
</section>`;
}

function renderIndustryPreview() {
  return `<section class="section">
  <div class="container">
    ${renderSectionIntro("Industries", "Built for organisations with distributed teams, physical assets, and field reporting pressure.")}
    <div class="industry-strip">
      ${industries.map((industry) => `<a href="industries.html">${industry.title}</a>`).join("")}
    </div>
  </div>
</section>`;
}

function renderSolutions() {
  return `${renderPageHero(
    "Solutions",
    "Digital systems for field operations, sales force automation, asset tracking, geo-mapping, dashboards, and workflow automation."
  )}
<section class="section section-tight">
  <div class="container media-split">
    <div class="service-context">
      <p class="eyebrow">Built Around Real Work</p>
      <h2>Each solution starts with the operating routine: who captures the data, who verifies it, who acts on it, and what must be visible to management.</h2>
      <p>Summit Data builds cloud-based, mobile-first workflows that make field activity easier to capture and easier to trust. The goal is not software for its own sake. The goal is operational visibility.</p>
    </div>
    ${renderPageVisual(
      "page-images/services-field-systems.jpg",
      "Field tools, route maps, asset labels, mobile workflows, and dashboard screens connected in one system",
      "Solutions connect mobile field work to dashboards, alerts, evidence records, and management review."
    )}
  </div>
</section>
<section class="section">
  <div class="container">
    <div class="card-grid two">
      ${solutions.map(renderSolutionCard).join("")}
    </div>
  </div>
</section>
${renderDelivery()}
${renderCta()}`;
}

function renderCaseStudies() {
  return `${renderPageHero(
    "Case Studies",
    "Field-tested digital systems for sales visibility, asset control, and operational reporting across East Africa."
  )}
${renderCaseStudiesIntro()}
${renderFeaturedCaseStudy()}
${renderCaseMetrics()}
${renderSupportingCaseCards()}
${renderCaseStudyCta()}`;
}

function renderCaseStudiesIntro() {
  return `<section class="section case-intro-section">
  <div class="container case-intro">
    <p class="lead">Summit Data works on practical digital transformation projects involving field operations, sales teams, asset tracking, geo-mapping, dashboards, and workflow automation.</p>
    <p>Each engagement is built around real field operations: who captures the data, how QR and GPS evidence is verified, what distributors and territory managers need day to day, and how management receives reporting visibility they can act on.</p>
  </div>
</section>`;
}

function renderFeaturedCaseStudy() {
  const featured = caseStudies[0];
  const outcomes = [
    "Sales Force Automation deployment",
    "Cooler and asset tracking",
    "QR tagging and geo-mapping",
    "Distributor and ASR onboarding",
    "Daily reporting visibility",
    "Regional rollout support",
    "Operational dashboards",
    "Field support and stabilisation"
  ];

  return `<section class="section featured-case-section">
  <div class="container">
    <article class="featured-case">
      <div class="featured-case-copy">
        <div class="tag-row">${featured.tags.map((tag) => `<span>${tag}</span>`).join("")}</div>
        <p class="eyebrow">Featured Case Study</p>
        <h2>${featured.title}</h2>
        <p>${featured.body}</p>
        <p>Designed for sales teams, distributors, territory managers, and management reporting, the rollout combined QR, GPS, dashboards, and workflow visibility with practical training, adoption support, and stabilisation.</p>
        <div class="outcome-grid">
          ${outcomes.map((outcome) => `<span>${outcome}</span>`).join("")}
        </div>
      </div>
      ${renderCaseDashboardVisual()}
    </article>
  </div>
</section>`;
}

function renderCaseDashboardVisual() {
  return `<aside class="case-dashboard" aria-label="FMCG field operations command centre visual">
  <div class="dashboard-toolbar">
    <div>
      <span>FMCG Field Operations Command Centre</span>
      <strong>Route and outlet intelligence</strong>
    </div>
    <div class="dashboard-status"><span></span> Live rollout dashboard</div>
  </div>
  <div class="command-grid">
    <section class="command-map" aria-label="Territory map with route lines and asset markers">
      <div class="map-heading">
        <span>Territory Map</span>
        <strong>Nairobi rollout view</strong>
      </div>
      <svg class="territory-svg" viewBox="38 38 384 238" role="img" aria-label="Regional route visibility map">
        <path class="geo-shape shape-one" d="M55 176 C83 94 143 48 218 65 C292 82 354 45 407 95 L386 232 C315 250 243 223 187 246 C122 272 75 236 55 176 Z"></path>
        <path class="geo-shape shape-two" d="M126 98 C176 132 212 129 255 96 C295 65 343 76 381 120"></path>
        <path class="geo-route route-a" d="M82 210 C136 170 160 139 210 151 C260 163 282 121 335 98"></path>
        <path class="geo-route route-b" d="M118 82 C158 118 192 205 248 212 C298 218 324 172 388 158"></path>
        <path class="geo-route route-c" d="M93 240 C144 229 172 197 218 196 C274 195 302 237 363 219"></path>
        <circle class="asset-marker marker-one" cx="92" cy="209" r="8"></circle>
        <circle class="asset-marker marker-two" cx="208" cy="151" r="8"></circle>
        <circle class="asset-marker marker-three" cx="336" cy="98" r="8"></circle>
        <circle class="asset-marker marker-four" cx="389" cy="158" r="8"></circle>
        <circle class="asset-marker marker-five" cx="249" cy="212" r="8"></circle>
      </svg>
      <div class="map-float-card">
        <span>Geo-tagged assets</span>
        <strong>1,500+</strong>
        <small>Coolers verified</small>
      </div>
      <div class="route-compliance">
        <span>Route compliance</span>
        <strong>86%</strong>
      </div>
    </section>
    <section class="command-side" aria-label="Live activity and verification queue">
      <div class="queue-card">
        <div class="widget-head">
          <span>Verification Queue</span>
          <strong>Pending validations</strong>
        </div>
        <div class="queue-row"><span>Outlet verification</span><strong>142</strong></div>
        <div class="queue-row"><span>Cooler exceptions</span><strong>18</strong></div>
        <div class="queue-row"><span>Distributor activity</span><strong>50+</strong></div>
      </div>
      <div class="trend-card">
        <div class="widget-head">
          <span>Daily field submissions</span>
          <strong>Activity trend</strong>
        </div>
        <svg viewBox="0 0 220 92" aria-hidden="true">
          <path class="trend-area" d="M8 78 L8 62 C35 55 52 68 74 48 C98 26 122 48 145 34 C172 18 190 26 212 12 L212 78 Z"></path>
          <path class="trend-line" d="M8 62 C35 55 52 68 74 48 C98 26 122 48 145 34 C172 18 190 26 212 12"></path>
        </svg>
      </div>
      <div class="feed-card">
        <span class="feed-dot"></span>
        <p>Central region onboarding complete</p>
        <small>Field adoption support active</small>
      </div>
    </section>
  </div>
  <div class="command-kpis">
    <div><span>Distributors</span><strong>50+</strong></div>
    <div><span>Coolers verified</span><strong>1,500+</strong></div>
    <div><span>Outlet potential</span><strong>5,000+</strong></div>
    <div><span>Regional rollout</span><strong>Multi-region</strong></div>
  </div>
</aside>`;
}

function renderCaseMetrics() {
  const metrics = [
    ["50+", "distributors onboarded"],
    ["1,500+", "coolers tagged and verified in Nairobi rollout"],
    ["5,000+", "outlet coverage potential"],
    ["Multi-region", "rollout support"],
    ["Daily", "management reporting visibility"]
  ];

  return `<section class="section section-muted case-metrics-section">
  <div class="container">
    ${renderSectionIntro("Impact Metrics", "Evidence points from field rollout, asset verification, regional support, and reporting visibility.")}
    <div class="metric-grid">
      ${metrics.map(([value, label]) => `<article class="metric-card"><strong>${value}</strong><span>${label}</span></article>`).join("")}
    </div>
  </div>
</section>`;
}

function renderSupportingCaseCards() {
  const cards = [
    {
      title: "Asset Tracking & Geo-Mapping",
      visual: "asset",
      description:
        "Asset visibility structures for coolers and physical field assets using QR codes, mobile scans, GPS capture, and outlet verification.",
      points: ["Asset registers with evidence trails", "GPS and outlet location capture", "Movement, repair, and exception visibility"]
    },
    {
      title: "Field Data Collection & Verification",
      visual: "field",
      description:
        "Mobile workflows for teams that need reliable records from outlet visits, inspections, onboarding, audits, and field evidence capture.",
      points: ["Structured forms and photo evidence", "Offline-aware field routines", "Supervisor review and verification flows"]
    },
    {
      title: "Dashboards & Operational Reporting",
      visual: "reporting",
      description:
        "Reporting views that help managers review activity, assets, routes, exceptions, regional progress, and rollout performance.",
      points: ["Daily operating dashboards", "Regional performance views", "Management-ready reporting packs"]
    }
  ];

  return `<section class="section">
  <div class="container">
    ${renderSectionIntro("Supporting Case Work", "Capability areas that turn field activity into better operating control.")}
    <div class="support-case-grid">
      ${cards.map(renderSupportCaseCard).join("")}
    </div>
  </div>
</section>`;
}

function renderSupportCaseCard(card) {
  return `<article class="support-case-card">
  ${renderSupportVisual(card.visual)}
  <h3>${card.title}</h3>
  <p>${card.description}</p>
  <ul>
    ${card.points.map((point) => `<li>${point}</li>`).join("")}
  </ul>
</article>`;
}

function renderSupportVisual(type) {
  if (type === "asset") {
    return `<div class="support-visual asset-visual" aria-label="Asset tracking and geo-mapping interface visual">
    <div class="mini-map-layer">
      <span class="geo-fence"></span>
      <span class="asset-pin pin-a"></span>
      <span class="asset-pin pin-b"></span>
      <span class="asset-pin pin-c"></span>
      <span class="asset-route"></span>
    </div>
    <div class="asset-register">
      <strong>Cooler Register</strong>
      <span>Geo-tagged assets</span>
      <span>Movement exception</span>
    </div>
    <div class="mini-qr" aria-hidden="true"><span></span><span></span><span></span><span></span><span></span><span></span></div>
  </div>`;
  }

  if (type === "field") {
    return `<div class="support-visual field-visual" aria-label="Mobile field data collection interface visual">
    <div class="phone-mockup">
      <div class="phone-top"></div>
      <strong>Outlet verification</strong>
      <span class="form-line wide"></span>
      <span class="form-line"></span>
      <div class="photo-evidence">Photo evidence</div>
      <div class="check-row"><span></span> GPS captured</div>
      <div class="check-row"><span></span> Offline sync ready</div>
    </div>
    <div class="activity-timeline">
      <span></span><span></span><span></span>
    </div>
  </div>`;
  }

  return `<div class="support-visual reporting-visual" aria-label="Executive dashboard and operational reporting visual">
    <div class="report-screen">
      <div class="report-kpis">
        <span>Sales activity</span>
        <span>Route compliance</span>
        <span>Exceptions</span>
      </div>
      <div class="report-chart">
        <span style="height: 45%"></span>
        <span style="height: 72%"></span>
        <span style="height: 58%"></span>
        <span style="height: 84%"></span>
        <span style="height: 66%"></span>
      </div>
      <div class="report-table">
        <span>Region performance</span>
        <span>Daily reporting</span>
        <span>Management review</span>
      </div>
    </div>
    <div class="alert-chip">Exception alert</div>
  </div>`;
}

function renderCaseStudyCta() {
  return `<section class="cta-section">
  <div class="container cta-box">
    <div>
      <p class="eyebrow">Start a Conversation</p>
      <h2>Ready to turn field activity into management visibility?</h2>
      <p>Summit Data helps organisations design, deploy, and support practical digital systems for real-world operations.</p>
    </div>
    <div class="cta-actions">
      <a class="button button-light" href="contact.html">Talk to Summit Data</a>
    </div>
  </div>
</section>`;
}

function renderIndustries() {
  return `${renderPageHero(
    "Industries",
    "Summit Data supports sectors where teams, routes, outlets, assets, technicians, and managers need better shared visibility."
  )}
<section class="section section-tight">
  <div class="container">
    ${renderPageVisual(
      "page-images/industries-network.jpg",
      "Distribution routes, utilities infrastructure, retail outlets, warehouses, field teams, and asset locations connected by operational data",
      "Different sectors share the same challenge: turning field reality into reliable operating data."
    )}
  </div>
</section>
<section class="section">
  <div class="container">
    <div class="industry-grid">
      ${industries.map(renderIndustryCard).join("")}
    </div>
  </div>
</section>
${renderCta()}`;
}

function renderAbout() {
  return `${renderPageHero(
    "About Summit Data Ltd",
    "A UK-based practical digital transformation and implementation partner with hands-on Africa field operations experience."
  )}
<section class="section">
  <div class="container split">
    <div>
      <p class="lead">Summit Data Ltd helps organisations design, deploy, and support practical digital systems for field-based business operations.</p>
      <p>The company works across software design, Sales Force Automation, asset tracking, geo-mapping, workflow automation, dashboards, data collection, and field rollout support. The emphasis is practical delivery: systems that can be used by field teams and understood quickly by management.</p>
      <p>Summit Data Ltd is registered in the United Kingdom and brings implementation experience across Kenya, Uganda, and the wider East African market. Its work is strongest where clients need both technical capability and hands-on rollout support.</p>
      <p>Typical users include distributors, sales representatives, territory managers, technicians, regional teams, and head office reporting teams.</p>
    </div>
    <div class="about-aside">
      <div class="panel">
        <h2>Capabilities</h2>
        <div class="pill-list">
          ${capabilities.map((item) => `<span>${item}</span>`).join("")}
        </div>
      </div>
      ${renderPageVisual(
        "page-images/about-implementation.jpg",
        "Implementation team reviewing field operations data, dashboard reporting, and East Africa route visibility",
        "Software design grounded in field realities, management reporting, and supported rollout."
      )}
    </div>
  </div>
</section>
${renderDelivery()}
${renderCta()}`;
}

function renderContact() {
  return `${renderPageHero(
    "Contact",
    "Tell us about the field operation, asset network, sales team, dashboard, or workflow you want to improve."
  )}
<section class="section">
  <div class="container contact-grid">
    <form class="contact-form" name="contact" method="post" action="/api/contact" data-contact-form data-email-to="${company.email}">
      <input type="hidden" name="subject" value="New website enquiry - Summit Data Ltd">
      <input class="form-honey" type="text" name="_honey" tabindex="-1" autocomplete="off" aria-hidden="true">
      <label>
        Name
        <input type="text" name="name" autocomplete="name" required>
      </label>
      <label>
        Organisation
        <input type="text" name="organisation" autocomplete="organization">
      </label>
      <label>
        Email
        <input type="email" name="email" autocomplete="email" required>
      </label>
      <label>
        What do you want to improve?
        <textarea name="message" rows="6" required></textarea>
      </label>
      <button class="button button-primary" type="submit">Send Message</button>
      <p class="form-note">Messages are sent to ${company.email} when email delivery is configured. You can also contact Summit Data directly by email or WhatsApp.</p>
      <p class="form-status" data-form-status role="status" aria-live="polite"></p>
    </form>
    <aside class="contact-panel">
      <h2>Contact Details</h2>
      ${renderPageVisual(
        "page-images/contact-consultation.jpg",
        "Consultant discussing field operations dashboards, route data, and asset visibility with a client",
        "Start with the operating problem, then shape the right system and rollout path."
      )}
      <p><strong>Email</strong><br><a href="${company.emailUrl}">${company.email}</a></p>
      <p><strong>Phone</strong><br>${company.phone}<br>Kenya: ${company.kenyaPhone}</p>
      <p><strong>Website</strong><br>${company.website}</p>
      <p><strong>Registered Address</strong><br>${company.address}</p>
      <p><strong>Operations</strong><br>${company.location}</p>
      <a class="button button-quiet contact-whatsapp" href="request-demo.html">Request Demo or Consultation</a>
      <a class="button button-primary contact-whatsapp" href="${company.whatsappUrl}">Message on WhatsApp</a>
    </aside>
  </div>
</section>`;
}

function renderRequestDemo() {
  return `${renderPageHero(
    "Request a Demo or Consultation",
    "Tell us a little about your organisation and the field operation, sales, asset tracking, reporting, or workflow challenge you would like to improve. Our team will review your request and get back to you."
  )}
<section class="section request-demo-section">
  <div class="container request-demo-shell">
    <div class="request-demo-intro">
      <p class="eyebrow">Structured Enquiry</p>
      <h2>Share the field operation or workflow you want to improve.</h2>
      <p>Summit Data uses the details below to understand the right conversation, whether you need a product walkthrough, implementation consultation, reporting review, or rollout planning support.</p>
      <div class="request-demo-points">
        <span>Sales teams</span>
        <span>Asset visibility</span>
        <span>Geo-mapping</span>
        <span>Dashboards</span>
      </div>
    </div>
    <form class="contact-form request-demo-form" name="request-demo" method="post" action="/api/contact" data-contact-form data-email-to="${company.email}">
      <input type="hidden" name="subject" value="Request Demo - Summit Data Ltd Website">
      <input type="hidden" name="request_type" value="request_demo">
      <input class="form-honey" type="text" name="_honey" tabindex="-1" autocomplete="off" aria-hidden="true">
      <div class="request-demo-form-grid">
        <label>
          First Name *
          <input type="text" name="first_name" autocomplete="given-name" required>
        </label>
        <label>
          Last Name
          <input type="text" name="last_name" autocomplete="family-name">
        </label>
        <label>
          Email *
          <input type="email" name="email" autocomplete="email" required>
        </label>
        <label>
          Phone *
          <input type="tel" name="phone" autocomplete="tel" required>
        </label>
        <label>
          Organisation / Business Name
          <input type="text" name="organisation" autocomplete="organization">
        </label>
        <label>
          Country / City
          <input type="text" name="location" autocomplete="address-level2">
        </label>
        <label>
          Industry
          <input type="text" name="industry">
        </label>
        <label>
          Best time to call
          <input type="text" name="best_time_to_call" placeholder="Morning, afternoon, or a preferred day">
        </label>
        <label class="form-span">
          Solution of interest
          <select name="solution_interest">
            <option value="">Select a solution</option>
            ${renderSolutionInterestOptions()}
          </select>
        </label>
        <label class="form-span">
          Message / Brief requirement
          <textarea name="message" rows="6"></textarea>
        </label>
      </div>
      <button class="button button-primary" type="submit">Request Demo</button>
      <p class="form-note">Messages are sent to ${company.email} when email delivery is configured. You can also contact Summit Data directly by email or WhatsApp.</p>
      <p class="form-status" data-form-status role="status" aria-live="polite"></p>
    </form>
  </div>
</section>`;
}

function renderSolutionInterestOptions() {
  const options = [
    "Sales Force Automation",
    "Cooler / Asset Tracking",
    "Geo-mapping & Field Verification",
    "Dashboards & Reporting",
    "ERPNext / Workflow Automation",
    "Data Cleaning & Documentation Systems",
    "Field Training & Rollout Support",
    "Other"
  ];

  return options.map((option) => `<option value="${escapeHtml(option)}">${option}</option>`).join("");
}

function renderDelivery() {
  return `<section class="section section-muted">
  <div class="container">
    ${renderSectionIntro("Delivery Approach", "A clear path from operational discovery to field adoption and continuous improvement.")}
    <div class="process-grid">
      ${deliverySteps
        .map(
          (step, index) => `<article>
        <span>${String(index + 1).padStart(2, "0")}</span>
        <h3>${step.title}</h3>
        <p>${step.description}</p>
      </article>`
        )
        .join("")}
    </div>
  </div>
</section>`;
}

function renderCta() {
  return `<section class="cta-section">
  <div class="container cta-box">
    <div>
      <p class="eyebrow">Start a Conversation</p>
      <h2>Need clearer visibility across field operations?</h2>
      <p>Bring the operating problem. Summit Data can help shape the system, rollout plan, data model, and reporting view.</p>
    </div>
    <div class="cta-actions">
      <a class="button button-light" href="${company.whatsappUrl}">WhatsApp Us</a>
      <a class="button button-outline" href="contact.html">Contact Details</a>
    </div>
  </div>
</section>`;
}

function renderPageHero(title, description) {
  return `<section class="page-hero section">
  <div class="container narrow">
    <p class="eyebrow">Summit Data Ltd</p>
    <h1>${title}</h1>
    <p>${description}</p>
  </div>
</section>`;
}

function renderSectionIntro(title, description) {
  return `<div class="section-intro">
    <p class="eyebrow">${title}</p>
    <h2>${description}</h2>
  </div>`;
}

function renderPageVisual(src, alt, caption) {
  return `<figure class="visual-card">
  <img src="assets/${src}" alt="${alt}">
  <figcaption>${caption}</figcaption>
</figure>`;
}

function renderSolutionCard(solution) {
  return `<article class="solution-card">
  <span class="icon-badge">${solution.icon}</span>
  <h3>${solution.title}</h3>
  <p>${solution.description}</p>
  <ul>
    ${solution.outcomes.map((outcome) => `<li>${outcome}</li>`).join("")}
  </ul>
</article>`;
}

function renderCaseStudy(caseStudy) {
  return `<article class="case-study">
  <div>
    <div class="tag-row">${caseStudy.tags.map((tag) => `<span>${tag}</span>`).join("")}</div>
    <h2>${caseStudy.title}</h2>
    <p>${caseStudy.body}</p>
    <div class="case-notes">
      <div>
        <strong>Implementation focus</strong>
        <span>${caseStudy.focus}</span>
      </div>
      <div>
        <strong>Operational value</strong>
        <span>${caseStudy.value}</span>
      </div>
    </div>
  </div>
  <div class="case-side">
    <ul class="feature-list">
      ${caseStudy.highlights.map((point) => `<li>${point}</li>`).join("")}
    </ul>
    ${renderCaseImage(caseStudy.image)}
  </div>
</article>`;
}

function renderCaseImage(image) {
  if (!image) return "";
  return `<figure class="case-image">
    <img src="assets/${image.src}" alt="${image.alt}">
    <figcaption>${image.caption}</figcaption>
  </figure>`;
}

function renderIndustryCard(industry) {
  return `<article class="industry-card">
  <span></span>
  <h2>${industry.title}</h2>
  <p>${industry.description}</p>
</article>`;
}

function renderSitemap() {
  const urls = pages.map((page) => `  <url><loc>/${page.file}</loc></url>`).join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}
