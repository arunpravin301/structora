"use client";
import Link from "next/link";
import { projectDetailPath } from "@/lib/static-content";
import Image from "next/image";
import type { Project } from "@/lib/content";
import type { Image as SanityImage } from "sanity";
import { useState, useMemo, useCallback, useEffect } from "react";
import ProjectGallery from "@/components/ui/ProjectGallery";
import { imageUrl } from "@/sanity/lib/image";

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

export default function ProjectFilters({ projects = [] }: { projects?: Project[] }) {
  const [projectList, setProjectList] = useState<Project[]>(projects);
  const [filter, setFilter] = useState<"all" | "completed" | "ongoing">("all");
  const [openGallery, setOpenGallery] = useState<SanityImage[] | null>(null);

  useEffect(() => {
    // Client-side fetch from Sanity CDN to reflect newly published projects immediately
    import("@/sanity/lib/client").then(({ client }) => {
      import("@/sanity/lib/queries").then(({ projectsQuery }) => {
        client.fetch(projectsQuery).then((fresh) => {
          if (fresh && Array.isArray(fresh) && true) {
            setProjectList(fresh);
          }
        }).catch(() => {});
      });
    });
  }, []);

  const closeGallery = useCallback(() => setOpenGallery(null), []);
  const completed = useMemo(() => projectList.filter((p) => p.status === "completed"), [projectList]);
  const ongoing = useMemo(() => projectList.filter((p) => p.status === "ongoing"), [projectList]);

  const displayedProjects = useMemo(() => {
    if (filter === "completed") return completed;
    if (filter === "ongoing") return ongoing;
    return projectList;
  }, [filter, projectList, completed, ongoing]);

  const getFullProjectGallery = (p: Project) => {
    const list: SanityImage[] = [];
    if (p.coverImage) list.push(p.coverImage);
    if (p.gallery && Array.isArray(p.gallery)) {
      p.gallery.forEach((g: SanityImage) => {
        if (g.asset?._ref !== p.coverImage?.asset?._ref) {
          list.push(g);
        }
      });
    }
    return list;
  };

  const preloadGallery = (p: Project) => {
    const gallery = getFullProjectGallery(p);
    if (!gallery || !gallery.length) return;
    gallery.slice(0, 4).forEach((img) => {
      const url = imageUrl(img,1600);
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
          aria-pressed={filter === "all"}
          onClick={() => setFilter("all")}
          className={`px-5 py-2.5 rounded-full text-[13px] font-semibold transition-all select-none ${
            filter === "all"
              ? "bg-slate-900 text-white shadow-sm"
              : "bg-white text-slate-600 border border-slate-200 hover:border-slate-400 hover:text-slate-900"
          }`}
        >
          All Projects ({projectList.length})
        </button>
        <button
          aria-pressed={filter === "completed"}
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
          aria-pressed={filter === "ongoing"}
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
        {displayedProjects.map((p) => {
          const coverUrl = p.coverImage
            ? imageUrl(p.coverImage,800)
            : "";

          const detailPath = projectDetailPath(p.slug?.current, projects);
          const isCompleted = p.status === "completed";

          return (
            <div
              key={p._id}
              onMouseEnter={() => preloadGallery(p)}
              onTouchStart={() => preloadGallery(p)}
              className="group cursor-pointer bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-sm hover:shadow-xl hover:border-slate-300 transition-all duration-300 flex flex-col"
            >
              {/* Normal Full-Width Thumbnail */}
              <button type="button" aria-label={"View photographs of "+p.title} onClick={() => setOpenGallery(getFullProjectGallery(p))} className="relative w-full aspect-[16/10] overflow-hidden bg-slate-100">
                {coverUrl ? (
                  <Image
                    width={800}
                    height={500}
                    sizes="(max-width:640px) 100vw, (max-width:1100px) 50vw, 33vw"
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
              </button>

              {/* Card Body */}
              <div className="p-5 flex flex-col flex-1 justify-between bg-white">
                <div>
                  {/* Status */}
                  <div className="flex items-center">
                    <span
                      className={`text-[10.5px] font-semibold tracking-[0.14em] uppercase px-2 py-0.5 rounded-sm border ${
                        isCompleted
                          ? "bg-slate-50 text-slate-700 border-slate-200"
                          : "bg-brand/10 text-brand border-brand/25"
                      }`}
                    >
                      {isCompleted ? "Completed" : "Ongoing"}
                    </span>
                  </div>

                  {/* Client / Project Title */}
                  <h3 className="text-[18px] font-bold text-slate-900 mt-2.5 line-clamp-1 group-hover:text-brand transition-colors font-outfit">
                    {detailPath ? <Link href={detailPath} onClick={e => e.stopPropagation()} className="underline underline-offset-4">{p.title}</Link> : p.title}
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
      {openGallery && <ProjectGallery
        isOpen={!!openGallery}
        onClose={closeGallery}
        images={
          openGallery
            ? (openGallery
                .map((img) => imageUrl(img,1600))
                .filter(Boolean) as string[])
            : []
        }
      />}
    </>
  );
}
