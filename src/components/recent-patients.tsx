import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CalendarIcon, Clock, FileText } from "lucide-react";

export function RecentPatients() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Patients</CardTitle>
        <CardDescription>Patients you've seen recently</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {patients.map((patient) => (
            <div
              key={patient.id}
              className="flex items-center justify-between space-x-4 rounded-md border p-4"
            >
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage
                    src={patient.avatar || "/placeholder.svg"}
                    alt={patient.name}
                  />
                  <AvatarFallback>{patient.initials}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium leading-none">
                    {patient.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {patient.email}
                  </p>
                  <div className="flex items-center pt-2">
                    <CalendarIcon className="mr-1 h-3 w-3 text-muted-foreground" />
                    <p className="text-xs text-muted-foreground">
                      Last session: {patient.lastSession}
                    </p>
                  </div>
                  <div className="flex items-center pt-1">
                    <Clock className="mr-1 h-3 w-3 text-muted-foreground" />
                    <p className="text-xs text-muted-foreground">
                      Sessions: {patient.sessionCount}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                  <FileText className="h-4 w-4" />
                  <span className="sr-only">View notes</span>
                </Button>
                <Button variant="outline" size="sm">
                  Schedule
                </Button>
                <Button size="sm">View Profile</Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          View All Patients
        </Button>
      </CardFooter>
    </Card>
  );
}

const patients = [
  {
    id: "1",
    name: "Ana Ferreira",
    initials: "AF",
    avatar: "/placeholder.svg?height=32&width=32",
    email: "ana.ferreira@example.com",
    lastSession: "April 25, 2025",
    sessionCount: 8,
    status: "Active",
  },
  {
    id: "2",
    name: "Pedro Costa",
    initials: "PC",
    avatar: "/placeholder.svg?height=32&width=32",
    email: "pedro.costa@example.com",
    lastSession: "April 24, 2025",
    sessionCount: 12,
    status: "Active",
  },
  {
    id: "3",
    name: "Lucia Mendes",
    initials: "LM",
    avatar: "/placeholder.svg?height=32&width=32",
    email: "lucia.mendes@example.com",
    lastSession: "April 22, 2025",
    sessionCount: 5,
    status: "Active",
  },
];
