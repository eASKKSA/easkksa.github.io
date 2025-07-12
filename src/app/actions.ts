"use server";
import "server-only";
import { z } from "zod";
import nodemailer from "nodemailer";
import { getTranslations } from "next-intl/server";

const trialFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  age: z.coerce
    .number()
    .min(4, { message: "You must be at least 4 years old." }),
  experience: z.enum(["yes", "no"]),
});

export type TrialFormState = {
  message: string;
  errors?: {
    name?: string[];
    age?: string[];
    experience?: string[];
  };
  success: boolean;
};

export async function submitTrialForm(
  prevState: TrialFormState,
  formData: FormData,
): Promise<TrialFormState> {
  const t = await getTranslations("TrialForm");
  const validatedFields = trialFormSchema.safeParse({
    name: formData.get("name"),
    age: formData.get("age"),
    experience: formData.get("experience"),
  });

  if (!validatedFields.success) {
    return {
      message: t("submit.correctErrors"),
      errors: validatedFields.error.flatten().fieldErrors,
      success: false,
    };
  }

  const { name, age, experience } = validatedFields.data;
  const experienceText =
    experience === t("yes") ? "Tem experiência anterior" : "É um iniciante";

  // Configure SMTP transport using environment variables
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: process.env.SMTP_SECURE === "true", // true for port 465, false for 587
    auth: {
      user: process.env.SMTP_USER!,
      pass: process.env.SMTP_PASS!,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const mailOptions = {
    from: `"${process.env.SMTP_FROM_NAME}" <${process.env.SMTP_FROM}>`,
    to: "direcao@askksa.pt",
    subject: `Nova Experiência Karaté de ${name}`,
    html: `
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Age:</strong> ${age}</p>
      <p><strong>Experience:</strong> ${experienceText}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);

    return {
      message: t("submit.success"),
      success: true,
    };
  } catch (error) {
    console.error("Email send error:", error);
    return {
      message: t("submit.error"),
      success: false,
    };
  }
}
