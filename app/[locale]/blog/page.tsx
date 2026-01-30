"use client";

import React, { useState } from "react";
import { motion } from "@/lib/motion";
import { Clock, ArrowRight } from "lucide-react";
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

// Swiss-style horizontal article card
const ArticleRow = ({ article }: { article: Article }) => (
  <motion.a
    href={`#${article.id}`}
    className="group flex flex-row items-start gap-6 border-b border-foreground/10 py-8 transition-colors hover:bg-foreground/[0.02] md:gap-8 md:py-10"
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
        className="object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
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
  </motion.a>
);

export default function BlogListingPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const featuredArticle = ARTICLES.find((a) => a.featured) || ARTICLES[0];
  const gridArticles = ARTICLES.filter((a) => !a.featured);

  // Filter articles by category
  const filteredArticles =
    activeCategory === "All"
      ? gridArticles
      : gridArticles.filter((a) => a.category === activeCategory);

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-foreground selection:text-background">
      {/* Header Spacing */}
      <div className="h-24 md:h-32" />

      {/* Featured Article */}
      <section className="mx-auto max-w-6xl px-6">
        <motion.a
          href={`#${featuredArticle.id}`}
          className="group mb-16 block md:mb-24"
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
                <div className="h-px w-8 bg-foreground/20" />
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
                className="object-cover grayscale transition-all duration-700 ease-in-out group-hover:scale-105 group-hover:grayscale-0"
              />
            </div>
          </div>
        </motion.a>
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
              className={`rounded-[4px] px-4 py-1.5 text-[10px] font-bold tracking-[0.2em] whitespace-nowrap uppercase transition-all duration-200 ${
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
              <ArticleRow key={article.id} article={article} />
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
                  className={`text-[10px] font-bold tracking-[0.25em] uppercase ${
                    n === 1
                      ? "text-foreground"
                      : "text-foreground/30 hover:text-foreground"
                  }`}
                >
                  {n.toString().padStart(2, "0")}
                </button>
              ))}
            </div>
            <button className="text-[10px] font-bold tracking-[0.25em] text-foreground uppercase transition-transform hover:translate-x-1">
              Next
            </button>
          </div>
          <span className="text-[10px] tracking-[0.25em] text-foreground/40 uppercase">
            Page 01 of 12
          </span>
        </div>
      </section>

      {/* Newsletter Footer */}
      <footer className="bg-foreground py-20 text-background md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 items-end gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <span className="text-[10px] font-bold tracking-[0.4em] uppercase opacity-50">
                Newsletter
              </span>
              <h2 className="mt-6 font-heading text-3xl leading-none font-bold tracking-tighter md:text-5xl">
                Stay at the
                <br />
                frontier.
              </h2>
            </div>
            <div className="space-y-6">
              <p className="max-w-md text-base text-background/60 md:text-lg">
                Monthly insights on AI, automation, and the future of software
                engineering.
              </p>
              <form className="group relative max-w-md">
                <input
                  type="email"
                  placeholder="EMAIL@ADDRESS.COM"
                  className="w-full border-b-2 border-background/20 bg-transparent py-4 text-sm font-bold tracking-[0.2em] uppercase transition-colors placeholder:text-background/20 focus:border-background focus:outline-none"
                />
                <button
                  type="submit"
                  className="absolute right-0 bottom-4 transition-transform group-hover:translate-x-2"
                >
                  <ArrowRight className="h-6 w-6" />
                </button>
              </form>
            </div>
          </div>

          <div className="mt-24 flex flex-col justify-between gap-6 border-t border-background/10 pt-8 md:flex-row">
            <p className="text-[9px] tracking-[0.4em] uppercase opacity-40">
              © 2024 ZetisLabs. All rights reserved.
            </p>
            <div className="flex gap-8">
              {["Twitter", "LinkedIn", "GitHub"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="text-[9px] tracking-[0.4em] uppercase opacity-40 transition-opacity hover:opacity-100"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
