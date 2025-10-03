"use client"
import { useState, useEffect } from "react"
import { Star, X, Plus, MapPin, Thermometer } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"

type FavoriteLocation = {
  id: string
  name: string
  lat: number
  lon: number
}

type WeatherData = {
  temp: number
  description: string
  icon: string
  humidity: number
  windSpeed: number
}

export default function FavoritesWeather() {
  const [favorites, setFavorites] = useState<FavoriteLocation[]>([])
  const [weatherData, setWeatherData] = useState<{ [key: string]: WeatherData }>({})
  const [showAddForm, setShowAddForm] = useState(false)
  const [newLocation, setNewLocation] = useState({ name: "", lat: "", lon: "" })
  const [loading, setLoading] = useState<{ [key: string]: boolean }>({})

  const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY || "1c2358da5a8a232a21c69bada746fe57"

  // Load favorites from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("weatherFavorites")
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        setFavorites(parsed)
      } catch (e) {
        console.error("Failed to parse favorites:", e)
      }
    }
  }, [])

  // Fetch weather for all favorites
  useEffect(() => {
    favorites.forEach((location) => {
      if (!weatherData[location.id]) {
        fetchWeatherForLocation(location)
      }
    })
  }, [favorites])

  const fetchWeatherForLocation = async (location: FavoriteLocation) => {
    setLoading((prev) => ({ ...prev, [location.id]: true }))
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&appid=${apiKey}&units=metric`,
      )
      if (!response.ok) throw new Error("Failed to fetch weather")
      const data = await response.json()

      setWeatherData((prev) => ({
        ...prev,
        [location.id]: {
          temp: Math.round(data.main.temp),
          description: data.weather[0].description,
          icon: data.weather[0].icon,
          humidity: data.main.humidity,
          windSpeed: data.wind.speed,
        },
      }))
    } catch (error) {
      console.error("Error fetching weather:", error)
    } finally {
      setLoading((prev) => ({ ...prev, [location.id]: false }))
    }
  }

  const addFavorite = () => {
    if (!newLocation.name || !newLocation.lat || !newLocation.lon) return

    const favorite: FavoriteLocation = {
      id: Date.now().toString(),
      name: newLocation.name,
      lat: Number.parseFloat(newLocation.lat),
      lon: Number.parseFloat(newLocation.lon),
    }

    const updated = [...favorites, favorite]
    setFavorites(updated)
    localStorage.setItem("weatherFavorites", JSON.stringify(updated))

    setNewLocation({ name: "", lat: "", lon: "" })
    setShowAddForm(false)
  }

  const removeFavorite = (id: string) => {
    const updated = favorites.filter((f) => f.id !== id)
    setFavorites(updated)
    localStorage.setItem("weatherFavorites", JSON.stringify(updated))

    // Remove weather data for this location
    setWeatherData((prev) => {
      const newData = { ...prev }
      delete newData[id]
      return newData
    })
  }

  const getWeatherIconUrl = (iconCode: string) => {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`
  }

  return (
    <section className="bg-background py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
              <h2 className="text-2xl font-bold text-foreground">Favorite Locations</h2>
            </div>
            <Button onClick={() => setShowAddForm(!showAddForm)} variant="outline" size="sm" className="gap-2">
              {showAddForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              {showAddForm ? "Cancel" : "Add Location"}
            </Button>
          </div>

          {/* Add Location Form */}
          {showAddForm && (
            <Card className="p-4 mb-6 border-2 border-primary/20">
              <h3 className="font-semibold mb-3 text-foreground">Add New Location</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <Input
                  placeholder="Location name (e.g., Manila)"
                  value={newLocation.name}
                  onChange={(e) => setNewLocation({ ...newLocation, name: e.target.value })}
                />
                <Input
                  placeholder="Latitude (e.g., 14.5995)"
                  type="number"
                  step="any"
                  value={newLocation.lat}
                  onChange={(e) => setNewLocation({ ...newLocation, lat: e.target.value })}
                />
                <Input
                  placeholder="Longitude (e.g., 120.9842)"
                  type="number"
                  step="any"
                  value={newLocation.lon}
                  onChange={(e) => setNewLocation({ ...newLocation, lon: e.target.value })}
                />
              </div>
              <Button onClick={addFavorite} className="mt-3 w-full md:w-auto">
                Save Location
              </Button>
            </Card>
          )}

          {/* Favorites Grid */}
          {favorites.length === 0 ? (
            <Card className="p-12 text-center border-dashed">
              <Star className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-50" />
              <p className="text-muted-foreground">No favorite locations yet</p>
              <p className="text-sm text-muted-foreground mt-1">Add locations to quickly check their weather</p>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {favorites.map((location) => {
                const weather = weatherData[location.id]
                const isLoading = loading[location.id]

                return (
                  <Card key={location.id} className="p-4 relative hover:shadow-lg transition-shadow">
                    {/* Remove button */}
                    <button
                      onClick={() => removeFavorite(location.id)}
                      className="absolute top-2 right-2 p-1 rounded-full hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
                      aria-label="Remove favorite"
                    >
                      <X className="w-4 h-4" />
                    </button>

                    {/* Location name */}
                    <div className="flex items-center gap-2 mb-3">
                      <MapPin className="w-4 h-4 text-primary" />
                      <h3 className="font-semibold text-foreground">{location.name}</h3>
                    </div>

                    {/* Weather info */}
                    {isLoading ? (
                      <div className="animate-pulse space-y-2">
                        <div className="h-16 bg-muted rounded"></div>
                        <div className="h-4 bg-muted rounded w-3/4"></div>
                      </div>
                    ) : weather ? (
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <img
                              src={getWeatherIconUrl(weather.icon) || "/placeholder.svg"}
                              alt={weather.description}
                              className="w-16 h-16"
                            />
                            <div>
                              <div className="text-3xl font-bold text-foreground">{weather.temp}°C</div>
                              <div className="text-sm text-muted-foreground capitalize">{weather.description}</div>
                            </div>
                          </div>
                        </div>

                        {/* Additional info */}
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <Thermometer className="w-4 h-4" />
                            <span>Humidity: {weather.humidity}%</span>
                          </div>
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <span>Wind: {weather.windSpeed} m/s</span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">Failed to load weather</p>
                    )}
                  </Card>
                )
              })}
            </div>
          )}

          {/* Helper text */}
          <div className="mt-6 p-4 bg-muted/50 rounded-lg">
            <p className="text-sm text-muted-foreground">
              <strong>Tip:</strong> You can find coordinates for any location using Google Maps. Right-click on a
              location and select the coordinates to copy them.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
