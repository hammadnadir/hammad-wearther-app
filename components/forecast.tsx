import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatDay, formatTemperature } from "@/lib/utils"
import type { ForecastData } from "@/lib/types"
import { Cloud, CloudDrizzle, CloudFog, CloudLightning, CloudRain, CloudSnow, Sun } from "lucide-react"

export function Forecast({ forecast }: { forecast: ForecastData }) {
  const getWeatherIcon = (iconCode: string) => {
    const code = iconCode.substring(0, 2)
    switch (code) {
      case "01":
        return <Sun className="h-8 w-8 text-yellow-500" />
      case "02":
      case "03":
      case "04":
        return <Cloud className="h-8 w-8 text-gray-400" />
      case "09":
        return <CloudDrizzle className="h-8 w-8 text-blue-400" />
      case "10":
        return <CloudRain className="h-8 w-8 text-blue-500" />
      case "11":
        return <CloudLightning className="h-8 w-8 text-yellow-400" />
      case "13":
        return <CloudSnow className="h-8 w-8 text-blue-200" />
      case "50":
        return <CloudFog className="h-8 w-8 text-gray-300" />
      default:
        return <Sun className="h-8 w-8 text-yellow-500" />
    }
  }

  // Group forecast by day
  const dailyForecasts = forecast.list.reduce(
    (acc, item) => {
      const date = new Date(item.dt * 1000).toLocaleDateString()
      if (!acc[date]) {
        acc[date] = []
      }
      acc[date].push(item)
      return acc
    },
    {} as Record<string, typeof forecast.list>,
  )

  // Get daily summary (use noon forecast or first available)
  const dailySummary = Object.entries(dailyForecasts).map(([date, items]) => {
    // Try to find forecast for noon
    const noonForecast =
      items.find((item) => {
        const hour = new Date(item.dt * 1000).getHours()
        return hour >= 11 && hour <= 13
      }) || items[0]

    // Calculate min and max temp for the day
    const minTemp = Math.min(...items.map((item) => item.main.temp_min))
    const maxTemp = Math.max(...items.map((item) => item.main.temp_max))

    return {
      date: new Date(date),
      forecast: noonForecast,
      minTemp,
      maxTemp,
    }
  })

  // Only show 5 days
  const fiveDayForecast = dailySummary.slice(0, 5)

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>5-Day Forecast</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
          {fiveDayForecast.map((day, index) => (
            <div key={index} className="flex flex-col items-center p-3 border rounded-lg">
              <div className="font-medium">{formatDay(day.date)}</div>
              <div className="my-2">{getWeatherIcon(day.forecast.weather[0].icon)}</div>
              <div className="text-sm">{day.forecast.weather[0].main}</div>
              <div className="mt-2 flex gap-2 text-sm">
                <span className="font-medium">{formatTemperature(day.maxTemp)}</span>
                <span className="text-muted-foreground">{formatTemperature(day.minTemp)}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

