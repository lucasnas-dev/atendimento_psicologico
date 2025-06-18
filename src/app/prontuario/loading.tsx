import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardShell } from "@/components/dashboard-shell";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function ProntuariosLoading() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Prontuários Psicológicos"
        text="Gerenciamento de prontuários conforme exigências do CFP"
      >
        <Button disabled>
          <Plus className="mr-2 h-4 w-4" />
          Novo Prontuário
        </Button>
      </DashboardHeader>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Skeleton className="h-10 w-[300px]" />
          <Skeleton className="h-10 w-[150px]" />
        </div>
        <div className="rounded-md border">
          <div className="h-12 border-b px-6 py-3">
            <Skeleton className="h-5 w-full" />
          </div>
          <div className="divide-y">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="p-4">
                <div className="grid grid-cols-7 gap-4">
                  {Array.from({ length: 7 }).map((_, j) => (
                    <Skeleton key={j} className="h-5 w-full" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
