"use client"

import { useEffect, useState } from "react"
import { TrainSearch } from "@/components/train-search"
import { TrainList } from "@/components/train-list"
import { CreateTrainDialog } from "@/components/create-train-dialog"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Train, Clock, MapPin } from "lucide-react"
import { getTrainStats } from "@/lib/api"

export default function HomePage() {
  const [stats, setStats] = useState({
    totalTrains: 0,
    departuresToday: 0,
    activeStations: 0,
  })
  const [isLoadingStats, setIsLoadingStats] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const fetchedStats = await getTrainStats()
        setStats(fetchedStats)
      } catch (error) {
        console.error("Failed to fetch stats:", error)
      } finally {
        setIsLoadingStats(false)
      }
    }

    fetchStats()
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary rounded-lg">
              <Train className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Train Schedule</h1>
              <p className="text-muted-foreground">Manage and search train schedules</p>
            </div>
          </div>
          <CreateTrainDialog />
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Trains</CardTitle>
              <Train className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{isLoadingStats ? "..." : stats.totalTrains}</div>
              <p className="text-xs text-muted-foreground">Currently scheduled</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Departures Today</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{isLoadingStats ? "..." : stats.departuresToday}</div>
              <p className="text-xs text-muted-foreground">Scheduled departures</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Stations</CardTitle>
              <MapPin className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{isLoadingStats ? "..." : stats.activeStations}</div>
              <p className="text-xs text-muted-foreground">Active stations</p>
            </CardContent>
          </Card>
        </div>

        {/* Search Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Search Trains</CardTitle>
            <CardDescription>Find trains by time, station, or other criteria</CardDescription>
          </CardHeader>
          <CardContent>
            <TrainSearch />
          </CardContent>
        </Card>

        {/* Train List */}
        <TrainList />
      </div>
    </div>
  )
}
