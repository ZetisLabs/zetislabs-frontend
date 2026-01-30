"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "@/lib/motion";
import { Clock, X } from "lucide-react";
import Image from "next/image";

interface Article {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  author: {
    name: string;
    avatar: string;
  };
  date: string;
  readTime: string;
  image: string;
  featured?: boolean;
}

const CATEGORIES = [
  "All",
  "AI & Automation",
  "Product Updates",
  "Case Studies",
  "Engineering",
];

const ARTICLES: Article[] = [
  {
    id: "1",
    featured: true,
    title: "The Future of Autonomous Engineering: Navigating the Neural Shift",
    excerpt:
      "Exploring how generative models are redefining the software development lifecycle, from automated refactoring to predictive architecture.",
    category: "AI & Automation",
    author: { name: "Elena Kostic", avatar: "EK" },
    date: "Oct 24, 2024",
    readTime: "12 min",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1600",
  },
  {
    id: "2",
    title: "Scaling Distributed Systems with Zero-Trust Security",
    excerpt:
      "A deep dive into our latest infrastructure migration focusing on identity-based perimeter security.",
    category: "Engineering",
    author: { name: "Marcus Chen", avatar: "MC" },
    date: "Oct 21, 2024",
    readTime: "8 min",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "3",
    title: "Q4 Product Roadmap: The Intelligence Layer",
    excerpt:
      "Introducing the new core engine updates designed to bring context-aware processing to every interaction.",
    category: "Product Updates",
    author: { name: "Sarah Jenkins", avatar: "SJ" },
    date: "Oct 18, 2024",
    readTime: "5 min",
    image:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "4",
    title: "Case Study: Modernizing Global Logistics for NexaCorp",
    excerpt:
      "How we reduced latency by 40% across 12 international hubs using edge-computed routing tables.",
    category: "Case Studies",
    author: { name: "David Vane", avatar: "DV" },
    date: "Oct 15, 2024",
    readTime: "15 min",
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "5",
    title: "Why Minimalist Interfaces Drive Higher User Retention",
    excerpt:
      "Analyzing the psychological impact of Swiss-style layout principles on modern digital product engagement.",
    category: "Engineering",
    author: { name: "Elena Kostic", avatar: "EK" },
    date: "Oct 12, 2024",
    readTime: "10 min",
    image:
      "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "6",
    title: "The Ethics of Predictive Machine Learning",
    excerpt:
      "Addressing the balance between algorithmic efficiency and human privacy in the era of pervasive AI.",
    category: "AI & Automation",
    author: { name: "Marcus Chen", avatar: "MC" },
    date: "Oct 09, 2024",
    readTime: "14 min",
    image:
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800",
  },
];

// Article Modal - Floating window with header blur style
const ArticleModal = ({
  article,
  onClose,
}: {
  article: Article | null;
  onClose: () => void;
}) => {
  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (article) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [article]);

  if (!article) return null;

  return (
    <AnimatePresence>
      {article && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Backdrop with blur - hidden on mobile (full-screen mode) */}
          <motion.div
            className="absolute inset-0 hidden cursor-pointer bg-background/60 backdrop-blur-sm md:block"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Close button - outside modal content for reliable touch on mobile */}
          <motion.button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 z-[60] flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-foreground text-background shadow-xl transition-all active:scale-90 md:top-12 md:right-12 md:h-10 md:w-10 md:bg-foreground/90 md:shadow-lg md:hover:bg-foreground"
            aria-label="Fermer"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2, delay: 0.1 }}
          >
            <X className="h-7 w-7 md:h-5 md:w-5" strokeWidth={2.5} />
          </motion.button>

          {/* Modal content - Full-screen on mobile, floating window on desktop */}
          <motion.div
            className="relative z-10 flex h-full w-full flex-col overflow-hidden bg-background md:h-auto md:max-h-[85vh] md:max-w-4xl md:rounded-md md:border-[0.75px] md:border-border/50 md:bg-background/75 md:shadow-lg md:backdrop-blur-md"
            initial={{ opacity: 0, scale: 0.98, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {/* Scrollable content - no scrollbar */}
            <div className="no-scrollbar overflow-y-auto">
              {/* Hero image */}
              <div className="relative aspect-[21/9] w-full bg-foreground/5">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 896px"
                  className="object-cover"
                />
              </div>

              {/* Article content - opaque background for readability */}
              <div className="bg-background p-6 md:p-12">
                {/* Meta */}
                <div className="mb-6 flex items-center gap-4">
                  <span className="text-[10px] font-bold tracking-[0.3em] text-foreground/40 uppercase">
                    {article.category}
                  </span>
                  <span className="text-[10px] tracking-[0.25em] text-foreground/40 uppercase">
                    {article.date}
                  </span>
                  <div className="flex items-center gap-1 text-[10px] tracking-widest text-foreground/40 uppercase">
                    <Clock className="h-3 w-3" />
                    {article.readTime}
                  </div>
                </div>

                {/* Title */}
                <h2 className="mb-6 font-heading text-3xl leading-tight font-bold tracking-tight md:text-4xl">
                  {article.title}
                </h2>

                {/* Author */}
                <div className="mb-8 flex items-center gap-3 border-b border-foreground/10 pb-8">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-foreground/10 text-sm font-bold">
                    {article.author.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-bold">{article.author.name}</p>
                    <p className="text-xs text-foreground/40">Author</p>
                  </div>
                </div>

                {/* Article body (placeholder content) */}
                <div className="prose prose-lg max-w-none text-foreground/80">
                  <p className="lead text-lg leading-relaxed">
                    {article.excerpt}
                  </p>
                  <p className="mt-6 leading-relaxed">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                  <p className="mt-4 leading-relaxed">
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                  </p>
                  <p className="mt-4 leading-relaxed">
                    Sed ut perspiciatis unde omnis iste natus error sit
                    voluptatem accusantium doloremque laudantium, totam rem
                    aperiam, eaque ipsa quae ab illo inventore veritatis et
                    quasi architecto beatae vitae dicta sunt explicabo.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Swiss-style horizontal article card
const ArticleRow = ({
  article,
  onClick,
}: {
  article: Article;
  onClick: () => void;
}) => (
  <motion.button
    onClick={onClick}
    className="group -mx-4 flex w-full cursor-pointer flex-row items-start gap-6 rounded-md border-b border-foreground/10 px-4 py-8 text-left transition-all duration-300 hover:border-[0.75px] hover:border-border/50 hover:bg-background/75 hover:shadow-sm hover:backdrop-blur-md md:gap-8 md:py-10"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4 }}
  >
    {/* Left: Fixed Square Thumbnail */}
    <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden bg-foreground/5 md:h-20 md:w-20">
      <Image
        src={article.image}
        alt={article.title}
        fill
        sizes="80px"
        className="object-cover transition-all duration-500"
      />
    </div>

    {/* Right: Content */}
    <div className="flex-grow space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-[9px] font-bold tracking-[0.3em] text-foreground/40 uppercase">
          {article.category}
        </span>
        <div className="flex items-center gap-1 text-[9px] tracking-widest text-foreground/40 uppercase">
          <Clock className="h-3 w-3" />
          {article.readTime}
        </div>
      </div>

      <h3 className="font-heading text-lg font-bold tracking-tight text-foreground transition-transform duration-300 group-hover:translate-x-1 md:text-xl">
        {article.title}
      </h3>

      <p className="line-clamp-2 max-w-2xl font-sans text-sm leading-relaxed text-foreground/60">
        {article.excerpt}
      </p>

      <div className="flex items-center gap-4 pt-1 text-[10px] font-medium tracking-widest text-foreground/40 uppercase">
        <span className="text-foreground">{article.author.name}</span>
        <span>•</span>
        <span>{article.date}</span>
      </div>
    </div>
  </motion.button>
);

export default function BlogListingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeCategory, setActiveCategory] = useState("All");

  const featuredArticle = ARTICLES.find((a) => a.featured) || ARTICLES[0];
  const gridArticles = ARTICLES.filter((a) => !a.featured);

  // Get selected article from URL
  const articleId = searchParams.get("article");
  const selectedArticle = articleId
    ? ARTICLES.find((a) => a.id === articleId) || null
    : null;

  // Open article (updates URL)
  const openArticle = useCallback(
    (article: Article) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("article", article.id);
      router.push(`?${params.toString()}`, { scroll: false });
    },
    [router, searchParams]
  );

  // Close article (removes from URL)
  const closeArticle = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("article");
    const newUrl = params.toString()
      ? `?${params.toString()}`
      : window.location.pathname;
    router.push(newUrl, { scroll: false });
  }, [router, searchParams]);

  // Filter articles by category
  const filteredArticles =
    activeCategory === "All"
      ? gridArticles
      : gridArticles.filter((a) => a.category === activeCategory);

  return (
    <main className="min-h-screen text-foreground selection:bg-foreground selection:text-background">
      {/* Header Spacing */}
      <div className="h-24 md:h-32" />

      {/* Featured Article */}
      <section className="mx-auto max-w-6xl px-6">
        <motion.button
          onClick={() => openArticle(featuredArticle)}
          className="group mb-16 block w-full cursor-pointer text-left md:mb-24"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="grid grid-cols-1 items-center gap-8 overflow-hidden lg:grid-cols-2 lg:gap-12">
            {/* Content */}
            <div className="order-2 space-y-6 lg:order-1">
              <div className="flex items-center gap-4">
                <span className="text-[10px] tracking-[0.25em] text-foreground/40 uppercase">
                  {featuredArticle.category}
                </span>
                <span className="text-[10px] tracking-[0.25em] text-foreground/40 uppercase">
                  {featuredArticle.date}
                </span>
              </div>
              <h2 className="font-heading text-3xl leading-[1.1] font-bold tracking-tight md:text-4xl lg:text-5xl">
                {featuredArticle.title}
              </h2>
              <p className="max-w-xl font-sans text-base leading-relaxed text-foreground/60 md:text-lg">
                {featuredArticle.excerpt}
              </p>
              <div className="flex items-center gap-3 border-t border-foreground/10 pt-6">
                <span className="text-xs font-bold tracking-widest uppercase">
                  {featuredArticle.author.name}
                </span>
                <span className="text-xs text-foreground/40">
                  — {featuredArticle.readTime}
                </span>
              </div>
            </div>

            {/* Image */}
            <div className="relative order-1 aspect-[4/3] overflow-hidden bg-foreground/5 lg:order-2">
              <Image
                src={featuredArticle.image}
                alt={featuredArticle.title}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                loading="eager"
                priority
                className="object-cover transition-all duration-700 ease-in-out group-hover:scale-105"
              />
            </div>
          </div>
        </motion.button>
      </section>

      {/* Category Filter Bar - Header Style Bubble */}
      <nav className="mb-12 flex justify-center px-6 md:mb-16">
        <motion.div
          className="no-scrollbar flex items-center gap-1 overflow-x-auto rounded-md border-[0.75px] border-border/50 bg-background/75 px-3 py-1.5 shadow-sm backdrop-blur-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`cursor-pointer rounded-[4px] px-4 py-1.5 text-[10px] font-bold tracking-[0.2em] whitespace-nowrap uppercase transition-all duration-200 ${
                activeCategory === category
                  ? "bg-foreground text-background"
                  : "text-foreground/40 hover:bg-foreground/5 hover:text-foreground"
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>
      </nav>

      {/* Article List - Swiss Typographic Style */}
      <section className="mx-auto mb-24 max-w-4xl px-6 md:mb-32">
        <div className="space-y-0">
          {filteredArticles.length > 0 ? (
            filteredArticles.map((article) => (
              <ArticleRow
                key={article.id}
                article={article}
                onClick={() => openArticle(article)}
              />
            ))
          ) : (
            <p className="py-16 text-center text-sm text-foreground/40">
              No articles found in this category.
            </p>
          )}
        </div>

        {/* Pagination */}
        <div className="mt-16 flex items-center justify-between border-t border-foreground/10 pt-8">
          <div className="flex items-center gap-6">
            <button className="cursor-not-allowed text-[10px] font-bold tracking-[0.25em] uppercase opacity-20">
              Previous
            </button>
            <div className="flex gap-3">
              {[1, 2, 3].map((n) => (
                <button
                  key={n}
                  className={`cursor-pointer text-[10px] font-bold tracking-[0.25em] uppercase ${
                    n === 1
                      ? "text-foreground"
                      : "text-foreground/30 hover:text-foreground"
                  }`}
                >
                  {n.toString().padStart(2, "0")}
                </button>
              ))}
            </div>
            <button className="cursor-pointer text-[10px] font-bold tracking-[0.25em] text-foreground uppercase transition-transform hover:translate-x-1">
              Next
            </button>
          </div>
          <span className="text-[10px] tracking-[0.25em] text-foreground/40 uppercase">
            Page 01 of 12
          </span>
        </div>
      </section>

      {/* Simple Footer */}
      <footer className="relative z-10 mt-16 border-t border-border/40">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4 text-[11px] text-foreground/50">
          <p>© 2024 ZetisLabs. All rights reserved.</p>
          <div className="flex items-center gap-4">
            {["Twitter", "LinkedIn", "GitHub"].map((social) => (
              <a
                key={social}
                href="#"
                className="cursor-pointer transition-colors hover:text-foreground"
              >
                {social}
              </a>
            ))}
          </div>
        </div>
      </footer>

      {/* Article Modal */}
      <ArticleModal article={selectedArticle} onClose={closeArticle} />
    </main>
  );
}
