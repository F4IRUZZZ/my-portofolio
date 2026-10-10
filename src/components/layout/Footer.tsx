import Link from "next/link";
import { Suspense } from "react";
import { Container } from "@/components/ui/Container";
import { getProfile } from "@/lib/queries";
import { CurrentYear } from "./CurrentYear";

const FOOTER_LINKS = [
  { href: "/about", label: "Tentang" },
  { href: "/projects", label: "Proyek" },
  { href: "/achievements", label: "Prestasi" },
  { href: "/experience", label: "Pengalaman" },
  { href: "/contact", label: "Kontak" },
];

export async function Footer() {
  const profile = await getProfile();

  return (
    <footer className="mt-20 border-t border-border">
      <Container>
        <div className="flex flex-col gap-6 py-10 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-base font-bold tracking-tight text-foreground">
              Fairuz<span className="text-accent">.dev</span>
            </p>
            <p className="mt-1 text-sm text-muted">
              ©{" "}
              <Suspense fallback={null}>
                <CurrentYear />
              </Suspense>{" "}
              Alfairuz Atthariq Satria. Student Developer.
            </p>
            {profile.githubUrl || profile.linkedinUrl ? (
              <p className="mt-2 text-sm text-muted">
                {profile.githubUrl ? (
                  <a
                    href={profile.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="transition-colors duration-200 hover:text-foreground"
                  >
                    GitHub
                  </a>
                ) : null}
                {profile.githubUrl && profile.linkedinUrl ? (
                  <span aria-hidden="true" className="mx-2">
                    •
                  </span>
                ) : null}
                {profile.linkedinUrl ? (
                  <a
                    href={profile.linkedinUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="transition-colors duration-200 hover:text-foreground"
                  >
                    LinkedIn
                  </a>
                ) : null}
              </p>
            ) : null}
          </div>
          <nav aria-label="Navigasi footer">
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              {FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted transition-colors duration-200 hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </Container>
    </footer>
  );
}
