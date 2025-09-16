"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  CloudRain,
  Sun,
  Cloud,
  Zap,
  Wind,
  Thermometer,
  Droplets,
  Eye,
  AlertTriangle,
  Bell,
  Calendar,
  MapPin,
  Snowflake,
} from "lucide-react"

interface WeatherAlert {
  id: string
  type: "rain" | "storm" | "heat" | "cold" | "wind" | "drought"
  severity: "Low" | "Medium" | "High" | "Extreme"
  title: string
  description: string
  startTime: string
  endTime: string
  impact: string
  recommendation: string
}

interface WeatherForecast {
  date: string
  day: string
  high: number
  low: number
  condition: string
  icon: string
  humidity: number
  windSpeed: number
  rainfall: number
}

const mockAlerts: WeatherAlert[] = [
  {
    id: "1",
    type: "rain",
    severity: "High",
    title: "Heavy Rainfall Expected",
    description: "Intense rainfall of 50-75mm expected over the next 24 hours",
    startTime: "Tomorrow 6:00 AM",
    endTime: "Tomorrow 8:00 PM",
    impact: "May cause waterlogging in low-lying areas. Risk of fungal diseases in crops.",
    recommendation: "Ensure proper drainage. Avoid fertilizer application. Cover harvested crops.",
  },
  {
    id: "2",
    type: "wind",
    severity: "Medium",
    title: "Strong Wind Advisory",
    description: "Wind speeds of 40-50 km/h expected",
    startTime: "Today 2:00 PM",
    endTime: "Today 8:00 PM",
    impact: "May damage tall crops and newly planted seedlings.",
    recommendation: "Provide support to tall plants. Secure loose farm equipment.",
  },
]

const mockForecast: WeatherForecast[] = [
  {
    date: "2024-01-15",
    day: "Today",
    high: 28,
    low: 18,
    condition: "Partly Cloudy",
    icon: "partly-cloudy",
    humidity: 65,
    windSpeed: 12,
    rainfall: 0,
  },
  {
    date: "2024-01-16",
    day: "Tomorrow",
    high: 24,
    low: 16,
    condition: "Heavy Rain",
    icon: "rain",
    humidity: 85,
    windSpeed: 25,
    rainfall: 65,
  },
  {
    date: "2024-01-17",
    day: "Wednesday",
    high: 26,
    low: 17,
    condition: "Thunderstorm",
    icon: "storm",
    humidity: 80,
    windSpeed: 35,
    rainfall: 45,
  },
  {
    date: "2024-01-18",
    day: "Thursday",
    high: 30,
    low: 20,
    condition: "Sunny",
    icon: "sunny",
    humidity: 55,
    windSpeed: 8,
    rainfall: 0,
  },
  {
    date: "2024-01-19",
    day: "Friday",
    high: 32,
    low: 22,
    condition: "Hot",
    icon: "hot",
    humidity: 45,
    windSpeed: 10,
    rainfall: 0,
  },
]

export function WeatherAlerts() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [selectedAlert, setSelectedAlert] = useState<WeatherAlert | null>(null)

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "rain":
        return <CloudRain className="h-5 w-5" />
      case "storm":
        return <Zap className="h-5 w-5" />
      case "heat":
        return <Thermometer className="h-5 w-5" />
      case "wind":
        return <Wind className="h-5 w-5" />
      case "cold":
        return <Snowflake className="h-5 w-5" />
      default:
        return <AlertTriangle className="h-5 w-5" />
    }
  }

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case "sunny":
        return <Sun className="h-6 w-6 text-yellow-500" />
      case "partly cloudy":
        return <Cloud className="h-6 w-6 text-gray-500" />
      case "heavy rain":
        return <CloudRain className="h-6 w-6 text-blue-500" />
      case "thunderstorm":
        return <Zap className="h-6 w-6 text-purple-500" />
      case "hot":
        return <Thermometer className="h-6 w-6 text-red-500" />
      default:
        return <Sun className="h-6 w-6 text-yellow-500" />
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "Extreme":
        return "bg-red-500 text-white"
      case "High":
        return "bg-red-100 text-red-800 border-red-200"
      case "Medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "Low":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="space-y-4 pb-28 px-1">
      {/* Current Weather */}
      <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200 shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Sun className="h-6 w-6 text-primary" />
            Current Weather
            <Badge variant="secondary" className="ml-auto text-sm">
              <MapPin className="h-4 w-4 mr-1" />
              Live
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {getWeatherIcon("Partly Cloudy")}
              <div>
                <div className="text-4xl font-bold">28°C</div>
                <div className="text-base text-muted-foreground">Partly Cloudy</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-base text-muted-foreground">Feels like</div>
              <div className="text-xl font-semibold">31°C</div>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-3 text-base">
            <div className="text-center p-3 rounded-xl bg-white/50">
              <Droplets className="h-6 w-6 text-blue-500 mx-auto mb-2" />
              <div className="font-medium">65%</div>
              <div className="text-sm text-muted-foreground">Humidity</div>
            </div>
            <div className="text-center p-3 rounded-xl bg-white/50">
              <Wind className="h-6 w-6 text-gray-500 mx-auto mb-2" />
              <div className="font-medium">12 km/h</div>
              <div className="text-sm text-muted-foreground">Wind</div>
            </div>
            <div className="text-center p-3 rounded-xl bg-white/50">
              <Eye className="h-6 w-6 text-green-500 mx-auto mb-2" />
              <div className="font-medium">10 km</div>
              <div className="text-sm text-muted-foreground">Visibility</div>
            </div>
            <div className="text-center p-3 rounded-xl bg-white/50">
              <Thermometer className="h-6 w-6 text-orange-500 mx-auto mb-2" />
              <div className="font-medium">1013</div>
              <div className="text-sm text-muted-foreground">Pressure</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Active Alerts */}
      {mockAlerts.length > 0 && (
        <Card className="shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              <AlertTriangle className="h-6 w-6 text-red-500" />
              Active Weather Alerts
              <Badge variant="destructive" className="ml-auto">
                {mockAlerts.length} Active
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockAlerts.map((alert) => (
              <Alert key={alert.id} className="border-l-4 border-l-red-500 p-4">
                <div className="flex items-start gap-4">
                  <div className="text-red-500 mt-1">{getAlertIcon(alert.type)}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertDescription className="font-medium text-base">{alert.title}</AlertDescription>
                      <Badge className={getSeverityColor(alert.severity)}>{alert.severity}</Badge>
                    </div>
                    <p className="text-base text-muted-foreground mb-3">{alert.description}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <span className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        {alert.startTime} - {alert.endTime}
                      </span>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-12 px-4 text-base rounded-xl active:scale-95 transition-transform bg-transparent"
                      onClick={() => setSelectedAlert(alert)}
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              </Alert>
            ))}
          </CardContent>
        </Card>
      )}

      {/* 5-Day Forecast */}
      <Card className="shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Calendar className="h-6 w-6 text-primary" />
            5-Day Forecast
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockForecast.map((day, index) => (
              <div key={index} className="flex items-center justify-between p-4 rounded-xl bg-muted/30">
                <div className="flex items-center gap-4">
                  {getWeatherIcon(day.condition)}
                  <div>
                    <div className="font-medium text-base">{day.day}</div>
                    <div className="text-sm text-muted-foreground">{day.condition}</div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-lg">{day.high}°</span>
                      <span className="text-muted-foreground text-base">{day.low}°</span>
                    </div>
                  </div>

                  {day.rainfall > 0 && (
                    <div className="flex items-center gap-2 text-blue-600">
                      <Droplets className="h-5 w-5" />
                      <span className="text-base">{day.rainfall}mm</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Farming Recommendations */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200 shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Sun className="h-6 w-6 text-green-500" />
            Today's Farming Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <h4 className="font-medium text-base">Best Time for Field Work</h4>
            <p className="text-base text-pretty bg-white/50 p-4 rounded-xl">
              <strong>6:00 AM - 10:00 AM:</strong> Ideal for spraying and field inspection. Low wind and good
              visibility.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="font-medium text-base">Irrigation Advice</h4>
            <p className="text-base text-pretty bg-white/50 p-4 rounded-xl">
              With upcoming rain, avoid irrigation for the next 2 days. Check soil moisture levels before resuming.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="font-medium text-base">Pest Management</h4>
            <p className="text-base text-pretty bg-white/50 p-4 rounded-xl">
              High humidity may increase fungal disease risk. Monitor crops closely and apply preventive fungicides if
              needed.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card className="shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Bell className="h-6 w-6 text-primary" />
            Alert Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between p-4 rounded-xl bg-muted/30">
            <div>
              <Label htmlFor="notifications" className="font-medium text-base">
                Weather Notifications
              </Label>
              <p className="text-base text-muted-foreground mt-1">Get alerts for severe weather conditions</p>
            </div>
            <Switch
              id="notifications"
              checked={notificationsEnabled}
              onCheckedChange={setNotificationsEnabled}
              className="scale-125"
            />
          </div>

          <div className="grid grid-cols-2 gap-6 text-base">
            <div className="space-y-3">
              <h4 className="font-medium">Alert Types</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <input type="checkbox" defaultChecked className="rounded scale-125" />
                  <span>Heavy Rain</span>
                </div>
                <div className="flex items-center gap-3">
                  <input type="checkbox" defaultChecked className="rounded scale-125" />
                  <span>Storms</span>
                </div>
                <div className="flex items-center gap-3">
                  <input type="checkbox" defaultChecked className="rounded scale-125" />
                  <span>Extreme Heat</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium">Timing</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <input type="checkbox" defaultChecked className="rounded scale-125" />
                  <span>24 hours ahead</span>
                </div>
                <div className="flex items-center gap-3">
                  <input type="checkbox" defaultChecked className="rounded scale-125" />
                  <span>6 hours ahead</span>
                </div>
                <div className="flex items-center gap-3">
                  <input type="checkbox" className="rounded scale-125" />
                  <span>1 hour ahead</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Alert Detail Modal */}
      {selectedAlert && (
        <Card className="border-2 border-red-200 bg-red-50 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              {getAlertIcon(selectedAlert.type)}
              {selectedAlert.title}
              <Badge className={getSeverityColor(selectedAlert.severity)}>{selectedAlert.severity}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h4 className="font-medium mb-3 text-base">Impact on Crops</h4>
              <p className="text-base text-pretty bg-white/50 p-4 rounded-xl">{selectedAlert.impact}</p>
            </div>

            <div>
              <h4 className="font-medium mb-3 text-base">Recommended Actions</h4>
              <p className="text-base text-pretty bg-white/50 p-4 rounded-xl">{selectedAlert.recommendation}</p>
            </div>

            <div className="flex gap-3">
              <Button
                size="sm"
                onClick={() => setSelectedAlert(null)}
                className="h-12 px-6 text-base rounded-xl active:scale-95 transition-transform"
              >
                Got it
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="h-12 px-6 text-base rounded-xl active:scale-95 transition-transform bg-transparent"
              >
                Set Reminder
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
