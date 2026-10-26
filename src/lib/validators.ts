import { z } from "zod";

export const PROJECT_TYPES = [
  "Residential interior",
  "Commercial & retail interior",
  "Architectural design / concept",
  "Office & workplace",
  "Hospitality, café & leisure",
  "Educational & institutional",
  "Renovation & transformation",
  "Custom interior details",
  "Not sure yet",
] as const;

export const CONSENT_TEXT =
  "I agree to be contacted about my enquiry and to my details being used as described in the Privacy Policy.";

/** Strip control characters and collapse whitespace. */
const clean = (value: string) =>
  value
    .replace(/[\u0000-\u001F\u007F]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

export const enquirySchema = z.object({
  name: z
    .string()
    .transform(clean)
    .pipe(z.string().min(2, "Please enter your name.").max(80, "Name is too long.")),
  phone: z
    .string()
    .transform(clean)
    .pipe(
      z.string().regex(/^\+?[0-9][0-9\s-]{8,16}$/, "Please enter a valid phone number."),
    ),
  email: z
    .string()
    .transform(clean)
    .pipe(z.union([z.literal(""), z.email("Please enter a valid email address.")])),
  projectType: z
    .array(z.enum(PROJECT_TYPES))
    .min(1, "Please choose at least one project type."),
  location: z
    .string()
    .transform(clean)
    .pipe(z.string().max(120, "Location is too long.")),
  message: z
    .string()
    .transform((v) =>
      v.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "").trim(),
    )
    .pipe(
      z
        .string()
        .min(10, "Please tell us a little about your project (10+ characters).")
        .max(1500, "Message is too long (1500 characters max)."),
    ),
  consent: z.boolean().refine((v) => v === true, {
    error: "Please tick the box to continue.",
  }),
  /** Honeypot. Real visitors never see or fill this. */
  website: z.string().max(0).optional(),
});

export type EnquiryInput = z.input<typeof enquirySchema>;
export type EnquiryData = z.output<typeof enquirySchema>;
