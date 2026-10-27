"use server";
import "server-only";
import { randomUUID } from "node:crypto";
import { headers } from "next/headers";
import { hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import nodemailer, {
  type NodemailerError,
  type SMTPSentMessageInfo,
  type Transporter,
} from "nodemailer";
import { z } from "zod";
import { routing } from "@/i18n/routing";

const dojoCodes = ["HBG", "JFSA", "CSDCL"] as const;
type DojoCode = (typeof dojoCodes)[number];

const dojoRecipientEnv = {
  HBG: "DOJO_HBG_EMAIL",
  JFSA: "DOJO_JFSA_EMAIL",
  CSDCL: "DOJO_CSDCL_EMAIL",
};

function getDojoRecipient(dojo: DojoCode): string {
  const recipient = process.env[dojoRecipientEnv[dojo]];
  if (!recipient) {
    throw new Error(`Missing recipient email for dojo ${dojo}`);
  }
  return recipient;
}

//
// 1) Schema Validation
//
function createTrialFormSchema(t: TFunction) {
  return z.object({
    name: z
      .string()
      .min(2, { message: t("validation.nameMin") })
      .max(100, { message: t("validation.nameMax") })
      .trim(),
    age: z.coerce
      .number()
      .min(4, { message: t("validation.ageMin") })
      .max(120, { message: t("validation.ageMax") }),
    email: z
      .email({ message: t("validation.email") })
      .toLowerCase()
      .trim(),
    phone: z
      .string()
      .optional()
      .refine((val) => !val || /^[+]?[\d\s\-()]+$/.test(val), {
        message: t("validation.phone"),
      }),
    dojo: z.enum(dojoCodes, {
      error: t("validation.dojo"),
    }),
    experience: z.enum(["yes", "no"]),
  });
}

export type TrialFormState = {
  message: string;
  errors?: Record<string, string[]>;
  success: boolean;
  requestId?: string;
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
] as const;

class EmailConfigurationError extends Error {
  readonly code = "ECONFIG";
  readonly variables: string[];
  constructor(variables: string[]) {
    super("Invalid email configuration");
    this.variables = variables;
  }
}

function validateEnvironment(dojo: DojoCode): void {
  const missing = [...requiredEnvVars, dojoRecipientEnv[dojo]].filter(
    (v) => !process.env[v]?.trim(),
  );
  if (missing.length) {
    throw new EmailConfigurationError(missing);
  }
  const port = Number(process.env.SMTP_PORT);
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new EmailConfigurationError(["SMTP_PORT"]);
  }
  if (
    process.env.SMTP_SECURE !== undefined &&
    !["true", "false"].includes(process.env.SMTP_SECURE)
  ) {
    throw new EmailConfigurationError(["SMTP_SECURE"]);
  }
}

//
// 3) Singleton Transporter
//
let transporter: Transporter<SMTPSentMessageInfo>;
function getTransporter(): Transporter<SMTPSentMessageInfo> {
  if (!transporter) {
    const port = Number(process.env.SMTP_PORT);
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST ?? "",
      port,
      secure:
        process.env.SMTP_SECURE === undefined
          ? port === 465
          : process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER ?? "",
        pass: process.env.SMTP_PASSWORD ?? "",
      },
      connectionTimeout: 10_000,
      greetingTimeout: 10_000,
      socketTimeout: 10_000,
      dnsTimeout: 10_000,
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
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

function generateEmailTemplate(data: {
  name: string;
  age: number;
  email: string;
  phone?: string;
  dojo: string;
  experienceText: string;
}): string {
  const { age, experienceText } = data;
  const name = escapeHtml(data.name);
  const email = escapeHtml(data.email);
  const phone = data.phone ? escapeHtml(data.phone) : undefined;
  const dojo = escapeHtml(data.dojo);
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
            <td style="background:#333;color:#fff;padding:12px;border-radius:5px;font-weight:bold;">Dojo preferencial:</td>
            <td style="background:#fff;padding:12px;border-radius:5px;border:1px solid #e0e0e0;">${dojo}</td>
          </tr>
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
  requestedLocale: string,
  _prevState: TrialFormState,
  formData: FormData,
): Promise<TrialFormState> {
  const requestId = randomUUID();
  const startedAt = Date.now();
  console.info(JSON.stringify({ event: "trial_form_received", requestId }));
  const locale = hasLocale(routing.locales, requestedLocale)
    ? requestedLocale
    : routing.defaultLocale;
  const t = await getTranslations({ locale, namespace: "TrialForm" });

  // Validate payload
  const parsed = createTrialFormSchema(t).safeParse({
    name: formData.get("name"),
    age: formData.get("age"),
    email: formData.get("email"),
    phone: formData.get("phone") || undefined,
    dojo: formData.get("dojo"),
    experience: formData.get("experience"),
  });

  if (!parsed.success) {
    const errors = parsed.error.flatten().fieldErrors;
    console.warn(
      JSON.stringify({
        event: "trial_form_validation_failed",
        requestId,
        fields: Object.keys(errors),
      }),
    );
    return {
      message: t("submit.correctErrors"),
      errors,
      success: false,
      requestId,
    };
  }

  // Invalid fields should not consume the submission quota.
  const ip =
    (await headers()).get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
  if (!checkRateLimit(ip)) {
    console.warn(
      JSON.stringify({ event: "trial_form_rate_limited", requestId }),
    );
    return {
      message: t("submit.rateLimited"),
      success: false,
      requestId,
    };
  }

  const { name, age, email, phone, dojo, experience } = parsed.data;
  const experienceText =
    experience === "yes" ? "Tem experiência anterior" : "É um iniciante";

  try {
    validateEnvironment(dojo);
    const transporter = getTransporter();

    const mailOptions = {
      from: {
        name: process.env.SMTP_FROM_NAME || "ASKKSA",
        address: process.env.SMTP_FROM ?? "",
      },
      to: getDojoRecipient(dojo),
      cc: "direcao@askksa.pt",
      subject: `🥋 Nova Experiência Karaté - ${name} - ${dojo}`,
      html: generateEmailTemplate({
        name,
        age,
        email,
        phone,
        dojo,
        experienceText,
      }),
      text: `
          Nova Experiência Karaté
          
          Nome: ${name}
          Idade: ${age}
          Email: ${email}
          ${phone ? `Telefone: ${phone}` : ""}
          Dojo preferencial: ${dojo}
          Experiência: ${experienceText}
          
          Enviado em: ${new Date().toLocaleString("pt-PT")}
                `.trim(),
    };

    console.info(
      JSON.stringify({ event: "trial_form_sending", requestId, dojo }),
    );
    // SMTP timeouts terminate the connection; a Promise.race would leave the
    // email sending in the background after telling the visitor it failed.
    const result = await transporter.sendMail(mailOptions);
    console.info(
      JSON.stringify({
        event: "trial_form_sent",
        requestId,
        dojo,
        durationMs: Date.now() - startedAt,
        acceptedCount: result.accepted?.length ?? 0,
        rejectedCount: result.rejected?.length ?? 0,
      }),
    );
    if (result.rejected?.length) {
      console.warn(
        JSON.stringify({
          event: "trial_form_recipient_rejected",
          requestId,
          dojo,
          rejectedCount: result.rejected.length,
        }),
      );
    }

    return {
      message: t("submit.success"),
      success: true,
      requestId,
    };
  } catch (err) {
    // Do not log the raw SMTP error: its message/response can contain addresses
    // or credentials. Codes identify the cause without exposing form data.
    const error = err as NodemailerError | null;
    console.error(
      JSON.stringify({
        event: "trial_form_failed",
        requestId,
        dojo,
        durationMs: Date.now() - startedAt,
        code: error?.code ?? "UNKNOWN",
        originalCode: error?.originalCode,
        timeoutType: error?.timeoutType,
        command: error?.command?.split(" ")[0],
        responseCode: error?.responseCode,
        configurationVariables:
          err instanceof EmailConfigurationError ? err.variables : undefined,
      }),
    );

    if (error?.code === "ETIMEDOUT") {
      return {
        message: t("submit.timeout"),
        success: false,
        requestId,
      };
    }

    if (error?.code === "EAUTH" || error?.code === "ECONFIG") {
      return {
        message: t("submit.serverConfiguration"),
        success: false,
        requestId,
      };
    }

    return {
      message: t("submit.error"),
      success: false,
      requestId,
    };
  }
}
