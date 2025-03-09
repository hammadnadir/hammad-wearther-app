import { SearchForm } from "@/components/search-form"
import { WeatherDisplay } from "@/components/weather-display"
import { Forecast } from "@/components/forecast"
import { getCurrentWeather, getForecast } from "@/lib/weather"
import { Suspense } from "react"
import { WeatherSkeleton } from "@/components/weather-skeleton"
import { ForecastSkeleton } from "@/components/forecast-skeleton"
import { ErrorDisplay } from "@/components/error-display"

export default async function Home({
  searchParams,
}: {
  searchParams: { city?: string }
}) {
  const city = searchParams.city || "London"

  return (
    <main className="min-h-screen p-4 md:p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Weather Forecast</h1>

      <SearchForm />

      <div className="mt-8 space-y-8">
        <Suspense fallback={<WeatherSkeleton />}>
          <WeatherErrorBoundary city={city} />
        </Suspense>

        <Suspense fallback={<ForecastSkeleton />}>
          <ForecastErrorBoundary city={city} />
        </Suspense>
      </div>
    </main>
  )
}

async function WeatherErrorBoundary({ city }: { city: string }) {
  try {
    const weather = await getCurrentWeather(city)
    return <WeatherDisplay weather={weather} />
  } catch (error) {
    return <ErrorDisplay message={error instanceof Error ? error.message : "Failed to load weather data"} />
  }
}

async function ForecastErrorBoundary({ city }: { city: string }) {
  try {
    const forecast = await getForecast(city)
    return <Forecast forecast={forecast} />
  } catch (error) {
    return <ErrorDisplay message={error instanceof Error ? error.message : "Failed to load forecast data"} />
  }
}

