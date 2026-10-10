import { z } from "zod";

const optionalUrl = z
  .string()
  .trim()
  .optional()
  .refine(
    (value) => !value || /^https?:\/\/.+\..+/.test(value),
    "Harus URL http(s) yang valid, atau kosongkan.",
  );

const optionalDate = z
  .string()
  .trim()
  .optional()
  .refine(
    (value) => !value || /^\d{4}-\d{2}-\d{2}$/.test(value),
    "Gunakan format YYYY-MM-DD, atau kosongkan.",
  );

const linesField = (label: string) =>
  z
    .string()
    .trim()
    .min(1, `${label} wajib diisi.`)
    .transform((value) =>
      value
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line.length > 0),
    )
    .refine((lines) => lines.length > 0, `${label} wajib diisi.`);

export function slugify(value: string): string {
  const stripped = value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
  return stripped
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export const projectSchema = z.object({
  title: z.string().trim().min(3, "Judul minimal 3 karakter.").max(120),
  slug: z
    .string()
    .trim()
    .min(3, "Slug minimal 3 karakter.")
    .max(120)
    .regex(/^[a-z0-9-]+$/, "Slug hanya huruf kecil, angka, dan strip."),
  summary: z.string().trim().min(10, "Ringkasan minimal 10 karakter."),
  category: z.string().trim().min(2, "Kategori wajib diisi."),
  role: z.string().trim().min(2, "Peran wajib diisi."),
  technologies: z
    .string()
    .trim()
    .transform((value) =>
      value
        .split(",")
        .map((item) => item.trim())
        .filter((item) => item.length > 0),
    ),
  workStatus: z.enum(["In Progress", "Completed", "Archived"]),
  publicationStatus: z.enum(["draft", "published"]),
  isFeatured: z.enum(["on"]).optional(),
  period: z.string().trim().max(60).optional(),
  coverUrl: optionalUrl,
  repositoryUrl: optionalUrl,
  demoUrl: optionalUrl,
  context: z.string().trim().min(10, "Konteks minimal 10 karakter."),
  contributions: linesField("Kontribusi"),
  features: linesField("Fitur"),
  process: linesField("Proses"),
  challenges: z.string().trim().min(3, "Tantangan wajib diisi."),
  learnings: z.string().trim().min(3, "Pembelajaran wajib diisi."),
  currentState: z.string().trim().min(3, "Status saat ini wajib diisi."),
});

export const achievementSchema = z.object({
  title: z.string().trim().min(3, "Judul minimal 3 karakter."),
  organizer: z.string().trim().min(2, "Penyelenggara wajib diisi."),
  category: z.string().trim().min(2, "Kategori wajib diisi."),
  rank: z.string().trim().min(1, "Peringkat wajib diisi."),
  location: z.string().trim().min(2, "Lokasi wajib diisi."),
  competedAt: optionalDate,
  announcedAt: optionalDate,
  description: z.string().trim().min(10, "Deskripsi minimal 10 karakter."),
  evidenceUrl: optionalUrl,
  publicationStatus: z.enum(["draft", "published"]),
});

export const experienceSchema = z.object({
  organization: z.string().trim().min(2, "Organisasi wajib diisi."),
  role: z.string().trim().min(2, "Peran wajib diisi."),
  location: z.string().trim().max(120).optional(),
  startDate: optionalDate,
  endDate: optionalDate,
  summary: z.string().trim().min(10, "Ringkasan minimal 10 karakter."),
  responsibilities: linesField("Tanggung jawab"),
  technologies: z
    .string()
    .trim()
    .transform((value) =>
      value
        .split(",")
        .map((item) => item.trim())
        .filter((item) => item.length > 0),
    ),
  relatedProjectSlug: z.string().trim().max(120).optional(),
  publicationStatus: z.enum(["draft", "published"]),
});

export const profileSchema = z.object({
  fullName: z.string().trim().min(3, "Nama minimal 3 karakter."),
  headline: z.string().trim().min(2, "Headline wajib diisi."),
  bio: linesField("Bio"),
  education: z.string().trim().min(3, "Pendidikan wajib diisi."),
  publicEmail: z
    .string()
    .trim()
    .optional()
    .refine(
      (value) => !value || /.+@.+\..+/.test(value),
      "Format email tidak valid, atau kosongkan.",
    ),
  githubUrl: optionalUrl,
  linkedinUrl: optionalUrl,
  cvUrl: optionalUrl,
});

export type ProjectInput = z.infer<typeof projectSchema>;
export type AchievementInput = z.infer<typeof achievementSchema>;
export type ExperienceInput = z.infer<typeof experienceSchema>;
export type ProfileInput = z.infer<typeof profileSchema>;
