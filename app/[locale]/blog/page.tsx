import { getAllArticles } from "@/lib/articles";
import { BlogClient } from "./components/BlogClient";

interface Props {
  params: Promise<{ locale: string }>;
}

export default async function BlogListingPage({ params }: Props) {
  const { locale } = await params;

  // Load articles from markdown files
  const articles = getAllArticles(locale);

  return <BlogClient articles={articles} />;
}
