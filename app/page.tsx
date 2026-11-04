import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { Footer } from "@/components/layout/footer";
import { GridBackground } from "@/components/layout/grid-background";
import { Navbar } from "@/components/layout/navbar";
import { Wordmark } from "@/components/layout/wordmark";
import { DetailsSection } from "@/components/sections/details-section";
import { HeroSection } from "@/components/sections/hero-section";
import { LogoMarquee } from "@/components/shared/logo-marquee";
import {
  BRAND_NAME,
  FOOTER_COLUMNS,
  LEGAL_TEXT,
  NAV_LINKS,
  PARTNER_LOGOS,
  SOCIAL_LINKS,
} from "@/lib/content";

export default function Home() {
  return (
    <>
      <AnnouncementBar message="Demo" linkLabel="Demo" href="#sale" />
      <main className="flex-1">
        <div className="relative isolate pt-[30px]">
          <GridBackground />
          <Navbar
            brandName={BRAND_NAME}
            links={NAV_LINKS}
            secondaryAction={{ label: "Lorem ipsum", href: "#details" }}
            primaryAction={{ label: "Lorem ipsum", href: "#sale" }}
          />
          <HeroSection />
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
            placeholder: "Enter your email",
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
