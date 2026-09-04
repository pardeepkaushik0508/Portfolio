import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceLandingView } from "@/components/seo/ServiceLandingView";
import {
  getAllServiceSlugs,
  getServiceLanding,
} from "@/data/service-landings";
import { personal } from "@/data/personal";
import { absoluteUrl } from "@/lib/utils";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllServiceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const landing = getServiceLanding(slug);
  if (!landing) return {};

  return {
    title: landing.metaTitle,
    description: landing.metaDescription,
    alternates: { canonical: `/${landing.slug}` },
    openGraph: {
      title: `${landing.metaTitle} | ${personal.name}`,
      description: landing.metaDescription,
      url: absoluteUrl(`/${landing.slug}`),
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: landing.metaTitle,
      description: landing.metaDescription,
    },
  };
}

export default async function ServiceSlugPage({ params }: PageProps) {
  const { slug } = await params;
  const landing = getServiceLanding(slug);
  if (!landing) notFound();
  return <ServiceLandingView landing={landing} />;
}
