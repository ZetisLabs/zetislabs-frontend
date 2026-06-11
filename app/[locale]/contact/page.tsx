import type { Metadata } from "next";
import Link from "next/link";
import { Linkedin, Github, ArrowUpRight } from "lucide-react";
import { getTranslation } from "@/lib/i18n";
import {
  type Locale,
  isValidLocale,
  defaultLocale,
  locales,
} from "@/i18n/config";
import { siteConfig } from "@/lib/seo/config";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { CTAButton, EyebrowBadge } from "@/lib/ui";
import Footer from "@/components/layout/Footer";
import { ContactForm } from "./components/ContactForm";
import { CopyEmail } from "./components/CopyEmail";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale: Locale = isValidLocale(localeParam)
    ? localeParam
    : defaultLocale;
  const t = (key: string) => getTranslation(locale, key);

  const title = t("contact.metadata.title");
  const description = t("contact.metadata.description");
  const url = `${siteConfig.url}/${locale}/contact`;

  const languages: Record<string, string> = {};
  for (const loc of locales) {
    languages[loc] = `${siteConfig.url}/${loc}/contact`;
  }
  languages["x-default"] = `${siteConfig.url}/${defaultLocale}/contact`;

  return {
    title,
    description,
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: url,
      languages,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      locale: locale === "fr" ? "fr_FR" : "en_US",
      type: "website",
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: siteConfig.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      site: siteConfig.twitter,
      images: [siteConfig.ogImage],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function ContactPage({ params }: Props) {
  const { locale: localeParam } = await params;
  const locale: Locale = isValidLocale(localeParam)
    ? localeParam
    : defaultLocale;
  const t = (key: string) => getTranslation(locale, key);

  const socialLinks = [
    {
      label: t("contact.direct.linkedinLabel"),
      value: "ZetisLabs",
      href: siteConfig.linkedin,
      Icon: Linkedin,
    },
    {
      label: t("contact.direct.githubLabel"),
      value: "ZetisLabs",
      href: siteConfig.github,
      Icon: Github,
    },
  ];

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: t("header.home"), url: `${siteConfig.url}/${locale}` },
          {
            name: t("contact.eyebrow"),
            url: `${siteConfig.url}/${locale}/contact`,
          },
        ]}
      />

      {/* Single screen. The form is the dominant element (no marketing headline
          by design); it leads the asymmetric grid, anchored to the left edge so
          the negative space falls to the right. Footer pinned below; height
          accounts for the floating header so the page does not scroll. */}
      <section className="flex min-h-[calc(100dvh-4rem)] flex-col">
        <div className="mx-auto flex w-full max-w-screen-xl flex-1 items-center px-4 py-10 md:py-14">
          <div className="mx-auto grid w-full max-w-4xl grid-cols-1 gap-x-16 gap-y-12 lg:grid-cols-[1.5fr_1fr] lg:items-start">
            {/* Form — dominant, left */}
            <div className="hero-entrance hero-entrance-1">
              <ContactForm locale={locale} email={siteConfig.email} />
            </div>

            {/* Rail — secondary channels, right */}
            <aside className="hero-entrance hero-entrance-2 flex flex-col">
              {/* Heading — mirrors the form's eyebrow so the two columns share a
                  top line and the rows below them line up across the gutter. */}
              <EyebrowBadge>{t("contact.rail.heading")}</EyebrowBadge>

              {/* Book a call — top margin tuned so the button sits level with the
                  form's first input field (eyebrow gap + label height + label↔input). */}
              <div className="mt-13">
                <CTAButton
                  href={t("contact.call.cta.href")}
                  variant="secondary"
                  ariaLabel={t("contact.call.cta.ariaLabel")}
                >
                  {t("contact.call.cta.label")}
                </CTAButton>
                <p className="mt-3 text-xs text-foreground/45">
                  {t("contact.call.description")}
                </p>
                <div className="mt-4 inline-flex items-center gap-2.5 text-sm text-foreground/70">
                  <span
                    aria-hidden="true"
                    className="h-2 w-2 shrink-0 rounded-full bg-accent shadow-[0_0_0_3px_rgba(58,123,213,0.18)]"
                  />
                  {t("contact.status")}
                </div>
              </div>

              {/* Direct channels */}
              <div className="mt-8">
                <span className="text-[11px] tracking-[0.08em] text-foreground/40 uppercase">
                  {t("contact.direct.heading")}
                </span>
                <ul className="mt-3 flex flex-col gap-1">
                  <li>
                    <CopyEmail
                      email={siteConfig.email}
                      copyLabel={t("contact.direct.copy")}
                      copiedLabel={t("contact.direct.copied")}
                    />
                  </li>
                  {socialLinks.map(({ label, value, href, Icon }) => (
                    <li key={label}>
                      <Link
                        href={href}
                        aria-label={`${label}: ${value}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group -mx-2 flex items-center gap-2.5 rounded-md px-2 py-1.5 transition-colors hover:bg-foreground/5"
                      >
                        <Icon
                          className="h-4 w-4 shrink-0 text-foreground/40 transition-colors group-hover:text-accent"
                          aria-hidden="true"
                        />
                        <span className="text-sm font-medium text-foreground">
                          {value}
                        </span>
                        <ArrowUpRight
                          className="ml-auto h-3.5 w-3.5 text-foreground/25 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
                          aria-hidden="true"
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </div>

        <Footer locale={locale} />
      </section>
    </>
  );
}
