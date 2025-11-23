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
    { id: "you", icon: "▶️" },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto p-1">
      {/* Tabs Container */}
      <Reveal>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`relative flex flex-col items-start p-4 rounded-xl border transition-all duration-300 overflow-hidden group ${
              activeTab === tab.id
                ? "bg-accent border-accent shadow-lg shadow-accent/20"
                : "bg-card border-border hover:bg-accent/5 hover:border-accent/50"
            }`}
          >
            <div className="relative z-10 w-full">
              <div className="flex items-center gap-2 mb-1">
                <span className={`font-semibold ${activeTab === tab.id ? "text-accent-foreground" : "text-foreground group-hover:text-accent"}`}>
                  {dict.home.exampleProjects.projects.tabs[tab.id].title}
                </span>
                <span className={`text-xs font-normal ${activeTab === tab.id ? "text-accent-foreground/80" : "text-foreground/60"}`}>can</span>
              </div>
              <div className="flex items-start gap-2 text-xs">
                <span className={activeTab === tab.id ? "text-accent-foreground" : "text-yellow-500"}>{tab.icon}</span>
                <span className={`text-left leading-tight ${activeTab === tab.id ? "text-accent-foreground/90" : "text-foreground/70"}`}>
                  {dict.home.exampleProjects.projects.tabs[tab.id].description}
                </span>
              </div>
            </div>
          </button>
        ))}
      </div>
      </Reveal>

      {/* Diagram Container */}
      <Reveal>
      <div className="relative w-full h-[450px] bg-card rounded-2xl border border-border overflow-hidden shadow-xl">
        {/* Grid Background */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)",
            backgroundSize: "24px 24px"
          }}
        />

        {/* Diagram Content - Centered */}
        {/* Diagram Content - Centered */}
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
          {activeTab === "you" ? (
            <YouContent dict={dict} />
          ) : (
            <div className="relative w-full h-full flex items-center justify-center">
              <img 
                src={dict.home.exampleProjects.projects.diagrams[activeTab].image} 
                alt={dict.home.exampleProjects.projects.diagrams[activeTab].alt}
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>
      </div>
      </Reveal>
    </div>
  );
}

function YouContent({ dict }: { dict: any }) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center text-center p-8">
      <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mb-6 animate-pulse-glow">
        <span className="text-4xl">👋</span>
      </div>
      <h3 className="text-3xl font-bold mb-4">{dict.home.exampleProjects.projects.diagrams.you.title}</h3>
      <p className="text-xl text-foreground/70 max-w-lg mb-8">
        {dict.home.exampleProjects.projects.diagrams.you.subtitle}
      </p>
      <button className="px-8 py-3 bg-foreground text-background rounded-full font-medium hover:scale-105 transition-transform">
        Contact Us
      </button>
    </div>
  );
}
