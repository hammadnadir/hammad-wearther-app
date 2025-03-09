import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function WeatherSkeleton() {
  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div>
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-32 mt-2" />
          </div>
          <Skeleton className="h-16 w-16 rounded-full" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div className="flex flex-col items-center">
            <Skeleton className="h-10 w-24 mb-2" />
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-24 mt-2" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex flex-col items-center">
                <Skeleton className="h-5 w-5 mb-1 rounded-full" />
                <Skeleton className="h-4 w-16 mb-1" />
                <Skeleton className="h-6 w-10" />
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

