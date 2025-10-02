"use client";
import React, { useState, useEffect } from 'react';

type Weather = {
  temp: number;
  description: string;
  icon: string;
  date: string;
};

type ForecastDay = {
  day: string;
  date: string;
  weather: Array<{
    icon: string;
    description: string;
  }>;
  main: {
    temp: number;
  };
};
import { Cloud, Sun, CloudRain, Wind, Droplets, Eye, Thermometer, Calendar } from 'lucide-react';

export default function WeatherSection() {
  const [forecast, setForecast] = useState<ForecastDay[]>([]);
  const [currentWeather, setCurrentWeather] = useState<Weather | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const location = "Pio Duran, Albay";
  const lat = 13.0293;
  const lon = 123.445;
  const apiKey = "ab864c815bdfb61b75e7b3651d67d925";

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch weather data');
        }
        const data = await response.json();
        // Get current weather (first item in forecast)
        const current = data.list[0];
        setCurrentWeather({
          temp: Math.round(current.main.temp),
          description: current.weather[0].description,
          icon: current.weather[0].icon,
          date: new Date(current.dt * 1000).toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
          }),
        });
        // Process 5-day forecast (get one item per day)
        const dailyForecast: ForecastDay[] = [];
        const today = new Date().toDateString();
        for (let i = 0; i < data.list.length; i++) {
          const item = data.list[i];
          const itemDate = new Date(item.dt * 1000);
          // Skip today and get one item per day
          if (
            itemDate.toDateString() !== today &&
            (dailyForecast.length === 0 ||
              itemDate.getDate() !==
                new Date(data.list[i - 1]?.dt * 1000).getDate())
          ) {
            dailyForecast.push({
              day: itemDate.toLocaleDateString('en-US', { weekday: 'short' }),
              date: itemDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
              weather: item.weather,
              main: item.main,
            });
            if (dailyForecast.length === 5) break;
          }
        }
        setForecast(dailyForecast);
        setLoading(false);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Unknown error');
        }
        setLoading(false);
      }
    };
    fetchWeatherData();
  }, []);

  const getWeatherIcon = (iconCode: string) => {
    const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
      '01d': Sun,
      '01n': Sun,
      '02d': Cloud,
      '02n': Cloud,
      '03d': Cloud,
      '03n': Cloud,
      '04d': Cloud,
      '04n': Cloud,
      '09d': CloudRain,
      '09n': CloudRain,
      '10d': CloudRain,
      '10n': CloudRain,
      '11d': CloudRain,
      '11n': CloudRain,
      '13d': Cloud,
      '13n': Cloud,
      '50d': Eye,
      '50n': Eye
    };
    const IconComponent = iconMap[iconCode] || Cloud;
    return <IconComponent className="w-6 h-6" />;
  };

  const getWeatherColor = (description: string) => {
    if (description.includes('rain')) return 'text-blue-600 border-blue-200';
    if (description.includes('cloud')) return 'text-gray-600 border-gray-200';
    return 'text-cyan-600 border-cyan-200';
  };

  const getWeatherBg = (description: string) => {
    if (description.includes('rain')) return 'bg-blue-50';
    if (description.includes('cloud')) return 'bg-gray-50';
    return 'bg-cyan-50';
  };

  if (error) {
    return (
      <section className="bg-white">
        <div className="container mx-auto px-2 py-4">
          <div className="max-w-5xl mx-auto">
            <div className="bg-white border border-red-200 rounded-xl shadow-sm overflow-hidden">
              <div className="p-4 text-center">
                <h2 className="text-lg font-semibold text-red-600">Weather Data Unavailable</h2>
                <p className="text-red-500 text-sm mt-1">{error}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-background">
      <div className="container mx-auto px-2 py-4">
        <div className="mx-auto">
          <div className="bg-gray-200 border border-blue-900 shadow-sm overflow-hidden">
            {/* Elegant pattern background */}
            <div className="absolute inset-0 opacity-3" style={{
              backgroundImage: `radial-gradient(circle at 10px 10px, #6b7280 1px, transparent 1px)`,
              backgroundSize: '20px 20px'
            }}></div>
            
            {/* Header */}
            <div className="p-3 bg-blue-950 border-b border-yellow-500 relative">
              <div className="flex flex-wrap items-center justify-between gap-8">
                <div className="flex items-center gap-4">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <h2 className="text-base font-bold text-yellow-500">5-Day Weather Forecast</h2>
                  <span className="text-xs bg-yellow-300 px-2 py-1 rounded-full text-blue-950">{location}</span>
                </div>
                {currentWeather ? (
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                     <div>
                       <div className="text-xl font-bold text-yellow-500 animate-pulse-glow">{currentWeather.temp}°C</div>
                      </div>
                      <div className="p-1.5 bg-yellow-500 rounded-lg">
                        {getWeatherIcon(currentWeather.icon)}
                      </div>
                    <div>

                        <div className="text-md text-gray-200 capitalize">{currentWeather.description}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-md text-gray-200">{currentWeather.date}</div>
                    </div>
                  </div>
                ) : (
                  <div className="h-8 flex items-center">
                    <div className="animate-pulse bg-gray-100 rounded w-32 h-4"></div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Forecast Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 p-3">
              {loading ? (
                [1, 2, 3, 4, 5].map((day) => (
                  <div key={day} className="text-center p-5 rounded-lg bg-blue-950 border border-blue-900 animate-pulse h-24"></div>
                ))
              ) : (
                forecast.map((day, index) => (
                  <div 
                    key={index} 
                    className={`text-center p-2 rounded-lg border ${currentWeather ? getWeatherColor(currentWeather.description) : 'text-cyan-600 border-cyan-200'} ${currentWeather ? getWeatherBg(currentWeather.description) : 'bg-cyan-50'} hover:shadow-sm transition-all duration-200`}
                  >
                    <div className="font-medium text-gray-800 text-sm">{day.day}</div>
                    <div className="text-xs text-gray-500 mb-1">{day.date}</div>
                    <div className="flex justify-center mb-1">
                      <div className="p-1 bg-yellow-400 rounded-md border border-blue-900">
                        {getWeatherIcon(day.weather[0].icon)}
                      </div>
                    </div>
                    <div className="text-base font-bold text-gray-800">
                      {Math.round(day.main.temp)}°
                    </div>
                    <div className="text-xs text-gray-600 capitalize mt-1 truncate">
                      {day.weather[0].description}
                    </div>
                  </div>
                ))
              )}
            </div>
            
            {/* Footer */}
            <div className="px-3 pb-3">
              <div className="bg-blue-900 rounded-lg p-2 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full"></div>
                    <p className="text-white text-xs">
                      Data by{" "}
                      <a
                        href="https://openweathermap.org/"
                        className="font-medium text-yellow-600 hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        OpenWeatherMap
                      </a>
                    </p>
                  </div>
                  <div className="text-md text-green-400 ">
                    Live
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
