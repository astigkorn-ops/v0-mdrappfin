import type { Metadata } from "next"
import HeroSection from "@/components/hero-section"
import WeatherSection from "@/components/weather-section"
import QuickLinks from "@/components/quick-links"
import AboutSection from "@/components/about-section"
import NewsSection from "@/components/news-section"
import CalendarSection from "@/components/calendar-section"
import MapSection from "@/components/map-section"
import GallerySection from "@/components/gallery-section"
import FeatureVideo from "@/components/featurevideo-section"
import EmergencyProcedures from "@/components/emergency-procedures"
import { EmergencyModalManager } from "@/components/emergency-modal-manager"

export const metadata: Metadata = {
  title: "MDRRMO - Pio Duran | Official Website",
  description:
    "Municipal Disaster Risk Reduction and Management Office of Pio Duran, Albay - Enhancing disaster preparedness, strengthening community resilience and ensuring safety for all.",
}

export default function HomePage() {
  return (
    <EmergencyModalManager>
      <main>
        <HeroSection />
        <QuickLinks />
        <WeatherSection />
        <AboutSection />
        <NewsSection />
        <CalendarSection />
          <GallerySection />
           <FeatureVideo />
          {/* Interactive Community Map Section */}
          <MapSection />
        <EmergencyProcedures />
      </main>
    </EmergencyModalManager>
  )
}
