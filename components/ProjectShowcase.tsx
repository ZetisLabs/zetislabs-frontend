"use client";

import { useState } from "react";
import { Reveal } from "./ui/Reveal";

type ProjectShowcaseProps = {
  dict: any; // Using any for now to avoid complex type definitions, but should be typed properly in a real app
};

export function ProjectShowcase({ dict }: ProjectShowcaseProps) {
  const [activeTab, setActiveTab] = useState("project1");

  const tabs = [
    { id: "project1", icon: "⚡" },
    { id: "project2", icon: "⚡" },
    { id: "project3", icon: "⚡" },
    { id: "project4", icon: "⚡" },
  ];

  return (
    <div className="mx-auto w-full max-w-6xl p-1">
      {/* Tabs Container */}
      <Reveal>
        <div className="mb-6 flex flex-wrap items-center justify-center gap-2 px-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300 ${
                activeTab === tab.id
                  ? "scale-105 bg-accent text-accent-foreground shadow-md"
                  : "text-muted-foreground hover:bg-accent/10 hover:text-foreground"
              }`}
            >
              <span>{tab.icon}</span>
              <span>
                {dict.home.exampleProjects.projects.tabs[tab.id].title}
              </span>
            </button>
          ))}
        </div>
      </Reveal>

      {/* Diagram Container */}
      <Reveal>
        <div className="relative h-[300px] w-full overflow-hidden rounded-2xl border border-border/50 bg-card/50 shadow-sm backdrop-blur-sm md:h-[450px]">
          {/* Grid Background */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)",
              backgroundSize: "24px 24px",
            }}
          />

          {/* Diagram Content - Centered */}
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
            <div className="relative flex h-full w-full items-center justify-center p-8">
              <img
                src={
                  dict.home.exampleProjects.projects.diagrams[activeTab].image
                }
                alt={dict.home.exampleProjects.projects.diagrams[activeTab].alt}
                className="h-full w-full object-contain"
              />
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
