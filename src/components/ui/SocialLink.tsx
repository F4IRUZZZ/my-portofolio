import type { LucideIcon } from "lucide-react";

type SocialLinkProps = {
  href: string;
  label: string;
  Icon: LucideIcon;
};

export function SocialLink({ href, label, Icon }: SocialLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="inline-flex h-10 w-10 items-center justify-center rounded-control border border-border text-muted transition-colors duration-200 hover:border-accent hover:text-accent-hover"
    >
      <Icon aria-hidden="true" className="h-5 w-5" />
    </a>
  );
}
