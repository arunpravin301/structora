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

export default function Home() {
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
          <Reveal><Plate cap="Priyanka Vilson Residence" idx="FIG. 02" src={require('../../project-data.json')['4_priyanka_vilson_ongoing']?.coverImage} className="aspect-[4/5] mt-12 max-[980px]:mt-0" /></Reveal>
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
          <div className="flex-[1.5] border border-line p-12 bg-white shadow-sm">
            <div className="font-outfit text-sm text-slate-500">01</div>
            <h3 className="text-slate-900 text-[32px] font-semibold mt-4 mb-3">What will it cost to build?</h3>
            <p className="text-slate text-[16px] mb-8 max-w-[38ch]">Enter your plot size and district, and see an honest ballpark figure in seconds.</p>
            <Link href="/services#estimator" className="tlink dark text-lg">Open the cost estimator →</Link>
          </div>
          <div className="flex-[1] border border-line p-10 bg-white md:mt-16 md:-ml-12 relative z-10 shadow-lg">
            <div className="font-outfit text-sm text-slate-500">02</div>
            <h3 className="text-slate-900 text-[24px] font-semibold mt-4 mb-3">Planning a home loan?</h3>
            <p className="text-slate text-[15px] mb-7 max-w-[38ch]">Work out your likely monthly EMI against your construction budget.</p>
            <Link href="/services#emi" className="tlink dark">Open the EMI calculator →</Link>
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
            <Plate cap="Balaji Abode" idx="PRJ. 001" src={require('../../project-data.json')['2_balaji_residence_completed']?.coverImage} className="aspect-[16/10]" />
          </div>
          <div className="md:absolute right-0 bottom-[-60px] md:w-[45%] bg-white border border-line p-10 z-10 shadow-sm">
            <div className="text-xs tracking-[.14em] uppercase text-slate mb-3.5">Kumbakonam · Residential · 2024</div>
            <h3 className="text-[34px] font-semibold mb-3.5">Project name</h3>
            <p className="text-slate text-[15px] mb-6 max-w-[36ch]">A short, specific line about this project, its scale, and what made it particular.</p>
            <Link href="/projects" className="tlink dark">View project →</Link>
          </div>
        </div></Reveal>
        <Reveal><div className="mt-24 flex justify-center"><Link href="/projects" className="btn btn-fill">View all projects</Link></div></Reveal>
      </Container></section>

      <section className="bg-mist pt-[160px]">
        <Container>
          <Reveal><SectionHead center>Scroll to watch a project transform.</SectionHead></Reveal>
        </Container>
        <TransformReveal />
      </section>

      <section className="pt-[160px] pb-[120px]"><Container>
        <Reveal><SectionHead center>Questions we hear before a project starts.</SectionHead></Reveal>
        <Reveal><div className="max-w-[900px] mx-auto">
          {[
            ["How do you price a construction project?", "Pricing is based on your built-up area and the package you choose, starting from ₹2,200 per sq ft. We provide a detailed Bill of Quantities (BOQ) up front, ensuring complete financial transparency with no hidden charges or surprise 'change orders'."],
            ["What brands of materials do you use?", "We strictly use premium, ISI-certified brands for all our structural and finishing work. This includes primary steel from Tata or JSW, Grade 53 cement from UltraTech or Dalmia, and top-tier electrical and plumbing fixtures."],
            ["How long does it take to complete a project?", "A standard G+1 residential project typically takes 8 to 10 months from foundation to handover. We provide a strict project timeline before work begins and enforce rigorous site management to ensure we deliver on schedule."],
            ["Do you handle government approvals and building permits?", "Yes. We offer an end-to-end turnkey service. Our team manages all necessary local municipal approvals, building plan sanctions, and compliance with zoning laws, so you don't have to navigate the bureaucracy."],
            ["Which areas do you build in?", "We take projects across Tamil Nadu, with dedicated offices in Kumbakonam and Kovilpatti. Our recent work spans Kumbakonam, Tiruvannamalai, Kovilpatti, and surrounding districts."],
            ["Do you help with home loans?", "Yes. We assist with home loan applications and provide all necessary legal and technical documents required by major banks. You can use the EMI calculator on our services page to plan your monthly payments."],
            ["Do you offer a structural warranty?", "Absolutely. We stand behind our engineering. Every project we hand over comes with a comprehensive structural guarantee, ensuring your investment is secure for generations."],
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
