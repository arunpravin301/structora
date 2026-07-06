import Header from "@/components/marketing/Header";
import Footer from "@/components/marketing/Footer";
import WhatsAppButton from "@/components/marketing/WhatsAppButton";
import SmoothScroll from "@/components/providers/SmoothScroll";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <SmoothScroll>
      <Header />
      <main>{children}</main>
      <Footer />
      <WhatsAppButton />
    </SmoothScroll>
  );
}
