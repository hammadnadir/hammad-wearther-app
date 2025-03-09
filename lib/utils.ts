import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatTemperature(temp: number): string {
  return `${Math.round(temp)}°C`
}

export function formatDate(timestamp: number): string {
  const date = new Date(timestamp * 1000)
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  })
}

export function formatDay(date: Date): string {
  // If it's today, return "Today"
  const today = new Date()
  if (date.toDateString() === today.toDateString()) {
    return "Today"
  }

  // If it's tomorrow, return "Tomorrow"
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  if (date.toDateString() === tomorrow.toDateString()) {
    return "Tomorrow"
  }

  // Otherwise return the day name
  return date.toLocaleDateString("en-US", { weekday: "short" })
}

