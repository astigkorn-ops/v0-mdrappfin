"use client"

import { useEffect, useRef } from "react"

interface MapContainerProps {
  layers: {
    evacuationCenters: boolean
    governmentFacilities: boolean
    schools: boolean
    markets: boolean
    transportation: boolean
    hazardZones: boolean
  }
}

export default function MapContainer({ layers }: MapContainerProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)
  const layersRef = useRef<any>({})

  // Actual Evacuation Centers Data from Pio Duran, Albay
  const evacuationCenters = [
    { name: "SLTCFPDI", lat: 13.03076, lng: 123.446605, capacity: 190 },
    { name: "West Coast College", lat: 13.037648, lng: 123.450466, capacity: 250 },
    { name: "Pio Duran National High School", lat: 13.066302, lng: 123.459913, capacity: 200 },
    { name: "Binanowan Elementary School", lat: 13.061385, lng: 123.458171, capacity: 200 },
    { name: "San Lorenzo Academy", lat: 13.044291, lng: 123.45316, capacity: 200 },
    { name: "Pio Duran East Central School", lat: 13.044403, lng: 123.457286, capacity: 250 },
    { name: "La Medalla Elementary School", lat: 13.047211, lng: 123.444675, capacity: 140 },
    { name: "Sukip Elementary School", lat: 13.067618, lng: 123.514811, capacity: 80 },
    { name: "Malapay Elementary School", lat: 13.072097, lng: 123.490586, capacity: 125 },
    { name: "Agol Elementary School", lat: 13.086464, lng: 123.461864, capacity: 100 },
    { name: "Bagongbong Elementary School", lat: 13.026739, lng: 123.500205, capacity: 100 },
    { name: "Alabangpuro Elementary School", lat: 13.049767, lng: 123.485905, capacity: 100 },
    { name: "Basicao Coastal Elementary School", lat: 13.047222, lng: 123.404682, capacity: 120 },
    { name: "Rawis Elementary School", lat: 13.040754, lng: 123.511542, capacity: 90 },
    { name: "Macasitas Elementary School", lat: 13.05592, lng: 123.496518, capacity: 80 },
    { name: "Salvacion Elementary School", lat: 13.083624, lng: 123.505548, capacity: 70 },
    { name: "Tibabo Elementary School", lat: 13.102897, lng: 123.491335, capacity: 140 },
    { name: "Cagmanaba Elementary School", lat: 13.087033, lng: 123.410157, capacity: 150 },
    { name: "Buyo Elementary School", lat: 13.050375, lng: 123.529638, capacity: 55 },
    { name: "Nablangbulod Elementary School", lat: 13.059784, lng: 123.476396, capacity: 55 },
    { name: "Flores Elementary School", lat: 13.091788, lng: 123.439386, capacity: 80 },
    { name: "Basicao Interior Elementary School", lat: 13.080943, lng: 123.487848, capacity: 80 },
    { name: "Palapas Elementary School", lat: 13.111998, lng: 123.469715, capacity: 80 },
    { name: "Lawinon Elementary School", lat: 13.011444, lng: 123.491552, capacity: 70 },
    { name: "Cotmon Elementary School", lat: 13.077718, lng: 123.532203, capacity: 80 },
    { name: "Buenavista Evac. Center", lat: 12.989386, lng: 123.480805, capacity: 120 },
    { name: "Sitio Papantayan (Palapas) DDC", lat: 13.109744, lng: 123.458335, capacity: 100 },
    { name: "Caratagan Barangay Hall", lat: 13.043625, lng: 123.453052, capacity: 30 },
    { name: "Seventh Day Adventist Church", lat: 13.046383, lng: 123.455219, capacity: 70 },
    { name: "Mormons", lat: 13.043838, lng: 123.453556, capacity: 60 },
    { name: "Our Lady Of Salvation Parish", lat: 13.028495, lng: 123.446361, capacity: 50 },
    { name: "Sukip Day Care Center", lat: 13.066563, lng: 123.517172, capacity: 20 },
    { name: "Sukip Barangay Hall", lat: 13.066594, lng: 123.517455, capacity: 45 },
    { name: "Basicao Coastal Day Care Center", lat: 13.046048, lng: 123.404382, capacity: 20 },
    { name: "Macasitas Day care", lat: 13.056612, lng: 123.495147, capacity: 35 },
    { name: "Municipal Multi-Purpose Hall", lat: 13.044222, lng: 123.456376, capacity: 120 },
  ]

  const governmentFacilities = [
    { name: "Municipal Hall", lat: 13.0293, lng: 123.445, type: "Main Office" },
    { name: "MDRRMO Office", lat: 13.0291, lng: 123.4455, type: "Emergency Services" },
    { name: "Health Center", lat: 13.0288, lng: 123.4445, type: "Healthcare" },
  ]

  const schools = [
    { name: "Pio Duran Central School", lat: 13.029, lng: 123.444, level: "Elementary/Secondary" },
    { name: "Banga Elementary School", lat: 13.0355, lng: 123.4505, level: "Elementary" },
    { name: "Duran Elementary School", lat: 13.04, lng: 123.46, level: "Elementary" },
  ]

  const markets = [
    { name: "Pio Duran Public Market", lat: 13.0285, lng: 123.4435, type: "Public Market" },
    { name: "Banga Market", lat: 13.035, lng: 123.45, type: "Community Market" },
  ]

  const transportation = [
    { name: "Pio Duran Bus Terminal", lat: 13.028, lng: 123.443, type: "Bus Terminal" },
    { name: "Jeepney Stop - Poblacion", lat: 13.029, lng: 123.445, type: "Jeepney Stop" },
    { name: "Tricycle Terminal", lat: 13.03, lng: 123.446, type: "Tricycle" },
  ]

  const hazardZones = [
    {
      name: "Flood Hazard Zone",
      coordinates: [
        [13.025, 123.44],
        [13.035, 123.44],
        [13.035, 123.45],
        [13.025, 123.45],
      ],
      type: "flood",
    },
    {
      name: "Landslide Hazard Zone",
      coordinates: [
        [13.03, 123.455],
        [13.035, 123.455],
        [13.035, 123.46],
        [13.03, 123.46],
      ],
      type: "landslide",
    },
  ]

  useEffect(() => {
    const initializeMap = async () => {
      try {
        console.log("[v0] Initializing map...")

        // Import Leaflet using proper ES module syntax
        const L = (await import("leaflet")).default

        // Import CSS using a different approach to avoid MIME type issues
        if (typeof document !== "undefined") {
          const link = document.createElement("link")
          link.rel = "stylesheet"
          link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          link.integrity = "sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
          link.crossOrigin = "anonymous"
          document.head.appendChild(link)
        }

        // Fix for default marker icons in Leaflet
        delete (L.Icon.Default.prototype as any)._getIconUrl
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
          iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
          shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
        })

        if (mapRef.current && !mapInstanceRef.current) {
          // Initialize map with adjusted zoom to show all evacuation centers
          const map = L.map(mapRef.current).setView([13.055, 123.47], 12)

          // Add tile layer
          L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          }).addTo(map)

          // Custom icons
          const evacuationIcon = L.icon({
            iconUrl:
              "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
            shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41],
          })

          const governmentIcon = L.icon({
            iconUrl:
              "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
            shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41],
          })

          const schoolIcon = L.icon({
            iconUrl:
              "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png",
            shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41],
          })

          const marketIcon = L.icon({
            iconUrl:
              "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png",
            shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41],
          })

          const transportIcon = L.icon({
            iconUrl:
              "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
            shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41],
          })

          // Add markers and layers with enhanced popup information
          const addEvacuationCenters = () => {
            const group = L.layerGroup()
            evacuationCenters.forEach((center) => {
              const marker = L.marker([center.lat, center.lng], { icon: evacuationIcon }).bindPopup(
                `<div style="min-width: 200px;">
                  <b style="font-size: 14px; color: #16a34a;">${center.name}</b>
                  <hr style="margin: 5px 0; border: none; border-top: 1px solid #e5e7eb;">
                  <div style="margin: 5px 0;">
                    <span style="font-weight: 600;">Type:</span> Evacuation Center
                  </div>
                  <div style="margin: 5px 0;">
                    <span style="font-weight: 600;">Capacity:</span> ${center.capacity} persons
                  </div>
                  <div style="margin: 5px 0; font-size: 11px; color: #6b7280;">
                    📍 ${center.lat.toFixed(6)}, ${center.lng.toFixed(6)}
                  </div>
                </div>`,
              )
              group.addLayer(marker)
            })
            group.addTo(map)
            layersRef.current.evacuationCenters = group
          }

          const addGovernmentFacilities = () => {
            const group = L.layerGroup()
            governmentFacilities.forEach((facility) => {
              const marker = L.marker([facility.lat, facility.lng], { icon: governmentIcon }).bindPopup(
                `<b>${facility.name}</b><br>Government Facility<br>Type: ${facility.type}`,
              )
              group.addLayer(marker)
            })
            group.addTo(map)
            layersRef.current.governmentFacilities = group
          }

          const addSchools = () => {
            const group = L.layerGroup()
            schools.forEach((school) => {
              const marker = L.marker([school.lat, school.lng], { icon: schoolIcon }).bindPopup(
                `<b>${school.name}</b><br>School<br>Level: ${school.level}`,
              )
              group.addLayer(marker)
            })
            group.addTo(map)
            layersRef.current.schools = group
          }

          const addMarkets = () => {
            const group = L.layerGroup()
            markets.forEach((market) => {
              const marker = L.marker([market.lat, market.lng], { icon: marketIcon }).bindPopup(
                `<b>${market.name}</b><br>Market<br>Type: ${market.type}`,
              )
              group.addLayer(marker)
            })
            group.addTo(map)
            layersRef.current.markets = group
          }

          const addTransportation = () => {
            const group = L.layerGroup()
            transportation.forEach((transport) => {
              const marker = L.marker([transport.lat, transport.lng], { icon: transportIcon }).bindPopup(
                `<b>${transport.name}</b><br>Transportation<br>Type: ${transport.type}`,
              )
              group.addLayer(marker)
            })
            group.addTo(map)
            layersRef.current.transportation = group
          }

          const addHazardZones = () => {
            const group = L.layerGroup()
            hazardZones.forEach((zone) => {
              const color = zone.type === "flood" ? "#ff0000" : "#ffa500"
              const polygon = L.polygon(zone.coordinates, {
                color: color,
                fillColor: color,
                fillOpacity: 0.3,
              }).bindPopup(`<b>${zone.name}</b><br>Hazard Zone<br>Type: ${zone.type}`)
              group.addLayer(polygon)
            })
            group.addTo(map)
            layersRef.current.hazardZones = group
          }

          // Add initial markers and layers
          addEvacuationCenters()
          addGovernmentFacilities()
          addSchools()
          addMarkets()
          addTransportation()
          addHazardZones()

          // Add legend with updated information
          const legend = L.control({ position: "bottomright" })

          legend.onAdd = () => {
            const div = L.DomUtil.create("div", "info legend")
            div.style.backgroundColor = "white"
            div.style.padding = "12px"
            div.style.borderRadius = "8px"
            div.style.boxShadow = "0 2px 10px rgba(0,0,0,0.15)"
            div.style.fontSize = "12px"
            div.style.maxWidth = "200px"
            div.innerHTML = `
              <h4 style="margin: 0 0 8px 0; font-weight: bold; font-size: 13px;">Map Legend</h4>
              <div style="margin: 4px 0; display: flex; align-items: center;">
                <span style="color: #ff0000; font-size: 16px; margin-right: 6px;">■</span> 
                <span>Flood Zone</span>
              </div>
              <div style="margin: 4px 0; display: flex; align-items: center;">
                <span style="color: #ffa500; font-size: 16px; margin-right: 6px;">■</span> 
                <span>Landslide Zone</span>
              </div>
              <div style="margin: 4px 0; display: flex; align-items: center;">
                <span style="color: #28a745; font-size: 16px; margin-right: 6px;">●</span> 
                <span>Evacuation Centers (${evacuationCenters.length})</span>
              </div>
              <div style="margin: 4px 0; display: flex; align-items: center;">
                <span style="color: #007bff; font-size: 16px; margin-right: 6px;">●</span> 
                <span>Government Facilities</span>
              </div>
              <div style="margin: 4px 0; display: flex; align-items: center;">
                <span style="color: #6f42c1; font-size: 16px; margin-right: 6px;">●</span> 
                <span>Schools</span>
              </div>
              <div style="margin: 4px 0; display: flex; align-items: center;">
                <span style="color: #fd7e14; font-size: 16px; margin-right: 6px;">●</span> 
                <span>Markets</span>
              </div>
              <div style="margin: 4px 0; display: flex; align-items: center;">
                <span style="color: #dc3545; font-size: 16px; margin-right: 6px;">●</span> 
                <span>Transportation</span>
              </div>
            `
            return div
          }

          legend.addTo(map)

          mapInstanceRef.current = map
          console.log("[v0] Map initialized successfully")
        }
      } catch (error) {
        console.error("[v0] Error initializing map:", error)
      }
    }

    if (typeof window !== "undefined") {
      initializeMap()
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [])

  // Update layer visibility when layers prop changes
  useEffect(() => {
    if (mapInstanceRef.current && layersRef.current) {
      Object.keys(layers).forEach((layerName) => {
        const layer = layersRef.current[layerName]
        if (layer) {
          if (layers[layerName as keyof typeof layers]) {
            if (!mapInstanceRef.current.hasLayer(layer)) {
              layer.addTo(mapInstanceRef.current)
            }
          } else {
            if (mapInstanceRef.current.hasLayer(layer)) {
              mapInstanceRef.current.removeLayer(layer)
            }
          }
        }
      })
    }
  }, [layers])

  return (
    <div
      ref={mapRef}
      className="h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-xl bg-gray-100 border border-gray-200"
      style={{ zIndex: 1 }}
    />
  )
}
