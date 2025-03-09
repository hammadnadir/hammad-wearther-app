import type { WeatherData, ForecastData } from "./types"

// Replace the API_KEY line with this hardcoded value for testing purposes only
// In production, you should always use environment variables
const API_KEY = "5dd8936c786be4a2959b8c5feb365c2d"
const BASE_URL = "https://api.openweathermap.org/data/2.5"

export async function getCurrentWeather(city: string): Promise<WeatherData> {
  try {
    const response = await fetch(
      `${BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`,
      { next: { revalidate: 1800 } }, // Cache for 30 minutes
    )

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`City "${city}" not found. Please check the spelling and try again.`)
      }
      throw new Error(`Failed to fetch weather data: ${response.status} ${response.statusText}`)
    }

    return response.json()
  } catch (error) {
    console.error("Error fetching weather data:", error)
    throw error
  }
}

export async function getForecast(city: string): Promise<ForecastData> {
  try {
    const response = await fetch(
      `${BASE_URL}/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`,
      { next: { revalidate: 1800 } }, // Cache for 30 minutes
    )

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`City "${city}" not found. Please check the spelling and try again.`)
      }
      throw new Error(`Failed to fetch forecast data: ${response.status} ${response.statusText}`)
    }

    return response.json()
  } catch (error) {
    console.error("Error fetching forecast data:", error)
    throw error
  }
}

