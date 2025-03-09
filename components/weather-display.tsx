import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatDate, formatTemperature } from "@/lib/utils"
import type { WeatherData } from "@/lib/types"
import {
  Cloud,
  CloudDrizzle,
  CloudFog,
  CloudLightning,
  CloudRain,
  CloudSnow,
  Compass,
  Droplets,
  Gauge,
  Sun,
  Thermometer,
  Wind,
} from "lucide-react"

export function WeatherDisplay({ weather }: { weather: WeatherData }) {
  const getWeatherIcon = (iconCode: string) => {
    const code = iconCode.substring(0, 2)
    switch (code) {
      case "01":
        return <Sun className="h-12 w-12 text-yellow-500" />
      case "02":
      case "03":
      case "04":
        return <Cloud className="h-12 w-12 text-gray-400" />
      case "09":
        return <CloudDrizzle className="h-12 w-12 text-blue-400" />
      case "10":
        return <CloudRain className="h-12 w-12 text-blue-500" />
      case "11":
        return <CloudLightning className="h-12 w-12 text-yellow-400" />
      case "13":
        return <CloudSnow className="h-12 w-12 text-blue-200" />
      case "50":
        return <CloudFog className="h-12 w-12 text-gray-300" />
      default:
        return <Sun className="h-12 w-12 text-yellow-500" />
    }
  }

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl">
              {weather.name}, {weather.sys.country}
            </h2>
            <p className="text-sm text-muted-foreground">{formatDate(weather.dt)}</p>
          </div>
          <div className="flex flex-col items-center">
            {getWeatherIcon(weather.weather[0].icon)}
            <span className="text-lg font-medium mt-1">{weather.weather[0].main}</span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div className="flex flex-col items-center">
            <Thermometer className="h-6 w-6 mb-1 text-red-500" />
            <div className="text-4xl font-bold">{formatTemperature(weather.main.temp)}</div>
            <div className="text-sm text-muted-foreground">Feels like {formatTemperature(weather.main.feels_like)}</div>
            <div className="flex gap-2 mt-1 text-sm">
              <span>H: {formatTemperature(weather.main.temp_max)}</span>
              <span>L: {formatTemperature(weather.main.temp_min)}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="flex flex-col items-center">
              <Wind className="h-5 w-5 mb-1 text-blue-400" />
              <div className="text-sm font-medium">Wind</div>
              <div className="text-lg">{Math.round(weather.wind.speed)} m/s</div>
              <div className="flex items-center text-xs text-muted-foreground">
                <Compass className="h-3 w-3 mr-1" />
                {weather.wind.deg}°
              </div>
            </div>

            <div className="flex flex-col items-center">
              <Droplets className="h-5 w-5 mb-1 text-blue-500" />
              <div className="text-sm font-medium">Humidity</div>
              <div className="text-lg">{weather.main.humidity}%</div>
            </div>

            <div className="flex flex-col items-center">
              <Gauge className="h-5 w-5 mb-1 text-purple-500" />
              <div className="text-sm font-medium">Pressure</div>
              <div className="text-lg">{weather.main.pressure}</div>
              <div className="text-xs text-muted-foreground">hPa</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

