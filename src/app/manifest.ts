import type { MetadataRoute } from "next";
import { personal, seo } from "@/data/personal";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${personal.name} — Full Stack Developer`,
    short_name: "Pardeep",
    description: seo.ogDescription,
    start_url: "/",
    display: "standalone",
    background_color: "#0c1210",
    theme_color: "#0f766e",
    lang: "en-IN",
    categories: ["business", "productivity"],
    icons: [
      {
        src: "/images/pardeep-kaushik.png",
        sizes: "1024x1024",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
