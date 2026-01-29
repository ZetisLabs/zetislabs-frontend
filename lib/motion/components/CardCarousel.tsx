"use client";

import { useRef, useState, useEffect, Children, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface CardCarouselProps {
  children: ReactNode;
  showDots?: boolean;
  showArrows?: boolean;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  className?: string;
}

export function CardCarousel({
  children,
  showDots = true,
  showArrows = true,
  autoPlay = false,
  autoPlayInterval = 5000,
  className,
}: CardCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const items = Children.toArray(children);
  const gap = 24; // gap-6 = 24px

  const getCardWidth = () => {
    if (!scrollRef.current) return 0;
    const firstCard = scrollRef.current.querySelector("[data-carousel-card]");
    return firstCard ? (firstCard as HTMLElement).offsetWidth : 0;
  };

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);

      // Update active dot based on scroll position
      const cardWidth = getCardWidth();
      if (cardWidth > 0) {
        const index = Math.round(scrollLeft / (cardWidth + gap));
        const clampedIndex = Math.min(Math.max(index, 0), items.length - 1);
        if (clampedIndex !== activeIndex) setActiveIndex(clampedIndex);
      }
    }
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.addEventListener("scroll", checkScroll);
      checkScroll();
      return () => el.removeEventListener("scroll", checkScroll);
    }
  }, [activeIndex]);

  useEffect(() => {
    if (!autoPlay) return;

    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        const isLast = scrollLeft >= scrollWidth - clientWidth - 10;

        if (isLast) {
          scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          const cardWidth = getCardWidth();
          scrollRef.current.scrollBy({
            left: cardWidth + gap,
            behavior: "smooth",
          });
        }
      }
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval]);

  const scrollTo = (index: number) => {
    if (scrollRef.current) {
      const cardWidth = getCardWidth();
      scrollRef.current.scrollTo({
        left: (cardWidth + gap) * index,
        behavior: "smooth",
      });
    }
  };

  const scrollPrev = () => {
    if (scrollRef.current) {
      const cardWidth = getCardWidth();
      scrollRef.current.scrollBy({
        left: -(cardWidth + gap),
        behavior: "smooth",
      });
    }
  };

  const scrollNext = () => {
    if (scrollRef.current) {
      const cardWidth = getCardWidth();
      scrollRef.current.scrollBy({
        left: cardWidth + gap,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className={cn("group relative w-full", className)}>
      {/* Edge Fades */}
      <div
        className={cn(
          "pointer-events-none absolute top-0 bottom-0 left-0 z-10 w-20 bg-gradient-to-r from-background to-transparent transition-opacity duration-300",
          canScrollLeft ? "opacity-100" : "opacity-0"
        )}
      />
      <div
        className={cn(
          "pointer-events-none absolute top-0 right-0 bottom-0 z-10 w-20 bg-gradient-to-l from-background to-transparent transition-opacity duration-300",
          canScrollRight ? "opacity-100" : "opacity-0"
        )}
      />

      {/* Scroll Container */}
      <div
        ref={scrollRef}
        className="scrollbar-none flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-4 md:px-12 lg:px-24"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {items.map((child, index) => (
          <div
            key={index}
            data-carousel-card
            className="w-[calc(100vw-3rem)] flex-none snap-center md:w-[700px] lg:w-[900px]"
          >
            {child}
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      {showArrows && (
        <>
          <AnimatePresence>
            {canScrollLeft && (
              <motion.button
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                onClick={scrollPrev}
                className="absolute top-1/2 left-4 z-20 hidden -translate-y-1/2 rounded-full border border-border bg-card p-2 text-foreground shadow-sm transition-colors hover:bg-background md:flex"
                aria-label="Previous slide"
              >
                <ChevronLeft size={24} />
              </motion.button>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {canScrollRight && (
              <motion.button
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                onClick={scrollNext}
                className="absolute top-1/2 right-4 z-20 hidden -translate-y-1/2 rounded-full border border-border bg-card p-2 text-foreground shadow-sm transition-colors hover:bg-background md:flex"
                aria-label="Next slide"
              >
                <ChevronRight size={24} />
              </motion.button>
            )}
          </AnimatePresence>
        </>
      )}

      {/* Pagination Dots */}
      {showDots && items.length > 1 && (
        <div className="mt-4 flex justify-center gap-2">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={cn(
                "h-2 w-2 rounded-full transition-all duration-300",
                activeIndex === index
                  ? "w-6 bg-accent"
                  : "bg-border hover:bg-foreground"
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
