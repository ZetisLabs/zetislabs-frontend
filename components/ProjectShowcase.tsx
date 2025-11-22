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
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
          <div className="relative w-full max-w-4xl h-[500px] scale-[0.65] sm:scale-[0.75] md:scale-[0.85] origin-center">
            {activeTab === "itOps" && <ItOpsDiagram dict={dict} />}
            {activeTab === "secOps" && <SecOpsDiagram dict={dict} />}
            {activeTab === "devOps" && <DevOpsDiagram dict={dict} />}
            {activeTab === "sales" && <SalesDiagram dict={dict} />}
            {activeTab === "you" && <YouContent dict={dict} />}
          </div>
        </div>
      </div>
      </Reveal>
    </div>
  );
}

function ItOpsDiagram({ dict }: { dict: any }) {
  return (
    <>
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <defs>
          <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" className="fill-foreground/40" />
          </marker>
        </defs>
        <path d="M180 250 L340 250" className="stroke-foreground/40" strokeWidth="1.5" markerEnd="url(#arrowhead)" />
        <path d="M540 250 L640 250" className="stroke-foreground/40" strokeWidth="1.5" markerEnd="url(#arrowhead)" />
        <path d="M740 250 C780 250, 780 180, 820 180" className="stroke-foreground/40" strokeWidth="1.5" markerEnd="url(#arrowhead)" />
        <path d="M740 250 C780 250, 780 320, 820 320" className="stroke-foreground/40" strokeWidth="1.5" markerEnd="url(#arrowhead)" />
        <path d="M400 290 C400 320, 300 320, 280 350" className="stroke-foreground/20" strokeWidth="1" strokeDasharray="4 4" fill="none" />
        <path d="M440 290 C440 320, 380 320, 380 350" className="stroke-foreground/20" strokeWidth="1" strokeDasharray="4 4" fill="none" />
        <path d="M480 290 C480 320, 520 320, 520 350" className="stroke-foreground/20" strokeWidth="1" strokeDasharray="4 4" fill="none" />
        <path d="M500 290 C500 320, 620 320, 620 350" className="stroke-foreground/20" strokeWidth="1" strokeDasharray="4 4" fill="none" />
      </svg>

      <div className="absolute left-[40px] top-[210px] w-[140px] flex flex-col items-center z-10">
        <div className="w-16 h-16 rounded-2xl bg-white border border-border shadow-sm flex items-center justify-center">
          <span className="text-2xl">📝</span>
          <div className="absolute -top-2 -left-2 bg-orange-500 rounded-full p-1 text-white">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
          </div>
        </div>
        <p className="mt-3 text-xs text-center text-foreground/80 font-medium leading-tight">
          {dict.home.exampleProjects.projects.diagrams.itOps.formSubmission}
        </p>
      </div>

      <div className="absolute left-[340px] top-[210px] w-[200px] h-[80px] rounded-xl bg-foreground text-background border border-border/10 flex items-center justify-between px-4 z-10 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
            🤖
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold">{dict.home.exampleProjects.projects.diagrams.itOps.aiAgent}</span>
            <span className="text-[10px] opacity-70">{dict.home.exampleProjects.projects.diagrams.itOps.toolsAgent}</span>
          </div>
        </div>
        <div className="flex gap-1">
          <div className="w-2 h-2 rounded-full bg-white/30"></div>
          <div className="w-2 h-2 rounded-full bg-white/30"></div>
        </div>
        <div className="absolute -bottom-1 left-10 w-2 h-2 bg-purple-500 rounded-full ring-2 ring-card"></div>
        <div className="absolute -bottom-1 left-24 w-2 h-2 bg-blue-500 rounded-full ring-2 ring-card"></div>
        <div className="absolute -bottom-1 right-10 w-2 h-2 bg-gray-500 rounded-full ring-2 ring-card"></div>
      </div>

      <div className="absolute left-[640px] top-[210px] w-[100px] h-[80px] rounded-xl bg-emerald-600 text-white border border-emerald-500/30 flex flex-col items-center justify-center z-10 shadow-lg">
        <div className="text-2xl mb-1">Is?</div>
        <span className="text-[10px] font-medium">{dict.home.exampleProjects.projects.diagrams.itOps.isManager}</span>
        <div className="absolute -right-1 top-6 w-2 h-2 bg-white rounded-full ring-2 ring-emerald-700"></div>
        <div className="absolute right-[-20px] top-5 text-[9px] text-foreground/60">true</div>
        <div className="absolute -right-1 bottom-6 w-2 h-2 bg-emerald-800 rounded-full ring-2 ring-emerald-700"></div>
        <div className="absolute right-[-20px] bottom-5 text-[9px] text-foreground/60">false</div>
      </div>

      <div className="absolute left-[820px] top-[140px] w-[160px] flex flex-col items-center z-10">
        <div className="w-full h-[70px] rounded-xl bg-white border border-border flex items-center p-3 gap-3 relative shadow-sm">
          <div className="w-10 h-10 rounded bg-[#3F0E40] flex items-center justify-center text-white text-xl">#</div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-foreground">{dict.home.exampleProjects.projects.diagrams.itOps.addToChannel}</span>
            <span className="text-[10px] text-foreground/60">{dict.home.exampleProjects.projects.diagrams.itOps.inviteChannel}</span>
          </div>
          <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-white border border-border rounded flex items-center justify-center text-xs text-foreground/60">+</div>
        </div>
      </div>

      <div className="absolute left-[820px] top-[280px] w-[160px] flex flex-col items-center z-10">
        <div className="w-full h-[70px] rounded-xl bg-white border border-border flex items-center p-3 gap-3 relative shadow-sm">
          <div className="w-10 h-10 rounded bg-[#3F0E40] flex items-center justify-center text-white text-xl">#</div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-foreground">{dict.home.exampleProjects.projects.diagrams.itOps.updateProfile}</span>
            <span className="text-[10px] text-foreground/60">{dict.home.exampleProjects.projects.diagrams.itOps.updateUser}</span>
          </div>
          <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-white border border-border rounded flex items-center justify-center text-xs text-foreground/60">+</div>
        </div>
      </div>

      <div className="absolute left-[240px] top-[350px] flex flex-col items-center">
        <div className="w-12 h-12 rounded-full bg-white border border-border flex items-center justify-center text-xl mb-2 shadow-sm">AI</div>
        <span className="text-[10px] text-center text-foreground/60 w-20 leading-tight">{dict.home.exampleProjects.projects.diagrams.itOps.chatModel}</span>
      </div>

      <div className="absolute left-[340px] top-[350px] flex flex-col items-center">
        <div className="w-12 h-12 rounded-full bg-white border border-border flex items-center justify-center text-xl mb-2 shadow-sm">🧠</div>
        <span className="text-[10px] text-center text-foreground/60 w-20 leading-tight">{dict.home.exampleProjects.projects.diagrams.itOps.memory}</span>
      </div>

      <div className="absolute left-[480px] top-[350px] flex flex-col items-center">
        <div className="w-12 h-12 rounded-full bg-white border border-border flex items-center justify-center text-xl mb-2 shadow-sm">🆔</div>
        <span className="text-[10px] text-center text-foreground/60 w-24 leading-tight">Microsoft Entra ID<br/><span className="text-foreground/40">{dict.home.exampleProjects.projects.diagrams.itOps.getAllUser}</span></span>
      </div>

      <div className="absolute left-[580px] top-[350px] flex flex-col items-center">
        <div className="w-12 h-12 rounded-full bg-white border border-border flex items-center justify-center text-xl mb-2 shadow-sm">🔷</div>
        <span className="text-[10px] text-center text-foreground/60 w-20 leading-tight">Jira Software<br/><span className="text-foreground/40">{dict.home.exampleProjects.projects.diagrams.itOps.createUser}</span></span>
      </div>
    </>
  );
}

function SecOpsDiagram({ dict }: { dict: any }) {
  return (
    <>
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <defs>
          <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" className="fill-foreground/40" />
          </marker>
        </defs>
        <path d="M150 250 L300 250" className="stroke-foreground/40" strokeWidth="1.5" markerEnd="url(#arrowhead)" />
        <path d="M500 250 L600 250" className="stroke-foreground/40" strokeWidth="1.5" markerEnd="url(#arrowhead)" />
        <path d="M700 250 C740 250, 740 180, 780 180" className="stroke-foreground/40" strokeWidth="1.5" markerEnd="url(#arrowhead)" />
        <path d="M700 250 C740 250, 740 320, 780 320" className="stroke-foreground/40" strokeWidth="1.5" markerEnd="url(#arrowhead)" />
        <path d="M400 290 C400 320, 500 320, 500 350" className="stroke-foreground/20" strokeWidth="1" strokeDasharray="4 4" fill="none" />
      </svg>

      <div className="absolute left-[20px] top-[210px] w-[130px] flex flex-col items-center z-10">
        <div className="w-16 h-16 rounded-2xl bg-red-50 border border-red-200 shadow-sm flex items-center justify-center">
          <span className="text-2xl">🚨</span>
        </div>
        <p className="mt-3 text-xs text-center text-foreground/80 font-medium leading-tight">
          {dict.home.exampleProjects.projects.diagrams.secOps.trigger}
        </p>
      </div>

      <div className="absolute left-[300px] top-[210px] w-[200px] h-[80px] rounded-xl bg-foreground text-background border border-border/10 flex items-center justify-between px-4 z-10 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">🛡️</div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold">{dict.home.exampleProjects.projects.diagrams.secOps.aiAgent}</span>
            <span className="text-[10px] opacity-70">{dict.home.exampleProjects.projects.diagrams.secOps.analysis}</span>
          </div>
        </div>
      </div>

      <div className="absolute left-[600px] top-[210px] w-[100px] h-[80px] rounded-xl bg-orange-600 text-white border border-orange-500/30 flex flex-col items-center justify-center z-10 shadow-lg">
        <div className="text-2xl mb-1">⚠️</div>
        <span className="text-[10px] font-medium text-center px-1">{dict.home.exampleProjects.projects.diagrams.secOps.checkSeverity}</span>
      </div>

      <div className="absolute left-[780px] top-[140px] w-[160px] flex flex-col items-center z-10">
        <div className="w-full h-[70px] rounded-xl bg-white border border-border flex items-center p-3 gap-3 relative shadow-sm">
          <div className="w-10 h-10 rounded bg-green-700 flex items-center justify-center text-white text-xl">📟</div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-foreground">{dict.home.exampleProjects.projects.diagrams.secOps.pageOnCall}</span>
            <span className="text-[10px] text-foreground/60">{dict.home.exampleProjects.projects.diagrams.secOps.pagerDuty}</span>
          </div>
        </div>
      </div>

      <div className="absolute left-[780px] top-[280px] w-[160px] flex flex-col items-center z-10">
        <div className="w-full h-[70px] rounded-xl bg-white border border-border flex items-center p-3 gap-3 relative shadow-sm">
          <div className="w-10 h-10 rounded bg-blue-600 flex items-center justify-center text-white text-xl">🎫</div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-foreground">{dict.home.exampleProjects.projects.diagrams.secOps.logTicket}</span>
            <span className="text-[10px] text-foreground/60">{dict.home.exampleProjects.projects.diagrams.secOps.jira}</span>
          </div>
        </div>
      </div>
    </>
  );
}

function DevOpsDiagram({ dict }: { dict: any }) {
  return (
    <>
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <defs>
          <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" className="fill-foreground/40" />
          </marker>
        </defs>
        <path d="M180 250 L340 250" className="stroke-foreground/40" strokeWidth="1.5" markerEnd="url(#arrowhead)" />
        <path d="M540 250 L680 250" className="stroke-foreground/40" strokeWidth="1.5" markerEnd="url(#arrowhead)" />
        <path d="M440 290 C440 320, 440 320, 440 350" className="stroke-foreground/20" strokeWidth="1" strokeDasharray="4 4" fill="none" />
      </svg>

      <div className="absolute left-[40px] top-[210px] w-[140px] flex flex-col items-center z-10">
        <div className="w-16 h-16 rounded-2xl bg-white border border-border shadow-sm flex items-center justify-center">
          <span className="text-2xl">💬</span>
        </div>
        <p className="mt-3 text-xs text-center text-foreground/80 font-medium leading-tight">
          {dict.home.exampleProjects.projects.diagrams.devOps.trigger}
        </p>
      </div>

      <div className="absolute left-[340px] top-[210px] w-[200px] h-[80px] rounded-xl bg-foreground text-background border border-border/10 flex items-center justify-between px-4 z-10 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">⚙️</div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold">{dict.home.exampleProjects.projects.diagrams.devOps.aiAgent}</span>
            <span className="text-[10px] opacity-70">{dict.home.exampleProjects.projects.diagrams.devOps.parse}</span>
          </div>
        </div>
      </div>

      <div className="absolute left-[680px] top-[210px] w-[180px] h-[80px] rounded-xl bg-blue-600 text-white border border-blue-500/30 flex items-center justify-center gap-3 z-10 shadow-lg">
        <div className="text-2xl">🚀</div>
        <div className="flex flex-col">
          <span className="text-sm font-semibold">{dict.home.exampleProjects.projects.diagrams.devOps.execute}</span>
          <span className="text-[10px] opacity-80">{dict.home.exampleProjects.projects.diagrams.devOps.aws} / {dict.home.exampleProjects.projects.diagrams.devOps.github}</span>
        </div>
      </div>
    </>
  );
}

function SalesDiagram({ dict }: { dict: any }) {
  return (
    <>
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <defs>
          <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" className="fill-foreground/40" />
          </marker>
        </defs>
        <path d="M180 250 L340 250" className="stroke-foreground/40" strokeWidth="1.5" markerEnd="url(#arrowhead)" />
        <path d="M540 250 L680 250" className="stroke-foreground/40" strokeWidth="1.5" markerEnd="url(#arrowhead)" />
        <path d="M440 290 C440 320, 440 320, 440 350" className="stroke-foreground/20" strokeWidth="1" strokeDasharray="4 4" fill="none" />
      </svg>

      <div className="absolute left-[40px] top-[210px] w-[140px] flex flex-col items-center z-10">
        <div className="w-16 h-16 rounded-2xl bg-white border border-border shadow-sm flex items-center justify-center">
          <span className="text-2xl">⭐</span>
        </div>
        <p className="mt-3 text-xs text-center text-foreground/80 font-medium leading-tight">
          {dict.home.exampleProjects.projects.diagrams.sales.trigger}
        </p>
      </div>

      <div className="absolute left-[340px] top-[210px] w-[200px] h-[80px] rounded-xl bg-foreground text-background border border-border/10 flex items-center justify-between px-4 z-10 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">💼</div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold">{dict.home.exampleProjects.projects.diagrams.sales.aiAgent}</span>
            <span className="text-[10px] opacity-70">{dict.home.exampleProjects.projects.diagrams.sales.sentiment}</span>
          </div>
        </div>
      </div>

      <div className="absolute left-[680px] top-[210px] w-[180px] h-[80px] rounded-xl bg-indigo-600 text-white border border-indigo-500/30 flex items-center justify-center gap-3 z-10 shadow-lg">
        <div className="text-2xl">📈</div>
        <div className="flex flex-col">
          <span className="text-sm font-semibold">{dict.home.exampleProjects.projects.diagrams.sales.crm}</span>
          <span className="text-[10px] opacity-80">{dict.home.exampleProjects.projects.diagrams.sales.salesforce}</span>
        </div>
      </div>
    </>
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
