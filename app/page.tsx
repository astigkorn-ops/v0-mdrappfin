import type { Metadata } from "next"
import HeroSection from "@/components/hero-section"
import WeatherSection from "@/components/weather-section"
import QuickLinks from "@/components/quick-links"
import WeatherEarthquakeDashboard from "@/components/WeatherEarthquakeDashboard"
import AboutSection from "@/components/about-section"
import NewsSection from "@/components/news-section"
import CalendarSection from "@/components/calendar-section"
import MapSection from "@/components/map-section"
import GallerySection from "@/components/gallery-section"
import FeatureVideo from "@/components/featurevideo-section"
import EmergencyProcedures from "@/components/emergency-procedures"
import { EmergencyModalManager } from "@/components/emergency-modal-manager"
import FavoritesWeather from "@/components/favorites-weather"
import AnnouncementWidget from "@/components/announcement-widget"
import AlertWidget from "@/components/alert-widget" // Added alert widget import

export const metadata: Metadata = {
  title: "MDRRMO - Pio Duran | Official Website",
  description:
    "Municipal Disaster Risk Reduction and Management Office of Pio Duran, Albay - Enhancing disaster preparedness, strengthening community resilience and ensuring safety for all.",
}

export default function HomePage() {
  return (
    <EmergencyModalManager>
      <main>
        <AlertWidget /> {/* Added alert widget at the very top */}
        <HeroSection />
        <AnnouncementWidget />
        <QuickLinks />
        <WeatherSection />
        <FavoritesWeather />
        <WeatherEarthquakeDashboard />
        <AboutSection />
        <NewsSection />
        <CalendarSection />
        <GallerySection />
        <FeatureVideo />
        <MapSection />
        <EmergencyProcedures />
      </main>
    </EmergencyModalManager>
  )
}
