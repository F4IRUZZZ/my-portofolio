import type { Metadata } from "next";
import { ExternalLink, Mail } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CopyEmailButton } from "@/components/CopyEmailButton";
import { profile } from "@/data/portfolio";

export const metadata: Metadata = {
  title: "Kontak — Fairuz.dev",
  description:
    "Email publik dan tautan profesional Alfairuz Atthariq Satria.",
};

export default function ContactPage() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <SectionHeading
          level={1}
          eyebrow="Kontak"
          title="Hubungi Saya"
          description="Email publik dan tautan profesional yang sudah diverifikasi."
        />
        <div className="mt-8 max-w-xl rounded-card border border-border bg-surface p-5 sm:p-6">
          <div className="flex items-center gap-3">
            <span
              aria-hidden="true"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-control bg-accent/10 text-accent"
            >
              <Mail className="h-5 w-5" />
            </span>
            <div className="min-w-0">
              <p className="text-sm font-medium text-foreground">Email</p>
              <a
                href={`mailto:${profile.publicEmail}`}
                className="block truncate text-sm text-accent hover:text-accent-hover"
              >
                {profile.publicEmail}
              </a>
            </div>
            <div className="ml-auto shrink-0">
              <CopyEmailButton email={profile.publicEmail} />
            </div>
          </div>
          <div className="mt-6 border-t border-border pt-6">
            <p className="text-sm font-medium text-foreground">
              Tautan profesional
            </p>
            <ul className="mt-3 flex flex-col gap-2">
              {[
                { href: profile.githubUrl, label: "GitHub" },
                { href: profile.linkedinUrl, label: "LinkedIn" },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:text-accent-hover"
                  >
                    {link.label}
                    <ExternalLink
                      aria-hidden="true"
                      className="h-4 w-4"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
