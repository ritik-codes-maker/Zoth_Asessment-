import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { Footer } from "@/components/layout/footer";
import { GridBackground } from "@/components/layout/grid-background";
import { Wordmark } from "@/components/layout/wordmark";
import { SaleFlowProvider } from "@/components/providers/sale-flow-provider";
import { DetailsSection } from "@/components/sections/details-section";
import { HeroSection } from "@/components/sections/hero-section";
import { SiteHeader } from "@/components/sections/site-header";
import { LogoMarquee } from "@/components/shared/logo-marquee";
import { PARTNER_LOGOS } from "@/components/shared/partner-logos";
import {
  BRAND_NAME,
  FOOTER_COLUMNS,
  LEGAL_TEXT,
  SOCIAL_LINKS,
} from "@/lib/content";

export default function Home() {
  return (
    <>
      <AnnouncementBar message="Demo" linkLabel="Demo" href="#sale" />
      <main className="flex-1">
        <div className="relative isolate pt-[30px]">
          <GridBackground />
          <SaleFlowProvider>
            <SiteHeader />
            <HeroSection />
          </SaleFlowProvider>
        </div>
        <div id="partners">
          <LogoMarquee
            label={
              <>
                DEMO
                <br />
                DEMO
              </>
            }
            logos={PARTNER_LOGOS}
          />
        </div>
        <DetailsSection />
      </main>
      <div id="footer" className="mt-20 lg:mt-[97px]">
        <Footer
          description="Lorem ipsum dolor sit amet consectetur adipiscing elit sed"
          socialLinks={SOCIAL_LINKS}
          newsletter={{
            placeholder: "[XX]",
            buttonLabel: "Demo",
            successMessage: "Thanks, you're on the list.",
          }}
          columns={FOOTER_COLUMNS}
          legal={LEGAL_TEXT}
          meta={`© 2026 ${BRAND_NAME}`}
        />
      </div>
      <Wordmark text="DEMO" className="mt-24 lg:mt-[225px]" />
    </>
  );
}
