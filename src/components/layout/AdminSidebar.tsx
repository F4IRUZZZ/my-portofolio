"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Award,
  Briefcase,
  LayoutDashboard,
  Menu,
  Settings,
  User,
  X,
} from "lucide-react";
import { useState } from "react";

const ADMIN_LINKS = [
  { href: "/admin", label: "Dashboard", Icon: LayoutDashboard },
  { href: "/admin/projects", label: "Proyek", Icon: Briefcase },
  { href: "/admin/achievements", label: "Prestasi", Icon: Award },
  { href: "/admin/experience", label: "Pengalaman", Icon: Briefcase },
  { href: "/admin/profile", label: "Profil", Icon: User },
  { href: "/admin/settings", label: "Pengaturan", Icon: Settings },
];

function AdminNavList({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  return (
    <ul className="flex flex-col gap-1">
      {ADMIN_LINKS.map(({ href, label, Icon }) => {
        const active =
          href === "/admin" ? pathname === href : pathname.startsWith(href);
        return (
          <li key={href}>
            <Link
              href={href}
              onClick={onNavigate}
              aria-current={active ? "page" : undefined}
              className={`flex items-center gap-2.5 rounded-control px-3 py-2.5 text-sm font-medium transition-colors duration-200 ${
                active
                  ? "bg-elevated text-foreground"
                  : "text-muted hover:bg-elevated hover:text-foreground"
              }`}
            >
              <Icon aria-hidden="true" className="h-4 w-4 shrink-0" />
              {label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export function AdminSidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="mb-6 flex items-center justify-between lg:hidden">
        <p className="text-sm font-semibold text-foreground">Menu admin</p>
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="menu-admin-mobile"
          aria-label={open ? "Tutup menu admin" : "Buka menu admin"}
          className="inline-flex h-10 w-10 items-center justify-center rounded-control border border-border text-foreground transition-colors duration-200 hover:bg-elevated"
        >
          {open ? (
            <X aria-hidden="true" className="h-5 w-5" />
          ) : (
            <Menu aria-hidden="true" className="h-5 w-5" />
          )}
        </button>
      </div>
      {open ? (
        <nav
          id="menu-admin-mobile"
          aria-label="Navigasi admin"
          className="mb-6 rounded-card border border-border bg-surface p-3 lg:hidden"
        >
          <AdminNavList onNavigate={() => setOpen(false)} />
        </nav>
      ) : null}
      <nav
        aria-label="Navigasi admin"
        className="hidden w-60 shrink-0 rounded-card border border-border bg-surface p-3 lg:block"
      >
        <AdminNavList />
      </nav>
    </>
  );
}
