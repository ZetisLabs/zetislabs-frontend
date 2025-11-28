"use client";

import { useState } from "react";
import { Reveal } from "./ui/Reveal";

type ProjectShowcaseProps = {
  dict: any; // Using any for now to avoid complex type definitions, but should be typed properly in a real app
};

export function ProjectShowcase({ dict }: ProjectShowcaseProps) {
  const [activeTab, setActiveTab] = useState("itOps");

  const tabs = [
    { id: "itOps", icon: "⚡" },
    { id: "secOps", icon: "⚡" },
    { id: "devOps", icon: "⚡" },
    { id: "sales", icon: "⚡" },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto p-1">
      {/* Tabs Container */}
      <Reveal>
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6 px-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                activeTab === tab.id
                  ? "bg-accent text-accent-foreground shadow-md scale-105"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent/10"
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
        <div className="relative w-full h-[300px] md:h-[450px] bg-card/50 backdrop-blur-sm rounded-2xl border border-border/50 overflow-hidden shadow-sm">
          {/* Grid Background */}
          <div 
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)",
              backgroundSize: "24px 24px"
            }}
          />

          {/* Diagram Content - Centered */}
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
            <div className="relative w-full h-full flex items-center justify-center p-8">
              <img 
                src={dict.home.exampleProjects.projects.diagrams[activeTab].image} 
                alt={dict.home.exampleProjects.projects.diagrams[activeTab].alt}
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  );
}


