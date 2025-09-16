"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { BottomNavigation } from "@/components/bottom-navigation"
import { CropAdvisory } from "@/components/crop-advisory"
import { PestDetection } from "@/components/pest-detection"
import { WeatherAlerts } from "@/components/weather-alerts"
import { MarketTracking } from "@/components/market-tracking"
import { UserProfile } from "@/components/user-profile"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Thermometer,
  Droplets,
  Wind,
  Sun,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Clock,
  MapPin,
  Leaf,
  Bug,
  DollarSign,
  Mic,
} from "lucide-react"

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("home")
  const [isInstalled, setIsInstalled] = useState(false)

  useEffect(() => {
    const checkInstallation = () => {
      if (window.matchMedia("(display-mode: standalone)").matches) {
        setIsInstalled(true)
      }
    }

    checkInstallation()

    // Handle URL parameters for deep linking
    const urlParams = new URLSearchParams(window.location.search)
    const tabParam = urlParams.get("tab")
    if (tabParam) {
      setActiveTab(tabParam)
    }
  }, [])

  // Mock data for demonstration
  const weatherData = {
    temperature: 28,
    humidity: 65,
    windSpeed: 12,
    condition: "Partly Cloudy",
    rainfall: 2.5,
  }

  const cropHealth = {
    overall: 85,
    irrigation: "Good",
    fertilizer: "Due in 3 days",
    pestRisk: "Low",
  }

  const marketPrices = [
    { crop: "Rice", price: 2100, change: 5.2, trend: "up" },
    { crop: "Wheat", price: 2350, change: -2.1, trend: "down" },
    { crop: "Cotton", price: 5800, change: 8.7, trend: "up" },
  ]

  const alerts = [
    { type: "weather", message: "Heavy rain expected in 2 days", priority: "high" },
    { type: "pest", message: "Aphid activity detected in nearby farms", priority: "medium" },
    { type: "market", message: "Rice prices increased by 5%", priority: "low" },
  ]

  const renderHomeContent = () => (
    <div className="space-y-4 pb-28 px-1 sm:px-2 safe-area-pb">
      {/* Welcome Section */}
      <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20 shadow-sm">
        <CardContent className="p-4 sm:p-6">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
              <Leaf className="h-7 w-7 text-primary" />
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="font-heading font-semibold text-xl text-balance">Welcome, Farmer!</h2>
              <p className="text-base text-muted-foreground text-pretty">Your crops are looking healthy today</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions - Android optimized touch targets */}
      <div className="grid grid-cols-2 gap-4">
        <Button
          variant="outline"
          className="h-28 flex-col gap-3 bg-card hover:bg-accent active:scale-95 transition-all duration-150 shadow-sm"
          onClick={() => setActiveTab("pest")}
        >
          <Bug className="h-8 w-8 text-primary" />
          <span className="text-base font-medium">Detect Pest</span>
        </Button>
        <Button
          variant="outline"
          className="h-28 flex-col gap-3 bg-card hover:bg-accent active:scale-95 transition-all duration-150 shadow-sm"
          onClick={() => setActiveTab("weather")}
        >
          <Sun className="h-8 w-8 text-primary" />
          <span className="text-base font-medium">Weather</span>
        </Button>
        <Button
          variant="outline"
          className="h-28 flex-col gap-3 bg-card hover:bg-accent active:scale-95 transition-all duration-150 shadow-sm"
          onClick={() => setActiveTab("market")}
        >
          <DollarSign className="h-8 w-8 text-primary" />
          <span className="text-base font-medium">Market</span>
        </Button>
        <Button
          variant="outline"
          className="h-28 flex-col gap-3 bg-card hover:bg-accent active:scale-95 transition-all duration-150 shadow-sm"
          onClick={() => setActiveTab("advisory")}
        >
          <Mic className="h-8 w-8 text-primary" />
          <span className="text-base font-medium">AI Assistant</span>
        </Button>
      </div>

      {/* Weather Card */}
      <Card className="shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Sun className="h-6 w-6 text-primary" />
            Today's Weather
            <Badge variant="outline" className="ml-auto text-sm border-primary/30 text-foreground">
              <MapPin className="h-4 w-4 mr-1" />
              Current Location
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="text-4xl font-bold">{weatherData.temperature}°C</div>
            <div className="text-base text-muted-foreground">{weatherData.condition}</div>
          </div>
          <div className="grid grid-cols-3 gap-4 text-base">
            <div className="flex flex-col items-center gap-2 p-4 rounded-lg bg-muted/50">
              <Droplets className="h-5 w-5 text-blue-500" />
              <span className="font-medium text-base">{weatherData.humidity}%</span>
              <span className="text-sm text-muted-foreground">Humidity</span>
            </div>
            <div className="flex flex-col items-center gap-2 p-4 rounded-lg bg-muted/50">
              <Wind className="h-5 w-5 text-gray-500" />
              <span className="font-medium text-base">{weatherData.windSpeed} km/h</span>
              <span className="text-sm text-muted-foreground">Wind</span>
            </div>
            <div className="flex flex-col items-center gap-2 p-4 rounded-lg bg-muted/50">
              <Thermometer className="h-5 w-5 text-orange-500" />
              <span className="font-medium text-base">{weatherData.rainfall}mm</span>
              <span className="text-sm text-muted-foreground">Rainfall</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Crop Health Status */}
      <Card className="shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Leaf className="h-6 w-6 text-primary" />
            Crop Health Status
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <div className="flex justify-between text-base">
              <span>Overall Health</span>
              <span className="font-medium">{cropHealth.overall}%</span>
            </div>
            <Progress value={cropHealth.overall} className="h-4" />
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
              <span className="flex items-center gap-2">
                <Droplets className="h-5 w-5 text-blue-500" />
                Irrigation
              </span>
              <Badge variant="outline" className="text-sm border-green-300 text-green-700 bg-green-50">
                {cropHealth.irrigation}
              </Badge>
            </div>
            <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
              <span className="flex items-center gap-2">
                <Leaf className="h-5 w-5 text-green-500" />
                Fertilizer
              </span>
              <Badge variant="outline" className="text-sm">
                <Clock className="h-4 w-4 mr-1" />
                {cropHealth.fertilizer}
              </Badge>
            </div>
            <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
              <span className="flex items-center gap-2">
                <Bug className="h-5 w-5 text-orange-500" />
                Pest Risk
              </span>
              <Badge variant="outline" className="text-sm bg-green-50 text-green-700 border-green-300">
                {cropHealth.pestRisk}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Market Prices */}
      <Card className="shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <DollarSign className="h-6 w-6 text-primary" />
            Market Prices (₹/Quintal)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {marketPrices.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                <span className="font-medium text-lg">{item.crop}</span>
                <div className="flex items-center gap-4">
                  <span className="font-bold text-xl">₹{item.price}</span>
                  <div
                    className={`flex items-center gap-1 text-base px-3 py-1 rounded-full ${
                      item.trend === "up" ? "text-green-700 bg-green-100" : "text-red-700 bg-red-100"
                    }`}
                  >
                    {item.trend === "up" ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                    {Math.abs(item.change)}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Alerts & Notifications */}
      <Card className="shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <AlertTriangle className="h-6 w-6 text-primary" />
            Important Alerts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {alerts.map((alert, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-5 rounded-lg bg-muted/50 border-l-4 border-l-primary/20"
              >
                <div
                  className={`h-4 w-4 rounded-full mt-1 flex-shrink-0 ${
                    alert.priority === "high"
                      ? "bg-red-500"
                      : alert.priority === "medium"
                        ? "bg-yellow-500"
                        : "bg-green-500"
                  }`}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-base text-pretty leading-relaxed">{alert.message}</p>
                  <p className="text-sm text-muted-foreground mt-2 capitalize">
                    {alert.type} • {alert.priority} priority
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return renderHomeContent()
      case "advisory":
        return <CropAdvisory />
      case "pest":
        return <PestDetection />
      case "weather":
        return <WeatherAlerts />
      case "market":
        return <MarketTracking />
      case "profile":
        return <UserProfile />
      default:
        return renderHomeContent()
    }
  }

  return (
    <div className="min-h-screen bg-background overflow-x-hidden relative">
      <Header title="Smart Crop Advisory" activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="container mx-auto px-4 py-4 max-w-md">{renderContent()}</main>
      <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  )
}
