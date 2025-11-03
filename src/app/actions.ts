"use server";
import "server-only";
import { headers } from "next/headers";
import { getTranslations } from "next-intl/server";
import nodemailer from "nodemailer";
import { z } from "zod";

//
// 1) Schema Validation
//
const trialFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters." })
    .max(100, { message: "Name must not exceed 100 characters." })
    .trim(),
  age: z.coerce
    .number()
    .min(4, { message: "You must be at least 4 years old." })
    .max(120, { message: "Please enter a valid age." }),
  email: z.email({ message: "Invalid email address." }).toLowerCase().trim(),
  phone: z
    .string()
    .optional()
    .refine((val) => !val || /^[+]?[\d\s\-()]+$/.test(val), {
      message: "Invalid phone number format.",
    }),
  experience: z.enum(["yes", "no"]),
});

export type TrialFormState = {
  message: string;
  errors?: Record<string, string[]>;
  success: boolean;
};

//
// 2) Environment Validation
//
const requiredEnvVars = [
  "SMTP_HOST",
  "SMTP_PORT",
  "SMTP_USER",
  "SMTP_PASSWORD",
  "SMTP_FROM",
  "SMTP_FROM_NAME",
] as const;

function validateEnvironment(): void {
  const missing = requiredEnvVars.filter((v) => !process.env[v]);
  if (missing.length) {
    throw new Error(
      `Missing required environment variables: ${missing.join(", ")}`,
    );
  }
}

//
// 3) Singleton Transporter
//
let transporter: nodemailer.Transporter;
function getTransporter(): nodemailer.Transporter {
  if (!transporter) {
    validateEnvironment();
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST ?? "",
      port: Number(process.env.SMTP_PORT ?? "587"),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER ?? "",
        pass: process.env.SMTP_PASSWORD ?? "",
      },
      tls: { rejectUnauthorized: false },
      pool: true,
      maxConnections: 5,
      maxMessages: 10,
    });
  }
  return transporter;
}

//
// 4) Rate Limiting (in-memory, per IP)
//
const RATE_LIMIT = 3; // max submissions per window
const RATE_WINDOW = 60 * 60 * 1000; // 1h
const submissions = new Map<string, number[]>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const history = submissions.get(ip) || [];
  const recent = history.filter((ts) => now - ts < RATE_WINDOW);
  if (recent.length >= RATE_LIMIT) return false;
  recent.push(now);
  submissions.set(ip, recent);
  return true;
}

//
// 5) Email Template
//
function generateEmailTemplate(data: {
  name: string;
  age: number;
  email: string;
  phone?: string;
  experienceText: string;
}): string {
  const { name, age, email, phone, experienceText } = data;
  return `
    <!DOCTYPE html>
    <html lang="pt-PT">
    <head>
      <meta charset="utf-8"/>
      <meta name="viewport" content="width=device-width,initial-scale=1"/>
      <title>Nova Experiência Karaté</title>
    </head>
    <body style="font-family:Arial,sans-serif;line-height:1.6;color:#333;max-width:600px;margin:0 auto;padding:20px;">
      <div style="background:linear-gradient(135deg,#A4262C 0%,#8B1E24 100%);padding:20px;border-radius:10px;margin-bottom:20px;box-shadow:0 4px 6px rgba(0,0,0,0.1);">
        <h1 style="color:#fff;margin:0;text-align:center;font-size:24px;text-shadow:1px 1px 2px rgba(0,0,0,0.3);">🥋 Nova Experiência Karaté</h1>
        <p style="color:#fff;text-align:center;margin:10px 0 0;font-size:16px;opacity:.9;">
          Associação Shotokan Kokusai Karate Santo António
        </p>
      </div>
      <div style="background:#f8f9fa;padding:20px;border-radius:8px;border-left:4px solid #A4262C;">
        <h2 style="color:#333;margin-top:0;font-size:20px;">Detalhes do Candidato</h2>
        <table style="width:100%;border-collapse:separate;border-spacing:0 10px;">
          <tr>
            <td style="background:#333;color:#fff;padding:12px;border-radius:5px;font-weight:bold;width:30%;">Nome:</td>
            <td style="background:#fff;padding:12px;border-radius:5px;border:1px solid #e0e0e0;">${name}</td>
          </tr>
          <tr>
            <td style="background:#333;color:#fff;padding:12px;border-radius:5px;font-weight:bold;">Idade:</td>
            <td style="background:#fff;padding:12px;border-radius:5px;border:1px solid #e0e0e0;">${age} anos</td>
          </tr>
          <tr>
            <td style="background:#333;color:#fff;padding:12px;border-radius:5px;font-weight:bold;">Email:</td>
            <td style="background:#fff;padding:12px;border-radius:5px;border:1px solid #e0e0e0;">
              <a href="mailto:${email}" style="color:#A4262C;text-decoration:none;font-weight:500;">${email}</a>
            </td>
          </tr>
          ${
            phone
              ? `
          <tr>
            <td style="background:#333;color:#fff;padding:12px;border-radius:5px;font-weight:bold;">Telefone:</td>
            <td style="background:#fff;padding:12px;border-radius:5px;border:1px solid #e0e0e0;">
              <a href="tel:${phone}" style="color:#A4262C;text-decoration:none;font-weight:500;">${phone}</a>
            </td>
          </tr>`
              : ""
          }
          <tr>
            <td style="background:#333;color:#fff;padding:12px;border-radius:5px;font-weight:bold;">Experiência:</td>
            <td style="background:#fff;padding:12px;border-radius:5px;border:1px solid #e0e0e0;">${experienceText}</td>
          </tr>
        </table>
      </div>
      <div style="margin-top:20px;padding:15px;background:linear-gradient(90deg,#A4262C 0%,#8B1E24 100%);border-radius:5px;color:#fff;">
        <p style="margin:0;font-size:14px;"><strong>📅 Enviado em:</strong> ${new Date().toLocaleString("pt-PT")}</p>
      </div>
      <div style="margin-top:20px;text-align:center;font-size:12px;color:#666;">
        <p style="margin:0;">Este email foi enviado automaticamente através do formulário de experiência no site.</p>
        <p style="margin:5px 0 0;color:#A4262C;font-weight:500;">Associação Shotokan Kokusai Karate Santo António</p>
      </div>
    </body>
    </html>
  `;
}

//
// 6) Submission Handler
//
export async function submitTrialForm(
  _prevState: TrialFormState,
  formData: FormData,
): Promise<TrialFormState> {
  const t = await getTranslations("TrialForm");

  // Rate limiting
  const ip = (await headers()).get("x-forwarded-for") ?? "unknown";
  if (!checkRateLimit(ip)) {
    return {
      message: t("submit.rateLimited"),
      success: false,
    };
  }

  // Validate payload
  const parsed = trialFormSchema.safeParse({
    name: formData.get("name"),
    age: formData.get("age"),
    email: formData.get("email"),
    phone: formData.get("phone") || undefined,
    experience: formData.get("experience"),
  });

  if (!parsed.success) {
    return {
      message: t("submit.correctErrors"),
      errors: parsed.error.flatten().fieldErrors,
      success: false,
    };
  }

  const { name, age, email, phone, experience } = parsed.data;
  const experienceText =
    experience === "yes" ? "Tem experiência anterior" : "É um iniciante";

  try {
    const transporter = getTransporter();
    await transporter.verify();

    const mailOptions = {
      from: `"${process.env.SMTP_FROM_NAME}" <${process.env.SMTP_FROM}>`,
      to: "direcao@askksa.pt",
      subject: `🥋 Nova Experiência Karaté - ${name}`,
      html: generateEmailTemplate({ name, age, email, phone, experienceText }),
      text: `
          Nova Experiência Karaté
          
          Nome: ${name}
          Idade: ${age}
          Email: ${email}
          ${phone ? `Telefone: ${phone}` : ""}
          Experiência: ${experienceText}
          
          Enviado em: ${new Date().toLocaleString("pt-PT")}
                `.trim(),
    };

    // Timeout guard
    await Promise.race([
      transporter.sendMail(mailOptions),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Email timeout")), 10000),
      ),
    ]);

    return {
      message: t("submit.success"),
      success: true,
    };
  } catch (err) {
    console.error("Email send error:", err);

    if (err instanceof Error && err.message.includes("timeout")) {
      return {
        message: "O pedido demorou muito tempo. Tente novamente.",
        success: false,
      };
    }

    if (err instanceof Error && err.message.includes("authentication")) {
      return {
        message: "Erro de configuração do servidor. Contacte o administrador.",
        success: false,
      };
    }

    return {
      message: t("submit.error"),
      success: false,
    };
  }
}
