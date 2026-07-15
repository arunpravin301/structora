import Container from "./Container";
export default function PageHero({ crumb, title, intro }: { crumb: string; title: string; intro: string }) {
  return (
    <section className="relative overflow-hidden pt-[172px] pb-[88px] max-[600px]:pt-[140px] max-[600px]:pb-16 bg-mist">
      <div className="absolute inset-0" style={{ background: "radial-gradient(90% 80% at 85% 0%,rgba(234,88,12,.06),transparent 60%)" }} />
      <Container className="relative z-[2]">
        <div className="text-xs tracking-[.14em] uppercase text-brand font-semibold mb-5">{crumb}</div>
        <h1 className="text-slate-900 font-semibold h-title text-[clamp(34px,4.6vw,58px)] max-w-[17ch] tracking-tight">{title}</h1>
        <p className="text-slate-500 text-[17px] max-w-[56ch] mt-5 leading-relaxed">{intro}</p>
      </Container>
    </section>
  );
}
