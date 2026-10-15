import PageHero from "@/components/ui/PageHero";
import PricingClient from "./PricingClient";
import {pageMetadata} from "@/lib/seo";
export const metadata=pageMetadata("Construction pricing & cost calculator","Compare construction packages by location and estimate your build budget and monthly loan repayments.","/pricing");
export default function PricingPage(){return <><PageHero crumb="Pricing" title="Clear specifications. Considered budgets." intro="Compare residential construction packages by location. Rates are indicative; confirm inclusions, exclusions, taxes and site-specific requirements in your written quotation." /><PricingClient /></>;}

