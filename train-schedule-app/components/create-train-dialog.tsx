"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus } from "lucide-react"
import { createTrain } from "@/lib/api"
import { useToast } from "@/hooks/use-toast"

interface CreateTrainDialogProps {
  onTrainCreated?: () => void
}

export function CreateTrainDialog({ onTrainCreated }: CreateTrainDialogProps) {
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    departureStation: "",
    arrivalStation: "",
    departureTime: "",
    arrivalTime: "",
  })
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await createTrain({
        name: formData.name,
        departureStation: formData.departureStation,
        arrivalStation: formData.arrivalStation,
        departureTime: new Date(formData.departureTime).toISOString(),
        arrivalTime: new Date(formData.arrivalTime).toISOString(),
      })

      toast({
        title: "Train Created",
        description: "New train has been successfully created.",
      })

      setOpen(false)
      setFormData({
        name: "",
        departureStation: "",
        arrivalStation: "",
        departureTime: "",
        arrivalTime: "",
      })

      // Trigger refresh of train list
      if (onTrainCreated) {
        onTrainCreated()
      }
    } catch (error) {
      toast({
        title: "Creation Failed",
        description: "Failed to create train. Please check your backend connection.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Train
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Train</DialogTitle>
          <DialogDescription>Add a new train to the schedule. Fill in all the required information.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Train Name</Label>
              <Input
                id="name"
                placeholder="Express 101"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                required
                maxLength={100}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="departure-station">Departure Station</Label>
              <Input
                id="departure-station"
                placeholder="Central Station"
                value={formData.departureStation}
                onChange={(e) => handleInputChange("departureStation", e.target.value)}
                required
                maxLength={100}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="arrival-station">Arrival Station</Label>
              <Input
                id="arrival-station"
                placeholder="North Terminal"
                value={formData.arrivalStation}
                onChange={(e) => handleInputChange("arrivalStation", e.target.value)}
                required
                maxLength={100}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="departure-time">Departure Time</Label>
              <Input
                id="departure-time"
                type="datetime-local"
                value={formData.departureTime}
                onChange={(e) => handleInputChange("departureTime", e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="arrival-time">Arrival Time</Label>
              <Input
                id="arrival-time"
                type="datetime-local"
                value={formData.arrivalTime}
                onChange={(e) => handleInputChange("arrivalTime", e.target.value)}
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Creating..." : "Create Train"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
