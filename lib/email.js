import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
})

const TRACK_NAMES = {
  MERN_STACK: "MERN Stack (90-Day Plan)",
  FULL_STACK:  "Full Stack Internee",
  ADVANCED:    "Advanced Backend (12-Week Plan)",
}

export async function sendWelcomeEmail({ name, email, password, track }) {
  const trackName   = TRACK_NAMES[track] ?? "Full Stack"
  const loginUrl    = process.env.NEXTAUTH_URL ?? "http://localhost:3000"
  const displayName = name ?? email

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body style="margin:0;padding:0;background:#f8fafc;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.07);">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#7c3aed,#4f46e5);padding:36px 40px;text-align:center;">
              <h1 style="margin:0;color:#ffffff;font-size:26px;font-weight:700;letter-spacing:-0.5px;">
                DevOnix
              </h1>
              <p style="margin:8px 0 0;color:#ddd6fe;font-size:14px;">
                Job Ready AI Powered Cohort 2.0
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:36px 40px;">
              <h2 style="margin:0 0 8px;color:#0f172a;font-size:22px;font-weight:700;">
                Welcome aboard, ${displayName}! 🎉
              </h2>
              <p style="margin:0 0 24px;color:#64748b;font-size:15px;line-height:1.6;">
                Tumhara account DevOnix Learning Platform pr create ho gaya hai. Neeche tumhare login details hain.
              </p>

              <!-- Track badge -->
              <div style="background:#f1f5f9;border-left:4px solid #7c3aed;border-radius:8px;padding:16px 20px;margin-bottom:24px;">
                <p style="margin:0 0 4px;font-size:12px;font-weight:600;color:#7c3aed;text-transform:uppercase;letter-spacing:0.05em;">
                  Tumhara Track
                </p>
                <p style="margin:0;font-size:17px;font-weight:700;color:#0f172a;">
                  ${trackName}
                </p>
              </div>

              <!-- Credentials -->
              <div style="background:#fafafa;border:1px solid #e2e8f0;border-radius:10px;padding:20px 24px;margin-bottom:28px;">
                <p style="margin:0 0 12px;font-size:13px;font-weight:600;color:#475569;text-transform:uppercase;letter-spacing:0.05em;">
                  Login Details
                </p>
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="padding:6px 0;color:#64748b;font-size:14px;width:100px;">Email:</td>
                    <td style="padding:6px 0;color:#0f172a;font-size:14px;font-weight:600;">${email}</td>
                  </tr>
                  <tr>
                    <td style="padding:6px 0;color:#64748b;font-size:14px;">Password:</td>
                    <td style="padding:6px 0;color:#0f172a;font-size:14px;font-weight:600;font-family:monospace;">${password}</td>
                  </tr>
                </table>
              </div>

              <!-- CTA Button -->
              <div style="text-align:center;margin-bottom:28px;">
                <a
                  href="${loginUrl}/sign-in"
                  style="display:inline-block;background:linear-gradient(135deg,#7c3aed,#4f46e5);color:#ffffff;text-decoration:none;font-size:15px;font-weight:600;padding:14px 36px;border-radius:10px;"
                >
                  Sign In Now →
                </a>
              </div>

              <p style="margin:0;color:#94a3b8;font-size:13px;line-height:1.6;text-align:center;">
                First login ke baad apna password change karna recommend kiya jata hai.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f8fafc;padding:20px 40px;text-align:center;border-top:1px solid #e2e8f0;">
              <p style="margin:0;color:#94a3b8;font-size:12px;">
                © 2026 DevOnix — Cohort 2.0 &nbsp;|&nbsp; July – September 2026
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim()

  await transporter.sendMail({
    from: `"DevOnix" <${process.env.GMAIL_USER}>`,
    to:   email,
    subject: `Welcome to DevOnix! Your ${trackName} Account is Ready`,
    html,
  })
}
