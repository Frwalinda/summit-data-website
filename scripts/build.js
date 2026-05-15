import fs from "node:fs";
import path from "node:path";
import {
  approach,
  capabilities,
  company,
  credibilitySignals,
  featuredServices,
  industries,
  navItems,
  operatingRealities,
  projects,
  services,
  whySummit
} from "../src/siteData.js";

const root = process.cwd();
const distDir = path.join(root, "dist");
const assetsDir = path.join(distDir, "assets");

const pages = [
  {
    id: "home",
    file: "index.html",
    title: "Summit Data Ltd | Practical Digital Systems",
    description:
      "Summit Data Ltd builds practical digital systems for field operations, sales, assets, dashboards, workflow automation, and implementation support in East Africa.",
    body: renderHome()
  },
  {
    id: "about",
    file: "about.html",
    title: "About Summit Data Ltd",
    description:
      "Learn how Summit Data Ltd combines software design, field implementation, data systems, onboarding, reporting, and governance for practical operations improvement.",
    body: renderAbout()
  },
  {
    id: "services",
    file: "services.html",
    title: "Services | Summit Data Ltd",
    description:
      "Sales Force Automation, asset tracking, geo-mapping, dashboards, workflow automation, ERPNext customization, and field implementation support.",
    body: renderServices()
  },
  {
    id: "projects",
    file: "projects.html",
    title: "Projects & Case Studies | Summit Data Ltd",
    description:
      "High-level implementation experience in Sales Force Automation, cooler tracking, distribution support, documentation governance, geo-mapping, and asset visibility.",
    body: renderProjects()
  },
  {
    id: "industries",
    file: "industries.html",
    title: "Industries | Summit Data Ltd",
    description:
      "Digital systems for FMCG, distribution, field sales, asset-heavy businesses, logistics, utilities, fintech partners, and SMEs that need operational visibility.",
    body: renderIndustries()
  },
  {
    id: "approach",
    file: "approach.html",
    title: "Approach | Summit Data Ltd",
    description:
      "Summit Data Ltd's implementation approach: understand operations, design the system, build and test, roll out in the field, and improve with data.",
    body: renderApproach()
  },
  {
    id: "contact",
    file: "contact.html",
    title: "Contact Summit Data Ltd",
    description:
      "Start a conversation with Summit Data Ltd about field operations, asset tracking, Sales Force Automation, dashboards, workflow automation, and rollout support.",
    body: renderContact()
  }
];

fs.rmSync(distDir, { recursive: true, force: true });
fs.mkdirSync(assetsDir, { recursive: true });

for (const page of pages) {
  fs.writeFileSync(path.join(distDir, page.file), renderPage(page), "utf8");
}

fs.copyFileSync(path.join(root, "src", "styles.css"), path.join(assetsDir, "styles.css"));
fs.copyFileSync(path.join(root, "src", "main.js"), path.join(assetsDir, "main.js"));
fs.copyFileSync(path.join(root, "src", "assets", "hero-field-ops.png"), path.join(assetsDir, "hero-field-ops.png"));
fs.cpSync(path.join(root, "src", "assets", "page-images"), path.join(assetsDir, "page-images"), { recursive: true });
fs.writeFileSync(
  path.join(distDir, "robots.txt"),
  "User-agent: *\nAllow: /\nSitemap: /sitemap.xml\n",
  "utf8"
);
fs.writeFileSync(
  path.join(distDir, "sitemap.xml"),
  renderSitemap(),
  "utf8"
);

console.log(`Built ${pages.length} pages in dist/`);

function renderPage(page) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${escapeHtml(page.title)}</title>
    <meta name="description" content="${escapeHtml(page.description)}">
    <meta name="theme-color" content="#0b2346">
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

function renderHeader(activeId) {
  return `<header class="site-header">
  <div class="container nav-shell">
    <a class="brand" href="index.html" aria-label="Summit Data Ltd home">
      <span class="brand-mark">SD</span>
      <span>
        <strong>Summit Data Ltd</strong>
        <small>Digital systems & implementation</small>
      </span>
    </a>
    <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="site-nav">
      <span></span><span></span><span></span>
      <span class="sr-only">Toggle navigation</span>
    </button>
    <nav id="site-nav" class="site-nav" aria-label="Primary navigation">
      ${navItems
        .map(
          (item) =>
            `<a href="${item.href}" ${item.id === activeId ? 'aria-current="page"' : ""}>${item.label}</a>`
        )
        .join("")}
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
          <small>Practical digital systems for operations</small>
        </span>
      </a>
      <p>Technology and implementation support for field teams, assets, workflows, dashboards, and management reporting.</p>
    </div>
    <div>
      <h2>Company</h2>
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
  </div>
  <div class="container footer-bottom">
    <span>© ${new Date().getFullYear()} Summit Data Ltd. All rights reserved.</span>
  </div>
</footer>`;
}

function renderHome() {
  return `${renderHero()}
${renderWhatWeDo()}
${renderOperatingRealities()}
${renderFeaturedWork()}
${renderWhySummit()}
${renderProcessStrip()}
${renderCta()}`;
}

function renderHero() {
  return `<section class="hero section">
  <div class="container hero-grid">
    <div class="hero-copy">
      <p class="eyebrow">Digital systems for field operations in East Africa</p>
      <h1>Practical Digital Systems for Field Operations, Sales, Assets & Data</h1>
      <p class="hero-subtitle">Summit Data Ltd helps organisations design, build, and implement digital platforms that improve visibility, accountability, reporting, and operational control across distributed teams and field assets.</p>
      <div class="button-row">
        <a class="button button-primary" href="projects.html">View Our Work</a>
        <a class="button button-secondary" href="${company.whatsappUrl}">WhatsApp Summit Data</a>
      </div>
      <div class="hero-proof" aria-label="Summit Data implementation focus">
        <span>Field rollout</span>
        <span>Asset visibility</span>
        <span>Dashboards</span>
        <span>Governance</span>
      </div>
    </div>
    ${renderOperationsVisual()}
  </div>
</section>`;
}

function renderOperationsVisual() {
  return `<figure class="hero-image-card" aria-label="Field operations, asset tracking, geo-mapping, and dashboard visibility visual">
  <img src="assets/hero-field-ops.png" alt="Digital field operations map with route lines, dashboard panels, QR-tagged asset, and mobile GPS verification">
  <figcaption>
    <span>Geo-mapped operations</span>
    <strong>Assets, outlets, teams and dashboards in one operating view.</strong>
  </figcaption>
</figure>`;
}

function renderWhatWeDo() {
  return `<section class="section">
  <div class="container">
    ${renderSectionIntro(
      "What We Do",
      "Summit Data builds practical digital systems that connect field activity, assets, workflows, and management reporting."
    )}
    <div class="card-grid three">
      ${featuredServices.map(renderServiceCard).join("")}
    </div>
  </div>
</section>`;
}

function renderOperatingRealities() {
  return `<section class="section section-tight">
  <div class="container">
    <div class="reality-panel">
      <div>
        <p class="eyebrow">Built For Field Reality</p>
        <h2>Practical systems for teams working across routes, outlets, assets, and territories.</h2>
      </div>
      <div class="reality-grid">
        ${operatingRealities
          .map(
            (item) => `<article>
          <h3>${item.title}</h3>
          <p>${item.description}</p>
        </article>`
          )
          .join("")}
      </div>
    </div>
  </div>
</section>`;
}

function renderFeaturedWork() {
  return `<section class="section section-muted">
  <div class="container">
    ${renderSectionIntro(
      "Featured Work",
      "Implementation experience presented at a high level, with focus on capability, rollout, and operational visibility."
    )}
    <div class="card-grid three">
      ${projects.slice(0, 3).map(renderProjectCard).join("")}
    </div>
  </div>
</section>`;
}

function renderWhySummit() {
  return `<section class="section">
  <div class="container split why-layout">
    <div>
      <p class="eyebrow">Why Summit Data</p>
      <h2>Software design with field implementation discipline.</h2>
      <p>Summit Data works where software meets the real operating environment: mobile users, distributor networks, asset locations, documentation, data quality, and leadership reporting.</p>
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
    <div class="check-list why-checks">
      ${whySummit.map((item) => `<div><span></span>${item}</div>`).join("")}
    </div>
  </div>
</section>`;
}

function renderProcessStrip() {
  return `<section class="section section-compact">
  <div class="container">
    ${renderSectionIntro("Process", "A clear delivery path from operational understanding to supported field adoption.")}
    <div class="process-strip">
      ${approach
        .map((step, index) => `<div><span>${String(index + 1).padStart(2, "0")}</span><strong>${step.title}</strong></div>`)
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
      <h2>Need a practical digital system for your operations?</h2>
      <p>Tell us what needs to be visible, controlled, automated, or reported. We will help shape a realistic system and rollout plan.</p>
    </div>
    <div class="cta-actions">
      <a class="button button-light" href="${company.whatsappUrl}">WhatsApp Us</a>
      <a class="button button-outline" href="contact.html">Contact Details</a>
    </div>
  </div>
</section>`;
}

function renderAbout() {
  return `${renderPageHero(
    "About Summit Data Ltd",
    "A digital systems and implementation company focused on operational visibility, accountability, and decision-making."
  )}
<section class="section">
  <div class="container split">
    <div>
      <p class="lead">Summit Data Ltd works with organisations that need practical digital tools to manage operations, field teams, assets, data, and reporting.</p>
      <p>Summit Data Ltd is a digital systems and implementation company focused on helping organisations improve operational visibility, accountability, and decision-making. We work across software development, field rollout, data systems, asset tracking, workflow automation, and management reporting.</p>
      <p>Summit Data Ltd is registered in the United Kingdom and supports operations in Kenya, Uganda, and across East Africa, with a practical focus on African field operations and distributed teams.</p>
      <p>Our work is strongest when technology must be adopted by real users in real operating conditions: distributors, sales teams, supervisors, field assets, route-based teams, and leadership teams that need clearer information.</p>
    </div>
    <div class="about-aside">
      <div class="panel">
        <h2>How We Combine the Work</h2>
        <div class="pill-list">
          ${capabilities.map((item) => `<span>${item}</span>`).join("")}
        </div>
      </div>
      ${renderPageVisual(
        "page-images/about-implementation.jpg",
        "Implementation team reviewing field operations data and East Africa route visibility",
        "Software design grounded in field realities, management reporting, and supported rollout."
      )}
    </div>
  </div>
</section>
${renderCta()}`;
}

function renderServices() {
  return `${renderPageHero(
    "Services",
    "Focused services for field operations, digital workflows, asset visibility, dashboards, and practical implementation support."
  )}
<section class="section section-tight">
  <div class="container media-split">
    <div class="service-context">
      <p class="eyebrow">Implementation Focus</p>
      <h2>Each service is designed to move from business requirement to working field adoption.</h2>
      <p>Summit Data keeps the work grounded in operating routines: who captures the data, who verifies it, who reviews it, and what decision the information should support.</p>
    </div>
    ${renderPageVisual(
      "page-images/services-field-systems.jpg",
      "Field tools, asset labels, route maps, workflows, and dashboard screens connected in one service environment",
      "Tools, workflows, asset visibility and dashboards connected around real operating routines."
    )}
  </div>
</section>
<section class="section">
  <div class="container">
    <div class="card-grid two">
      ${services.map(renderServiceCard).join("")}
    </div>
  </div>
</section>
${renderCta()}`;
}

function renderProjects() {
  return `${renderPageHero(
    "Projects & Case Studies",
    "Selected implementation experience, described at a professional level without exposing confidential operating details."
  )}
<section class="section section-tight">
  <div class="container">
    ${renderPageVisual(
      "page-images/approach-delivery.jpg",
      "Implementation team reviewing project stages from discovery through field rollout and dashboard reporting",
      "Case-study work shows the full delivery path from field discovery to working management visibility."
    )}
  </div>
</section>
<section class="section">
  <div class="container case-stack">
    ${projects.map(renderCaseStudy).join("")}
  </div>
</section>
${renderCta()}`;
}

function renderIndustries() {
  return `${renderPageHero(
    "Industries",
    "Digital systems for organisations that operate across field teams, routes, assets, locations, workflows, and reporting layers."
  )}
<section class="section section-tight">
  <div class="container">
    ${renderPageVisual(
      "page-images/industries-network.jpg",
      "Distribution routes, utilities, warehouses, field teams, and asset locations connected by operational data",
      "Different sectors share the same need: visible routes, accountable assets and reliable management data."
    )}
  </div>
</section>
<section class="section">
  <div class="container">
    <div class="industry-grid">
      ${industries
        .map(
          (industry) => `<article class="industry-card">
        <span></span>
        <h2>${industry}</h2>
        <p>Practical systems for visibility, control, reporting, and accountable execution across distributed operations.</p>
      </article>`
        )
        .join("")}
    </div>
  </div>
</section>
${renderCta()}`;
}

function renderApproach() {
  return `${renderPageHero(
    "Approach",
    "A simple implementation path built around real workflows, working software, field adoption, and better data visibility."
  )}
<section class="section">
  <div class="container approach-layout">
    <div class="timeline">
      ${approach.map(renderApproachStep).join("")}
    </div>
    ${renderPageVisual(
      "page-images/approach-delivery.jpg",
      "Implementation team moving from process mapping through testing, field rollout, and dashboard review",
      "A disciplined delivery path from operational discovery to measurable adoption."
    )}
  </div>
</section>
${renderCta()}`;
}

function renderContact() {
  return `${renderPageHero(
    "Contact",
    "Tell us about the operation you want to improve. We will help you think through the right digital system, rollout plan, and data visibility structure."
  )}
<section class="section">
  <div class="container contact-grid">
    <form class="contact-form" name="contact" method="post">
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
      <p class="form-note">This static form is ready for connection to your preferred email or CRM service.</p>
    </form>
    <aside class="contact-panel">
      <h2>Contact Details</h2>
      ${renderPageVisual(
        "page-images/contact-consultation.jpg",
        "Consultant discussing operational dashboard and field route data with a client",
        "Start with the operating problem, then shape the right system and rollout path."
      )}
      <p><strong>Email</strong><br>${company.email}</p>
      <p><strong>Phone</strong><br>${company.phone}<br>Kenya: ${company.kenyaPhone}</p>
      <p><strong>Website</strong><br>${company.website}</p>
      <p><strong>Registered Address</strong><br>${company.address}</p>
      <p><strong>Operations</strong><br>${company.location}</p>
      <a class="button button-primary contact-whatsapp" href="${company.whatsappUrl}">Message on WhatsApp</a>
      <div class="contact-highlight">
        <strong>Good fit conversations</strong>
        <span>Field systems, asset tracking, SFA rollout, dashboards, workflow automation, documentation, and reporting governance.</span>
      </div>
    </aside>
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

function renderServiceCard(service) {
  return `<article class="service-card">
  <span class="icon-badge">${service.icon}</span>
  <h3>${service.title}</h3>
  <p>${service.description}</p>
</article>`;
}

function renderProjectCard(project) {
  return `<article class="project-card">
  <div class="tag-row">${project.tags.map((tag) => `<span>${tag}</span>`).join("")}</div>
  <h3>${project.shortTitle}</h3>
  <p>${project.description}</p>
  <div class="project-focus">
    <strong>Implementation focus</strong>
    <span>${project.focus}</span>
  </div>
  <ul>
    ${project.points.slice(0, 4).map((point) => `<li>${point}</li>`).join("")}
  </ul>
</article>`;
}

function renderCaseStudy(project) {
  return `<article class="case-study">
  <div>
    <div class="tag-row">${project.tags.map((tag) => `<span>${tag}</span>`).join("")}</div>
    <h2>${project.title}</h2>
    <p>${project.body}</p>
    <div class="case-notes">
      <div>
        <strong>Implementation focus</strong>
        <span>${project.focus}</span>
      </div>
      <div>
        <strong>Operational value</strong>
        <span>${project.value}</span>
      </div>
    </div>
  </div>
  <div class="case-side">
    <ul class="feature-list">
      ${project.detailedPoints.map((point) => `<li>${point}</li>`).join("")}
    </ul>
    ${renderCaseImage(project.image)}
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

function renderApproachStep(step, index) {
  return `<article class="timeline-step">
  <span>${String(index + 1).padStart(2, "0")}</span>
  <div>
    <h2>${step.title}</h2>
    <p>${step.description}</p>
  </div>
</article>`;
}

function renderSitemap() {
  const urls = pages
    .map((page) => `  <url><loc>/${page.file}</loc></url>`)
    .join("\n");
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
