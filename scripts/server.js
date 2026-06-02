import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { company } from "../src/siteData.js";

loadLocalEnv();

const root = path.join(process.cwd(), "dist");
const port = Number(process.env.PORT || 3000);
const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8"
};

if (!fs.existsSync(root)) {
  console.error("dist/ not found. Run npm run build first.");
  process.exit(1);
}

const server = http.createServer((request, response) => {
  const url = new URL(request.url || "/", `http://localhost:${port}`);

  if (url.pathname === "/api/contact") {
    handleContactRequest(request, response);
    return;
  }

  const requestedPath = url.pathname === "/" ? "/index.html" : url.pathname;
  const filePath = path.normalize(path.join(root, requestedPath));

  if (!filePath.startsWith(root)) {
    response.writeHead(403);
    response.end("Forbidden");
    return;
  }

  fs.readFile(filePath, (error, content) => {
    if (error) {
      response.writeHead(404);
      response.end("Not found");
      return;
    }

    response.writeHead(200, {
      "Content-Type": types[path.extname(filePath)] || "application/octet-stream"
    });
    response.end(content);
  });
});

server.listen(port, () => {
  console.log(`Summit Data site available at http://localhost:${port}`);
});

async function handleContactRequest(request, response) {
  if (request.method !== "POST") {
    sendJson(response, 405, { message: "Method not allowed." });
    return;
  }

  try {
    const payload = await readJsonBody(request);
    const result = validateContactPayload(payload);

    if (!result.ok) {
      sendJson(response, 400, { message: result.message });
      return;
    }

    const delivery = await sendContactEmail(result.data);
    sendJson(response, delivery.status, { message: delivery.message });
  } catch (error) {
    sendJson(response, 500, { message: "The contact form could not be processed." });
  }
}

function readJsonBody(request) {
  return new Promise((resolve, reject) => {
    let body = "";

    request.on("data", (chunk) => {
      body += chunk;
      if (body.length > 100_000) {
        request.destroy();
        reject(new Error("Request body too large."));
      }
    });

    request.on("end", () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (error) {
        reject(error);
      }
    });

    request.on("error", reject);
  });
}

function validateContactPayload(payload) {
  const requestType = cleanInput(payload.request_type);

  if (requestType === "request_demo") {
    return validateRequestDemoPayload(payload);
  }

  const data = {
    requestType: "contact",
    name: cleanInput(payload.name),
    organisation: cleanInput(payload.organisation),
    email: cleanInput(payload.email),
    message: cleanInput(payload.message),
    subject: cleanInput(payload.subject) || "New website enquiry - Summit Data Ltd",
    honey: cleanInput(payload._honey)
  };

  if (data.honey) return { ok: true, data: null };
  if (!data.name || !data.email || !data.message) {
    return { ok: false, message: "Please complete your name, email, and message." };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    return { ok: false, message: "Please enter a valid email address." };
  }

  return { ok: true, data };
}

function validateRequestDemoPayload(payload) {
  const firstName = cleanInput(payload.first_name);
  const lastName = cleanInput(payload.last_name);
  const data = {
    requestType: "request_demo",
    firstName,
    lastName,
    name: [firstName, lastName].filter(Boolean).join(" "),
    organisation: cleanInput(payload.organisation),
    email: cleanInput(payload.email),
    phone: cleanInput(payload.phone),
    location: cleanInput(payload.location),
    industry: cleanInput(payload.industry),
    bestTimeToCall: cleanInput(payload.best_time_to_call),
    solutionInterest: cleanInput(payload.solution_interest),
    message: cleanInput(payload.message),
    subject: cleanInput(payload.subject) || "Request Demo - Summit Data Ltd Website",
    honey: cleanInput(payload._honey)
  };

  if (data.honey) return { ok: true, data: null };
  if (!data.firstName || !data.email || !data.phone) {
    return { ok: false, message: "Please complete your first name, email, and phone number." };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    return { ok: false, message: "Please enter a valid email address." };
  }

  return { ok: true, data };
}

async function sendContactEmail(data) {
  if (!data) return { status: 200, message: "Thanks. Your message has been sent to Summit Data." };

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL || company.email;
  const fromEmail = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !fromEmail) {
    return {
      status: 501,
      message:
        "Email delivery is not configured yet. Please set RESEND_API_KEY and CONTACT_FROM_EMAIL on the server, or email admin@summitdataltd.com directly."
    };
  }

  const resendResponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [toEmail],
      reply_to: data.email,
      subject: data.subject,
      text: renderEmailText(data)
    })
  });

  if (!resendResponse.ok) {
    return {
      status: 502,
      message: "The email provider rejected the message. Please check the server email settings."
    };
  }

  return { status: 200, message: "Thanks. Your message has been sent to Summit Data." };
}

function renderEmailText(data) {
  if (data.requestType === "request_demo") {
    return [
      "Request Type: Request demo or consultation",
      `First Name: ${data.firstName}`,
      `Last Name: ${data.lastName || "Not provided"}`,
      `Organisation: ${data.organisation || "Not provided"}`,
      `Email: ${data.email}`,
      `Phone: ${data.phone}`,
      `Country / City: ${data.location || "Not provided"}`,
      `Industry: ${data.industry || "Not provided"}`,
      `Best time to call: ${data.bestTimeToCall || "Not provided"}`,
      `Solution of interest: ${data.solutionInterest || "Not provided"}`,
      "",
      "Message / Brief requirement:",
      data.message || "Not provided"
    ].join("\n");
  }

  return [
    `Name: ${data.name}`,
    `Organisation: ${data.organisation || "Not provided"}`,
    `Email: ${data.email}`,
    "",
    data.message
  ].join("\n");
}

function cleanInput(value) {
  return String(value || "").trim().slice(0, 4000);
}

function sendJson(response, status, payload) {
  response.writeHead(status, { "Content-Type": "application/json; charset=utf-8" });
  response.end(JSON.stringify(payload));
}

function loadLocalEnv() {
  const envPath = path.join(process.cwd(), ".env");
  if (!fs.existsSync(envPath)) return;

  const lines = fs.readFileSync(envPath, "utf8").split(/\r?\n/);

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    const separator = trimmed.indexOf("=");
    if (separator === -1) continue;

    const key = trimmed.slice(0, separator).trim();
    const rawValue = trimmed.slice(separator + 1).trim();

    if (!key || process.env[key]) continue;

    process.env[key] = rawValue.replace(/^["']|["']$/g, "");
  }
}
