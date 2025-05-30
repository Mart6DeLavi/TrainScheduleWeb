const API_BASE_URL = "http://localhost:5216/api/v1"

export interface Train {
  id: string
  name: string
  departureStation: string
  arrivalStation: string
  departureTime: string
  arrivalTime: string
}

export interface CreateTrainDto {
  name: string
  departureStation: string
  arrivalStation: string
  departureTime: string
  arrivalTime: string
}

// Get train by ID
export async function getTrainById(trainId: string): Promise<Train | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/trains/get/${trainId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      if (response.status === 404) return null
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error fetching train by ID:", error)
    throw error
  }
}

// Search trains by different criteria
export async function searchTrains(searchType: string, searchValue: string): Promise<Train | null> {
  try {
    const endpoint = `${API_BASE_URL}/trains/${searchType}`
    const param = searchType.includes("time") ? "time" : "station"

    const response = await fetch(`${endpoint}?${param}=${encodeURIComponent(searchValue)}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      if (response.status === 404) return null
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error searching trains:", error)
    throw error
  }
}

// Create new train
export async function createTrain(trainData: CreateTrainDto): Promise<void> {
  try {
    const response = await fetch(`${API_BASE_URL}/trains/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(trainData),
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Failed to create train: ${errorText}`)
    }
  } catch (error) {
    console.error("Error creating train:", error)
    throw error
  }
}

// Delete train by ID
export async function deleteTrainById(trainId: string): Promise<void> {
  try {
    const response = await fetch(`${API_BASE_URL}/trains/delete/${trainId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Failed to delete train: ${errorText}`)
    }
  } catch (error) {
    console.error("Error deleting train:", error)
    throw error
  }
}

// Get all trains - you'll need to add this endpoint to your .NET backend
export async function getAllTrains(): Promise<Train[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/trains`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error fetching all trains:", error)
    // Return empty array if endpoint doesn't exist yet
    return []
  }
}

// Get trains statistics
export async function getTrainStats(): Promise<{
  totalTrains: number
  departuresToday: number
  activeStations: number
}> {
  try {
    // For now, we'll calculate from getAllTrains
    // You can add a dedicated stats endpoint to your backend later
    const trains = await getAllTrains()
    const today = new Date().toDateString()

    const departuresToday = trains.filter((train) => new Date(train.departureTime).toDateString() === today).length

    const stations = new Set([...trains.map((t) => t.departureStation), ...trains.map((t) => t.arrivalStation)])

    return {
      totalTrains: trains.length,
      departuresToday,
      activeStations: stations.size,
    }
  } catch (error) {
    console.error("Error fetching train stats:", error)
    return {
      totalTrains: 0,
      departuresToday: 0,
      activeStations: 0,
    }
  }
}
