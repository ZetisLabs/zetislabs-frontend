"use client";

import { useState } from "react";

type FeatureCardProps = {
  title: string;
  shortDescription: string;
  fullDescription: string;
};

export const FeatureCard = ({
  title,
  shortDescription,
  fullDescription,
}: FeatureCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div
      className="group relative h-full cursor-pointer perspective-1000"
      onClick={handleFlip}
    >
      <div
        className={`grid h-full w-full transition-all duration-700 transform-style-3d ${
          isFlipped ? "rotate-y-180" : ""
        }`}
      >
        {/* Front Face */}
        <div className="col-start-1 row-start-1 h-full w-full backface-hidden">
          <div className="group/card relative flex h-full flex-col justify-between rounded-2xl border border-border/50 bg-card/50 p-8 transition-all duration-500 hover:!opacity-100 hover:scale-[1.02] hover:bg-card hover:shadow-lg group-hover/grid:opacity-40">
            <div>
              <div className="flex items-center overflow-hidden">
                <span className="mr-2 -translate-x-8 text-2xl opacity-0 transition-all duration-300 group-hover/card:translate-x-0 group-hover/card:opacity-100">
                  ⚡
                </span>
                <h3 className="text-3xl font-normal text-foreground transition-transform duration-300 group-hover/card:translate-x-2">
                  {title}
                </h3>
              </div>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                {shortDescription}
              </p>
            </div>
            <div className="mt-8 flex justify-end">
              <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 transition-all duration-300 group-hover/card:scale-110 group-hover/card:bg-accent group-hover/card:text-accent-foreground">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-foreground transition-all duration-300 group-hover/card:text-accent-foreground"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Back Face */}
        <div className="col-start-1 row-start-1 h-full w-full rotate-y-180 backface-hidden">
          <div className="relative flex h-full flex-col justify-between rounded-2xl border border-border/50 bg-card p-8 shadow-xl">
            <div>
              <h3 className="text-2xl font-normal text-foreground">{title}</h3>
              <div className="mt-4 h-px w-full bg-border/50" />
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                {fullDescription}
              </p>
            </div>
            <div className="mt-8 flex justify-end">
              <button
                className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
                onClick={(e) => {
                  e.stopPropagation();
                  handleFlip();
                }}
              >
                Close
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
