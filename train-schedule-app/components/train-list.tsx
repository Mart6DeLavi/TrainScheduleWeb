"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, MapPin, Trash2, Train, RefreshCw } from "lucide-react"
import { deleteTrainById, getAllTrains, type Train as TrainType } from "@/lib/api"
import { useToast } from "@/hooks/use-toast"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export function TrainList() {
  const [trains, setTrains] = useState<TrainType[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isDeleting, setIsDeleting] = useState<string | null>(null)
  const { toast } = useToast()

  const fetchTrains = async () => {
    setIsLoading(true)
    try {
      const fetchedTrains = await getAllTrains()
      setTrains(fetchedTrains)
    } catch (error) {
      toast({
        title: "Fetch Failed",
        description: "Failed to fetch trains. Please check if your backend is running.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchTrains()
  }, [])

  const handleDeleteTrain = async (trainId: string) => {
    setIsDeleting(trainId)
    try {
      await deleteTrainById(trainId)
      setTrains(trains.filter((train) => train.id !== trainId))
      toast({
        title: "Train Deleted",
        description: "Train has been successfully deleted.",
      })
    } catch (error) {
      toast({
        title: "Delete Failed",
        description: "Failed to delete train. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsDeleting(null)
    }
  }

  const getStatusBadge = (departureTime: string) => {
    const now = new Date()
    const departure = new Date(departureTime)
    const diffHours = (departure.getTime() - now.getTime()) / (1000 * 60 * 60)

    if (diffHours < 0) return <Badge variant="secondary">Departed</Badge>
    if (diffHours < 2) return <Badge variant="destructive">Departing Soon</Badge>
    return <Badge variant="default">Scheduled</Badge>
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">All Trains</h2>
          <Badge variant="outline">Loading...</Badge>
        </div>
        <div className="grid gap-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader className="pb-3">
                <div className="h-6 bg-muted rounded w-1/3"></div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="h-4 bg-muted rounded w-1/2"></div>
                  <div className="h-4 bg-muted rounded w-2/3"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">All Trains</h2>
        <div className="flex items-center gap-2">
          <Badge variant="outline">{trains.length} trains</Badge>
          <Button variant="outline" size="sm" onClick={fetchTrains}>
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {trains.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-8">
              <Train className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No trains found</h3>
              <p className="text-muted-foreground">
                No trains are currently scheduled. Add a new train to get started.
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {trains.map((train) => (
            <Card key={train.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Train className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{train.name}</CardTitle>
                      <div className="flex items-center gap-2 mt-1">{getStatusBadge(train.departureTime)}</div>
                    </div>
                  </div>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" size="sm" disabled={isDeleting === train.id}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Train</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete {train.name}? This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDeleteTrain(train.id)}>
                          {isDeleting === train.id ? "Deleting..." : "Delete"}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">From:</span>
                      <span>{train.departureStation}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">Departs:</span>
                      <span>{new Date(train.departureTime).toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">To:</span>
                      <span>{train.arrivalStation}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">Arrives:</span>
                      <span>{new Date(train.arrivalTime).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
