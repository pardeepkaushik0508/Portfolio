import type { MetadataRoute } from "next";
import { personal } from "@/data/personal";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${personal.name} — Portfolio`,
    short_name: personal.firstName,
    description: personal.title,
    start_url: "/",
    display: "standalone",
    background_color: "#070b14",
    theme_color: "#0ea5e9",
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
