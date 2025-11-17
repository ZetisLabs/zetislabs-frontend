import localFont from "next/font/local";
import "./globals.css";

/**
 * GeneralSans font family - loaded from local files
 * Supports multiple weights: 200 (Extralight), 300 (Light), 400 (Regular),
 * 500 (Medium), 600 (Semibold), 700 (Bold)
 */
const generalSans = localFont({
  src: [
    {
      path: "../public/fonts/GeneralSans-Extralight.otf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../public/fonts/GeneralSans-ExtralightItalic.otf",
      weight: "200",
      style: "italic",
    },
    {
      path: "../public/fonts/GeneralSans-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/GeneralSans-LightItalic.otf",
      weight: "300",
      style: "italic",
    },
    {
      path: "../public/fonts/GeneralSans-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/GeneralSans-Italic.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../public/fonts/GeneralSans-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/GeneralSans-MediumItalic.otf",
      weight: "500",
      style: "italic",
    },
    {
      path: "../public/fonts/GeneralSans-Semibold.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/GeneralSans-SemiboldItalic.otf",
      weight: "600",
      style: "italic",
    },
    {
      path: "../public/fonts/GeneralSans-Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/GeneralSans-BoldItalic.otf",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-general-sans",
  display: "swap",
});

/**
 * Root Layout
 * Next.js requires the root layout to have html and body tags.
 * The lang attribute is set dynamically by the locale layout via script tag.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* Apply GeneralSans font variable to body */}
      <body className={`${generalSans.variable} antialiased min-h-screen text-foreground`}>
        {children}
      </body>
    </html>
  );
}
