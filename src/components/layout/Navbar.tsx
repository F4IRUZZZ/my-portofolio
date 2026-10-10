"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useMounted } from "@/lib/use-mounted";
import { Container } from "@/components/ui/Container";
import { PrimaryButton } from "@/components/ui/Buttons";

const NAV_LINKS = [
  { href: "/about", label: "Tentang" },
  { href: "/projects", label: "Proyek" },
  { href: "/achievements", label: "Prestasi" },
  { href: "/experience", label: "Pengalaman" },
  { href: "/articles", label: "Artikel" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  // Tandai link aktif hanya setelah mount agar HTML server dan render
  // pertama klien identik (hindari hydration mismatch).
  const activeHref = useMounted() ? pathname : null;

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur">
      <Container>
        <nav
          aria-label="Navigasi utama"
          className="flex h-16 items-center justify-between gap-4"
        >
          <Link
            href="/"
            className="text-lg font-bold tracking-tight text-foreground"
            onClick={() => setOpen(false)}
          >
            Fairuz<span className="text-accent">.dev</span>
          </Link>
          <ul className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={activeHref === link.href ? "page" : undefined}
                  className={`rounded-control px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                    activeHref === link.href
                      ? "text-foreground"
                      : "text-muted hover:text-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="hidden md:block">
            <PrimaryButton href="/contact">Hubungi Saya</PrimaryButton>
          </div>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="menu-navigasi-mobile"
            aria-label={open ? "Tutup menu navigasi" : "Buka menu navigasi"}
            className="inline-flex h-10 w-10 items-center justify-center rounded-control border border-border text-foreground transition-colors duration-200 hover:bg-elevated md:hidden"
          >
            {open ? (
              <X aria-hidden="true" className="h-5 w-5" />
            ) : (
              <Menu aria-hidden="true" className="h-5 w-5" />
            )}
          </button>
        </nav>
      </Container>
      {open ? (
        <div
          id="menu-navigasi-mobile"
          className="border-t border-border bg-background md:hidden"
        >
          <Container>
            <ul className="flex flex-col gap-1 py-4">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    aria-current={activeHref === link.href ? "page" : undefined}
                    className={`block rounded-control px-3 py-2.5 text-sm font-medium transition-colors duration-200 ${
                      activeHref === link.href
                        ? "bg-elevated text-foreground"
                        : "text-muted hover:bg-elevated hover:text-foreground"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <PrimaryButton
                  href="/contact"
                  className="w-full"
                  onClick={() => setOpen(false)}
                >
                  Hubungi Saya
                </PrimaryButton>
              </li>
            </ul>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
