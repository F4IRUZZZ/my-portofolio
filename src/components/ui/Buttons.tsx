import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

const baseClass =
  "inline-flex items-center justify-center gap-2 rounded-control px-5 py-2.5 text-sm font-medium transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50";

const primaryClass = `${baseClass} bg-accent text-white hover:bg-accent-hover`;
const secondaryClass = `${baseClass} border border-border bg-transparent text-foreground hover:bg-elevated`;

type CommonProps = {
  children: ReactNode;
  className?: string;
};

type ButtonAsLinkProps = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

type ButtonAsButtonProps = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonProps = ButtonAsLinkProps | ButtonAsButtonProps;

function renderButton(
  classes: string,
  { children, className = "", href, ...rest }: ButtonProps,
) {
  const merged = `${classes} ${className}`.trim();
  if (href) {
    return (
      <a
        href={href}
        className={merged}
        {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {children}
      </a>
    );
  }
  return (
    <button
      className={merged}
      {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
}

export function PrimaryButton(props: ButtonProps) {
  return renderButton(primaryClass, props);
}

export function SecondaryButton(props: ButtonProps) {
  return renderButton(secondaryClass, props);
}
