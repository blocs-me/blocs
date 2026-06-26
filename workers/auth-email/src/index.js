import { Webhook } from 'standardwebhooks';

export default {
  async fetch(request, env) {
    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 });
    }

    const payload = await request.text();
    const headers = Object.fromEntries(request.headers);

    const hookSecret = env.SEND_EMAIL_HOOK_SECRET.replace('v1,whsec_', '');
    const wh = new Webhook(hookSecret);

    let data;
    try {
      data = wh.verify(payload, headers);
    } catch (err) {
      console.error('Webhook verification failed:', err.message);
      return new Response(JSON.stringify({ error: { message: 'Invalid signature' } }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const { user, email_data } = data;

    if (!user?.email) {
      return new Response(JSON.stringify({ error: { message: 'Missing email' } }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const confirmationUrl = email_data.confirmation_url
      || buildConfirmationUrl(email_data);

    const subject = 'Sign in to Blocs';
    const html = magicLinkEmailHtml(confirmationUrl);
    const text = `Sign in to Blocs\n\nClick here to sign in: ${confirmationUrl}\n\nIf you didn't request this, you can ignore this email.`;

    const res = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${env.CF_ACCOUNT_ID}/email/sending/send`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${env.CF_EMAIL_API_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: user.email,
          from: `${env.FROM_NAME} <${env.FROM_EMAIL}>`,
          subject,
          html,
          text,
        }),
      }
    );

    if (!res.ok) {
      const err = await res.text();
      console.error(`CF email send failed: ${res.status} ${err}`);
      return new Response(JSON.stringify({ error: { message: `Email send failed: ${res.status}` } }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({}), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  },
};

function buildConfirmationUrl(emailData) {
  // site_url from GoTrue is the auth base URL (e.g. https://xxx.supabase.co/auth/v1)
  const siteUrl = emailData.site_url || '';
  const tokenHash = emailData.token_hash || '';
  const type = emailData.email_action_type || 'magiclink';
  const redirectTo = emailData.redirect_to || 'https://blocs.me/dashboard';

  // Supabase's verify endpoint handles the token exchange and redirect
  return `${siteUrl}/verify?token=${tokenHash}&type=${type}&redirect_to=${encodeURIComponent(redirectTo)}`;
}

function magicLinkEmailHtml(confirmationUrl) {
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f9fafb;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 20px;">
    <tr><td align="center">
      <table width="400" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:8px;padding:40px;box-shadow:0 1px 3px rgba(0,0,0,0.1);">
        <tr><td align="center" style="padding-bottom:24px;">
          <h2 style="margin:0;font-size:20px;color:#111;">Sign in to Blocs</h2>
        </td></tr>
        <tr><td align="center" style="padding-bottom:24px;">
          <p style="margin:0;font-size:15px;color:#555;">Click the button below to sign in to your account.</p>
        </td></tr>
        <tr><td align="center" style="padding-bottom:24px;">
          <a href="${confirmationUrl}" style="display:inline-block;padding:12px 24px;background:#E00079;color:#fff;text-decoration:none;border-radius:5px;font-weight:bold;">Sign In</a>
        </td></tr>
        <tr><td align="center">
          <p style="margin:0;font-size:13px;color:#999;">If you didn't request this, you can ignore this email.</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}
