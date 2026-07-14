export default function SectionHead({ children, center = false }: { children: React.ReactNode; center?: boolean }) {
  return (
    <div className={`mb-14 max-w-[680px] ${center ? "mx-auto text-center" : ""}`}>
      {!center && <div className="h-px bg-line mb-7" />}
      <h2 className="text-slate-900 text-[clamp(28px,3.6vw,44px)]">{children}</h2>
    </div>
  );
}
