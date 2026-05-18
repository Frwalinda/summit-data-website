export async function onRequestPost(context) {
  try {
    const payload = await context.request.json();
    const result = validateContactPayload(payload);

    if (!result.ok) {
      return jsonResponse({ message: result.message }, 400);
    }

    if (!result.data) {
      return jsonResponse({ message: "Thanks. Your message has been sent to Summit Data." });
    }

    const apiKey = context.env.RESEND_API_KEY;
    const fromEmail = context.env.CONTACT_FROM_EMAIL;
    const toEmail = context.env.CONTACT_TO_EMAIL || "admin@summitdataltd.com";

    if (!apiKey || !fromEmail) {
      return jsonResponse(
        {
          message:
            "Email delivery is not configured yet. Please set RESEND_API_KEY and CONTACT_FROM_EMAIL in Cloudflare Pages."
        },
        501
      );
    }

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        reply_to: result.data.email,
        subject: result.data.subject,
        text: renderEmailText(result.data)
      })
    });

    if (!response.ok) {
      return jsonResponse({ message: "The email provider rejected the message. Please check Resend settings." }, 502);
    }

    return jsonResponse({ message: "Thanks. Your message has been sent to Summit Data." });
  } catch (error) {
    return jsonResponse({ message: "The contact form could not be processed." }, 500);
  }
}

export async function onRequest(context) {
  if (context.request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders() });
  }

  return jsonResponse({ message: "Method not allowed." }, 405);
}

function validateContactPayload(payload) {
  const data = {
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

function renderEmailText(data) {
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

function jsonResponse(payload, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      ...corsHeaders()
    }
  });
}

function corsHeaders() {
  return {
    "Access-Control-Allow-Headers": "Content-Type, Accept",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Origin": "*"
  };
}
