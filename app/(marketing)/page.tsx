import Link from "next/link";
import Container from "@/components/ui/Container";
import SectionHead from "@/components/ui/SectionHead";
import Plate from "@/components/ui/Plate";
import Reveal from "@/components/ui/Reveal";
import Hero from "@/components/sections/Hero";
import Stats from "@/components/sections/Stats";
import ServiceIndex from "@/components/sections/ServiceIndex";
import TransformReveal from "@/components/tools/TransformReveal";
import Testimonials from "@/components/sections/Testimonials";
import WhyChooseUs from "@/components/sections/WhyChooseUs";

import { client } from "@/sanity/lib/client";
import { projectsQuery } from "@/sanity/lib/queries";
import { urlForImage } from "@/sanity/lib/image";

export const revalidate = 60; // revalidate every minute

export default async function Home() {
  const projects = await client.fetch(projectsQuery);
  const p1 = projects.find((p: any) => p.title?.includes("Priyanka")) || projects[0];
  const p2 = projects.find((p: any) => p.title?.includes("Balaji")) || projects[1];

  return (
    <>
      <Hero />
      <Stats />

      <section className="pt-[160px] pb-[80px] bg-white"><Container>
        <Reveal><SectionHead>Why corporate clients and homeowners trust us.</SectionHead></Reveal>
        <WhyChooseUs />
      </Container></section>

      <section className="pt-[160px] pb-[80px]"><Container>
        <Reveal><SectionHead>One discipline, applied from a single home to a factory floor.</SectionHead></Reveal>
        <Reveal><ServiceIndex /></Reveal>
      </Container></section>

      <section className="py-[120px] bg-mist"><Container>
        <div className="grid grid-cols-[5fr_7fr] max-[980px]:grid-cols-1 gap-[60px] items-start">
          <Reveal><Plate cap={p1?.title || "Project"} idx="FIG. 02" src={p1?.coverImage ? urlForImage(p1.coverImage)?.url() : ""} className="aspect-[4/5] mt-12 max-[980px]:mt-0" /></Reveal>
          <Reveal>
            <h2 className="mb-6">The people building your home are people you can meet.</h2>
            <p className="text-lg text-slate leading-relaxed">A house is one of the largest commitments you will ever make. You should be able to look the people building it in the eye, walk their finished sites, and reach your own engineer directly.</p>
            <ul className="list-none mt-2">
              {[["01","Meet your engineer in person.","A named person you sit down with, not a call centre or an app."],
                ["02","Visit our completed projects.","Judge the quality of the work with your own eyes before you decide."],
                ["03","One team, start to finish.","The hands that design your project are the hands that hand it over."]].map(([n,t,d])=>(
                <li key={n} className="grid grid-cols-[46px_1fr] gap-1.5 py-5.5 border-t border-line last:border-b items-start" style={{paddingTop:22,paddingBottom:22}}>
                  <span className="font-outfit text-brand text-base">{n}</span>
                  <span><b className="font-medium text-[17px] block mb-1">{t}</b><span className="text-[15px] text-slate">{d}</span></span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Container></section>

      <section className="pt-[140px] pb-[160px] text-slate-900 bg-mist"><Container>
        <Reveal><div className="mb-14 max-w-[680px]"><h2 className="text-slate-900">Know where you stand before you commit.</h2></div></Reveal>
        <Reveal><div className="flex flex-col md:flex-row gap-0 relative">
          <div className="flex-[1.5] border border-line p-12 bg-white shadow-sm transition-shadow hover:shadow-md">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-brand/10 flex items-center justify-center text-brand">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
              </div>
              <div className="font-outfit text-sm text-slate-500 font-medium">Interactive Tool</div>
            </div>
            <h3 className="text-slate-900 text-[32px] font-semibold mt-2 mb-3">Construction Cost Calculator</h3>
            <p className="text-slate text-[16px] mb-8 max-w-[38ch]">Enter your plot size and district, and see an honest ballpark figure in seconds without waiting for a quote.</p>
            <Link href="/services#estimator" className="inline-block btn bg-slate-900 text-white hover:bg-slate-800 px-8 py-3.5 transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] shadow-lg hover:shadow-xl">Calculate Build Cost →</Link>
          </div>
          <div className="flex-[1] border border-line p-10 bg-white md:mt-16 md:-ml-12 relative z-10 shadow-xl transition-shadow hover:shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-600">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <div className="font-outfit text-sm text-slate-500 font-medium">Financial Tool</div>
            </div>
            <h3 className="text-slate-900 text-[24px] font-semibold mt-2 mb-3">Home Loan EMI Calculator</h3>
            <p className="text-slate text-[15px] mb-7 max-w-[38ch]">Work out your likely monthly EMI against your construction budget instantly.</p>
            <Link href="/services#emi" className="inline-block btn bg-brand text-white hover:bg-brand/90 px-7 py-3 transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] shadow-lg hover:shadow-brand/20">Calculate EMI →</Link>
          </div>
        </div></Reveal>
      </Container></section>

      <section className="pt-[160px] pb-[100px] bg-white"><Container>
        <Reveal><SectionHead center>Client Testimonials.</SectionHead></Reveal>
        <Testimonials />
      </Container></section>

      <section className="pt-[100px] pb-[200px]"><Container>
        <Reveal><SectionHead>Projects you can drive out and stand in front of.</SectionHead></Reveal>
        <Reveal><div className="relative mb-6">
          <div className="md:w-[70%]">
            <Plate cap={p2?.title || "Project"} idx="PRJ. 001" src={p2?.coverImage ? urlForImage(p2.coverImage)?.url() : ""} className="aspect-[16/10]" />
          </div>
          <div className="md:absolute right-0 bottom-[-60px] md:w-[45%] bg-white border border-line p-10 z-10 shadow-sm">
            <div className="text-xs tracking-[.14em] uppercase text-slate mb-3.5">{p2?.location || 'Tamil Nadu'} · {p2?.status || 'Completed'}</div>
            <h3 className="text-[34px] font-semibold mb-3.5">{p2?.title || 'Project name'}</h3>
            <p className="text-slate text-[15px] mb-6 max-w-[36ch]">A short, specific line about this project, its scale, and what made it particular.</p>
            <Link href="/projects" className="tlink dark">View project →</Link>
          </div>
        </div></Reveal>
        <Reveal><div className="mt-24 flex justify-center"><Link href="/projects" className="btn btn-fill">View all projects</Link></div></Reveal>
      </Container></section>

      <section className="bg-mist pt-[160px]">
        <Container>
          <Reveal><SectionHead center>From concept to reality.</SectionHead></Reveal>
        </Container>
        
        {/* First Slider: Balaji Residence */}
        <TransformReveal 
          beforeSrc="/projects/2_balaji_residence_completed_cover.webp"
          afterSrc="/projects/2_balaji_residence_completed_final.webp"
          label="Balaji Abode · Kumbakonam"
        />

        {/* Second Slider: Zaheer Residence */}
        <TransformReveal 
          beforeSrc="/projects/1_zaheer_residence_ongoing_cover.webp"
          afterSrc="/projects/zaheer_execution.png"
          label="Zaheer Residence · Tiruvannamalai"
        />
      </section>

      <section className="pt-[160px] pb-[120px]"><Container>
        <Reveal><SectionHead center>Questions we hear before a project starts.</SectionHead></Reveal>
        <Reveal><div className="max-w-[900px] mx-auto">
          {[
            ["How do you price a construction project?", "Pricing is based on your built-up area and the package you choose, starting from ₹2,200 per sq ft. We provide a detailed estimate up front, ensuring complete financial transparency with no hidden charges or surprise 'change orders'."],
            ["What brands of materials do you use?", "We strictly use premium, ISI-certified brands for all our structural and finishing work. This includes primary steel from Tata or JSW, Grade 53 cement from UltraTech or Dalmia, and top-tier electrical and plumbing fixtures."],
            ["How long does it take to complete a project?", "A standard residential project typically takes 8 to 10 months from foundation to handover. We provide a strict project timeline before work begins and enforce rigorous site management to ensure we deliver on schedule."],
            ["Do you handle government approvals and building permits?", "Yes. We offer an end-to-end turnkey service. Our team manages all necessary local municipal approvals, building plan sanctions, and compliance with zoning laws, so you don't have to navigate the bureaucracy."],
            ["Which areas do you build in?", "We take projects across Tamil Nadu, with dedicated offices in Kumbakonam and Kovilpatti. Our recent work spans Kumbakonam, Tiruvannamalai, Kovilpatti, Thanjavur, Mayiladuthurai, and surrounding districts."],
            ["Do you help with home loans?", "Yes. We assist with home loan applications and provide all necessary legal and technical documents required by major banks. You can use the EMI calculator on our services page to plan your monthly payments."],
            ["Do you offer a structural warranty?", "Yes. We provide a comprehensive structural guarantee for projects built under our premium packages. A long-term warranty requires adherence to strict engineering criteria and the use of specific, ultra-high-grade materials. Therefore, this guarantee is exclusively available for our premium offerings, where these rigorous standards are fully met."],
            ["Can I visit your completed projects?", "We encourage it. Seeing our finished work in person, walking the sites, and speaking with our engineers is the best way to judge our quality before you make a commitment."]
          ].map(([q,a],i)=>(
            <details key={i} className="border-t border-line last:border-b" open={i===0}>
              <summary className="list-none cursor-pointer py-7 font-outfit text-[22px] font-semibold flex justify-between items-center gap-5">{q}<span className="text-brand text-2xl font-normal">+</span></summary>
              <div className="pb-7 text-base text-slate leading-relaxed max-w-[74ch]">{a}</div>
            </details>
          ))}
        </div></Reveal>
      </Container></section>
    </>
  );
}
