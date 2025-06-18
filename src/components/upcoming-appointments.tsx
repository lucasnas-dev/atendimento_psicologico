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
import { CalendarIcon, Clock, Video } from "lucide-react";

export function UpcomingAppointments() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Appointments</CardTitle>
        <CardDescription>
          Your scheduled appointments for the next 7 days
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {upcomingAppointments.map((appointment) => (
            <div
              key={appointment.id}
              className="flex items-start justify-between space-x-4 rounded-md border p-4"
            >
              <div className="flex items-start space-x-4">
                <Avatar>
                  <AvatarImage
                    src={appointment.patientAvatar || "/placeholder.svg"}
                    alt={appointment.patientName}
                  />
                  <AvatarFallback>{appointment.patientInitials}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium leading-none">
                    {appointment.patientName}
                  </p>
                  <div className="flex items-center pt-2">
                    <CalendarIcon className="mr-1 h-3 w-3 text-muted-foreground" />
                    <p className="text-xs text-muted-foreground">
                      {appointment.date}
                    </p>
                  </div>
                  <div className="flex items-center pt-1">
                    <Clock className="mr-1 h-3 w-3 text-muted-foreground" />
                    <p className="text-xs text-muted-foreground">
                      {appointment.time}
                    </p>
                  </div>
                  {appointment.isVirtual && (
                    <div className="flex items-center pt-1">
                      <Video className="mr-1 h-3 w-3 text-muted-foreground" />
                      <p className="text-xs text-muted-foreground">
                        Virtual Session
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  Reschedule
                </Button>
                <Button variant="outline" size="sm">
                  Cancel
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          View All Appointments
        </Button>
      </CardFooter>
    </Card>
  );
}

const upcomingAppointments = [
  {
    id: "1",
    patientName: "João Silva",
    patientInitials: "JS",
    patientAvatar: "/placeholder.svg?height=32&width=32",
    date: "April 28, 2025",
    time: "09:00 - 10:00",
    isVirtual: false,
  },
  {
    id: "2",
    patientName: "Maria Oliveira",
    patientInitials: "MO",
    patientAvatar: "/placeholder.svg?height=32&width=32",
    date: "April 28, 2025",
    time: "11:00 - 12:00",
    isVirtual: true,
  },
  {
    id: "3",
    patientName: "Carlos Santos",
    patientInitials: "CS",
    patientAvatar: "/placeholder.svg?height=32&width=32",
    date: "April 28, 2025",
    time: "14:00 - 15:00",
    isVirtual: false,
  },
  {
    id: "4",
    patientName: "Ana Ferreira",
    patientInitials: "AF",
    patientAvatar: "/placeholder.svg?height=32&width=32",
    date: "April 29, 2025",
    time: "10:00 - 11:00",
    isVirtual: true,
  },
  {
    id: "5",
    patientName: "Pedro Costa",
    patientInitials: "PC",
    patientAvatar: "/placeholder.svg?height=32&width=32",
    date: "April 30, 2025",
    time: "15:00 - 16:00",
    isVirtual: false,
  },
];
