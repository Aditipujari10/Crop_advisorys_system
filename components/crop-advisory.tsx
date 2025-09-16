"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Leaf,
  MapPin,
  Calendar,
  Droplets,
  Thermometer,
  Lightbulb,
  CheckCircle,
  AlertCircle,
  Mic,
  Send,
} from "lucide-react"

const cropTypes = ["Rice", "Wheat", "Cotton", "Sugarcane", "Maize", "Soybean", "Groundnut", "Tomato", "Onion", "Potato"]

const soilTypes = ["Clay", "Sandy", "Loamy", "Silt", "Peaty", "Chalky"]

const advisoryData = {
  rice: {
    irrigation: "Water level should be 2-3 cm above soil surface during vegetative stage",
    fertilizer: "Apply 120kg N, 60kg P2O5, 40kg K2O per hectare. Split nitrogen in 3 doses",
    pestControl: "Monitor for stem borer and leaf folder. Use pheromone traps",
    bestPractices: [
      "Maintain proper plant spacing (20x15 cm)",
      "Remove weeds regularly in first 45 days",
      "Drain water 10 days before harvest",
    ],
  },
  wheat: {
    irrigation: "Apply irrigation at crown root initiation, tillering, jointing, flowering, and grain filling stages",
    fertilizer: "Apply 150kg N, 60kg P2O5, 40kg K2O per hectare. Apply full P&K and 1/3 N as basal",
    pestControl: "Watch for aphids and termites. Use recommended insecticides if threshold crossed",
    bestPractices: [
      "Sow at optimal time (Nov 15 - Dec 15)",
      "Use certified seeds at 100kg/hectare",
      "Maintain row spacing of 22.5 cm",
    ],
  },
}

export function CropAdvisory() {
  const [selectedCrop, setSelectedCrop] = useState("")
  const [soilType, setSoilType] = useState("")
  const [farmSize, setFarmSize] = useState("")
  const [location, setLocation] = useState("")
  const [question, setQuestion] = useState("")
  const [showAdvice, setShowAdvice] = useState(false)
  const [isListening, setIsListening] = useState(false)

  const handleGetAdvice = () => {
    if (selectedCrop && soilType) {
      setShowAdvice(true)
    }
  }

  const handleVoiceInput = () => {
    setIsListening(!isListening)
    // Voice input functionality would be implemented here
  }

  const currentAdvice = selectedCrop.toLowerCase() === "rice" ? advisoryData.rice : advisoryData.wheat

  return (
    <div className="space-y-4 pb-28 px-1">
      <Card className="bg-gradient-to-br from-primary/15 via-primary/10 to-secondary/15 border-primary/30 shadow-md">
        <CardContent className="p-6">
          <div className="text-center space-y-3">
            <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto">
              <Leaf className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-balance">Smart Crop Advisory</h1>
            <p className="text-base text-muted-foreground text-pretty">
              AI-powered personalized farming guidance tailored to your specific needs
            </p>
          </div>
        </CardContent>
      </Card>

      {/* AI Chat Interface - moved to top for prominence */}
      <Card className="shadow-sm border-primary/20">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Mic className="h-6 w-6 text-primary" />
            Ask Our AI Assistant
            <Badge variant="secondary" className="ml-auto text-sm bg-primary/20 text-primary">
              Voice Enabled
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-3">
            <Textarea
              placeholder="Ask any question about your crops... (e.g., 'When should I apply fertilizer to my rice crop?')"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="min-h-[100px] text-base resize-none"
            />
            <div className="flex flex-col gap-3">
              <Button
                variant="outline"
                size="icon"
                onClick={handleVoiceInput}
                className={`h-14 w-14 rounded-xl active:scale-95 transition-all ${
                  isListening ? "bg-primary/10 text-primary animate-pulse" : ""
                }`}
              >
                <Mic className="h-6 w-6" />
              </Button>
              <Button size="icon" className="h-14 w-14 rounded-xl active:scale-95 transition-transform">
                <Send className="h-6 w-6" />
              </Button>
            </div>
          </div>
          {isListening && (
            <div className="text-base text-muted-foreground flex items-center gap-3 p-4 bg-primary/5 rounded-xl">
              <div className="h-3 w-3 bg-red-500 rounded-full animate-pulse" />
              Listening... Speak your question
            </div>
          )}
        </CardContent>
      </Card>

      {/* Farm Information Form */}
      <Card className="shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Leaf className="h-6 w-6 text-primary" />
            Farm Information
            <Badge variant="outline" className="ml-auto text-sm">
              Required for Personalized Advice
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-3">
              <Label htmlFor="crop" className="text-base font-medium">
                Crop Type
              </Label>
              <Select value={selectedCrop} onValueChange={setSelectedCrop}>
                <SelectTrigger className="h-14 text-base">
                  <SelectValue placeholder="Select your crop" />
                </SelectTrigger>
                <SelectContent>
                  {cropTypes.map((crop) => (
                    <SelectItem key={crop} value={crop} className="h-12 text-base">
                      {crop}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label htmlFor="soil" className="text-base font-medium">
                Soil Type
              </Label>
              <Select value={soilType} onValueChange={setSoilType}>
                <SelectTrigger className="h-14 text-base">
                  <SelectValue placeholder="Select soil type" />
                </SelectTrigger>
                <SelectContent>
                  {soilTypes.map((soil) => (
                    <SelectItem key={soil} value={soil} className="h-12 text-base">
                      {soil}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label htmlFor="size" className="text-base font-medium">
                Farm Size (Acres)
              </Label>
              <Input
                id="size"
                type="number"
                placeholder="Enter farm size"
                value={farmSize}
                onChange={(e) => setFarmSize(e.target.value)}
                className="h-14 text-base"
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="location" className="text-base font-medium">
                Location
              </Label>
              <div className="flex gap-3">
                <Input
                  id="location"
                  placeholder="Enter your location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="h-14 text-base"
                />
                <Button
                  variant="outline"
                  size="icon"
                  className="h-14 w-14 rounded-xl active:scale-95 transition-transform bg-transparent"
                >
                  <MapPin className="h-6 w-6" />
                </Button>
              </div>
            </div>
          </div>

          <Button
            onClick={handleGetAdvice}
            className="w-full h-14 text-base font-medium rounded-xl active:scale-95 transition-transform shadow-sm"
            disabled={!selectedCrop || !soilType}
          >
            <Lightbulb className="h-5 w-5 mr-2" />
            Get Personalized Advice
          </Button>
        </CardContent>
      </Card>

      {/* Advisory Results */}
      {showAdvice && selectedCrop && (
        <div className="space-y-4">
          {/* Irrigation Advice */}
          <Card className="shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Droplets className="h-6 w-6 text-blue-500" />
                Irrigation Guidance
                <Badge variant="secondary" className="ml-auto text-sm">
                  <Calendar className="h-4 w-4 mr-1" />
                  Current Stage
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-base text-pretty leading-relaxed">{currentAdvice.irrigation}</p>
            </CardContent>
          </Card>

          {/* Fertilizer Advice */}
          <Card className="shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Leaf className="h-6 w-6 text-green-500" />
                Fertilizer Recommendations
                <Badge variant="outline" className="ml-auto text-sm">
                  Per Hectare
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-base text-pretty leading-relaxed">{currentAdvice.fertilizer}</p>
            </CardContent>
          </Card>

          {/* Pest Control */}
          <Card className="shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <AlertCircle className="h-6 w-6 text-orange-500" />
                Pest & Disease Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-base text-pretty leading-relaxed">{currentAdvice.pestControl}</p>
            </CardContent>
          </Card>

          {/* Best Practices */}
          <Card className="shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <CheckCircle className="h-6 w-6 text-primary" />
                Best Practices for {selectedCrop}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {currentAdvice.bestPractices.map((practice, index) => (
                  <li key={index} className="flex items-start gap-3 text-base">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                    <span className="text-pretty leading-relaxed">{practice}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Weather-based Recommendations */}
          <Card className="bg-gradient-to-r from-blue-50 to-green-50 border-blue-200 shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Thermometer className="h-6 w-6 text-blue-500" />
                Weather-Based Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-base">
                <p className="text-pretty leading-relaxed">
                  <strong>Today:</strong> With current temperature (28°C) and humidity (65%), it's ideal for applying
                  foliar spray in early morning or evening.
                </p>
                <p className="text-pretty leading-relaxed">
                  <strong>Next 3 days:</strong> Rain expected. Avoid irrigation and postpone pesticide application until
                  weather clears.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
