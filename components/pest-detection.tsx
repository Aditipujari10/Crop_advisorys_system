"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Camera, Upload, Bug, CheckCircle, Leaf, Zap, Clock, Shield } from "lucide-react"
import Image from "next/image"

interface DetectionResult {
  pest: string
  confidence: number
  severity: "Low" | "Medium" | "High"
  treatment: string
  prevention: string[]
  urgency: "Immediate" | "Within 3 days" | "Within a week"
}

const mockDetectionResults: DetectionResult[] = [
  {
    pest: "Aphids",
    confidence: 92,
    severity: "Medium",
    treatment: "Apply neem oil spray (5ml per liter) or use insecticidal soap. Spray in early morning or evening.",
    prevention: [
      "Encourage beneficial insects like ladybugs",
      "Remove weeds around the field",
      "Use reflective mulch to deter aphids",
    ],
    urgency: "Within 3 days",
  },
  {
    pest: "Leaf Blight",
    confidence: 87,
    severity: "High",
    treatment: "Apply copper-based fungicide immediately. Remove affected leaves and destroy them.",
    prevention: ["Ensure proper air circulation", "Avoid overhead watering", "Apply preventive fungicide spray"],
    urgency: "Immediate",
  },
]

export function PestDetection() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [detectionResults, setDetectionResults] = useState<DetectionResult[]>([])
  const [analysisComplete, setAnalysisComplete] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string)
        setAnalysisComplete(false)
        setDetectionResults([])
      }
      reader.readAsDataURL(file)
    }
  }

  const handleCameraCapture = () => {
    // In a real app, this would open the camera
    fileInputRef.current?.click()
  }

  const analyzeImage = () => {
    if (!selectedImage) return

    setIsAnalyzing(true)
    setAnalysisComplete(false)

    // Simulate AI analysis
    setTimeout(() => {
      setDetectionResults(mockDetectionResults)
      setIsAnalyzing(false)
      setAnalysisComplete(true)
    }, 3000)
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
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

  const getUrgencyIcon = (urgency: string) => {
    switch (urgency) {
      case "Immediate":
        return <Zap className="h-5 w-5 text-red-500" />
      case "Within 3 days":
        return <Clock className="h-5 w-5 text-yellow-500" />
      case "Within a week":
        return <Clock className="h-5 w-5 text-green-500" />
      default:
        return <Clock className="h-5 w-5" />
    }
  }

  return (
    <div className="space-y-4 pb-28 px-1">
      {/* Image Upload Section */}
      <Card className="shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Bug className="h-6 w-6 text-primary" />
            Pest & Disease Detection
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-base text-muted-foreground text-pretty">
            Upload a clear photo of affected leaves, stems, or crops for AI-powered pest and disease identification.
          </div>

          {/* Image Upload Area */}
          <div className="border-2 border-dashed border-border rounded-xl p-6">
            {selectedImage ? (
              <div className="space-y-4">
                <div className="relative w-full h-72 rounded-xl overflow-hidden">
                  <Image
                    src={selectedImage || "/placeholder.svg"}
                    alt="Uploaded crop image"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex gap-3">
                  <Button
                    onClick={analyzeImage}
                    disabled={isAnalyzing}
                    className="flex-1 h-14 text-base font-medium rounded-xl active:scale-95 transition-transform"
                  >
                    {isAnalyzing ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Bug className="h-5 w-5 mr-2" />
                        Analyze Image
                      </>
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setSelectedImage(null)}
                    className="h-14 px-6 text-base rounded-xl active:scale-95 transition-transform"
                  >
                    Remove
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center space-y-6">
                <div className="mx-auto h-20 w-20 rounded-full bg-muted flex items-center justify-center">
                  <Camera className="h-10 w-10 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-base font-medium">Upload crop image</p>
                  <p className="text-sm text-muted-foreground mt-1">Take a photo or select from gallery</p>
                </div>
                <div className="flex gap-4 justify-center">
                  <Button
                    onClick={handleCameraCapture}
                    className="gap-3 h-14 px-6 text-base font-medium rounded-xl active:scale-95 transition-transform"
                  >
                    <Camera className="h-6 w-6" />
                    Camera
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    className="gap-3 h-14 px-6 text-base font-medium rounded-xl active:scale-95 transition-transform"
                  >
                    <Upload className="h-6 w-6" />
                    Gallery
                  </Button>
                </div>
              </div>
            )}
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
            capture="environment"
          />
        </CardContent>
      </Card>

      {/* Analysis Progress */}
      {isAnalyzing && (
        <Card className="shadow-sm">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
                <span className="font-medium text-base">Analyzing your crop image...</span>
              </div>
              <Progress value={66} className="h-3" />
              <div className="text-base text-muted-foreground">
                Our AI is examining the image for pests, diseases, and nutrient deficiencies.
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Detection Results */}
      {analysisComplete && detectionResults.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <CheckCircle className="h-6 w-6 text-green-500" />
            <h3 className="font-heading font-semibold text-lg">Detection Results</h3>
          </div>

          {detectionResults.map((result, index) => (
            <Card key={index} className="border-l-4 border-l-primary shadow-sm">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Bug className="h-6 w-6 text-primary" />
                    {result.pest}
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge className={getSeverityColor(result.severity)}>{result.severity} Risk</Badge>
                    <Badge variant="outline" className="text-sm">
                      {result.confidence}% confident
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Urgency Alert */}
                <Alert className={result.urgency === "Immediate" ? "border-red-200 bg-red-50" : ""}>
                  <div className="flex items-center gap-3">
                    {getUrgencyIcon(result.urgency)}
                    <AlertDescription className="font-medium text-base">
                      Action needed: {result.urgency}
                    </AlertDescription>
                  </div>
                </Alert>

                {/* Treatment */}
                <div className="space-y-3">
                  <h4 className="font-medium flex items-center gap-2 text-base">
                    <Shield className="h-5 w-5 text-green-500" />
                    Recommended Treatment
                  </h4>
                  <p className="text-base text-pretty leading-relaxed bg-muted/50 p-4 rounded-xl">{result.treatment}</p>
                </div>

                {/* Prevention */}
                <div className="space-y-3">
                  <h4 className="font-medium flex items-center gap-2 text-base">
                    <Leaf className="h-5 w-5 text-blue-500" />
                    Prevention Tips
                  </h4>
                  <ul className="space-y-2">
                    {result.prevention.map((tip, tipIndex) => (
                      <li key={tipIndex} className="flex items-start gap-3 text-base">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                        <span className="text-pretty leading-relaxed">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* No Results */}
      {analysisComplete && detectionResults.length === 0 && (
        <Card>
          <CardContent className="p-6 text-center">
            <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <h3 className="font-heading font-semibold mb-2">Great News!</h3>
            <p className="text-sm text-muted-foreground text-pretty">
              No pests or diseases detected in your crop. Your plants appear healthy!
            </p>
          </CardContent>
        </Card>
      )}

      {/* Tips for Better Detection */}
      <Card className="bg-gradient-to-r from-blue-50 to-green-50 border-blue-200 shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg flex items-center gap-2">
            <Camera className="h-6 w-6 text-blue-500" />
            Tips for Better Detection
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3 text-base">
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
              <span>Take photos in good natural light</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
              <span>Focus on affected areas (leaves, stems, fruits)</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
              <span>Capture close-up images for better accuracy</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
              <span>Include multiple angles if possible</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
