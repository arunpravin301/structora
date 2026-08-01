"use client";
import { useState } from "react";
import Plate from "@/components/ui/Plate";
import ProjectGallery from "@/components/ui/ProjectGallery";
import { urlForImage } from "@/sanity/lib/image";

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <span onClick={onClick}
      className={`rounded-full text-[13px] cursor-pointer border transition select-none ${active ? "bg-slate-900 text-white border-slate-900" : "bg-white text-slate border-line hover:border-brand hover:text-brand"}`}
      style={{ padding: "9px 18px" }}>{children}</span>
  );
}

export default function ProjectFilters({ projects = [] }: { projects?: any[] }) {
  const [openGallery, setOpenGallery] = useState<any[] | null>(null);

  const completed = projects.filter(p => p.status === 'completed');
  const ongoing = projects.filter(p => p.status === 'ongoing');

  return (
    <>

      {completed.length > 0 && (
        <div className="mb-14">
          <h2 className="font-semibold text-2xl mb-8 pb-4 border-b border-line text-slate-900">Completed Projects</h2>
          <div className="grid grid-cols-3 max-[980px]:grid-cols-2 max-[600px]:grid-cols-1 gap-6">
            {completed.map((p, i) => (
                <div key={p._id} className="cursor-pointer group" onClick={() => setOpenGallery(p.gallery || [])}>
                  <Plate cap="Project photograph" idx={`PRJ. 00${i+1}`} src={p.coverImage ? urlForImage(p.coverImage)?.url() : ""} className="aspect-[3/2] mb-[18px] group-hover:opacity-90 transition-opacity" />
                  <div className="text-[11px] font-medium tracking-[.13em] uppercase text-slate-500">{p.location}</div>
                  <h3 className="text-[22px] font-semibold mt-1.5 text-slate-900 group-hover:text-brand transition-colors">{p.title}</h3>
                  <div className="text-[13px] mt-1 font-medium text-brand">Completed</div>
                </div>
            ))}
          </div>
        </div>
      )}

      {ongoing.length > 0 && (
        <div className="mb-8">
          <h2 className="font-semibold text-2xl mb-8 pb-4 border-b border-line text-slate-900">Ongoing Projects</h2>
          <div className="grid grid-cols-3 max-[980px]:grid-cols-2 max-[600px]:grid-cols-1 gap-6">
            {ongoing.map((p, i) => (
                <div key={p._id} className="cursor-pointer group" onClick={() => setOpenGallery(p.gallery || [])}>
                  <Plate cap="Project photograph" idx={`PRJ. 00${completed.length + i + 1}`} src={p.coverImage ? urlForImage(p.coverImage)?.url() : ""} className="aspect-[3/2] mb-[18px] group-hover:opacity-90 transition-opacity" />
                  <div className="text-[11px] font-medium tracking-[.13em] uppercase text-slate-500">{p.location}</div>
                  <h3 className="text-[22px] font-semibold mt-1.5 text-slate-900 group-hover:text-brand transition-colors">{p.title}</h3>
                  <div className="text-[13px] mt-1 font-medium text-slate-500">Ongoing</div>
                </div>
            ))}
          </div>
        </div>
      )}

      <ProjectGallery 
        isOpen={!!openGallery} 
        onClose={() => setOpenGallery(null)} 
        images={openGallery ? openGallery.map(img => urlForImage(img)?.url()).filter(Boolean) as string[] : []} 
      />
    </>
  );
}
