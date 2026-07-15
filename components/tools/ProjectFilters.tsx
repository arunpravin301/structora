"use client";
import { useState } from "react";
import Plate from "@/components/ui/Plate";

// Real projects from the client's form submission (Jul 2026).
type P = { name: string; district: string; type: string; sqft: string; status: string; idx: string };
const PROJECTS: P[] = [
  { name: "Balaji Abode", district: "Kumbakonam", type: "G+1 / G+2", sqft: "4,019 sq ft", status: "Completed 2025", idx: "PRJ. 001" },
  { name: "Marimuthu Residence", district: "Kumbakonam", type: "G+1 / G+2", sqft: "2,025 sq ft", status: "Completed 2026", idx: "PRJ. 002" },
  { name: "Farmhouse, 4BHK", district: "Tiruvannamalai", type: "Farmhouse", sqft: "4,000 sq ft", status: "Ongoing", idx: "PRJ. 003" },
  { name: "Priyanka Residence", district: "Kumbakonam", type: "Residential", sqft: "1,300 sq ft", status: "Ongoing", idx: "PRJ. 004" },
  { name: "Rabiya Residence", district: "Tiruvannamalai", type: "Residential", sqft: "2,107 sq ft", status: "Ongoing", idx: "PRJ. 005" },
  { name: "Panruti Residence", district: "Cuddalore", type: "Residential", sqft: "1,000 sq ft", status: "Ongoing", idx: "PRJ. 006" }
];
const DISTRICTS = ["all", "Kumbakonam", "Tiruvannamalai", "Cuddalore"];
const TYPES = ["all", "Residential", "G+1 / G+2", "Farmhouse"];

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <span onClick={onClick}
      className={`rounded-full text-[13px] cursor-pointer border transition select-none ${active ? "bg-slate-900 text-white border-slate-900" : "bg-white text-slate border-line hover:border-brand hover:text-brand"}`}
      style={{ padding: "9px 18px" }}>{children}</span>
  );
}

export default function ProjectFilters() {
  const [d, setD] = useState("all"); const [t, setT] = useState("all");
  const list = PROJECTS.filter((p) => (d === "all" || p.district === d) && (t === "all" || p.type === t));
  return (
    <>
      <div className="flex gap-2.5 flex-wrap items-center mb-3.5">
        <span className="text-xs tracking-[.1em] uppercase text-slate mr-1.5 min-w-[74px]">District</span>
        {DISTRICTS.map((x) => <Chip key={x} active={d === x} onClick={() => setD(x)}>{x === "all" ? "All" : x}</Chip>)}
      </div>
      <div className="flex gap-2.5 flex-wrap items-center mb-10">
        <span className="text-xs tracking-[.1em] uppercase text-slate mr-1.5 min-w-[74px]">Type</span>
        {TYPES.map((x) => <Chip key={x} active={t === x} onClick={() => setT(x)}>{x === "all" ? "All" : x}</Chip>)}
      </div>

      <div className="mb-14">
        <h2 className="font-semibold text-2xl mb-8 pb-4 border-b border-line text-slate-900">Completed Projects</h2>
        <div className="grid grid-cols-3 max-[980px]:grid-cols-2 max-[600px]:grid-cols-1 gap-6">
          {list.filter(p => p.status.startsWith("Completed")).map((p, i) => (
            <div key={i}>
              <Plate cap="Project photograph" idx={p.idx} className="aspect-[3/2] mb-[18px]" />
              <div className="text-[11px] font-medium tracking-[.13em] uppercase text-slate-500">{p.district} · {p.type} · {p.sqft}</div>
              <h3 className="text-[22px] font-semibold mt-1.5 text-slate-900">{p.name}</h3>
              <div className="text-[13px] mt-1 font-medium text-brand">{p.status}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <h2 className="font-semibold text-2xl mb-8 pb-4 border-b border-line text-slate-900">Ongoing Projects</h2>
        <div className="grid grid-cols-3 max-[980px]:grid-cols-2 max-[600px]:grid-cols-1 gap-6">
          {list.filter(p => !p.status.startsWith("Completed")).map((p, i) => (
            <div key={i}>
              <Plate cap="Project photograph" idx={p.idx} className="aspect-[3/2] mb-[18px]" />
              <div className="text-[11px] font-medium tracking-[.13em] uppercase text-slate-500">{p.district} · {p.type} · {p.sqft}</div>
              <h3 className="text-[22px] font-semibold mt-1.5 text-slate-900">{p.name}</h3>
              <div className="text-[13px] mt-1 font-medium text-slate-500">{p.status}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
