import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function ForecastSkeleton() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>5-Day Forecast</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex flex-col items-center p-3 border rounded-lg">
              <Skeleton className="h-5 w-20 mb-2" />
              <Skeleton className="h-10 w-10 rounded-full my-2" />
              <Skeleton className="h-4 w-16 mb-2" />
              <Skeleton className="h-4 w-24 mt-1" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

