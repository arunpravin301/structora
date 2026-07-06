import Container from "./Container";
export default function PageHero({ crumb, title, intro }: { crumb: string; title: string; intro: string }) {
  return (
    <section className="relative overflow-hidden text-white pt-[172px] pb-[88px] max-[600px]:pt-[140px] max-[600px]:pb-16"
      style={{ background: "linear-gradient(164deg,#163A66 0%,#0F2848 55%,#0B1E36 100%)" }}>
      <div className="absolute inset-0" style={{ background: "radial-gradient(90% 80% at 85% 0%,rgba(63,116,178,.32),transparent 60%)" }} />
      <Container className="relative z-[2]">
        <div className="text-xs tracking-[.14em] uppercase text-slatel mb-5">{crumb}</div>
        <h1 className="text-white text-[clamp(34px,4.6vw,58px)] max-w-[17ch] tracking-tight">{title}</h1>
        <p className="text-white/70 text-lg max-w-[56ch] mt-5 leading-relaxed">{intro}</p>
      </Container>
    </section>
  );
}
