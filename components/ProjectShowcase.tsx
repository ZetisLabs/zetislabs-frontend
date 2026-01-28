"use client";

import { useState } from "react";
import Image from "next/image";
import { type Translations } from "@/lib/i18n";
import { Reveal } from "@/lib/motion";

type ProjectShowcaseProps = {
  dict: Translations;
};

type TabId = "project1" | "project2" | "project3" | "project4";

export function ProjectShowcase({ dict }: ProjectShowcaseProps) {
  const [activeTab, setActiveTab] = useState<TabId>("project1");

  const tabs: { id: TabId; icon: string }[] = [
    { id: "project1", icon: "⚡" },
    { id: "project2", icon: "⚡" },
    { id: "project3", icon: "⚡" },
    { id: "project4", icon: "⚡" },
  ];

  return (
    <div className="mx-auto w-full max-w-6xl p-1">
      {/* Tabs Container */}
      <Reveal>
        <div
          role="tablist"
          aria-label="Project examples"
          className="mb-6 flex flex-wrap items-center justify-center gap-2 px-4"
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={activeTab === tab.id}
              aria-controls={`panel-${tab.id}`}
              id={`tab-${tab.id}`}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300 ${
                activeTab === tab.id
                  ? "scale-105 bg-accent text-accent-foreground shadow-md"
                  : "text-muted-foreground hover:bg-accent/10 hover:text-foreground"
              }`}
            >
              <span aria-hidden="true">{tab.icon}</span>
              <span>
                {dict.home.exampleProjects.projects.tabs[tab.id].title}
              </span>
            </button>
          ))}
        </div>
      </Reveal>

      {/* Diagram Container */}
      <Reveal>
        <div
          role="tabpanel"
          id={`panel-${activeTab}`}
          aria-labelledby={`tab-${activeTab}`}
          className="relative h-[300px] w-full overflow-hidden rounded-2xl border border-border/50 bg-card/50 shadow-sm backdrop-blur-sm md:h-[450px]"
        >
          {/* Grid Background */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)",
              backgroundSize: "24px 24px",
            }}
            aria-hidden="true"
          />

          {/* Diagram Content - Centered */}
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
            <div className="relative flex h-full w-full items-center justify-center p-8">
              <Image
                src={
                  dict.home.exampleProjects.projects.diagrams[activeTab].image
                }
                alt={dict.home.exampleProjects.projects.diagrams[activeTab].alt}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 80vw"
                priority={activeTab === "project1"}
              />
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
