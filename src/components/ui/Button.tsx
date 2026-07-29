"use client";

import {
  useEffect,
  useRef,
  type AnchorHTMLAttributes,
  type ButtonHTMLAttributes,
  type ReactNode,
} from "react";
import { useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "line" | "dark";
type Size = "sm" | "md" | "lg";

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-primary btn-primary-text hover:bg-primary-hover shadow-[0_1px_2px_rgba(15,118,110,0.28)]",
  secondary:
    "border border-white/25 bg-white/8 text-white hover:border-white/45 hover:bg-white/12",
  dark: "border border-border bg-surface text-foreground hover:border-primary/35 hover:text-primary",
  ghost: "text-muted hover:text-foreground",
  line: "border-b border-current rounded-none px-0 pb-1 text-current hover:text-primary",
};

const sizeClasses: Record<Size, string> = {
  sm: "h-10 px-4 text-sm",
  md: "h-11 px-5 text-[0.9375rem]",
  lg: "h-12 px-6 text-base",
};

type Shared = {
  children: ReactNode;
  className?: string;
  variant?: Variant;
  size?: Size;
  magnetic?: boolean;
  icon?: ReactNode;
};

type AsButton = Shared &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "className"> & {
    href?: undefined;
  };

type AsLink = Shared &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "children" | "className"> & {
    href: string;
  };

export type ButtonProps = AsButton | AsLink;

export function Button(props: ButtonProps) {
  const {
    children,
    className,
    variant = "primary",
    size = "md",
    magnetic = false,
    icon,
    ...rest
  } = props;
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 260, damping: 20, mass: 0.35 });
  const springY = useSpring(y, { stiffness: 260, damping: 20, mass: 0.35 });

  useEffect(() => {
    if (!magnetic || reduced) return;
    const node = ref.current;
    if (!node) return;
    const ux = springX.on("change", (vx) => {
      node.style.transform = `translate(${vx}px, ${springY.get()}px)`;
    });
    const uy = springY.on("change", (vy) => {
      node.style.transform = `translate(${springX.get()}px, ${vy}px)`;
    });
    return () => {
      ux();
      uy();
      node.style.transform = "";
    };
  }, [magnetic, reduced, springX, springY]);

  const isLink = "href" in props && Boolean(props.href);
  const disabled = !isLink
    ? Boolean((rest as ButtonHTMLAttributes<HTMLButtonElement>).disabled)
    : false;
  const showStreak =
    (variant === "primary" || variant === "secondary") && !disabled;

  const classes = cn(
    "relative inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 will-change-transform",
    variant !== "line" && "rounded-lg",
    "disabled:pointer-events-none disabled:opacity-50",
    showStreak && "btn-streak overflow-hidden",
    variantClasses[variant],
    variant !== "line" && sizeClasses[size],
    variant === "line" && "text-sm",
    className,
  );

  const content = (
    <>
      {showStreak ? <span className="btn-streak__shine" aria-hidden="true" /> : null}
      <span className="relative z-[1] inline-flex items-center justify-center gap-2">
        {icon}
        {children}
      </span>
    </>
  );

  function onMove(e: React.MouseEvent<HTMLElement>) {
    if (!magnetic || reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - (rect.left + rect.width / 2)) * 0.2);
    y.set((e.clientY - (rect.top + rect.height / 2)) * 0.2);
  }

  function onLeave() {
    x.set(0);
    y.set(0);
  }

  if (isLink) {
    const { href, target, rel, download, onClick, ...aRest } =
      rest as AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <a
        ref={(n) => {
          ref.current = n;
        }}
        href={href}
        target={target}
        rel={rel}
        download={download}
        className={classes}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        onClick={onClick}
        {...aRest}
      >
        {content}
      </a>
    );
  }

  const { type = "button", onClick, disabled: isDisabled, ...bRest } =
    rest as ButtonHTMLAttributes<HTMLButtonElement>;

  return (
    <button
      ref={(n) => {
        ref.current = n;
      }}
      type={type}
      className={classes}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={onClick}
      disabled={isDisabled}
      {...bRest}
    >
      {content}
    </button>
  );
}
