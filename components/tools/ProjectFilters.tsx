"use client";
import { useState, useMemo } from "react";
import ProjectGallery from "@/components/ui/ProjectGallery";
import { urlForImage } from "@/sanity/lib/image";

function formatSqft(val?: number | string) {
  if (!val) return "—";
  const num = typeof val === "number" ? val : parseFloat(String(val).replace(/,/g, ""));
  if (isNaN(num)) return String(val);
  return `${num.toLocaleString("en-IN")} sq.ft`;
}

function formatPlot(val?: string | number) {
  if (!val) return "—";
  if (typeof val === "number") return `${val.toLocaleString("en-IN")} sq.ft`;
  const str = String(val).trim();
  const match = str.match(/^(\d+)\s*[xX*]\s*(\d+)$/);
  if (match) {
    const area = parseInt(match[1], 10) * parseInt(match[2], 10);
    return `${area.toLocaleString("en-IN")} sq.ft`;
  }
  return str.toLowerCase().includes("sq") ? str : `${str} sq.ft`;
}

function formatValue(val?: number | string) {
  if (!val) return "—";
  const num = typeof val === "number" ? val : parseFloat(String(val).replace(/[^0-9.]/g, ""));
  if (isNaN(num)) return String(val);
  if (num >= 10000000) {
    const cr = num / 10000000;
    return `₹${cr.toFixed(2).replace(/\.00$/, "").replace(/(\.[1-9])0$/, "$1")} Cr`;
  }
  if (num >= 100000) {
    const lakh = num / 100000;
    return `₹${lakh.toFixed(num % 100000 === 0 ? 0 : 2).replace(/\.00$/, "")} Lakhs`;
  }
  return `₹${num.toLocaleString("en-IN")}`;
}

export default function ProjectFilters({ projects = [] }: { projects?: any[] }) {
  const [filter, setFilter] = useState<"all" | "completed" | "ongoing">("all");
  const [openGallery, setOpenGallery] = useState<any[] | null>(null);

  const completed = useMemo(() => projects.filter((p) => p.status === "completed"), [projects]);
  const ongoing = useMemo(() => projects.filter((p) => p.status === "ongoing"), [projects]);

  const displayedProjects = useMemo(() => {
    if (filter === "completed") return completed;
    if (filter === "ongoing") return ongoing;
    return projects;
  }, [filter, projects, completed, ongoing]);

  const getFullProjectGallery = (p: any) => {
    const list: any[] = [];
    if (p.coverImage) list.push(p.coverImage);
    if (p.gallery && Array.isArray(p.gallery)) {
      p.gallery.forEach((g: any) => {
        if (g.asset?._ref !== p.coverImage?.asset?._ref) {
          list.push(g);
        }
      });
    }
    return list;
  };

  const preloadGallery = (p: any) => {
    const gallery = getFullProjectGallery(p);
    if (!gallery || !gallery.length) return;
    gallery.slice(0, 4).forEach((img) => {
      const url = urlForImage(img)?.width(1600).quality(80).auto("format").url();
      if (url) {
        const i = new window.Image();
        i.src = url;
      }
    });
  };

  return (
    <>
      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center gap-3 mb-10">
        <button
          onClick={() => setFilter("all")}
          className={`px-5 py-2.5 rounded-full text-[13px] font-semibold transition-all select-none ${
            filter === "all"
              ? "bg-slate-900 text-white shadow-sm"
              : "bg-white text-slate-600 border border-slate-200 hover:border-slate-400 hover:text-slate-900"
          }`}
        >
          All Projects ({projects.length})
        </button>
        <button
          onClick={() => setFilter("completed")}
          className={`px-5 py-2.5 rounded-full text-[13px] font-semibold transition-all select-none ${
            filter === "completed"
              ? "bg-slate-900 text-white shadow-sm"
              : "bg-white text-slate-600 border border-slate-200 hover:border-slate-400 hover:text-slate-900"
          }`}
        >
          Completed ({completed.length})
        </button>
        <button
          onClick={() => setFilter("ongoing")}
          className={`px-5 py-2.5 rounded-full text-[13px] font-semibold transition-all select-none ${
            filter === "ongoing"
              ? "bg-slate-900 text-white shadow-sm"
              : "bg-white text-slate-600 border border-slate-200 hover:border-slate-400 hover:text-slate-900"
          }`}
        >
          Ongoing ({ongoing.length})
        </button>
      </div>

      {/* Projects Grid in Brick&Bolt Card Style */}
      <div className="grid grid-cols-3 max-[1100px]:grid-cols-2 max-[640px]:grid-cols-1 gap-7 mb-14">
        {displayedProjects.map((p, i) => {
          const coverUrl = p.coverImage
            ? urlForImage(p.coverImage)?.width(800).quality(85).auto("format").url()
            : "";

          const isCompleted = p.status === "completed";

          return (
            <div
              key={p._id}
              onMouseEnter={() => preloadGallery(p)}
              onTouchStart={() => preloadGallery(p)}
              onClick={() => setOpenGallery(getFullProjectGallery(p))}
              className="group cursor-pointer bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-sm hover:shadow-xl hover:border-slate-300 transition-all duration-300 flex flex-col"
            >
              {/* Normal Full-Width Thumbnail */}
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                {coverUrl ? (
                  <img
                    src={coverUrl}
                    alt={p.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-300 text-sm">
                    No image
                  </div>
                )}
              </div>

              {/* Card Body */}
              <div className="p-5 flex flex-col flex-1 justify-between bg-white">
                <div>
                  {/* Status & Project Code / CRN */}
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                        isCompleted
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200/60"
                          : "bg-amber-50 text-amber-800 border border-amber-200/60"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          isCompleted ? "bg-emerald-500" : "bg-amber-500"
                        }`}
                      />
                      {isCompleted ? "Completed" : "Ongoing"}
                    </span>
                    <span className="text-[12px] font-medium text-slate-400 tracking-wide font-mono">
                      {p.crn || `CRN${102450 + i}`}
                    </span>
                  </div>

                  {/* Client / Project Title */}
                  <h3 className="text-[18px] font-bold text-slate-900 mt-2.5 line-clamp-1 group-hover:text-brand transition-colors font-outfit">
                    {p.title}
                  </h3>

                  {/* Location with Pin */}
                  <div className="flex items-center gap-1 text-[13px] text-slate-500 mt-1">
                    <svg
                      className="w-3.5 h-3.5 text-slate-400 shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <span>{p.location || "Tamil Nadu"}</span>
                  </div>
                </div>

                {/* Divider & 3 Columns (Built-up, Plot, Value) */}
                <div>
                  <div className="border-t border-slate-100 my-4" />
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <div className="text-[11px] font-medium text-slate-400">Built-up</div>
                      <div className="text-[14px] font-bold text-slate-800 mt-0.5">
                        {formatSqft(p.builtUp)}
                      </div>
                    </div>
                    <div>
                      <div className="text-[11px] font-medium text-slate-400">Plot</div>
                      <div
                        className="text-[14px] font-bold text-slate-800 mt-0.5 cursor-help"
                        title={p.plotSize ? `Dimensions: ${p.plotSize}` : undefined}
                      >
                        {formatPlot(p.plotSize)}
                      </div>
                    </div>
                    <div>
                      <div className="text-[11px] font-medium text-slate-400">Value</div>
                      <div className="text-[14px] font-bold text-slate-800 mt-0.5">
                        {formatValue(p.projectValue)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Full-screen Photo Gallery Modal on Click */}
      <ProjectGallery
        isOpen={!!openGallery}
        onClose={() => setOpenGallery(null)}
        images={
          openGallery
            ? (openGallery
                .map((img) => urlForImage(img)?.width(1600).quality(80).auto("format").url())
                .filter(Boolean) as string[])
            : []
        }
      />
    </>
  );
}
