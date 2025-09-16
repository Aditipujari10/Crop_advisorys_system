"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  MapPin,
  Calendar,
  Bell,
  Search,
  BarChart3,
  AlertCircle,
  Clock,
} from "lucide-react"

interface MarketPrice {
  crop: string
  variety?: string
  price: number
  previousPrice: number
  change: number
  trend: "up" | "down" | "stable"
  market: string
  date: string
  quality: "Premium" | "Standard" | "Below Standard"
  unit: string
}

interface PriceAlert {
  id: string
  crop: string
  targetPrice: number
  currentPrice: number
  type: "above" | "below"
  isActive: boolean
}

const mockMarketData: MarketPrice[] = [
  {
    crop: "Rice",
    variety: "Basmati",
    price: 2100,
    previousPrice: 1995,
    change: 5.3,
    trend: "up",
    market: "Delhi Mandi",
    date: "2024-01-15",
    quality: "Premium",
    unit: "₹/Quintal",
  },
  {
    crop: "Wheat",
    variety: "Sharbati",
    price: 2350,
    previousPrice: 2400,
    change: -2.1,
    trend: "down",
    market: "Indore Mandi",
    date: "2024-01-15",
    quality: "Standard",
    unit: "₹/Quintal",
  },
  {
    crop: "Cotton",
    variety: "Shankar-6",
    price: 5800,
    previousPrice: 5330,
    change: 8.8,
    trend: "up",
    market: "Akola Mandi",
    date: "2024-01-15",
    quality: "Premium",
    unit: "₹/Quintal",
  },
  {
    crop: "Soybean",
    price: 4200,
    previousPrice: 4150,
    change: 1.2,
    trend: "up",
    market: "Bhopal Mandi",
    date: "2024-01-15",
    quality: "Standard",
    unit: "₹/Quintal",
  },
  {
    crop: "Onion",
    price: 1800,
    previousPrice: 1950,
    change: -7.7,
    trend: "down",
    market: "Nashik Mandi",
    date: "2024-01-15",
    quality: "Standard",
    unit: "₹/Quintal",
  },
  {
    crop: "Tomato",
    price: 2500,
    previousPrice: 2500,
    change: 0,
    trend: "stable",
    market: "Bangalore Mandi",
    date: "2024-01-15",
    quality: "Premium",
    unit: "₹/Quintal",
  },
]

const mockPriceAlerts: PriceAlert[] = [
  {
    id: "1",
    crop: "Rice",
    targetPrice: 2200,
    currentPrice: 2100,
    type: "above",
    isActive: true,
  },
  {
    id: "2",
    crop: "Cotton",
    targetPrice: 5500,
    currentPrice: 5800,
    type: "above",
    isActive: false,
  },
]

export function MarketTracking() {
  const [selectedCrop, setSelectedCrop] = useState("All crops")
  const [selectedMarket, setSelectedMarket] = useState("All markets")
  const [searchQuery, setSearchQuery] = useState("")
  const [priceAlerts, setPriceAlerts] = useState<PriceAlert[]>(mockPriceAlerts)
  const [newAlert, setNewAlert] = useState({
    crop: "",
    targetPrice: "",
    type: "above" as "above" | "below",
  })

  const filteredData = mockMarketData.filter((item) => {
    const matchesCrop = selectedCrop === "All crops" || item.crop === selectedCrop
    const matchesMarket = selectedMarket === "All markets" || item.market === selectedMarket
    const matchesSearch = !searchQuery || item.crop.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCrop && matchesMarket && matchesSearch
  })

  const getTrendIcon = (trend: string, change: number) => {
    if (trend === "up") return <TrendingUp className="h-4 w-4 text-green-600" />
    if (trend === "down") return <TrendingDown className="h-4 w-4 text-red-600" />
    return <div className="h-4 w-4 rounded-full bg-gray-400" />
  }

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case "up":
        return "text-green-600"
      case "down":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  const getQualityBadge = (quality: string) => {
    switch (quality) {
      case "Premium":
        return <Badge className="bg-green-100 text-green-800 border-green-200">Premium</Badge>
      case "Standard":
        return <Badge variant="secondary">Standard</Badge>
      case "Below Standard":
        return <Badge className="bg-red-100 text-red-800 border-red-200">Below Standard</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const addPriceAlert = () => {
    if (newAlert.crop && newAlert.targetPrice) {
      const alert: PriceAlert = {
        id: Date.now().toString(),
        crop: newAlert.crop,
        targetPrice: Number.parseFloat(newAlert.targetPrice),
        currentPrice: mockMarketData.find((item) => item.crop === newAlert.crop)?.price || 0,
        type: newAlert.type,
        isActive: true,
      }
      setPriceAlerts([...priceAlerts, alert])
      setNewAlert({ crop: "", targetPrice: "", type: "above" })
    }
  }

  const toggleAlert = (id: string) => {
    setPriceAlerts(priceAlerts.map((alert) => (alert.id === id ? { ...alert, isActive: !alert.isActive } : alert)))
  }

  const uniqueCrops = Array.from(new Set(mockMarketData.map((item) => item.crop)))
  const uniqueMarkets = Array.from(new Set(mockMarketData.map((item) => item.market)))

  return (
    <div className="space-y-4 pb-28 px-1">
      {/* Search and Filters */}
      <Card className="shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Search className="h-6 w-6 text-primary" />
            Market Search & Filters
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex gap-3">
            <Input
              placeholder="Search crops..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 h-14 text-base"
            />
            <Button
              variant="outline"
              size="icon"
              className="h-14 w-14 rounded-xl active:scale-95 transition-transform bg-transparent"
            >
              <Search className="h-6 w-6" />
            </Button>
          </div>

          <div className="space-y-4">
            <div className="space-y-3">
              <Label className="text-base font-medium">Filter by Crop</Label>
              <Select value={selectedCrop} onValueChange={setSelectedCrop}>
                <SelectTrigger className="h-14 text-base">
                  <SelectValue placeholder="All crops" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All crops" className="h-12 text-base">
                    All crops
                  </SelectItem>
                  {uniqueCrops.map((crop) => (
                    <SelectItem key={crop} value={crop} className="h-12 text-base">
                      {crop}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label className="text-base font-medium">Filter by Market</Label>
              <Select value={selectedMarket} onValueChange={setSelectedMarket}>
                <SelectTrigger className="h-14 text-base">
                  <SelectValue placeholder="All markets" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All markets" className="h-12 text-base">
                    All markets
                  </SelectItem>
                  {uniqueMarkets.map((market) => (
                    <SelectItem key={market} value={market} className="h-12 text-base">
                      {market}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Market Prices */}
      <Card className="shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <DollarSign className="h-6 w-6 text-primary" />
            Current Market Prices
            <Badge variant="secondary" className="ml-auto text-sm">
              <Clock className="h-4 w-4 mr-1" />
              Updated Today
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredData.map((item, index) => (
              <Card key={index} className="border-l-4 border-l-primary/30 shadow-sm">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div>
                        <h3 className="font-semibold text-lg">
                          {item.crop}
                          {item.variety && (
                            <span className="text-base text-muted-foreground ml-1">({item.variety})</span>
                          )}
                        </h3>
                        <div className="flex items-center gap-2 text-base text-muted-foreground mt-1">
                          <MapPin className="h-4 w-4" />
                          {item.market}
                          <Calendar className="h-4 w-4 ml-2" />
                          {item.date}
                        </div>
                      </div>
                    </div>
                    {getQualityBadge(item.quality)}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                      <div>
                        <div className="text-3xl font-bold">
                          {item.unit.replace("₹/", "₹")}
                          {item.price}
                        </div>
                        <div className="text-base text-muted-foreground">per Quintal</div>
                      </div>
                      <div className={`flex items-center gap-2 ${getTrendColor(item.trend)}`}>
                        {getTrendIcon(item.trend, item.change)}
                        <span className="font-medium text-base">
                          {item.change > 0 ? "+" : ""}
                          {item.change.toFixed(1)}%
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-12 px-4 text-base rounded-xl active:scale-95 transition-transform bg-transparent"
                      >
                        <BarChart3 className="h-5 w-5 mr-2" />
                        Chart
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-12 px-4 text-base rounded-xl active:scale-95 transition-transform bg-transparent"
                      >
                        <Bell className="h-5 w-5 mr-2" />
                        Alert
                      </Button>
                    </div>
                  </div>

                  <div className="mt-4 text-base text-muted-foreground">
                    Previous: ₹{item.previousPrice} • Change: ₹{Math.abs(item.price - item.previousPrice)}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Price Alerts */}
      <Card className="shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Bell className="h-6 w-6 text-primary" />
            Price Alerts
            <Badge variant="secondary" className="ml-auto">
              {priceAlerts.filter((alert) => alert.isActive).length} Active
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Add New Alert */}
          <div className="p-5 border rounded-xl bg-muted/30">
            <h4 className="font-medium mb-4 text-base">Set New Price Alert</h4>
            <div className="space-y-4">
              <Select value={newAlert.crop} onValueChange={(value) => setNewAlert({ ...newAlert, crop: value })}>
                <SelectTrigger className="h-14 text-base">
                  <SelectValue placeholder="Select crop" />
                </SelectTrigger>
                <SelectContent>
                  {uniqueCrops.map((crop) => (
                    <SelectItem key={crop} value={crop} className="h-12 text-base">
                      {crop}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={newAlert.type}
                onValueChange={(value: "above" | "below") => setNewAlert({ ...newAlert, type: value })}
              >
                <SelectTrigger className="h-14 text-base">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="above" className="h-12 text-base">
                    Above
                  </SelectItem>
                  <SelectItem value="below" className="h-12 text-base">
                    Below
                  </SelectItem>
                </SelectContent>
              </Select>

              <Input
                type="number"
                placeholder="Target price"
                value={newAlert.targetPrice}
                onChange={(e) => setNewAlert({ ...newAlert, targetPrice: e.target.value })}
                className="h-14 text-base"
              />

              <Button
                onClick={addPriceAlert}
                disabled={!newAlert.crop || !newAlert.targetPrice}
                className="w-full h-14 text-base font-medium rounded-xl active:scale-95 transition-transform"
              >
                Add Alert
              </Button>
            </div>
          </div>

          {/* Active Alerts */}
          <div className="space-y-4">
            {priceAlerts.map((alert) => (
              <div key={alert.id} className="flex items-center justify-between p-4 border rounded-xl">
                <div className="flex items-center gap-4">
                  <div className={`h-4 w-4 rounded-full ${alert.isActive ? "bg-green-500" : "bg-gray-400"}`} />
                  <div>
                    <div className="font-medium text-base">
                      {alert.crop} {alert.type} ₹{alert.targetPrice}
                    </div>
                    <div className="text-base text-muted-foreground mt-1">
                      Current: ₹{alert.currentPrice} •{" "}
                      {alert.type === "above"
                        ? alert.currentPrice >= alert.targetPrice
                          ? "Target reached!"
                          : `₹${(alert.targetPrice - alert.currentPrice).toFixed(0)} to go`
                        : alert.currentPrice <= alert.targetPrice
                          ? "Target reached!"
                          : `₹${(alert.currentPrice - alert.targetPrice).toFixed(0)} above target`}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {((alert.type === "above" && alert.currentPrice >= alert.targetPrice) ||
                    (alert.type === "below" && alert.currentPrice <= alert.targetPrice)) && (
                    <AlertCircle className="h-5 w-5 text-green-500" />
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleAlert(alert.id)}
                    className="h-12 px-4 text-base rounded-xl active:scale-95 transition-transform"
                  >
                    {alert.isActive ? "Disable" : "Enable"}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Market Insights */}
      <Card className="bg-gradient-to-r from-blue-50 to-green-50 border-blue-200 shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <BarChart3 className="h-6 w-6 text-blue-500" />
            Market Insights
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-6">
            <div className="space-y-3">
              <h4 className="font-medium text-base flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-500" />
                Top Gainers Today
              </h4>
              <div className="space-y-2">
                {mockMarketData
                  .filter((item) => item.trend === "up")
                  .sort((a, b) => b.change - a.change)
                  .slice(0, 3)
                  .map((item, index) => (
                    <div key={index} className="flex justify-between text-base bg-white/50 p-4 rounded-xl">
                      <span>{item.crop}</span>
                      <span className="text-green-600 font-medium">+{item.change.toFixed(1)}%</span>
                    </div>
                  ))}
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium text-base flex items-center gap-2">
                <TrendingDown className="h-5 w-5 text-red-500" />
                Top Losers Today
              </h4>
              <div className="space-y-2">
                {mockMarketData
                  .filter((item) => item.trend === "down")
                  .sort((a, b) => a.change - b.change)
                  .slice(0, 3)
                  .map((item, index) => (
                    <div key={index} className="flex justify-between text-base bg-white/50 p-4 rounded-xl">
                      <span>{item.crop}</span>
                      <span className="text-red-600 font-medium">{item.change.toFixed(1)}%</span>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-white/50 rounded-xl">
            <h4 className="font-medium text-base mb-3">Market Summary</h4>
            <p className="text-base text-pretty leading-relaxed">
              Cotton and Rice showing strong upward momentum with 8.8% and 5.3% gains respectively. Onion prices
              declined by 7.7% due to increased supply from new harvest. Overall market sentiment remains positive with
              67% of tracked commodities showing gains.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
