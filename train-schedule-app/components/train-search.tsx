"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Search, Clock, MapPin } from "lucide-react"
import { searchTrains } from "@/lib/api"
import { useToast } from "@/hooks/use-toast"

export function TrainSearch() {
  const [searchType, setSearchType] = useState<string>("")
  const [searchValue, setSearchValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [searchResults, setSearchResults] = useState<any>(null)
  const { toast } = useToast()

  const handleSearch = async () => {
    if (!searchType || !searchValue) {
      toast({
        title: "Search Error",
        description: "Please select a search type and enter a value",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    try {
      const result = await searchTrains(searchType, searchValue)
      setSearchResults(result)
      if (!result) {
        toast({
          title: "No Results",
          description: "No trains found matching your search criteria",
        })
      }
    } catch (error) {
      toast({
        title: "Search Failed",
        description: "Failed to search trains. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="search-type">Search Type</Label>
          <Select value={searchType} onValueChange={setSearchType}>
            <SelectTrigger>
              <SelectValue placeholder="Select search type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="arrival-time">Arrival Time</SelectItem>
              <SelectItem value="departure-time">Departure Time</SelectItem>
              <SelectItem value="arrival-station">Arrival Station</SelectItem>
              <SelectItem value="departure-station">Departure Station</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="search-value">{searchType.includes("time") ? "Time (HH:mm)" : "Station Name"}</Label>
          <Input
            id="search-value"
            placeholder={searchType.includes("time") ? "08:30" : "Station name"}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label>&nbsp;</Label>
          <Button onClick={handleSearch} disabled={isLoading} className="w-full">
            <Search className="h-4 w-4 mr-2" />
            {isLoading ? "Searching..." : "Search"}
          </Button>
        </div>
      </div>

      {searchResults && (
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">{searchResults.name}</h3>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>{searchResults.departureStation}</span>
                  </div>
                  <span>→</span>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>{searchResults.arrivalStation}</span>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>Departs: {new Date(searchResults.departureTime).toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>Arrives: {new Date(searchResults.arrivalTime).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
