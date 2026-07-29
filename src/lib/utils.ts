import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getSiteUrl() {
  const url = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  return url || "http://localhost:3000";
}

export function absoluteUrl(path = "/") {
  const base = getSiteUrl();
  if (!path.startsWith("/")) return `${base}/${path}`;
  return `${base}${path}`;
}

export function whatsappUrl(message?: string) {
  const base = "https://wa.me/919671830977";
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}
