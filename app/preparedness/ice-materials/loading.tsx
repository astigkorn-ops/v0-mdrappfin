import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { PreparednessSidebar } from "@/components/preparedness-sidebar"

export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <PreparednessSidebar />

          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-sm p-8">
              {/* Header skeleton */}
              <Skeleton className="h-9 w-64 mb-8" />

              {/* Description skeleton */}
              <div className="mb-8">
                <Skeleton className="h-6 w-full mb-2" />
                <Skeleton className="h-6 w-3/4 mb-6" />

                {/* Search and filter controls skeleton */}
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <Skeleton className="h-10 flex-1" />
                  <Skeleton className="h-10 w-full md:w-48" />
                  <Skeleton className="h-10 w-full md:w-48" />
                </div>

                <Skeleton className="h-4 w-48" />
              </div>

              {/* Materials grid skeleton */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Card key={i} className="animate-pulse">
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between mb-3">
                        <Skeleton className="h-8 w-8" />
                        <div className="flex gap-2">
                          <Skeleton className="h-6 w-12" />
                          <Skeleton className="h-6 w-16" />
                        </div>
                      </div>
                      <Skeleton className="h-6 w-full" />
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="space-y-2 mb-4">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                      </div>
                      <div className="flex items-center justify-between mb-4">
                        <Skeleton className="h-3 w-16" />
                        <Skeleton className="h-3 w-20" />
                      </div>
                      <Skeleton className="h-8 w-full" />
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Info section skeleton */}
              <div className="mt-8 bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
                <Skeleton className="h-6 w-48 mb-3" />
                <div className="space-y-2 mb-4">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
                <Skeleton className="h-9 w-24" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
