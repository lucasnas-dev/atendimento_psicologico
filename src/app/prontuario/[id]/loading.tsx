import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardShell } from "@/components/dashboard-shell";
import { Skeleton } from "@/src/components/ui/skeleton";
import { Card, CardContent } from "@/src/components/ui/card";

export default function ProntuarioLoading() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Prontuário Psicológico"
        text="Registro completo conforme exigências do CFP"
      >
        <div className="flex space-x-2">
          <Skeleton className="h-10 w-[150px]" />
          <Skeleton className="h-10 w-[120px]" />
          <Skeleton className="h-10 w-[120px]" />
        </div>
      </DashboardHeader>

      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <Skeleton className="h-24 w-24 rounded-full" />
            <div className="flex-1 space-y-4">
              <Skeleton className="h-8 w-[250px]" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[200px]" />
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[220px]" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[180px]" />
                  <Skeleton className="h-4 w-[120px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Skeleton className="h-8 w-[200px]" />
              <Skeleton className="h-6 w-[150px]" />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <Skeleton className="h-10 w-full" />
        <Card>
          <CardContent className="p-6">
            <div className="space-y-6">
              <Skeleton className="h-6 w-[200px]" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Skeleton key={i} className="h-16 w-full" />
                  ))}
                </div>
                <div className="space-y-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Skeleton key={i} className="h-16 w-full" />
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  );
}
