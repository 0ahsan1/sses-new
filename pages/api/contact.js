import nodemailer from "nodemailer";

const escapeHtml = (value = "") =>
	String(value)
		.replaceAll("&", "&amp;")
		.replaceAll("<", "&lt;")
		.replaceAll(">", "&gt;")
		.replaceAll('"', "&quot;")
		.replaceAll("'", "&#039;");

export default async function handler(req, res) {
	if (req.method !== "POST") {
		return res.status(405).json({
			success: false,
			message: "Method not allowed",
		});
	}
	console.log("SMTP ENV CHECK:", {
		SMTP_HOST: process.env.SMTP_HOST,
		SMTP_PORT: process.env.SMTP_PORT,
		SMTP_SECURE: process.env.SMTP_SECURE,
		SMTP_EMAIL: process.env.SMTP_EMAIL,
		SMTP_PASSWORD_EXISTS: Boolean(process.env.SMTP_PASSWORD),
	});
	try {
		const {
			name,
			email,
			phone,
			address,
			propertyType,
			monthlyBill,
			message,
		} = req.body;
		
		if (!name || !email || !phone) {
			return res.status(400).json({
				success: false,
				message: "Name, email, and phone number are required.",
			});
		}
		
		if (
			!process.env.SMTP_HOST ||
			!process.env.SMTP_PORT ||
			!process.env.SMTP_EMAIL ||
			!process.env.SMTP_PASSWORD
		) {
			return res.status(500).json({
				success: false,
				message: "Email server is not configured.",
			});
		}
		
		const safeName = escapeHtml(name);
		const safeEmail = escapeHtml(email);
		const safePhone = escapeHtml(phone);
		const safeAddress = escapeHtml(address);
		const safePropertyType = escapeHtml(propertyType);
		const safeMonthlyBill = escapeHtml(monthlyBill);
		const safeMessage = escapeHtml(message);
		
		const transporter = nodemailer.createTransport({
			host: process.env.SMTP_HOST,
			port: Number(process.env.SMTP_PORT),
			secure: process.env.SMTP_SECURE === "true",
			auth: {
				user: process.env.SMTP_EMAIL,
				pass: process.env.SMTP_PASSWORD,
			},
		});
		
		await transporter.verify();
		
		const adminEmailHtml = `
      <div style="font-family: Arial, sans-serif; line-height: 1.7; color: #222;">
        <h2 style="color: #ea580c;">New Solar Consultation Request</h2>

        <table cellpadding="8" cellspacing="0" style="border-collapse: collapse; width: 100%; max-width: 700px;">
          <tr>
            <td style="border: 1px solid #ddd;"><strong>Name</strong></td>
            <td style="border: 1px solid #ddd;">${safeName}</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd;"><strong>Email</strong></td>
            <td style="border: 1px solid #ddd;">${safeEmail}</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd;"><strong>Phone</strong></td>
            <td style="border: 1px solid #ddd;">${safePhone}</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd;"><strong>Property Address</strong></td>
            <td style="border: 1px solid #ddd;">${safeAddress || "Not provided"}</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd;"><strong>Property Type</strong></td>
            <td style="border: 1px solid #ddd;">${safePropertyType || "Not selected"}</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd;"><strong>Monthly Electricity Bill</strong></td>
            <td style="border: 1px solid #ddd;">
              ${safeMonthlyBill ? `PKR ${safeMonthlyBill}` : "Not provided"}
            </td>
          </tr>
        </table>

        <h3 style="margin-top: 24px;">Message</h3>
        <p style="background: #f8f8f8; padding: 14px; border-radius: 8px;">
          ${safeMessage || "No message provided"}
        </p>
      </div>
    `;
		
		const customerEmailHtml = `
      <div style="font-family: Arial, sans-serif; line-height: 1.7; color: #222;">
        <h2 style="color: #ea580c;">Thank you for contacting Sustainable Solar</h2>

        <p>Hi ${safeName},</p>

        <p>
          Thank you for requesting a free solar consultation. We have received your request successfully.
          Our solar consultant will review your details and contact you soon.
        </p>

        <div style="background: #fff7ed; border: 1px solid #fed7aa; padding: 16px; border-radius: 10px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #c2410c;">What happens next?</h3>
          <ul>
            <li>Our solar consultant will contact you soon.</li>
            <li>We will discuss your electricity usage and property details.</li>
            <li>You may receive a free site survey and solar proposal.</li>
            <li>No obligation consultation.</li>
          </ul>
        </div>

        <p>Regards,<br/><strong>Sustainable Solar Team</strong></p>
      </div>
    `;
		
		await transporter.sendMail({
			from: `"Sustainable Solar" <${process.env.SMTP_EMAIL}>`,
			to: "info.sustainablesolar@gmail.com",
			replyTo: email,
			subject: `New Solar Consultation Request from ${safeName}`,
			html: adminEmailHtml,
		});
		
		await transporter.sendMail({
			from: `"Sustainable Solar" <${process.env.SMTP_EMAIL}>`,
			to: email,
			replyTo: process.env.SMTP_EMAIL,
			subject: "We received your solar consultation request",
			html: customerEmailHtml,
		});
		
		return res.status(200).json({
			success: true,
			message: "Your request has been submitted successfully.",
		});
	} catch (error) {
		console.error("Contact API error:", error);
		
		return res.status(500).json({
			success: false,
			message: error.message || "Failed to send email. Please try again later.",
		});
	}
}